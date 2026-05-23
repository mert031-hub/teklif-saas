import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TeklifAI — Turizm Acenteleri için Akıllı Teklif Platformu",
  description:
    "Müşterilerinizi büyüleyen interaktif seyahat teklifleri oluşturun. Takip edin, analiz edin, satışa dönüştürün.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
