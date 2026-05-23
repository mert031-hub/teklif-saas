"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Özellikler", href: "#features" },
  { label: "Nasıl Çalışır", href: "#how-it-works" },
  { label: "Fiyatlar", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 2rem",
          transition:
            "background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease",
          background: scrolled ? "rgba(250,248,244,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(26,26,46,0.08)"
            : "1px solid transparent",
        }}
      >
        <nav
          style={{
            maxWidth: "var(--container)",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "var(--ocean)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2L14 6V10L8 14L2 10V6L8 2Z"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle cx="8" cy="8" r="2" fill="white" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                Teklif<span style={{ color: "var(--ocean)" }}>AI</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            <div
              className="hidden md:flex items-center"
              style={{ gap: "2rem" }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover-underline"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "var(--ink-soft)",
                    textDecoration: "none",
                    letterSpacing: "0.01em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--ocean)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--ink-soft)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div
              className="hidden md:flex items-center"
              style={{ gap: "0.75rem" }}
            >
              <Link
                href="/login"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--ink-soft)",
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: 8,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(26,26,46,0.06)";
                  e.currentTarget.style.color = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--ink-soft)";
                }}
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "white",
                  textDecoration: "none",
                  padding: "10px 22px",
                  borderRadius: 10,
                  background: "var(--ocean)",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(27,79,114,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#154360";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(27,79,114,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--ocean)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(27,79,114,0.2)";
                }}
              >
                Ücretsiz Başla
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                display: "flex",
                flexDirection: "column",
                gap: 5,
                alignItems: "flex-end",
              }}
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                style={{
                  display: "block",
                  width: 24,
                  height: 1.5,
                  background: "var(--ink)",
                  borderRadius: 2,
                }}
              />
              <motion.span
                animate={{
                  opacity: menuOpen ? 0 : 1,
                  width: menuOpen ? 0 : 18,
                }}
                style={{
                  display: "block",
                  height: 1.5,
                  background: "var(--ink)",
                  borderRadius: 2,
                }}
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                style={{
                  display: "block",
                  width: 24,
                  height: 1.5,
                  background: "var(--ink)",
                  borderRadius: 2,
                }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--ivory)",
              zIndex: 90,
              paddingTop: 100,
              display: "flex",
              flexDirection: "column",
              padding: "100px 2rem 2rem",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 + 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "2.5rem",
                    fontWeight: 300,
                    color: "var(--ink)",
                    textDecoration: "none",
                    padding: "1rem 0",
                    borderBottom: "1px solid var(--border)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                marginTop: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "1rem",
                  borderRadius: 12,
                  background: "var(--ocean)",
                  color: "white",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Ücretsiz Başla
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
