import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { invoices } from '@/db/schema';
import { ne, count } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = db
      .select({ count: count() })
      .from(invoices)
      .where(ne(invoices.status, 'draft'))
      .get();

    return NextResponse.json({ count: result?.count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
