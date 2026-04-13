import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl mx-auto mb-4">📋</div>
          <h1 className="text-2xl font-bold text-slate-900">Cadastrar na Fatura Express</h1>
          <p className="text-slate-500 mt-1">Crie sua conta e gere sua primeira fatura</p>
        </div>
        <div className="bg-white rounded-2xl border border-blue-100 p-8 text-center">
          <p className="text-slate-600 text-sm mb-6">O cadastro será ativado em breve. Acesse /login para entrar ou aguarde a próxima atualização.</p>
          <Link href="/" className="text-blue-600 hover:underline font-medium">← Voltar para home</Link>
        </div>
      </div>
    </div>
  );
}
