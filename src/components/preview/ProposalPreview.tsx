"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/useBreakpoint";
import type { Proposal, ProposalBlock } from "@/types";

/* ─── Analytics tracker ─── */
function useBlockTracking(proposalId: string) {
  return (blockId: string, eventType: "block_view") => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proposalId, blockId, eventType }),
    }).catch(() => {});
  };
}

/* ─── Hero Block ─── */
function HeroBlock({
  data,
  theme,
}: {
  data: Record<string, string>;
  theme: Record<string, string>;
}) {
  const { scrollY } = useScroll();
  const reduced = usePrefersReducedMotion();
  const y = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 80]);
  const springY = useSpring(y, { stiffness: 80, damping: 25 });

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: data.imageUrl
          ? `linear-gradient(to bottom, rgba(10,15,20,0.5) 0%, rgba(10,15,20,0.7) 100%), url(${data.imageUrl}) center/cover`
          : "linear-gradient(160deg, #0E2F44 0%, #1B4F72 50%, #154360 100%)",
      }}
    >
      {/* Atmospheric overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,15,20,0.4) 100%)",
        }}
      />

      <motion.div
        style={{
          y: springY,
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "var(--space-xl)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: "var(--space-xl)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 40,
              height: 1,
              background: "rgba(255,255,255,0.4)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--t-label)",
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.25em",
            }}
          >
            ÖZEL TEKLİF
          </span>
          <span
            style={{
              display: "inline-block",
              width: 40,
              height: 1,
              background: "rgba(255,255,255,0.4)",
            }}
          />
        </motion.div>

        <div style={{ overflow: "hidden", marginBottom: "var(--space-lg)" }}>
          {[data.title || "Hayalinizdeki Tatil", data.subtitle || ""]
            .filter(Boolean)
            .map((line, i) => (
              <motion.div
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1,
                  delay: 0.2 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: i === 0 ? "var(--t-hero)" : "var(--t-display)",
                  fontWeight: 300,
                  letterSpacing: "-0.025em",
                  lineHeight: 0.95,
                  color: i === 0 ? "white" : "rgba(255,255,255,0.75)",
                  fontStyle: i === 1 ? "italic" : "normal",
                }}
              >
                {line}
              </motion.div>
            ))}
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginTop: "var(--space-2xl)",
          }}
        >
          <motion.div
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{
              width: 28,
              height: 44,
              borderRadius: 99,
              border: "1.5px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: 6,
            }}
          >
            <motion.div
              animate={reduced ? {} : { y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{
                width: 4,
                height: 8,
                borderRadius: 2,
                background: "rgba(255,255,255,0.6)",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Hotel Block ─── */
function HotelBlock({ data }: { data: Record<string, unknown> }) {
  // GÜVENLİ TİP DÖNÜŞÜMLERİ (TYPE GUARDS)
  const name = typeof data.name === "string" ? data.name : "Otel Adı";
  const stars = Number(data.stars) || 5;
  const location = typeof data.location === "string" ? data.location : "";
  const description =
    typeof data.description === "string" ? data.description : "";

  return (
    <div style={{ padding: "var(--space-2xl) 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-lg)",
        }}
      >
        <span className="gold-line" />
        <span className="t-label">Konaklama</span>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: "var(--space-2xl)", alignItems: "center" }}
      >
        {/* Visual */}
        <div
          style={{
            aspectRatio: "4/3",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, var(--sand) 0%, var(--dune) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            style={{ opacity: 0.3 }}
          >
            <path
              d="M6 42V18L24 6L42 18V42"
              stroke="var(--ocean)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <rect
              x="18"
              y="30"
              width="12"
              height="12"
              rx="2"
              stroke="var(--ocean)"
              strokeWidth="2.5"
            />
            <rect
              x="12"
              y="22"
              width="8"
              height="8"
              rx="1.5"
              stroke="var(--ocean)"
              strokeWidth="2"
            />
            <rect
              x="28"
              y="22"
              width="8"
              height="8"
              rx="1.5"
              stroke="var(--ocean)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Info */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--t-title)",
              fontWeight: 400,
              color: "var(--ink)",
              letterSpacing: "-0.01em",
              marginBottom: "var(--space-sm)",
            }}
          >
            {name}
          </h3>
          <div
            style={{ display: "flex", gap: 2, marginBottom: "var(--space-md)" }}
          >
            {Array.from({ length: stars }).map((_, i) => (
              <span
                key={i}
                style={{ color: "var(--gold)", fontSize: "1.1rem" }}
              >
                ★
              </span>
            ))}
          </div>
          {location && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-small)",
                color: "var(--muted)",
                marginBottom: "var(--space-md)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1C4.8 1 3 2.8 3 5C3 8 7 13 7 13C7 13 11 8 11 5C11 2.8 9.2 1 7 1Z"
                  stroke="var(--ocean)"
                  strokeWidth="1.3"
                />
                <circle
                  cx="7"
                  cy="5"
                  r="1.5"
                  stroke="var(--ocean)"
                  strokeWidth="1.2"
                />
              </svg>
              {location}
            </p>
          )}
          {description && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-body)",
                color: "var(--ink-soft)",
                lineHeight: 1.8,
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Flight Block ─── */
function FlightBlock({ data }: { data: Record<string, string> }) {
  return (
    <div style={{ padding: "var(--space-2xl) 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-lg)",
        }}
      >
        <span className="gold-line" />
        <span className="t-label">Uçuş</span>
      </div>

      <div
        style={{
          padding: "var(--space-xl)",
          background: "var(--sand)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-xl)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--t-title)",
                fontWeight: 400,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
              }}
            >
              {data.from || "IST"}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--t-label)",
                color: "var(--muted)",
              }}
            >
              {data.departure || ""}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
              <path
                d="M4 10H76M72 5L77 10L72 15"
                stroke="var(--ocean)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-label)",
                color: "var(--muted)",
              }}
            >
              {data.airline || ""}
            </span>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--t-title)",
                fontWeight: 400,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
              }}
            >
              {data.to || "AYT"}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--t-label)",
                color: "var(--muted)",
              }}
            >
              {data.arrival || ""}
            </div>
          </div>
        </div>

        {data.class && (
          <div style={{ textAlign: "center", marginTop: "var(--space-md)" }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: 999,
                background: "rgba(27,79,114,0.08)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--t-label)",
                color: "var(--ocean)",
                textTransform: "uppercase",
              }}
            >
              {data.class === "business"
                ? "Business Class"
                : data.class === "first"
                  ? "First Class"
                  : "Ekonomi"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Video Block ─── */
function VideoBlock({ data }: { data: Record<string, string> }) {
  const src =
    data.platform === "vimeo"
      ? `https://player.vimeo.com/video/${data.videoId}?autoplay=0`
      : `https://www.youtube.com/embed/${data.videoId}`;

  if (!data.videoId) return null;

  return (
    <div style={{ padding: "var(--space-2xl) 0" }}>
      {data.caption && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-sm)",
            marginBottom: "var(--space-lg)",
          }}
        >
          <span className="gold-line" />
          <span className="t-label">{data.caption}</span>
        </div>
      )}
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          overflow: "hidden",
          borderRadius: "var(--radius-xl)",
        }}
      >
        <iframe
          src={src}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}

