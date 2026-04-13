import Link from "next/link";
import { PLANS } from "@/lib/plans";

export const metadata = {
  title: "Fatura Profissional Online | Em 2 Minutos | Alternative Down",
  description:
    "Gere faturas profissionais com valor fiscal em 2 minutos. Campos guiados, cálculo automático, PDF imediato. A partir de R$ 19/mês.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white text-lg font-bold">F</div>
            <span className="font-bold text-slate-900 text-lg">Fatura Express</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="#como-funciona" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Como funciona</Link>
            <Link href="#features" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Recursos</Link>
            <Link href="#pricing" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Preços</Link>
            <Link href="/login" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Entrar</Link>
            <Link
              href="/checkout?plan=individual"
              className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 text-sm"
            >
              Criar fatura →
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          {/* Badge row */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["2 minutos", "PDF fiscal", "Sem complicação"].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 font-medium text-sm px-4 py-1.5 rounded-full border border-blue-100"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {badge}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Fatura Profissional para o Pequeno Empresário.
            <br />
            <span className="text-blue-600">Sem burocracia.</span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Preencha os dados, baixe o PDF. Uma fatura com valor fiscal, em 2 minutos — sem contador, sem planilha, sem complicação.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/checkout?plan=individual"
              className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:opacity-90 transition text-lg"
            >
              Criar minha fatura →
            </Link>
            <Link
              href="/login"
              className="text-slate-600 hover:text-blue-600 font-medium px-4 py-4 text-lg"
            >
              Já tem conta? Fazer login →
            </Link>
          </div>
        </section>

        {/* Social proof row */}
        <section className="bg-white border-y border-blue-100 py-6">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 font-medium">
              {[
                "✓ 100% online",
                "✓ PDF fiscal",
                "✓ Sem complicação",
                "✓ Sem cadastro obrigatório",
                "✓ Cálculo automático de impostos",
              ].map((t) => (
                <span key={t} className="text-blue-700">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Problema → Solução */}
        <section className="bg-slate-50 border-b border-blue-100 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              Chega de tabela no Excel para emitir faturas
            </h2>
            <div className="overflow-hidden rounded-xl border border-blue-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="text-left px-6 py-4 font-semibold text-sm w-1/2">Problema</th>
                    <th className="text-left px-6 py-4 font-semibold text-sm w-1/2">Solução</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {[
                    {
                      problema: "Planilha dá trabalho e parece amador",
                      solucao: "PDF profissional em 2 minutos",
                    },
                    {
                      problema: "Dúvida sobre campos fiscais",
                      solucao: "Campos validados automaticamente",
                    },
                    {
                      problema: "Cliente pede \"algo mais formal\"",
                      solucao: "Fatura com todos os campos que o fisco reconhece",
                    },
                  ].map(({ problema, solucao }, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 text-slate-600 text-sm">{problema}</td>
                      <td className="px-6 py-4 text-slate-900 font-medium text-sm">{solucao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Tudo que uma fatura profissional precisa ter
          </h2>
          <p className="text-slate-600 text-center mb-14 max-w-xl mx-auto">
            Sem complicação. Sem contador. Sem Word.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Campos fiscais completos",
                desc: "CNPJ, NF-e, valores, alíquotas — preenchimento guiado.",
                icon: (
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
              },
              {
                title: "Cálculo automático",
                desc: "O sistema calcula impostos e totais. Você preenche o mínimo.",
                icon: (
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>
                ),
              },
              {
                title: "PDF imediato",
                desc: "Baixe em PDF fiscal. Envie por e-mail ou salve no celular.",
                icon: (
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8 text-center">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-5">
                  {icon}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="bg-white border-t border-b border-blue-100 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Como funciona
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  step: "1",
                  title: "Preencha os dados da venda",
                  desc: "Produto, quantidade, valor, impostos — campos guiados.",
                },
                {
                  step: "2",
                  title: "Revise os totais",
                  desc: "O sistema calcula automaticamente. Você aprova.",
                },
                {
                  step: "3",
                  title: "Baixe e envie",
                  desc: "PDF fiscal imediato. Envie por e-mail ou como preferir.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 font-bold text-xl flex items-center justify-center mx-auto mb-5">
                    {step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof — static badge */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-500 py-16 text-center">
          <p className="text-white text-lg font-medium max-w-2xl mx-auto px-6">
            Feito para pequenos empreendedores e PMEs brasileiras.
          </p>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "A fatura tem valor fiscal?",
                a: "Sim. Uma fatura com os dados fiscais completos — CNPJ das partes, descrição, valores, alíquotas — tem valor fiscal para fins de comprovação comercial.",
              },
              {
                q: "Preciso ter CNPJ?",
                a: "Sim. A Fatura Express requer CNPJ do emissente (MEI ou empresa). Para autônomos sem CNPJ, use Recibo Express.",
              },
              {
                q: "É gratuito?",
                a: "Não. O plano Individual (R$ 19/mês) dá até 30 faturas por mês. O plano Ilimitado (R$ 49/mês) remove o limite.",
              },
              {
                q: "Posso emitir nota fiscal com isso?",
                a: "Não. A Fatura Express emite documentos com valor comercial. Para NF-e oficial, use um emissor da Receita Federal.",
              },
              {
                q: "Como envio para o cliente?",
                a: "Você baixa o PDF e envia por e-mail ou qualquer meio que preferir.",
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group bg-white rounded-xl border border-blue-100 open:border-blue-300"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-slate-900 list-none">
                  <span>{q}</span>
                  <span className="text-blue-500 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Pricing section */}
        <section id="pricing" className="max-w-4xl mx-auto px-6 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Planos — Fatura Express</h2>
            <p className="text-slate-600">
              Fatura profissional com valor fiscal. A partir de R$ 19/mês.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {PLANS.map((plan) => {
              const ctaHref =
                plan.id === "individual"
                  ? "/checkout?plan=individual"
                  : "/checkout?plan=ilimitado";

              return (
                <div
                  key={plan.id}
                  className={
                    plan.recommended
                      ? "relative rounded-2xl p-8 flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 shadow-md"
                      : "rounded-2xl p-8 flex flex-col bg-white border border-blue-200"
                  }
                >
                  {plan.recommended && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Mais popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <div className="mb-1">
                    <span className="text-3xl font-bold text-slate-900">R$ {plan.price}</span>
                    <span className="text-slate-500">/mês</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">
                    {plan.invoicesPerMonth === Infinity
                      ? "Faturas ilimitadas"
                      : `Até ${plan.invoicesPerMonth} faturas por mês`}
                  </p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={ctaHref}
                    className={
                      plan.recommended
                        ? "block text-center py-3 rounded-xl font-semibold transition bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:opacity-90"
                        : "block text-center py-3 rounded-xl font-semibold transition bg-blue-600 text-white hover:opacity-90"
                    }
                  >
                    Assinar {plan.name} →
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            Cancele quando quiser. Sem taxa de cancelamento.
          </p>
        </section>

        {/* Final CTA */}
        <section className="bg-white border-t border-blue-100 py-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Emita sua primeira fatura profissional agora
            </h2>
            <p className="text-slate-600 mb-8 text-lg">
              2 minutos. Campos fiscais completos. PDF imediato.
            </p>
            <Link
              href="/checkout?plan=individual"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:opacity-90 transition text-lg"
            >
              Criar minha fatura →
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">F</div>
            <span className="font-bold text-white text-sm">Fatura Express</span>
          </div>
          <p className="text-sm">© 2026 Alternative Down. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
