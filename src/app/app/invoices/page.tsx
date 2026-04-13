'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Invoice {
  id: string;
  templateId: string;
  planType: string;
  status: string;
  amount: number;
  createdAt: string;
  data?: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/invoices')
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          if (data.error === 'Não autenticado') {
            window.location.href = '/login';
            return;
          }
          setError(data.error);
        } else {
          setInvoices(data.invoices || []);
        }
      })
      .catch(() => setError('Erro ao carregar faturas'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-blue-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">F</div>
            <span className="font-bold text-slate-900">Fatura Express</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/app" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Painel</Link>
            <Link href="/app/generate" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              + Nova Fatura
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Minhas Faturas</h1>
          <Link href="/app/generate" className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition text-sm">
            + Emitir Nova Fatura
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {invoices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Nenhuma fatura emitida</h2>
            <p className="text-slate-500 mb-6">Comece agora e emita sua primeira fatura profissional.</p>
            <Link href="/app/generate" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition">
              Emitir primeira fatura →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Número</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cliente</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((invoice) => {
                  const data = invoice.data ? JSON.parse(invoice.data) : {};
                  return (
                    <tr key={invoice.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900 text-sm">
                        {data.invoiceNumber || invoice.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {data.clientName || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {data.issueDate || new Date(invoice.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">
                        R$ {invoice.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          invoice.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : invoice.status === 'paid'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {invoice.status === 'completed' ? 'Completa' : invoice.status === 'paid' ? 'Paga' : 'Rascunho'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/app/invoices/${invoice.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Ver →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
