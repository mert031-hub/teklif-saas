import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ProposalPreview } from "@/components/preview/ProposalPreview";
import type { Proposal } from "@/types";

interface Props {
  params: { slug: string };
}

export default async function PreviewPage({ params }: Props) {
  const supabase = await createClient();

  const { data: proposal } = await supabase
    .from("proposals")
    .select("*")
    .eq("slug", params.slug)
    .in("status", ["sent", "viewed", "accepted"])
    .single();

  if (!proposal) notFound();

  // Log view event (fire and forget)
  supabase
    .from("proposal_analytics")
    .insert({
      proposal_id: proposal.id,
      event_type: "view",
      user_agent: "",
    })
    .then(() => {});

  // Mark as viewed if sent
  if (proposal.status === "sent") {
    supabase
      .from("proposals")
      .update({ status: "viewed" })
      .eq("id", proposal.id)
      .then(() => {});
  }

  return <ProposalPreview proposal={proposal as Proposal} />;
}