/* ─── Gallery Block ─── */
function GalleryBlock({
  data,
}: {
  data: { images: string[]; columns: number };
}) {
  if (!data.images?.length) return null;
  const cols = Math.min(data.columns || 3, data.images.length);

  return (
    <div style={{ padding: "var(--space-2xl) 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-lg)",
        }}
      >
        <span className="gold-line" />
        <span className="t-label">Galeri</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "var(--space-sm)",
        }}
      >
        {data.images.map((url, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            style={{
              aspectRatio: "4/3",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              background: `url(${url}) center/cover, var(--sand)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Price Block ─── */
function PriceBlock({ data }: { data: Record<string, unknown> }) {
  const basePrice = Number(data.basePrice) || 0;
  const currency = (data.currency as string) || "TRY";
  const note = typeof data.note === "string" ? data.note : "";

  const currencySymbol: Record<string, string> = {
    TRY: "₺",
    USD: "$",
    EUR: "€",
  };

  return (
    <div style={{ padding: "var(--space-2xl) 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-lg)",
        }}
      >
        <span className="gold-line" />
        <span className="t-label">Fiyatlandırma</span>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, var(--ocean) 0%, #154360 100%)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-2xl)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-small)",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "var(--space-sm)",
          }}
        >
          Toplam Tutar
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--t-hero)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              color: "white",
              lineHeight: 1,
            }}
          >
            {currencySymbol[currency]}
            {basePrice.toLocaleString("tr-TR")}
          </span>
        </div>
        {note && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--t-small)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "var(--space-lg) auto 0",
            }}
          >
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Text Block ─── */
function TextBlock({ data }: { data: Record<string, string> }) {
  return (
    <div style={{ padding: "var(--space-xl) 0" }}>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--t-body)",
          lineHeight: 1.9,
          color: "var(--ink-soft)",
          maxWidth: 680,
        }}
      >
        {data.content}
      </p>
    </div>
  );
}

/* ─── Map Block ─── */
function MapBlock({ data }: { data: Record<string, unknown> }) {
  // GÜVENLİ TİP DÖNÜŞÜMÜ (TYPE GUARD)
  const location =
    typeof data.location === "string" && data.location.trim() !== ""
      ? data.location
      : "Destinasyon";

  return (
    <div style={{ padding: "var(--space-2xl) 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-lg)",
        }}
      >
        <span className="gold-line" />
        <span className="t-label">Konum — {location}</span>
      </div>
      <div
        style={{
          height: "clamp(200px, 40vw, 400px)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, var(--ocean-pale) 0%, var(--sand) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            style={{ marginBottom: 8 }}
          >
            <path
              d="M16 2C10.5 2 6 6.5 6 12C6 20 16 30 16 30C16 30 26 20 26 12C26 6.5 21.5 2 16 2Z"
              stroke="var(--ocean)"
              strokeWidth="2"
            />
            <circle
              cx="16"
              cy="12"
              r="4"
              stroke="var(--ocean)"
              strokeWidth="2"
            />
          </svg>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--t-small)",
              color: "var(--ocean)",
            }}
          >
            {location}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Block renderer ─── */
function BlockRenderer({
  block,
  proposalId,
}: {
  block: ProposalBlock;
  proposalId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const track = useBlockTracking(proposalId);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) track(block.id, "block_view");
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.id]);

  if (!block.visible) return null;

  const data = block.data as Record<string, unknown>;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {block.type === "hero" && (
        <HeroBlock data={data as Record<string, string>} theme={{}} />
      )}
      {block.type === "hotel" && (
        <HotelBlock data={data as Record<string, unknown>} />
      )}
      {block.type === "flight" && (
        <FlightBlock data={data as Record<string, string>} />
      )}
      {block.type === "video" && (
        <VideoBlock data={data as Record<string, string>} />
      )}
      {block.type === "gallery" && (
        <GalleryBlock data={data as { images: string[]; columns: number }} />
      )}
      {block.type === "price" && (
        <PriceBlock data={data as Record<string, unknown>} />
      )}
      {block.type === "text" && (
        <TextBlock data={data as Record<string, string>} />
      )}
      {block.type === "map" && (
        <MapBlock data={data as Record<string, unknown>} />
      )}
    </motion.div>
  );
}

/* ─── Main preview ─── */
export function ProposalPreview({ proposal }: { proposal: Proposal }) {
  const theme = (proposal.theme || {}) as { primaryColor?: string };
  const hasHero = proposal.blocks.some((b) => b.type === "hero" && b.visible);
  const nonHeroBlocks = proposal.blocks
    .filter((b) => b.type !== "hero" && b.visible)
    .sort((a, b) => a.order - b.order);
  const heroBlock = proposal.blocks.find((b) => b.type === "hero");

  return (
    <div style={{ minHeight: "100svh", background: "var(--ivory)" }}>
      {/* Hero — full screen, no container */}
      {hasHero && heroBlock && (
        <BlockRenderer block={heroBlock} proposalId={proposal.id} />
      )}

      {/* Content sections */}
      <div
        className="container"
        style={{
          paddingTop: hasHero ? "var(--space-3xl)" : "var(--space-section)",
          paddingBottom: "var(--space-section)",
        }}
      >
        {/* Proposal meta header */}
        {!hasHero && (
          <div
            style={{
              marginBottom: "var(--space-3xl)",
              paddingBottom: "var(--space-2xl)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-sm)",
                marginBottom: "var(--space-lg)",
              }}
            >
              <span
                className="gold-line"
                style={{ background: theme.primaryColor || "var(--gold)" }}
              />
              <span className="t-label">Özel Teklif</span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--t-display)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              {proposal.title}
            </h1>
            {proposal.customer_name && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--t-body)",
                  color: "var(--muted)",
                  marginTop: "var(--space-sm)",
                }}
              >
                Sayın {proposal.customer_name},
              </p>
            )}
          </div>
        )}

        {/* All non-hero blocks */}
        {nonHeroBlocks.map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            proposalId={proposal.id}
          />
        ))}

        {/* Accept CTA */}
        {proposal.status !== "accepted" && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              marginTop: "var(--space-section)",
              padding: "var(--space-2xl)",
              background: `linear-gradient(135deg, ${theme.primaryColor || "var(--ocean)"} 0%, #154360 100%)`,
              borderRadius: "var(--radius-xl)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--t-title)",
                fontWeight: 300,
                color: "white",
                letterSpacing: "-0.02em",
                marginBottom: "var(--space-md)",
              }}
            >
              Bu teklifi onaylıyor musunuz?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-body)",
                color: "rgba(255,255,255,0.7)",
                marginBottom: "var(--space-xl)",
              }}
            >
              {proposal.valid_until &&
                `Teklifin geçerlilik tarihi: ${new Date(proposal.valid_until).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}`}
            </p>
            <motion.button
              style={{
                padding: "clamp(14px, 2vw, 18px) clamp(32px, 5vw, 56px)",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: "white",
                color: theme?.primaryColor || "var(--ocean)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-body)",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
              whileHover={{
                y: -2,
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.2 }}
            >
              Teklifi Onayla
            </motion.button>
          </motion.div>
        )}

        {proposal.status === "accepted" && (
          <div
            style={{
              textAlign: "center",
              padding: "var(--space-2xl)",
              background: "rgba(107,143,113,0.08)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid rgba(107,143,113,0.2)",
              marginTop: "var(--space-section)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "var(--space-md)" }}>
              ✓
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--t-subtitle)",
                color: "var(--sage)",
                fontWeight: 400,
              }}
            >
              Teklif Onaylandı
            </h3>
          </div>
        )}
      </div>

      {/* Footer branding */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "var(--space-xl)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--t-label)",
            color: "var(--dim)",
          }}
        >
          TeklifAI ile hazırlanmıştır
        </span>
      </div>
    </div>
  );
}
