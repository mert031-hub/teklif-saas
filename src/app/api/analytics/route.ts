import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { proposalId, blockId, eventType, durationMs } = body;

    if (!proposalId || !eventType) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = await createClient();

    // Hash IP for privacy
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    const ipHash =
      ip === "unknown" ? null : Buffer.from(ip).toString("base64").slice(0, 16);

    await supabase.from("proposal_analytics").insert({
      proposal_id: proposalId,
      event_type: eventType,
      block_id: blockId || null,
      duration_ms: durationMs || null,
      ip_hash: ipHash,
      user_agent: request.headers.get("user-agent")?.slice(0, 200) || null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
