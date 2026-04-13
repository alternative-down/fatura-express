import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="border-b border-blue-100 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-sm">F</div>
            <span className="font-bold text-slate-900">Fatura Express</span>
          </Link>
          <Link href="/login" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Entrar</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Planos — Fatura Express</h1>
          <p className="text-xl text-slate-600">Gratuito para começar. Ilimitado quando você precisar.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Grátis */}
          <div className="bg-white rounded-2xl border border-blue-200 p-8 flex flex-col">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Grátis</h2>
            <p className="text-slate-500 text-sm mb-4">Para quem emite poucas faturas por mês.</p>
            <div className="mb-2">
              <span className="text-4xl font-bold text-slate-900">R$ 0</span>
              <span className="text-slate-500">/mês</span>
            </div>
            <p className="text-sm text-slate-500 mb-4">3 faturas por mês</p>
            <ul className="space-y-3 mb-8 text-sm text-slate-600 flex-1">
              {["3 faturas por mês", "Todos os campos fiscais", "Download em PDF", "Sem cadastro obrigatório"].map(f => (
                <li key={f} className="flex items-start gap-2"><span className="text-green-500">✓</span> {f}</li>
              ))}
            </ul>
            <Link href="/app" className="block w-full py-3 text-center bg-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition">Começar Grátis →</Link>
          </div>

          {/* Individual */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-400 p-8 flex flex-col relative shadow-md">
            <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Recomendado</span>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Individual</h2>
            <p className="text-slate-500 text-sm mb-4">Para o profissional que fatura com frequência.</p>
            <div className="mb-2">
              <span className="text-4xl font-bold text-slate-900">R$ 19</span>
              <span className="text-slate-500">/mês</span>
            </div>
            <p className="text-sm text-slate-500 mb-4">Até 30 faturas por mês</p>
            <ul className="space-y-3 mb-8 text-sm text-slate-600 flex-1">
              {["30 faturas por mês", "Todos os campos fiscais", "Download em PDF", "Histórico completo", "Cálculo automático de impostos"].map(f => (
                <li key={f} className="flex items-start gap-2"><span className="text-green-500">✓</span> {f}</li>
              ))}
            </ul>
            <Link href="/checkout?plan=individual" className="block w-full py-3 text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition">Assinar Individual →</Link>
          </div>

          {/* Ilimitado */}
          <div className="bg-white rounded-2xl border border-blue-200 p-8 flex flex-col">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Ilimitado</h2>
            <p className="text-slate-500 text-sm mb-4">Para quem não quer pensar em limites.</p>
            <div className="mb-2">
              <span className="text-4xl font-bold text-slate-900">R$ 49</span>
              <span className="text-slate-500">/mês</span>
            </div>
            <p className="text-sm text-slate-500 mb-4">Faturas ilimitadas</p>
            <ul className="space-y-3 mb-8 text-sm text-slate-600 flex-1">
              {["Faturas ilimitadas", "Todos os campos fiscais", "Download em PDF", "Histórico completo", "Cálculo automático de impostos", "Modelos personalizados", "Prioridade no suporte"].map(f => (
                <li key={f} className="flex items-start gap-2"><span className="text-green-500">✓</span> {f}</li>
              ))}
            </ul>
            <Link href="/checkout?plan=ilimitado" className="block w-full py-3 text-center bg-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition">Assinar Ilimitado →</Link>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">Cancele quando quiser. Sem taxa de cancelamento.</p>
      </main>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Dúvidas frequentes</h2>
        <div className="space-y-4">
          {[
            { q: "Posso cancelar a qualquer momento?", a: "Sim. Cancele quando quiser, sem taxa de cancelamento." },
            { q: "O plano Individual renova automaticamente?", a: "Sim. A renovação é automática todo mês. Você pode cancelar a qualquer momento pelo painel da sua conta." },
            { q: "A fatura substitui a Nota Fiscal?", a: "Não. A fatura é um documento comercial de cobrança, não um documento fiscal. Para atividades que exigem emissão de NF-e ou NFS-e, você ainda precisa da nota." },
            { q: "Posso emitir fatura sem ser MEI?", a: "Sim. Qualquer empresa ou profissional com CNPJ pode usar." },
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-blue-100 p-5 text-left">
              <p className="font-semibold text-slate-900 mb-2">{faq.q}</p>
              <p className="text-slate-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
