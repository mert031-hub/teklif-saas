import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TeklifAI — Giriş",
  description: "TeklifAI hesabınıza giriş yapın.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
