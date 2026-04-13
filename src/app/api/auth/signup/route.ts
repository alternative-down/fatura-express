import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

const ASAAS_API_KEY = process.env.ASAAS_API_KEY || '';
const ASAAS_ENDPOINT = 'https://api.asaas.com/api/v3';

async function createAsaasCustomer(email: string, name?: string): Promise<string | null> {
  if (!ASAAS_API_KEY) return null;
  try {
    const response = await fetch(`${ASAAS_ENDPOINT}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: ASAAS_API_KEY,
      },
      body: JSON.stringify({
        email,
        name: name || email.split('@')[0],
      }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.id as string;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
    }
    const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    // Create Asaas customer for payment processing
    const asaasCustomerId = await createAsaasCustomer(email, name);

    await db.insert(users).values({
      id: userId,
      email,
      name: name || null,
      passwordHash,
      asaasCustomerId,
      createdAt: new Date(),
    });

    const token = await signToken({ userId, email });
    const response = NextResponse.json({ ok: true, asaasCustomerId });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
