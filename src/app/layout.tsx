import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fatura Profissional Online | Em 2 Minutos | Alternative Down",
  description: "Emita faturas profissionais com campos fiscais completos em minutos. Ideal para MEIs e pequenos negócios. A partir de R$ 19/mês.",
  alternates: {
    canonical: "https://fatura.alternativedown.com.br",
  },
  openGraph: {
    title: "Fatura Express — Faturas profissionais em 2 minutos",
    description: "Emita faturas profissionais com campos fiscais completos. A partir de R$ 19/mês. Sem complicação.",
    url: "https://fatura.alternativedown.com.br",
    siteName: "Fatura Express",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Fatura Express" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fatura Express — Faturas profissionais em 2 minutos",
    description: "Emita faturas profissionais com campos fiscais completos. A partir de R$ 19/mês.",
  },
  robots: { index: true, follow: true },
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Fatura Express",
        description: "Emita faturas profissionais com campos fiscais completos em minutos. Ideal para MEIs e pequenos negócios.",
        url: "https://fatura.alternativedown.com.br",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "19",
          priceCurrency: "BRL",
          description: "A partir de R$ 19/mês — até 30 faturas",
        },
        provider: {
          "@type": "Organization",
          name: "Alternative Down",
          url: "https://alternativedown.com.br",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "A fatura tem valor fiscal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. Uma fatura com os dados fiscais completos — CNPJ das partes, descrição, valores, alíquotas — tem valor fiscal para fins de comprovação comercial.",
            },
          },
          {
            "@type": "Question",
            name: "Preciso ter CNPJ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. A Fatura Express requer CNPJ do emitente (MEI ou empresa). Para autônomos sem CNPJ, use Recibo Express.",
            },
          },
          {
            "@type": "Question",
            name: "É gratuito?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "O plano Individual (R$ 19/mês) dá até 30 faturas por mês. O plano Ilimitado (R$ 49/mês) remove o limite.",
            },
          },
          {
            "@type": "Question",
            name: "Posso emitir nota fiscal com isso?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Não. A Fatura Express emite documentos com valor comercial. Para NF-e oficial, use um emissor da Receita Federal.",
            },
          },
          {
            "@type": "Question",
            name: "Como envio para o cliente?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Você baixa o PDF e envia por e-mail ou qualquer meio que preferir.",
            },
          },
        ],
      },
    ]),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
