"use client";

/**
 * useBreakpoint
 *
 * Hydration-safe breakpoint detection.
 * Returns `false` on SSR, correct value after mount.
 * Avoids window reference on server.
 *
 * Usage:
 *   const isMobile = useBreakpoint('sm')   // < 640px
 *   const isTablet = useBreakpoint('md')   // < 768px
 *   const isDesktop = useBreakpoint('lg')  // >= 1024px
 */

import { useState, useEffect } from "react";

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

/** Returns true when viewport width is BELOW the breakpoint (mobile-first) */
export function useBreakpoint(bp: Breakpoint): boolean {
  const [matches, setMatches] = useState(false); // false = SSR safe default

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${BREAKPOINTS[bp] - 1}px)`);
    setMatches(mq.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [bp]);

  return matches;
}

/** Returns true when viewport width is AT OR ABOVE the breakpoint */
export function useMinBreakpoint(bp: Breakpoint): boolean {
  const [matches, setMatches] = useState(true); // true = SSR safe for min

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${BREAKPOINTS[bp]}px)`);
    setMatches(mq.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [bp]);

  return matches;
}

/** Returns current named breakpoint */
export function useCurrentBreakpoint(): Breakpoint | "xs" {
  const [current, setCurrent] = useState<Breakpoint | "xs">("lg"); // SSR default

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) return setCurrent("xs");
      if (w < 768) return setCurrent("sm");
      if (w < 1024) return setCurrent("md");
      if (w < 1280) return setCurrent("lg");
      setCurrent("xl");
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return current;
}

/** Returns true if user prefers reduced motion */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
