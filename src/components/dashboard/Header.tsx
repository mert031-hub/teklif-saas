"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/proposals": "Teklifler",
  "/dashboard/analytics": "Analitik",
  "/dashboard/media": "Medya",
  "/dashboard/settings": "Ayarlar",
};

export function DashboardHeader({
  user,
  profile,
}: {
  user: User;
  profile: Profile & { agencies: any };
}) {
  const pathname = usePathname();
  const isMobile = useBreakpoint("sm");
  const [avatarOpen, setAvatarOpen] = useState(false);

  const title = pageTitles[pathname] || "Dashboard";
  const initials = (profile.full_name || user.email || "U")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header
      style={{
        height: isMobile ? 56 : 64,
        padding: `0 var(--space-${isMobile ? "md" : "xl"})`,
        background: "var(--ivory)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 40,
        gap: "var(--space-sm)",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: isMobile ? "var(--t-subtitle)" : "var(--t-title)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </h1>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-xs)",
        }}
      >
        {/* New proposal */}
        <Link
          href="/dashboard/proposals/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: isMobile ? 0 : 8,
            padding: isMobile ? "0 12px" : "0 18px",
            height: isMobile ? 34 : 38,
            borderRadius: "var(--radius-sm)",
            background: "var(--ocean)",
            color: "white",
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-label)",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(27,79,114,0.2)",
            transition: "all var(--duration-fast)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#154360";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--ocean)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1V13M1 7H13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {!isMobile && " Yeni Teklif"}
        </Link>

        {/* Avatar */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setAvatarOpen(!avatarOpen)}
            className="icon-btn"
            style={{
              width: isMobile ? 34 : 38,
              height: isMobile ? 34 : 38,
              borderRadius: "var(--radius-sm)",
              background: profile.agencies?.brand_color || "var(--ocean)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 700,
              transition: "opacity var(--duration-fast)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {initials}
          </button>

          <AnimatePresence>
            {avatarOpen && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 49 }}
                  onClick={() => setAvatarOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: "absolute",
                    top: "110%",
                    right: 0,
                    width: 210,
                    background: "white",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "0 8px 40px rgba(26,26,46,0.12)",
                    overflow: "hidden",
                    zIndex: 50,
                  }}
                >
                  <div
                    style={{
                      padding: "var(--space-md)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--t-small)",
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: 2,
                      }}
                    >
                      {profile.full_name || "Kullanıcı"}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--t-label)",
                        color: "var(--muted)",
                      }}
                    >
                      {user.email}
                    </div>
                  </div>

                  {[
                    { label: "Profil", href: "/dashboard/settings" },
                    {
                      label: "Acente Ayarları",
                      href: "/dashboard/settings/agency",
                    },
                    {
                      label: "Fatura & Plan",
                      href: "/dashboard/settings/billing",
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setAvatarOpen(false)}
                      style={{
                        display: "block",
                        padding: "var(--space-sm) var(--space-md)",
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--t-small)",
                        color: "var(--ink-soft)",
                        textDecoration: "none",
                        transition: "background var(--duration-fast)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--sand)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div style={{ height: 1, background: "var(--border)" }} />
                  <Link
                    href="/"
                    onClick={() => setAvatarOpen(false)}
                    style={{
                      display: "block",
                      padding: "var(--space-sm) var(--space-md)",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--t-small)",
                      color: "#dc2626",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(239,68,68,0.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    Çıkış Yap
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
