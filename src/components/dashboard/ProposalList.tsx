"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Proposal } from "@/types";

const statusConfig = {
  draft: { label: "Taslak", color: "var(--dim)", bg: "rgba(156,163,175,0.1)" },
  sent: {
    label: "Gönderildi",
    color: "var(--ocean-mid)",
    bg: "rgba(46,134,193,0.1)",
  },
  viewed: {
    label: "Görüntülendi",
    color: "#C9A96E",
    bg: "rgba(201,169,110,0.12)",
  },
  accepted: {
    label: "Kabul Edildi",
    color: "#4A7C6B",
    bg: "rgba(74,124,107,0.1)",
  },
  expired: {
    label: "Süresi Doldu",
    color: "#dc2626",
    bg: "rgba(220,38,38,0.08)",
  },
};

function StatusBadge({ status }: { status: Proposal["status"] }) {
  const cfg = statusConfig[status] || statusConfig.draft;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 999,
        background: cfg.bg,
        fontFamily: "var(--font-mono)",
        fontSize: "0.62rem",
        letterSpacing: "0.1em",
        color: cfg.color,
        textTransform: "uppercase",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: cfg.color,
          display: "inline-block",
        }}
      />
      {cfg.label}
    </span>
  );
}

function EmptyState({ agencyId }: { agencyId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        textAlign: "center",
        padding: "5rem 2rem",
        background: "white",
        //border: "1px solid var(--border)",
        borderRadius: 20,
        border: "2px dashed var(--border)",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "rgba(27,79,114,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M5 4C5 2.9 5.9 2 7 2H17L23 8V24C23 25.1 22.1 26 21 26H7C5.9 26 5 25.1 5 24V4Z"
            stroke="var(--ocean)"
            strokeWidth="1.8"
          />
          <path
            d="M17 2V8H23"
            stroke="var(--ocean)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10 14H18M10 18H15"
            stroke="var(--ocean)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 400,
          color: "var(--ink)",
          marginBottom: "0.5rem",
        }}
      >
        Henüz teklif yok
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.88rem",
          color: "var(--muted)",
          marginBottom: "1.5rem",
          lineHeight: 1.7,
        }}
      >
        İlk teklifinizi oluşturun ve müşterinize gönderin.
      </p>
      <Link
        href="/dashboard/proposals/new"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "11px 24px",
          borderRadius: 10,
          background: "var(--ocean)",
          color: "white",
          fontFamily: "var(--font-body)",
          fontSize: "0.88rem",
          fontWeight: 600,
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(27,79,114,0.2)",
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
        İlk Teklifi Oluştur
      </Link>
    </motion.div>
  );
}

export function ProposalList({
  proposals,
  agencyId,
}: {
  proposals: Proposal[];
  agencyId: string;
}) {
  return (
    <div>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              fontWeight: 400,
              color: "var(--ink)",
              letterSpacing: "-0.01em",
            }}
          >
            Son Teklifler
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              color: "var(--muted)",
              marginTop: 2,
            }}
          >
            {proposals.length} teklif
          </p>
        </div>
        <Link
          href="/dashboard/proposals"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "var(--ocean)",
            textDecoration: "none",
          }}
        >
          Tümünü Gör →
        </Link>
      </div>

      {/* Empty state */}
      {proposals.length === 0 && <EmptyState agencyId={agencyId} />}

      {/* List */}
      {proposals.length > 0 && (
        <div
          style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 140px 120px 100px 80px",
              padding: "0.75rem 1.5rem",
              background: "var(--sand)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {["Teklif Adı", "Müşteri", "Tarih", "Durum", ""].map((h, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.15em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  textAlign: i === 4 ? "right" : "left",
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {proposals.map((proposal, i) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 120px 100px 80px",
                padding: "1rem 1.5rem",
                borderBottom:
                  i < proposals.length - 1
                    ? "1px solid var(--border-soft)"
                    : "none",
                alignItems: "center",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--sand)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {/* Title */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "var(--ink)",
                    marginBottom: 2,
                  }}
                >
                  {proposal.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--dim)",
                    letterSpacing: "0.06em",
                  }}
                >
                  ₺{proposal.base_price?.toLocaleString("tr-TR") || "—"}
                </div>
              </div>

              {/* Customer */}
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "var(--ink-soft)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {proposal.customer_name || "—"}
              </div>

              {/* Date */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--muted)",
                }}
              >
                {new Date(proposal.created_at).toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "short",
                })}
              </div>

              {/* Status */}
              <StatusBadge status={proposal.status} />

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.5rem",
                }}
              >
                <Link
                  href={`/dashboard/proposals/${proposal.id}`}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--ocean)";
                    e.currentTarget.style.color = "var(--ocean)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted)";
                  }}
                  title="Düzenle"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M9.5 1.5L11.5 3.5L4 11H2V9L9.5 1.5Z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <a
                  href={`/p/${proposal.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--ocean)";
                    e.currentTarget.style.color = "var(--ocean)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted)";
                  }}
                  title="Önizle"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M8 2H11V5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11 2L5 8"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5 3H2V11H10V8"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
