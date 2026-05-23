import { createClient } from "@/lib/supabase/server";
import { ProposalList } from "@/components/dashboard/ProposalList";
import { StatsRow } from "@/components/dashboard/StatsRow";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("agency_id")
    .eq("id", user!.id)
    .single();

  const agencyId = profile?.agency_id;

  // Stats
  const [
    { count: totalProposals },
    { count: sentProposals },
    { count: acceptedProposals },
    { data: recentProposals },
  ] = await Promise.all([
    supabase
      .from("proposals")
      .select("*", { count: "exact", head: true })
      .eq("agency_id", agencyId),
    supabase
      .from("proposals")
      .select("*", { count: "exact", head: true })
      .eq("agency_id", agencyId)
      .eq("status", "sent"),
    supabase
      .from("proposals")
      .select("*", { count: "exact", head: true })
      .eq("agency_id", agencyId)
      .eq("status", "accepted"),
    supabase
      .from("proposals")
      .select("*")
      .eq("agency_id", agencyId)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const stats = {
    total: totalProposals || 0,
    sent: sentProposals || 0,
    accepted: acceptedProposals || 0,
    conversion: totalProposals
      ? Math.round(((acceptedProposals || 0) / totalProposals) * 100)
      : 0,
  };

  return (
    <div>
      <StatsRow stats={stats} />
      <ProposalList
        proposals={recentProposals || []}
        agencyId={agencyId || ""}
      />
    </div>
  );
}
