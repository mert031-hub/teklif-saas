import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*, agencies(*)")
    .eq("id", user.id)
    .single();

  if (!profile?.agency_id) redirect("/onboarding");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100svh",
        background: "var(--ivory)",
      }}
    >
      {/* Desktop sidebar — hidden on mobile (sidebar component handles this) */}
      <Sidebar agency={profile.agencies} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <DashboardHeader user={user} profile={profile} />
        <main
          style={{
            flex: 1,
            /* Bottom padding for mobile nav bar */
            padding:
              "var(--space-xl) var(--space-xl) calc(var(--space-xl) + 60px)",
            overflowY: "auto",
          }}
          className="md:p-[var(--space-xl)]"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
