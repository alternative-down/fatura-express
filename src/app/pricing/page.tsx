import Link from "next/link";

const PLANS = [
  {
    id: "individual",
    name: "Individual",
    price: 19,
    tagline: "Para quem emite até 30 faturas por mês.",
    features: [
      "Até 30 faturas por mês",
      "Campos fiscais completos",
      "Download em PDF",
      "Cálculo automático de impostos",
      "Histórico completo",
      "Novos campos a cada atualização",
    ],
    highlighted: true,
    cta: "Começar com Individual",
  },
  {
    id: "ilimitado",
    name: "Ilimitado",
    price: 49,
    tagline: "Para quem emite faturas com frequência.",
    features: [
      "Faturas ilimitadas",
      "Campos fiscais completos",
      "Download em PDF",
      "Cálculo automático de impostos",
      "Histórico completo",
      "Modelos personalizados",
      "Prioridade no suporte",
      "Novos campos a cada atualização",
    ],
    highlighted: false,
    cta: "Começar com Ilimitado",
  },
];

export default function PricingPage() {
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
            <Link href="/login" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Entrar</Link>
            <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 text-sm">Cadastrar</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Planos — Fatura Express</h1>
          <p className="text-lg text-slate-600">Fatura profissional com valor fiscal. A partir de R$ 19/mês.</p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-8 flex flex-col ${
                plan.highlighted
                  ? "border-blue-300 bg-white shadow-lg ring-2 ring-blue-500"
                  : "border-blue-100 bg-white"
              }`}
            >
              {plan.highlighted && (
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                  Mais popular
                </span>
              )}
              <h2 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h2>
              <div className="mb-2">
                <span className="text-3xl font-bold text-slate-900">R$ {plan.price}</span>
                <span className="text-slate-500 text-sm">/mês</span>
              </div>
              <p className="text-sm text-slate-600 mb-6">{plan.tagline}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/checkout?plan=${plan.id}`}
                className={`font-semibold px-6 py-3 rounded-xl text-center transition ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:opacity-90"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Microcopy */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Cancele quando quiser. Sem taxa de cancelamento.
        </p>

        {/* CTA below pricing */}
        <div className="text-center mt-16">
          <p className="text-slate-500 text-sm mb-4"> Ainda não tem certeza?</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            ← Voltar para a home
          </Link>
        </div>
      </main>

      <footer className="border-t border-blue-100 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} Fatura Express — Alternative Down
        </div>
      </footer>
    </div>
  );
}

export const metadata = {
  title: "Planos — Fatura Express",
  description: "Fatura profissional com valor fiscal. Planos a partir de R$ 19/mês.",
};