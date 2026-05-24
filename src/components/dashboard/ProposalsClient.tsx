"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Proposal } from "@/types";

const STATUS_CONFIG = {
  draft: { label: "Taslak", color: "var(--dim)", bg: "rgba(156,163,175,0.1)" },
  sent: {
    label: "Gönderildi",
    color: "var(--ocean-mid)",
    bg: "rgba(46,134,193,0.1)",
  },
  viewed: {
    label: "Görüntülendi",
    color: "var(--gold)",
    bg: "rgba(201,169,110,0.12)",
  },
  accepted: {
    label: "Kabul Edildi",
    color: "var(--sage)",
    bg: "rgba(107,143,113,0.1)",
  },
  expired: {
    label: "Süresi Doldu",
    color: "#dc2626",
    bg: "rgba(220,38,38,0.08)",
  },
};

type StatusFilter = Proposal["status"] | "all";

function StatusBadge({ status }: { status: Proposal["status"] }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
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
        fontSize: "var(--t-label)",
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
        }}
      />
      {cfg.label}
    </span>
  );
}

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        textAlign: "center",
        padding: "var(--space-section) var(--space-xl)",
        border: "2px dashed var(--border)",
        borderRadius: "var(--radius-xl)",
        background: "white",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "rgba(27,79,114,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto var(--space-lg)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
            stroke="var(--ocean)"
            strokeWidth="1.8"
          />
          <path
            d="M14 2V8H20M8 13H16M8 17H13"
            stroke="var(--ocean)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--t-subtitle)",
          fontWeight: 400,
          color: "var(--ink)",
          marginBottom: "var(--space-sm)",
        }}
      >
        {filtered ? "Sonuç bulunamadı" : "Henüz teklif yok"}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--t-small)",
          color: "var(--muted)",
          marginBottom: "var(--space-xl)",
          lineHeight: 1.7,
        }}
      >
        {filtered
          ? "Filtreyi temizle veya farklı bir arama dene."
          : "İlk teklifinizi oluşturun ve müşterinize gönderin."}
      </p>
      {!filtered && (
        <Link
          href="/dashboard/proposals/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "var(--space-md) var(--space-xl)",
            borderRadius: "var(--radius-md)",
            background: "var(--ocean)",
            color: "white",
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-small)",
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
      )}
    </motion.div>
  );
}

