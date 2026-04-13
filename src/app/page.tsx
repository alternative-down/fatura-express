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
            <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition text-lg">Emitir Fatura Grátis →
            </Link>
            <Link href="/login" className="text-slate-600 hover:text-blue-600 font-medium px-4 py-4 text-lg">
              Já tenho conta →
            </Link>
          </div>
          <p className="text-sm text-slate-500 mt-4">Sem cadastro. Sem cartão. Sua primeira fatura em 2 minutos.</p>
        </section>

        {/* Trust bar */}
        <section className="bg-white border-y border-blue-100 py-6">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
              {['✓ 100% Gratuito', '✓ PDF profissional', '✓ Campos fiscais incluídos', '✓ Sem cadastro', '✓ Válido para cliente empresarial'].map(t => (
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

        {/* Who is it for */}
        <section className="bg-white border-t border-blue-100 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Para quem é o Fatura Express?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '🏪', title: 'MEI que fatura para empresas', desc: 'Cliente grande não aceita \'recibo\'. Precisa de uma fatura com CNPJ e campos fiscais.' },
                { icon: '🤝', title: 'Prestador B2B', desc: 'Emite Nota Fiscal? A fatura cobre quando a NF-e não é obrigatória.' },
                { icon: '💡', title: 'Agências e consultorias', desc: 'Fatura de projeto para cliente empresarial — simples, rápido, profissional.' },
                { icon: '⚕️', title: 'Profissional liberal com CNPJ', desc: 'Médico, advogado, arquiteto — qualquer profissional com CNPJ que fatura para empresas.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border border-blue-100">
                  <span className="text-2xl flex-shrink-0">{icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                    <p className="text-sm text-slate-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Modelos disponíveis</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto">
            {TEMPLATES.map((template) => (
              <div key={template.id} className="bg-white rounded-xl shadow-sm border border-blue-100 p-5 text-center hover:shadow-md hover:border-blue-200 transition">
                <span className="text-3xl">{template.icon}</span>
                <h3 className="font-semibold text-slate-900 mt-2 text-sm">{template.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{template.description}</p>
                <Link href={`/app/generate?template=${template.id}`} className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700">
                  Usar →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border-t border-blue-100 py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Dúvidas frequentes</h2>
            <div className="space-y-6">
              {[
                { q: 'A fatura substitui a Nota Fiscal?', a: 'Não. A fatura é um documento comercial de cobrança, não um documento fiscal. Para atividades que exigem emissão de NF-e ou NFS-e, você ainda precisa da nota. A fatura cobre situações onde a NF-e não é obrigatória.' },
                { q: 'Meu cliente vai aceitar essa fatura?', a: 'A fatura emitida pelo Fatura Express tem todos os campos que um departamento financeiro empresarial precisa: CNPJ das duas partes, descrição do serviço, valores, data. Para a maioria dos clientes B2B de MEIs e autônomos, é mais do que suficiente.' },
                { q: 'É gratuito?', a: 'Sim. Você pode emitir até 3 faturas por mês sem pagar nada. Acima disso, escolha entre o plano Individual (R$ 19/mês, até 30 faturas) ou o plano Ilimitado (R$ 49/mês, faturas sem limite).' },
                { q: 'Preciso de CNPJ?', a: 'Sim. Para emitir uma fatura com campos empresariais, você precisa de CNPJ (MEI ou empresa).' },
                { q: 'Posso emitir fatura sem ser MEI?', a: 'Sim. Qualquer empresa ou profissional com CNPJ pode usar. É ideal para MEIs, mas também funciona para pequenas empresas (EPP, EIRELI, LTDA simplificado).' },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-blue-100 pb-6 last:border-0">
                  <p className="font-semibold text-slate-900 mb-2">{q}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Planos — Fatura Express</h2>
          <p className="text-center text-slate-600 mb-12">Gratuito para começar. Ilimitado quando você precisar. Cancele quando quiser. Sem taxa de cancelamento.</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLANS.map((plan) => (
              <div key={plan.id} className={`rounded-2xl p-8 ${plan.recommended ? 'bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-lg' : 'bg-white border border-blue-100 shadow-sm'}`}>
                {plan.recommended && <span className="text-xs font-bold text-blue-100 bg-white/20 px-3 py-1 rounded-full">Recomendado</span>}
                <h3 className={`text-xl font-bold mt-3 mb-1 ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <div className="mb-4">
                  <span className={`text-3xl font-bold ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price === 0 ? 'Grátis' : `R$ ${plan.price}`}
                  </span>
                  {plan.price > 0 && <span className={`text-sm ${plan.recommended ? 'text-blue-100' : 'text-slate-500'}`}>/mês</span>}
                </div>
                {plan.invoicesPerMonth === Infinity ? (
                  <p className={`text-sm mb-4 ${plan.recommended ? 'text-blue-100' : 'text-slate-500'}`}>Faturas ilimitadas</p>
                ) : plan.invoicesPerMonth > 0 ? (
                  <p className={`text-sm mb-4 ${plan.recommended ? 'text-blue-100' : 'text-slate-500'}`}>Até {plan.invoicesPerMonth} faturas/mês</p>
                ) : null}
                <ul className="space-y-2 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${plan.recommended ? 'text-blue-50' : 'text-slate-600'}`}>
                      <span>✅</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.id === "free" ? "/signup" : plan.id === "individual" ? "/checkout?plan=individual" : "/checkout?plan=ilimitado"} className={`block text-center py-3 rounded-xl font-semibold transition ${plan.recommended ? 'bg-white text-blue-600 hover:opacity-90' : 'bg-blue-600 text-white hover:opacity-90'}`}>
                  {plan.price === 0 ? 'Começar grátis →' : 'Assinar →'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-500 py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Emita sua primeira fatura profissional agora</h2>
          <Link href="/signup" className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:opacity-90 text-lg mt-4">Emitir Fatura Grátis →
          </Link>
          <p className="text-blue-100 mt-4 text-sm">Não precisa de cadastro. Não precisa de cartão. Campos fiscais completos.</p>
        </section>

        {/* Footer */}
        <footer className="border-t border-blue-100 py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© 2026 Fatura Express · Alternative Down</p>
            <div className="flex items-center gap-6">
              <Link href="/support" className="text-sm text-slate-500 hover:text-blue-600">Suporte</Link>
              <Link href="#pricing" className="text-sm text-slate-500 hover:text-blue-600">Preços</Link>
              <Link href="#features" className="text-sm text-slate-500 hover:text-blue-600">Recursos</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}