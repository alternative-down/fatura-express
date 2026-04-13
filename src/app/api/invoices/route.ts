import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { invoices } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { verifyToken } from '@/lib/auth';
import { getTemplateById, renderInvoice } from '@/lib/templates';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    const result = await db.select().from(invoices).where(eq(invoices.userId, payload.userId)).orderBy(desc(invoices.createdAt));
    return NextResponse.json({ invoices: result });
  } catch (error) {
    console.error('GET /api/invoices error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    const { templateId, formData } = await request.json();
    const template = getTemplateById(templateId);
    if (!template) return NextResponse.json({ error: 'Template não encontrado' }, { status: 404 });
    const content = renderInvoice(template, formData);
    const invoiceId = crypto.randomUUID();
    const now = new Date();
    await db.insert(invoices).values({
      id: invoiceId,
      userId: payload.userId,
      templateId,
      planType: template.planType,
      status: 'draft',
      data: JSON.stringify({ ...formData, content }),
      amount: template.price,
      createdAt: now,
      updatedAt: now,
    });
    return NextResponse.json({ invoiceId });
  } catch (error) {
    console.error('POST /api/invoices error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}