import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fatura Profissional Grátis | Fatura Express — Alternative Down",
  description: "Emita faturas profissionais com campos fiscais completos em minutos. Gratuito para até 3 faturas/mês. Ideal para MEIs e pequenos negócios.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
