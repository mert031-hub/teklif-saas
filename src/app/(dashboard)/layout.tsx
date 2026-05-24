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

  // agencies join returns array — take first
  const agency = Array.isArray(profile.agencies)
    ? (profile.agencies[0] ?? null)
    : (profile.agencies ?? null);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100svh",
        background: "var(--ivory)",
      }}
    >
      <Sidebar agency={agency} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <DashboardHeader
          user={user}
          profile={{ ...profile, agencies: agency }}
        />
        {/*
          padding-bottom accounts for mobile bottom nav (60px).
          On md+ (desktop), sidebar replaces bottom nav so no extra padding needed.
          We use a CSS custom property trick: define --nav-height per breakpoint.
        */}
        <main
          style={{ flex: 1, overflowY: "auto" }}
          className="p-4 pb-[calc(1rem+60px)] md:p-8 md:pb-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
