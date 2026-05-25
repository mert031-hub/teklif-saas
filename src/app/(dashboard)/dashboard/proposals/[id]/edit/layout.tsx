// src/app/(dashboard)/dashboard/proposals/[id]/edit/layout.tsx
// Overrides dashboard layout — no sidebar, full screen for builder
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return <div style={{ height: "100svh", overflow: "hidden" }}>{children}</div>;
}
