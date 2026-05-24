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
          padding: "0 var(--space-xl)",
          background: scrolled ? "rgba(250,248,244,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          transition:
            "background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease",
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
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
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
          </Link>

          {/* Desktop links — CSS .nav-link class handles hover */}
          <div
            className="hidden md:flex items-center"
            style={{ gap: "var(--space-2xl)" }}
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth buttons — CSS .btn-* classes */}
          <div
            className="hidden md:flex items-center"
            style={{ gap: "var(--space-sm)" }}
          >
            <Link
              href="/login"
              className="btn-outline"
              style={{ minHeight: "unset", minWidth: "unset" }}
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="btn-primary"
              style={{ minHeight: "unset", minWidth: "unset" }}
            >
              Ücretsiz Başla
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="flex md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
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
              animate={{ opacity: menuOpen ? 0 : 1, width: menuOpen ? 0 : 18 }}
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
              padding:
                "calc(72px + var(--space-xl)) var(--space-xl) var(--space-xl)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 + 0.1 }}
              >
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--t-display)",
                    fontWeight: 300,
                    color: "var(--ink)",
                    textDecoration: "none",
                    padding: "var(--space-md) 0",
                    borderBottom: "1px solid var(--border)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {link.label}
                </a>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                marginTop: "var(--space-xl)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-sm)",
              }}
            >
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="btn-primary"
                style={{ justifyContent: "center" }}
              >
                Ücretsiz Başla
              </Link>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="btn-outline"
                style={{ justifyContent: "center" }}
              >
                Giriş Yap
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
