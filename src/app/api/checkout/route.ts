import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { orders, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifyToken } from '@/lib/auth';

const ASAAS_API_KEY = process.env.ASAAS_API_KEY || '';
const ASAAS_ENDPOINT = 'https://api.asaas.com/api/v3';

type PaymentMethod = 'pix' | 'boleto' | 'credit_card';
type BillingType = 'PIX' | 'BOLETO' | 'CREDIT_CARD';

const PLAN_PRICES: Record<string, number> = {
  individual: 19,
  ilimitado: 49,
};

function resolveBillingType(method?: string): BillingType {
  switch (method) {
    case 'boleto': return 'BOLETO';
    case 'credit_card': return 'CREDIT_CARD';
    case 'pix':
    default: return 'PIX';
  }
}

async function fetchPixQrCode(paymentId: string) {
  const pixResponse = await fetch(`${ASAAS_ENDPOINT}/payments/${paymentId}/pixQrCode`, {
    headers: { access_token: ASAAS_API_KEY },
  });
  if (!pixResponse.ok) return null;
  return pixResponse.json();
}

export async function POST(request: NextRequest) {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const { planId, paymentMethod } = (await request.json()) as {
      planId?: string;
      paymentMethod?: PaymentMethod;
    };

    if (!planId || !PLAN_PRICES[planId]) {
      return NextResponse.json({ error: 'Plano inválido' }, { status: 400 });
    }

    const [user] = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    if (!user.asaasCustomerId) {
      return NextResponse.json(
        { error: 'Conta de pagamento não configurada. Tente fazer login novamente.' },
        { status: 400 }
      );
    }

    const amount = PLAN_PRICES[planId];
    const billingType = resolveBillingType(paymentMethod);
    const dueDate = new Date().toISOString().split('T')[0];
    const orderId = crypto.randomUUID();

    const asaasResponse = await fetch(`${ASAAS_ENDPOINT}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: ASAAS_API_KEY,
      },
      body: JSON.stringify({
        billingType,
        customer: user.asaasCustomerId,
        value: amount,
        dueDate,
        description: `Fatura Express - Plano ${planId === 'ilimitado' ? 'Ilimitado' : 'Individual'}`,
        externalReference: orderId,
      }),
    });

    if (!asaasResponse.ok) {
      const err = await asaasResponse.text();
      console.error('Asaas error:', err);
      return NextResponse.json({ error: 'Erro ao criar pagamento' }, { status: 500 });
    }

    const asaasData = await asaasResponse.json();

    await db.insert(orders).values({
      id: orderId,
      userId: payload.userId,
      planId,
      amount,
      status: 'pending',
      asaasPaymentId: asaasData.id,
      dueDate: new Date(`${dueDate}T00:00:00.000Z`),
      createdAt: new Date(),
    });

    const responseBody: Record<string, unknown> = {
      orderId,
      paymentId: asaasData.id,
      paymentMethod: paymentMethod || 'pix',
      billingType,
      amount,
      invoiceUrl: asaasData.invoiceUrl || null,
    };

    if (billingType === 'PIX') {
      const pixData = await fetchPixQrCode(asaasData.id);
      responseBody.pix = {
        encodedImage: pixData?.encodedImage || null,
        payload: pixData?.payload || pixData?.qrCode || pixData?.qrCodeUrl || null,
        expirationDate: pixData?.expirationDate || null,
      };
    }

    if (billingType === 'BOLETO') {
      responseBody.boleto = {
        bankSlipUrl: asaasData.bankSlipUrl || null,
        invoiceUrl: asaasData.invoiceUrl || null,
        identificationField: asaasData.identificationField || null,
        barCode: asaasData.barCode || null,
      };
    }

    return NextResponse.json(responseBody);
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
