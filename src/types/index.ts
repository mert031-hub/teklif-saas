export type UserRole = "owner" | "admin" | "member";
export type ProposalStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "accepted"
  | "expired";
export type EventType =
  | "view"
  | "block_view"
  | "price_check"
  | "share"
  | "accept";

export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  brand_color: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  agency_id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  agency_id: string;
  created_by: string | null;
  title: string;
  slug: string;
  status: ProposalStatus;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  valid_until: string | null;
  base_price: number;
  currency: string;
  cover_image_url: string | null;
  blocks: ProposalBlock[];
  theme: ProposalTheme;
  created_at: string;
  updated_at: string;
}

export interface ProposalBlock {
  id: string;
  type:
    | "hero"
    | "hotel"
    | "flight"
    | "video"
    | "price"
    | "gallery"
    | "text"
    | "map";
  order: number;
  data: Record<string, unknown>;
  visible: boolean;
}

export interface ProposalTheme {
  primaryColor?: string;
  fontFamily?: string;
  darkMode?: boolean;
}

export interface ProposalAnalytics {
  id: string;
  proposal_id: string;
  event_type: EventType;
  block_id: string | null;
  duration_ms: number | null;
  ip_hash: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface Media {
  id: string;
  agency_id: string;
  uploaded_by: string | null;
  url: string;
  storage_path: string;
  file_name: string | null;
  file_size: number | null;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  created_at: string;
}
