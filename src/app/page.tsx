import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white text-lg">
              📄
            </div>
            <span className="font-bold text-slate-900 text-lg">Fatura Express</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Preços</Link>
            <Link href="/login" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Entrar</Link>
            <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 text-sm">Cadastrar</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          {/* Badge row */}
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">2 minutos</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">PDF fiscal</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Sem complicação</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Fatura Profissional para o Pequeno Empresário.<br />Sem bureaucracy.
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Preencha os dados, baixe o PDF. Uma fatura com valor fiscal, em 2 minutos — sem contador, sem planilha, sem complicação.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition text-lg">
              Criar minha fatura →
            </Link>
            <Link href="/login" className="text-slate-600 hover:text-blue-600 font-medium px-4 py-4 text-lg">
              Já tem conta? Fazer login →
            </Link>
          </div>
        </section>

        {/* Social proof row */}
        <section className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {[
              "✓ 100% online",
              "✓ PDF fiscal",
              "✓ Sem complicação",
              "✓ PDF em 2 minutos",
              "✓ Cálculo automático de impostos",
            ].map((badge) => (
              <span key={badge} className="text-sm font-medium text-slate-600">{badge}</span>
            ))}
          </div>
        </section>

        {/* Problema → Solução */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Chega de tabela no Excel para emitir faturas
          </h2>
          <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6 bg-slate-50">
                <p className="text-xs font-bold text-slate-500 uppercase mb-4">Problema</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <p className="text-sm text-slate-600">Planilha dá trabalho e parece amador</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <p className="text-sm text-slate-600">Dúvida sobre campos fiscais</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <p className="text-sm text-slate-600">Cliente pede &quot;algo mais formal&quot;</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-blue-600 uppercase mb-4">Solução</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <p className="text-sm text-slate-600">PDF profissional em 2 minutos</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <p className="text-sm text-slate-600">Campos validados automaticamente</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <p className="text-sm text-slate-600">Fatura com todos os campos que o fisco reconhece</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-12 text-center">
            Tudo que uma fatura profissional precisa ter
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🗂️",
                title: "Campos fiscais completos",
                desc: "CNPJ, NF-e, valores, alíquotas — preenchimento guiado."
              },
              {
                icon: "🧮",
                title: "Cálculo automático",
                desc: "O sistema calcula impostos e totais. Você preenche o mínimo."
              },
              {
                icon: "📥",
                title: "PDF imediato",
                desc: "Baixe em PDF fiscal. Envie por e-mail ou salve no celular."
              },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-blue-100 p-6 text-left">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-bold text-slate-900 mt-3 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-12 text-center">Como funciona</h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Preencha os dados da venda",
                desc: "Produto, quantidade, valor, impostos — campos guiados."
              },
              {
                step: "2",
                title: "Revise os totais",
                desc: "O sistema calcula automaticamente. Você aprova."
              },
              {
                step: "3",
                title: "Baixe e envie",
                desc: "PDF fiscal imediato. Envie por e-mail ou como preferir."
              },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4 bg-white rounded-xl border border-blue-100 p-6">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-slate-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social proof */}
        <section className="max-w-4xl mx-auto px-6 py-12 text-center">
          <p className="text-slate-500 text-sm">
            Feito para pequenos empreendedores e PMEs brasileiras.
          </p>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Dúvidas frequentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "A fatura tem valor fiscal?",
                a: "Sim. Uma fatura com os dados fiscais completos — CNPJ das partes, descrição, valores, alíquotas — tem valor fiscal para fins de comprovação comercial."
              },
              {
                q: "Preciso ter CNPJ?",
                a: "Sim. A Fatura Express requer CNPJ do emitente (MEI ou empresa). Para autônomos sem CNPJ, use Recibo Express."
              },
              {
                q: "É gratuito?",
                a: "Não. O plano Individual (R$ 19/mês) dá até 30 faturas por mês. O plano Ilimitado (R$ 49/mês) remove o limite."
              },
              {
                q: "Posso emitir nota fiscal com isso?",
                a: "Não. A Fatura Express emite documentos com valor comercial. Para NF-e oficial, use um emissor da Receita Federal."
              },
              {
                q: "Como envio para o cliente?",
                a: "Você baixa o PDF e envia por e-mail ou qualquer meio que preferir."
              },
            ].map((item, i) => (
              <details key={i} className="bg-white rounded-xl border border-blue-100 group">
                <summary className="p-5 font-semibold text-slate-900 cursor-pointer hover:text-blue-600 list-none flex items-center justify-between">
                  {item.q}
                  <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 text-sm">{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Emita sua primeira fatura profissional agora
          </h2>
          <p className="text-slate-500 mb-8 text-sm">2 minutos. Campos fiscais completos. PDF imediato.</p>
          <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition text-lg inline-block">
            Criar minha fatura →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-100 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} Fatura Express — Alternative Down
        </div>
      </footer>
    </div>
  );
}

export const metadata = {
  title: "Fatura Profissional Online | Em 2 Minutos | Alternative Down",
  description: "Gere faturas profissionais com valor fiscal em 2 minutos. Campos guiados, cálculo automático, PDF imediato. A partir de R$ 19/mês.",
};