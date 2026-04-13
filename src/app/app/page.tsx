import Link from 'next/link';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { TEMPLATES } from '@/lib/templates';
import { db } from '@/db';
import { invoices } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function AppPage() {
  const token = (await cookies()).get('token')?.value;
  const session = token ? await verifyToken(token) : null;

  let userInvoices: typeof invoices.$inferSelect[] = [];
  if (session) {
    try {
      userInvoices = await db.select().from(invoices).where(eq(invoices.userId, session.userId)).orderBy(desc(invoices.createdAt)).limit(10);
    } catch {
      // DB not initialized yet
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white text-lg font-bold">F</div>
            <span className="font-bold text-slate-900 text-lg">Fatura Express</span>
          </Link>
          <nav className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-sm text-slate-500">{session.email}</span>
                <Link href="/" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Início</Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Entrar</Link>
                <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 text-sm">Cadastrar</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {session ? `Olá, ${session.email.split('@')[0]}` : 'Emitir uma fatura'}
          </h1>
          <p className="text-slate-600">Escolha um modelo e gere sua fatura profissional em PDF.</p>
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mb-4">Escolha um modelo</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-xl mb-12">
          {TEMPLATES.map((template) => (
            <Link key={template.id} href={`/app/generate?template=${template.id}`}
              className="bg-white rounded-xl shadow-sm border border-blue-100 p-5 text-center hover:shadow-md hover:border-blue-200 transition">
              <span className="text-3xl">{template.icon}</span>
              <h3 className="font-semibold text-slate-900 mt-2 text-sm">{template.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{template.description}</p>
            </Link>
          ))}
        </div>

        {session && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Faturas recentes</h2>
              <Link href="/app/invoices" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver todas →
              </Link>
            </div>
            {userInvoices.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 divide-y divide-blue-50">
                {userInvoices.map((inv) => (
                  <div key={inv.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{TEMPLATES.find(t => t.id === inv.templateId)?.name || inv.templateId}</p>
                      <p className="text-xs text-slate-500">R$ {inv.amount} · {inv.status}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${inv.status === 'completed' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>
                        {inv.status}
                      </span>
                      <Link href={`/app/invoices/${inv.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
                        Ver →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8 text-center">
                <p className="text-slate-500 text-sm mb-4">Nenhuma fatura emitida ainda.</p>
                <Link href="/app/generate" className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition text-sm">
                  Emitir primeira fatura →
                </Link>
              </div>
            )}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
              <h3 className="font-semibold text-slate-900 mb-1">Precisa de mais faturas?</h3>
              <p className="text-slate-600 text-sm mb-4">Com o plano Individual (R$ 19/mês) você emite até 30 faturas por mês com histórico completo.</p>
              <Link href="/pricing" className="inline-block bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition text-sm">
                Ver planos →
              </Link>
            </div>
          </div>
        )}

        {!session && (
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-8 text-center">
            <h2 className="font-bold text-slate-900 mb-2">Cadastre-se para emitir suas faturas</h2>
            <p className="text-slate-600 text-sm mb-4">Cadastre-se para salvar suas faturas e acessar o histórico.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold px-6 py-2 rounded-lg hover:opacity-90">Cadastrar grátis</Link>
              <Link href="/login" className="border border-blue-200 text-blue-700 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50">Entrar</Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}