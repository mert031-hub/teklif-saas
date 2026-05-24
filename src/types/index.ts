// src/types/index.ts

export type ProposalStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "accepted"
  | "expired";

export type BlockType =
  | "hero"
  | "text"
  | "hotel"
  | "flight"
  | "video"
  | "gallery"
  | "price"
  | "map";

export interface ProposalBlock {
  id: string;
  type: BlockType;
  order: number;
  visible: boolean;
  data: Record<string, unknown>;
}

export interface ProposalTheme {
  primaryColor: string;
  fontFamily?: string;
}

export interface Proposal {
  id: string;
  agency_id: string;
  created_by: string | null;
  title: string;
  slug: string;
  status: ProposalStatus;
  blocks: ProposalBlock[];
  theme: ProposalTheme;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  base_price: number;
  currency: string;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
}

export interface Agency {
  id: string;
  name: string;
  slug: string;
  brand_color: string;
  owner_id: string;
  phone: string | null;
  website: string | null;
  address: string | null;
  logo_url: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  agency_id: string | null;
  full_name: string;
  role: "owner" | "admin" | "member";
  avatar_url: string | null;
  created_at: string;
}

export interface ProposalAnalytics {
  id: string;
  proposal_id: string;
  block_id: string | null;
  event_type: "view" | "block_view" | "accept";
  duration_ms: number | null;
  ip_hash: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface Media {
  id: string;
  agency_id: string;
  url: string;
  filename: string;
  size_bytes: number;
  mime_type: string;
  created_at: string;
}
