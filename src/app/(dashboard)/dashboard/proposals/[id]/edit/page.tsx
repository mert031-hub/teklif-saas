import { createClient } from "@/lib/supabase/server";
import { ProposalsClient } from "@/components/dashboard/ProposalsClient";

export default async function ProposalsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("agency_id")
    .eq("id", user!.id)
    .single();

  const { data: proposals } = await supabase
    .from("proposals")
    .select("*")
    .eq("agency_id", profile!.agency_id)
    .order("created_at", { ascending: false });

  return <ProposalsClient proposals={proposals || []} />;
}
