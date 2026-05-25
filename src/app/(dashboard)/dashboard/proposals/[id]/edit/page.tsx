// src/app/(dashboard)/dashboard/proposals/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProposalsClient } from "@/components/dashboard/ProposalsClient";
import type { Proposal } from "@/types";

export default async function ProposalsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("agency_id")
    .eq("id", user.id)
    .single();

  if (!profile?.agency_id) redirect("/onboarding");

  const { data: proposals } = await supabase
    .from("proposals")
    .select("*")
    .eq("agency_id", profile.agency_id)
    .order("created_at", { ascending: false });

  return <ProposalsClient proposals={(proposals ?? []) as Proposal[]} />;
}
