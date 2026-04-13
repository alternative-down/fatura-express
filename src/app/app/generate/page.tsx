'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { TEMPLATES, getTemplateById, renderInvoice } from '@/lib/templates';

function GenerateForm() {
  const params = useSearchParams();
  const templateId = params.get('template') || 'padrao';
  const template = getTemplateById(templateId) || TEMPLATES[0];

  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    template.fields.forEach(f => { initial[f.key] = ''; });
    return initial;
  });
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    const allFilled = template.fields.every(f => formData[f.key]?.trim());
    if (!allFilled) {
      alert('Preencha todos os campos obrigatórios antes de gerar.');
      return;
    }
    setGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(renderInvoice(template, formData));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/app" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium">
        ← Voltar
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8">
        <div className="text-center mb-8">
          <span className="text-4xl">{template.icon}</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-3">Modelo {template.name}</h1>
          <p className="text-slate-500 text-sm mt-1">{template.description}</p>
        </div>

        {!generated ? (
          <>
            <div className="space-y-4">
              {template.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={e => handleChange(field.key, e.target.value)}
                    className="w-full border border-blue-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleGenerate}
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition text-base"
            >
              Gerar Fatura →
            </button>
          </>
        ) : (
          <div>
            <div className="bg-slate-50 rounded-xl p-6 font-mono text-sm text-slate-700 whitespace-pre-wrap border border-slate-200 max-h-96 overflow-y-auto">
              {renderInvoice(template, formData)}
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleCopy} className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition">
                {copied ? '✅ Copiado!' : '📋 Copiar texto'}
              </button>
              <button onClick={() => setGenerated(false)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition">
                ✏️ Editar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white text-lg font-bold">F</div>
            <span className="font-bold text-slate-900 text-lg">Fatura Express</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Início</Link>
            <Link href="/app" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Painel</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-12">
        <Suspense fallback={<div className="text-center py-20 text-slate-500">Carregando...</div>}>
          <GenerateForm />
        </Suspense>
      </main>
    </div>
  );
}