import Link from "next/link";
import { PLANS } from "@/lib/plans";
import { TEMPLATES } from "@/lib/templates";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
            <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 text-sm">Emitir fatura →
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
          <span className="inline-block bg-blue-50 text-blue-700 font-medium text-sm px-4 py-1.5 rounded-full mb-6 border border-blue-100">
            Para empresas e profissionais com CNPJ
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Fatura Profissional Para Qualquer Cliente Empresarial
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Você emite fatura em minutos — com todos os campos que o contador do seu cliente precisa. Sem Word, sem complicação.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition text-lg">Emitir Minha Primeira Fatura →
            </Link>
            <Link href="/login" className="text-slate-600 hover:text-blue-600 font-medium px-4 py-4 text-lg">
              Já tenho conta →
            </Link>
          </div>
          <p className="text-sm text-slate-500 mt-4">Sua primeira fatura em 2 minutos.</p>
        </section>

        {/* Trust bar */}
        <section className="bg-white border-y border-blue-100 py-6">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
              {['✓ PDF profissional', '✓ Campos fiscais incluídos', '✓ Cálculo automático', '✓ Histórico completo'].map(t => (
                <span key={t} className="text-blue-700">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="como-funciona" className="bg-white border-t border-blue-100 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Como funciona</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Dados do emissor e cliente', desc: 'CNPJ, razão social, endereço. Tudo que uma fatura precisa ter.' },
                { step: '2', title: 'Preencha os itens', desc: 'Descrição do serviço, quantidade, valor. A conta sai automaticamente.' },
                { step: '3', title: 'Baixe e envie', desc: 'PDF pronto para mandar por e-mail ao cliente.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 font-bold text-xl flex items-center justify-center mx-auto mb-4">{step}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                  <p className="text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-500 py-16 text-center">
          <p className="text-white text-lg font-medium max-w-2xl mx-auto px-6">
            Milhares de pequenos negócios já emitiram suas faturas com o Alternative Down.
          </p>
        </section>

        {/* Features */}
        <section id="features" className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Uma fatura de verdade — não um template</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📋', title: 'Campos fiscais completos', desc: 'CNPJ, IE, razão social, endereço completo, dados do cliente, descrição, valores, impostos' },
              { icon: '🧮', title: 'Cálculo automático', desc: 'Subtotal, impostos, total. Não precisa fazer conta na mão.' },
              { icon: '📥', title: 'PDF profissional', desc: 'Download imediato — formato válido para contabilidade' },
              { icon: '📂', title: 'Histórico', desc: 'Acesse todas as faturas que você já emitiu' },
              { icon: '💼', title: 'Modelo empresarial', desc: 'Visual profissional — não parece \'feito no Word\'' },
              { icon: '📧', title: 'Compartilhar', desc: 'Envie por e-mail ou link direto' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <span className="text-2xl mb-3 block">{icon}</span>
                <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Plans */}
        <section id="pricing" className="max-w-4xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Escolha seu plano</h2>
          <p className="text-center text-slate-600 mb-12">Plano para cada tamanho de operação.</p>
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
                      ? "relative rounded-2xl p-8 flex flex-col bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-400 shadow-md"
                      : "rounded-2xl p-8 flex flex-col bg-white border border-blue-200"
                  }
                >
                  {plan.recommended && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Recomendado
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
                  <Link
                    href={ctaHref}
                    className={
                      plan.recommended
                        ? "block text-center py-3 rounded-xl font-semibold transition bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90"
                        : "block text-center py-3 rounded-xl font-semibold transition bg-blue-600 text-white hover:opacity-90"
                    }
                  >
                    Assinar {plan.name} →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-white border-t border-blue-100 py-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pronto para emitir sua fatura?</h2>
            <p className="text-slate-600 mb-8 text-lg">Cadastre-se e tenha sua primeira fatura pronta em minutos.</p>
            <Link href="/signup" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition text-lg">Começar Agora →
            </Link>
          </div>
        </section>
      </main>

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
