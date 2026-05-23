"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "@/lib/auth/actions";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import type { Agency } from "@/types";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect
          x="1"
          y="1"
          width="6"
          height="6"
          rx="1.5"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.5"
        />
        <rect
          x="11"
          y="1"
          width="6"
          height="6"
          rx="1.5"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.5"
        />
        <rect
          x="1"
          y="11"
          width="6"
          height="6"
          rx="1.5"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.5"
        />
        <rect
          x="11"
          y="11"
          width="6"
          height="6"
          rx="1.5"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    label: "Teklifler",
    href: "/dashboard/proposals",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M3 2.5C3 1.67 3.67 1 4.5 1H11L15 5V15.5C15 16.33 14.33 17 13.5 17H4.5C3.67 17 3 16.33 3 15.5V2.5Z"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.5"
        />
        <path
          d="M11 1V5H15"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 9H12M6 12H10"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Analitik",
    href: "/dashboard/analytics",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M1 13L5.5 8L8.5 11L13 5L17 9"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 17H17"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Medya",
    href: "/dashboard/media",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect
          x="1"
          y="3"
          width="16"
          height="12"
          rx="2"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.5"
        />
        <circle
          cx="6"
          cy="7.5"
          r="1.5"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.3"
        />
        <path
          d="M1 12L5 9L8 11.5L11.5 8L17 12"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Ayarlar",
    href: "/dashboard/settings",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle
          cx="9"
          cy="9"
          r="2.5"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.5"
        />
        <path
          d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.41 1.41M13.36 13.36l1.41 1.41M3.22 14.78l1.41-1.41M13.36 4.64l1.41-1.41"
          stroke={active ? "var(--ocean)" : "currentColor"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

function NavLink({
  item,
  collapsed,
  onClick,
}: {
  item: (typeof navItems)[0];
  collapsed: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href ||
    (item.href !== "/dashboard" && pathname.startsWith(item.href));

  return (
    <Link
      href={item.href}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className="icon-btn"
      style={{
        display: "flex",
        alignItems: "center",
        gap: collapsed ? 0 : 10,
        padding: collapsed ? "10px" : "10px 12px",
        borderRadius: 10,
        textDecoration: "none",
        justifyContent: collapsed ? "center" : "flex-start",
        background: isActive ? "rgba(27,79,114,0.08)" : "transparent",
        color: isActive ? "var(--ocean)" : "var(--muted)",
        transition: "all var(--duration-fast) ease",
        position: "relative",
        minHeight: 44,
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.background = "rgba(26,26,46,0.04)";
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.background = "transparent";
      }}
    >
      {isActive && (
        <motion.div
          layoutId="activeNav"
          style={{
            position: "absolute",
            left: 0,
            top: "20%",
            bottom: "20%",
            width: 3,
            borderRadius: 99,
            background: "var(--ocean)",
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      {item.icon(isActive)}
      {!collapsed && (
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-small)",
            fontWeight: isActive ? 600 : 400,
            whiteSpace: "nowrap",
          }}
        >
          {item.label}
        </span>
      )}
    </Link>
  );
}

/* ─── Desktop sidebar ─── */
function DesktopSidebar({ agency }: { agency: Agency | null }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 240 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "var(--sand)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      {/* Logo area */}
      <div
        style={{
          padding: collapsed ? "1.25rem 1rem" : "1.25rem",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          minHeight: 64,
        }}
      >
        {!collapsed && (
          <Link
            href="/dashboard"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                flexShrink: 0,
                background: agency?.brand_color || "var(--ocean)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                }}
              >
                {agency?.name?.charAt(0)?.toUpperCase() || "T"}
              </span>
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--ink)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {agency?.name || "Acenteniz"}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--muted)",
                  letterSpacing: "0.08em",
                }}
              >
                Pro Plan
              </div>
            </div>
          </Link>
        )}
        {collapsed && (
          <div
            style={{
              width: 30,
              height: 30,
              background: agency?.brand_color || "var(--ocean)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{ color: "white", fontSize: "0.75rem", fontWeight: 700 }}
            >
              {agency?.name?.charAt(0)?.toUpperCase() || "T"}
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="icon-btn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            borderRadius: 6,
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            minHeight: "unset",
            minWidth: "unset",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--dune-light)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </button>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "var(--space-sm) var(--space-sm)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {!collapsed && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              color: "var(--dim)",
              textTransform: "uppercase",
              padding: "0.5rem 0.75rem 0.75rem",
            }}
          >
            Menü
          </div>
        )}
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Sign out */}
      <div
        style={{
          padding: "var(--space-sm)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <form action={signOut}>
          <button
            type="submit"
            title={collapsed ? "Çıkış Yap" : undefined}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: collapsed ? 0 : 10,
              padding: collapsed ? "10px" : "10px 12px",
              borderRadius: 10,
              border: "none",
              justifyContent: collapsed ? "center" : "flex-start",
              background: "transparent",
              color: "var(--muted)",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "var(--t-small)",
              minHeight: 44,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.06)";
              e.currentTarget.style.color = "#dc2626";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--muted)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M7 3H3C2.45 3 2 3.45 2 4V14C2 14.55 2.45 15 3 15H7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 6L16 9L12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 9H7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {!collapsed && "Çıkış Yap"}
          </button>
        </form>
      </div>
    </motion.aside>
  );
}

/* ─── Mobile bottom nav ─── */
function MobileNav({ agency }: { agency: Agency | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Bottom tab bar */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(250,248,244,0.95)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          padding: "0 var(--space-sm)",
          paddingBottom: "env(safe-area-inset-bottom)",
          height: "calc(60px + env(safe-area-inset-bottom))",
        }}
      >
        {navItems.slice(0, 4).map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                padding: "8px 4px",
                textDecoration: "none",
                color: isActive ? "var(--ocean)" : "var(--dim)",
                transition: "color var(--duration-fast)",
              }}
            >
              {item.icon(isActive)}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.52rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
        {/* More button */}
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            padding: "8px 4px",
            background: "none",
            border: "none",
            color: "var(--dim)",
            cursor: "pointer",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="4" cy="9" r="1.5" fill="currentColor" />
            <circle cx="9" cy="9" r="1.5" fill="currentColor" />
            <circle cx="14" cy="9" r="1.5" fill="currentColor" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.52rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Daha
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.3)",
                zIndex: 150,
              }}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                background: "var(--ivory)",
                zIndex: 200,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: "var(--space-lg)",
                paddingBottom:
                  "calc(var(--space-lg) + env(safe-area-inset-bottom))",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 4,
                  background: "var(--dune)",
                  borderRadius: 2,
                  margin: "0 auto var(--space-xl)",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    collapsed={false}
                    onClick={() => setMenuOpen(false)}
                  />
                ))}
                <div
                  style={{
                    height: 1,
                    background: "var(--border)",
                    margin: "var(--space-sm) 0",
                  }}
                />
                <form action={signOut}>
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "none",
                      background: "transparent",
                      color: "#dc2626",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--t-small)",
                      cursor: "pointer",
                      minHeight: 44,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M7 3H3C2.45 3 2 3.45 2 4V14C2 14.55 2.45 15 3 15H7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 6L16 9L12 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 9H7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Çıkış Yap
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Export ─── */
export function Sidebar({ agency }: { agency: Agency | null }) {
  const isMobile = useBreakpoint("md");

  if (isMobile) return <MobileNav agency={agency} />;
  return <DesktopSidebar agency={agency} />;
}
