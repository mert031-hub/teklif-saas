import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { BuilderShell } from "@/components/builder/BuilderShell";

interface Props {
  params: { id: string };
}

export default async function BuilderPage({ params }: Props) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: proposal } = await supabase
    .from("proposals")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!proposal) notFound();

  return <BuilderShell initialProposal={proposal} />;
}
