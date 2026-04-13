'use client';
import { useEffect, useState, use } from 'react';
import Link from 'next/link';

interface InvoiceData {
  id: string;
  templateId: string;
  planType: string;
  status: string;
  amount: number;
  createdAt: string;
  data?: string;
}

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/invoices')
      .then(r => r.json())
      .then(data => {
        if (data.error === 'Não autenticado') {
          window.location.href = '/login';
          return;
        }
        if (data.error) {
          setError(data.error);
        } else {
          const found = (data.invoices || []).find((inv: InvoiceData) => inv.id === id);
          if (!found) {
            setError('Fatura não encontrada');
          } else {
            setInvoice(found);
          }
        }
      })
      .catch(() => setError('Erro ao carregar fatura'))
      .finally(() => setLoading(false));
  }, [id]);

  function downloadPdf() {
    window.open(`/api/invoices/${id}/pdf`, '_blank');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">{error || 'Fatura não encontrada'}</p>
          <Link href="/app/invoices" className="text-blue-600 hover:underline">Voltar às faturas</Link>
        </div>
      </div>
    );
  }

  const data = invoice.data ? JSON.parse(invoice.data) : {};
  const subtotal = parseFloat(String(invoice.amount)) || 0;
  const tax = subtotal * 0.1;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/app/invoices" className="text-slate-500 hover:text-slate-700 text-sm">
              ← Voltar
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">F</div>
              <span className="font-bold text-slate-900">Fatura Express</span>
            </Link>
          </div>
          <button
            onClick={downloadPdf}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            📥 Baixar PDF
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Invoice Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 px-8 py-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-wide mb-1">FATURA</h1>
                <p className="text-blue-100 text-sm">Documento fiscal — Alternative Down</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-100">Nº</div>
                <div className="text-xl font-bold">{data.invoiceNumber || invoice.id.slice(0, 8)}</div>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="px-8 py-5 border-b border-slate-100 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Data de Emissão</div>
              <div className="text-sm font-semibold text-slate-900">{data.issueDate || '—'}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Data de Vencimento</div>
              <div className="text-sm font-semibold text-slate-900">{data.dueDate || '—'}</div>
            </div>
          </div>

          {/* Parties */}
          <div className="px-8 py-5 border-b border-slate-100 grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-blue-600 uppercase tracking-wider font-bold mb-3">Emitente</div>
              <div className="font-semibold text-slate-900 mb-1">{data.issuerName || '—'}</div>
              <div className="text-sm text-slate-600 space-y-0.5">
                <div>CNPJ: {data.issuerCNPJ || '—'}</div>
                {data.issuerIE && <div>IE: {data.issuerIE}</div>}
                <div>{data.issuerAddress || '—'}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-blue-600 uppercase tracking-wider font-bold mb-3">Cliente</div>
              <div className="font-semibold text-slate-900 mb-1">{data.clientName || '—'}</div>
              <div className="text-sm text-slate-600 space-y-0.5">
                <div>CNPJ: {data.clientCNPJ || '—'}</div>
                <div>{data.clientAddress || '—'}</div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="px-8 py-5 border-b border-slate-100">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <th className="pb-2 text-left font-semibold">Descrição</th>
                  <th className="pb-2 text-center font-semibold w-16">Qtd</th>
                  <th className="pb-2 text-right font-semibold w-28">Valor Unit.</th>
                  <th className="pb-2 text-right font-semibold w-28">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 text-sm text-slate-700">{data.description || '—'}</td>
                  <td className="py-3 text-sm text-slate-700 text-center">{data.quantity || '1'}</td>
                  <td className="py-3 text-sm text-slate-700 text-right">{data.unitPrice || '—'}</td>
                  <td className="py-3 text-sm font-semibold text-slate-900 text-right">{data.totalPrice || `R$ ${subtotal.toFixed(2)}`}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="px-8 py-5 border-b border-slate-100 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Impostos (10%)</span>
                <span>R$ {tax.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-blue-600 border-t border-blue-200 pt-2 mt-1">
                <span>Total</span>
                <span>R$ {(subtotal + tax).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Payment method */}
          {data.paymentMethod && (
            <div className="px-8 py-4 border-b border-slate-100">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Forma de Pagamento</div>
              <div className="text-sm text-slate-700">{data.paymentMethod}</div>
            </div>
          )}

          {/* Footer */}
          <div className="px-8 py-6 bg-slate-50 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Emitida em {new Date(invoice.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </div>
            <button
              onClick={downloadPdf}
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
            >
              📥 Baixar como PDF
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
