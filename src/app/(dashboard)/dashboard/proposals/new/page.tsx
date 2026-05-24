// /dashboard/proposals/new
// Server component fetches agency_id, passes to client form

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NewProposalForm } from "@/components/dashboard/NewProposalForm";

export default async function NewProposalPage() {
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

  return <NewProposalForm agencyId={profile.agency_id} userId={user.id} />;
}
