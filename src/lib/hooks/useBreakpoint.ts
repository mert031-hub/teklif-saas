"use client";

/**
 * useBreakpoint — Hydration-safe viewport hooks
 *
 * Uses useSyncExternalStore for proper SSR/CSR consistency.
 * Server snapshot returns stable fallback to prevent hydration mismatch.
 */

import { useSyncExternalStore } from "react";

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

/* ── Subscribe to media query changes ── */
function createMediaSubscribe(query: string) {
  return (callback: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  };
}

function createMediaSnapshot(query: string) {
  return () => window.matchMedia(query).matches;
}

/**
 * Returns true when viewport is BELOW the breakpoint (mobile-first).
 * SSR default: false (assumes desktop — most common server rendering target).
 * Prevents hydration mismatch by returning consistent server snapshot.
 */
export function useBreakpoint(bp: Breakpoint): boolean {
  const query = `(max-width: ${BREAKPOINTS[bp] - 1}px)`;

  return useSyncExternalStore(
    createMediaSubscribe(query),
    createMediaSnapshot(query),
    () => false, // Server snapshot — always false (desktop fallback)
  );
}

/**
 * Returns true when viewport is AT OR ABOVE the breakpoint.
 * SSR default: true (desktop).
 */
export function useMinBreakpoint(bp: Breakpoint): boolean {
  const query = `(min-width: ${BREAKPOINTS[bp]}px)`;

  return useSyncExternalStore(
    createMediaSubscribe(query),
    createMediaSnapshot(query),
    () => true, // Server snapshot — desktop default
  );
}

/**
 * Returns true if user prefers reduced motion.
 * SSR default: false (assume no preference).
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * Returns current named breakpoint label.
 * SSR default: 'lg' (desktop).
 */
export function useCurrentBreakpoint(): Breakpoint | "xs" {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback, { passive: true });
      return () => window.removeEventListener("resize", callback);
    },
    () => {
      const w = window.innerWidth;
      if (w < 640) return "xs" as const;
      if (w < 768) return "sm" as const;
      if (w < 1024) return "md" as const;
      if (w < 1280) return "lg" as const;
      return "xl" as const;
    },
    () => "lg" as const, // Server snapshot
  );
}
