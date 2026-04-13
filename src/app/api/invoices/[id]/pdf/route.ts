import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { invoices } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { verifyToken } from '@/lib/auth';
import { buildInvoiceHtml, InvoiceData } from '@/lib/pdf';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Token inválido' }, { status: 401 });

    const { id } = await params;
    const [invoice] = await db
      .select()
      .from(invoices)
      .where(and(eq(invoices.id, id), eq(invoices.userId, payload.userId)))
      .limit(1);

    if (!invoice) {
      return NextResponse.json({ error: 'Fatura não encontrada' }, { status: 404 });
    }

    const invoiceData = JSON.parse(invoice.data || '{}') as Partial<InvoiceData>;
    const html = buildInvoiceHtml({
      invoiceId: invoice.id,
      issuerName: invoiceData.issuerName || '',
      issuerCNPJ: invoiceData.issuerCNPJ || '',
      issuerIE: invoiceData.issuerIE,
      issuerAddress: invoiceData.issuerAddress || '',
      clientName: invoiceData.clientName || '',
      clientCNPJ: invoiceData.clientCNPJ || '',
      clientAddress: invoiceData.clientAddress || '',
      invoiceNumber: invoiceData.invoiceNumber || invoice.id,
      issueDate: invoiceData.issueDate || '',
      dueDate: invoiceData.dueDate || '',
      description: invoiceData.description || '',
      quantity: invoiceData.quantity || '1',
      unitPrice: invoiceData.unitPrice || '0',
      totalPrice: invoiceData.totalPrice || 'R$ 0,00',
      paymentMethod: invoiceData.paymentMethod || '',
    });

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="fatura-${invoice.id}.html"`,
      },
    });
  } catch (error) {
    console.error('GET /api/invoices/[id]/pdf error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
