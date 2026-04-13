import Link from "next/link";
import { PLANS } from "@/lib/plans";

export const metadata = {
  title: "Planos Fatura Express — R$ 19/mês | Alternative Down",
  description:
    "Escolha o plano ideal para emitir faturas profissionais. Individual R$ 19/mês ou Ilimitado R$ 49/mês.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="border-b border-blue-100 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">F</div>
            <span className="font-bold text-slate-900">Fatura Express</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Início</Link>
            <Link href="/login" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Entrar</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Planos — Fatura Express</h1>
          <p className="text-xl text-slate-600">
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
                <h2 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h2>
                <p className="text-slate-500 text-sm mb-4">
                  {plan.id === "individual"
                    ? "Para quem emite até 30 faturas por mês."
                    : "Para quem emite faturas com frequência."}
                </p>

                <div className="mb-2">
                  <span className="text-4xl font-bold text-slate-900">R$ {plan.price}</span>
                  <span className="text-slate-500">/mês</span>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  {plan.invoicesPerMonth === Infinity
                    ? "Faturas ilimitadas"
                    : `Até ${plan.invoicesPerMonth} faturas por mês`}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={ctaHref}
                  className={
                    plan.recommended
                      ? "block w-full py-3 text-center font-semibold rounded-xl transition bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:opacity-90"
                      : "block w-full py-3 text-center font-semibold rounded-xl transition bg-blue-600 text-white hover:opacity-90"
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
      </main>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
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
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="current-color">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

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