function ProposalRow({
  proposal,
  index,
}: {
  proposal: Proposal;
  index: number;
}) {
  const [copying, setCopying] = useState(false);

  const handleCopyLink = async () => {
    setCopying(true);
    await navigator.clipboard.writeText(
      `${window.location.origin}/p/${proposal.slug}`,
    );
    setTimeout(() => setCopying(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto auto auto",
        gap: "var(--space-lg)",
        alignItems: "center",
        padding: "var(--space-md) var(--space-lg)",
        borderBottom: "1px solid var(--border-soft)",
        transition: "background var(--duration-fast)",
        borderRadius: 0,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sand)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Title + meta */}
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-sm)",
            flexWrap: "wrap",
            marginBottom: 3,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--t-small)",
              fontWeight: 600,
              color: "var(--ink)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {proposal.title}
          </span>
          <StatusBadge status={proposal.status} />
        </div>
        <div
          style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}
        >
          {proposal.customer_name && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-label)",
                color: "var(--muted)",
              }}
            >
              {proposal.customer_name}
            </span>
          )}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--t-label)",
              color: "var(--dim)",
            }}
          >
            {new Date(proposal.created_at).toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          {proposal.base_price > 0 && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--t-label)",
                color: "var(--ocean)",
              }}
            >
              ₺{proposal.base_price.toLocaleString("tr-TR")}
            </span>
          )}
        </div>
      </div>

      {/* Copy link */}
      <button
        onClick={handleCopyLink}
        title="Linki kopyala"
        className="icon-btn"
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          border: "1px solid var(--border)",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: copying ? "var(--sage)" : "var(--muted)",
          cursor: "pointer",
          transition: "all var(--duration-fast)",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--ocean)";
          e.currentTarget.style.color = "var(--ocean)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = copying
            ? "var(--sage)"
            : "var(--muted)";
        }}
      >
        {copying ? (
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M2 7L5 10L11 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect
              x="4"
              y="1"
              width="8"
              height="8"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M1 4H3M1 4V12H9V10"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {/* Preview */}
      <a
        href={`/p/${proposal.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Müşteri görünümü"
        className="icon-btn"
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          border: "1px solid var(--border)",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--muted)",
          textDecoration: "none",
          transition: "all var(--duration-fast)",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--ocean)";
          e.currentTarget.style.color = "var(--ocean)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = "var(--muted)";
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M8 1H12V5M12 1L5 8M4 3H1V12H10V9"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </a>

      {/* Edit */}
      <Link
        href={`/dashboard/proposals/${proposal.id}/edit`}
        title="Düzenle"
        className="icon-btn"
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          border: "1px solid var(--border)",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--muted)",
          textDecoration: "none",
          transition: "all var(--duration-fast)",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--ocean)";
          e.currentTarget.style.color = "var(--ocean)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = "var(--muted)";
        }}
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
    </motion.div>
  );
}

export function ProposalsClient({ proposals }: { proposals: Proposal[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    return proposals.filter((p) => {
      const matchesSearch =
        !search.trim() ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.customer_name?.toLowerCase().includes(search.toLowerCase()) ??
          false);
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [proposals, search, statusFilter]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: proposals.length };
    proposals.forEach((p) => {
      result[p.status] = (result[p.status] || 0) + 1;
    });
    return result;
  }, [proposals]);

  const filterTabs: { key: StatusFilter; label: string }[] = [
    { key: "all", label: `Tümü (${counts.all || 0})` },
    { key: "draft", label: `Taslak (${counts.draft || 0})` },
    { key: "sent", label: `Gönderildi (${counts.sent || 0})` },
    { key: "viewed", label: `Görüntülendi (${counts.viewed || 0})` },
    { key: "accepted", label: `Kabul (${counts.accepted || 0})` },
  ];

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-md)",
          marginBottom: "var(--space-xl)",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--t-title)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
            }}
          >
            Teklifler
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--t-small)",
              color: "var(--muted)",
              marginTop: 2,
            }}
          >
            {proposals.length} teklif
          </p>
        </div>
        <Link
          href="/dashboard/proposals/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "var(--space-sm) var(--space-lg)",
            borderRadius: "var(--radius-md)",
            background: "var(--ocean)",
            color: "white",
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-small)",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(27,79,114,0.2)",
            transition: "all var(--duration-fast)",
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
          Yeni Teklif
        </Link>
      </div>

      {/* Search + filters */}
      <div
        style={{
          marginBottom: "var(--space-lg)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)",
        }}
      >
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Teklif adı veya müşteri ara..."
          style={{
            width: "100%",
            maxWidth: 400,
            padding: "var(--space-sm) var(--space-md)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            background: "white",
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-small)",
            color: "var(--ink)",
            outline: "none",
            transition: "border-color var(--duration-fast)",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--ocean)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />

        {/* Status tabs */}
        <div
          style={{ display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              style={{
                padding: "5px 14px",
                borderRadius: 999,
                background: statusFilter === tab.key ? "var(--ocean)" : "white",
                color: statusFilter === tab.key ? "white" : "var(--muted)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--t-label)",
                cursor: "pointer",
                transition: "all var(--duration-fast)",
                border: `1px solid ${statusFilter === tab.key ? "transparent" : "var(--border)"}`,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState filtered={proposals.length > 0} />
      ) : (
        <div
          style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto auto",
              gap: "var(--space-lg)",
              padding: "var(--space-sm) var(--space-lg)",
              background: "var(--sand)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {["Teklif", "", "", ""].map((h, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--t-label)",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                {h}
              </div>
            ))}
          </div>

          <AnimatePresence>
            {filtered.map((proposal, i) => (
              <ProposalRow key={proposal.id} proposal={proposal} index={i} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
