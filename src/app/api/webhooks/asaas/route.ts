import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';

const ASAAS_WEBHOOK_TOKEN = process.env.ASAAS_WEBHOOK_TOKEN || '';

type AsaasEvent = {
  event: string;
  payment: {
    id: string;
    status: 'PENDING' | 'CONFIRMED' | 'RECEIVED' | 'OVERDUE' | 'CANCELLED';
    billingType: string;
    customer: string;
    value: number;
    externalReference: string | null;
    subscription?: string;
  };
};

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    if (ASAAS_WEBHOOK_TOKEN) {
      const token = request.headers.get('asaas-signature');
      if (token !== ASAAS_WEBHOOK_TOKEN) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const event: AsaasEvent = await request.json();
    console.log(`[Asaas Webhook] Event: ${event.event}, Payment: ${event.payment?.id}`);

    switch (event.event) {
      case 'PAYMENT_CONFIRMED':
      case 'PAYMENT_RECEIVED':
        await handlePaymentConfirmed(event);
        break;
      case 'PAYMENT_OVERDUE':
        await handlePaymentOverdue(event);
        break;
      default:
        console.log(`[Asaas Webhook] Unhandled event: ${event.event}`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('[Asaas Webhook] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handlePaymentConfirmed(event: AsaasEvent) {
  const paymentId = event.payment.id;
  const externalReference = event.payment.externalReference;

  let order;
  if (externalReference) {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.id, externalReference))
      .limit(1);
    order = result[0];
  }

  if (!order && paymentId) {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.asaasPaymentId, paymentId))
      .limit(1);
    order = result[0];
  }

  if (!order) {
    console.log(`[Asaas Webhook] Order not found for payment: ${paymentId}`);
    return;
  }

  // Update order status to paid
  await db
    .update(orders)
    .set({ status: 'paid', paidAt: new Date() })
    .where(eq(orders.id, order.id));

  // Create or update subscription for the user
  const now = new Date();
  const periodEnd = new Date(now);
  periodEnd.setMonth(periodEnd.getMonth() + 1);

  // Check if user already has a subscription
  const [existingSub] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, order.userId))
    .limit(1);

  if (existingSub) {
    // Extend subscription
    const newPeriodEnd = new Date(existingSub.currentPeriodEnd || now);
    newPeriodEnd.setMonth(newPeriodEnd.getMonth() + 1);
    await db
      .update(subscriptions)
      .set({
        planId: order.planId,
        status: 'active',
        currentPeriodStart: now,
        currentPeriodEnd: newPeriodEnd,
        updatedAt: now,
      })
      .where(eq(subscriptions.id, existingSub.id));
  } else {
    // Create new subscription
    await db.insert(subscriptions).values({
      id: crypto.randomUUID(),
      userId: order.userId,
      planId: order.planId,
      status: 'active',
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
      createdAt: now,
      updatedAt: now,
    });
  }

  console.log(`[Asaas Webhook] Order ${order.id} paid. Plan: ${order.planId}. Subscription activated.`);
}

async function handlePaymentOverdue(event: AsaasEvent) {
  const paymentId = event.payment.id;
  console.log(`[Asaas Webhook] Payment overdue: ${paymentId}`);

  let order;
  if (event.payment.externalReference) {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.id, event.payment.externalReference))
      .limit(1);
    order = result[0];
  }
  if (!order && paymentId) {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.asaasPaymentId, paymentId))
      .limit(1);
    order = result[0];
  }

  if (!order) {
    console.log(`[Asaas Webhook] Order not found for overdue payment: ${paymentId}`);
    return;
  }

  if (order.status === 'pending') {
    await db
      .update(orders)
      .set({ status: 'cancelled' })
      .where(eq(orders.id, order.id));
    console.log(`[Asaas Webhook] Order ${order.id} marked as cancelled (overdue).`);
  }
}
