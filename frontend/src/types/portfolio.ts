export interface SiteConfiguration {
  id: number;
  professor_name: string;
  designation: string;
  secondary_roles: string;
  department: string;
  university: string;
  location: string;
  short_bio: string;
  full_bio: string;
  hero_tagline: string;
  profile_image?: string | null;
  profile_image_url: string;
  cv_file?: string | null;
  cv_external_url: string;
  email_primary: string;
  email_secondary: string;
  office_room: string;
  google_scholar_url: string;
  orcid_url: string;
  scopus_url: string;
  researchgate_url: string;
  github_url: string;
  linkedin_url: string;
  top_2_percent_badge_text: string;
  is_accepting_phd: boolean;
  recruitment_banner_text: string;
  recruitment_banner_active: boolean;
  updated_at: string;
}

export interface ImpactMetric {
  id: number;
  label: string;
  value: string;
  change_or_subtext: string;
  icon_name: string;
  display_order: number;
  is_visible: boolean;
}

export interface ResearchArea {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  detailed_methodology: string;
  icon_name: string;
  accent_color: string;
  keywords_csv: string;
  featured_image?: string | null;
  featured_image_url?: string;
  publication_count?: number;
  display_order: number;
  is_active: boolean;
}

export interface Publication {
  id: number;
  title: string;
  authors: string;
  venue_name: string;
  publication_type: 'JOURNAL_Q1' | 'JOURNAL_SCI' | 'CONFERENCE' | 'BOOK_CHAPTER' | 'PATENT' | 'BOOK';
  publication_type_display?: string;
  year: number;
  volume_issue_pages: string;
  impact_factor: string;
  quartile: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'NA';
  doi: string;
  pdf_url: string;
  pdf_upload?: string | null;
  code_url: string;
  abstract: string;
  bibtex_raw: string;
  citation_count: number;
  is_featured: boolean;
  research_area?: number | null;
  research_area_title?: string;
  display_order: number;
}

export interface SponsoredProject {
  id: number;
  title: string;
  funding_agency: string;
  role: 'PI' | 'CO_PI' | 'MENTOR';
  role_display?: string;
  grant_amount: string;
  start_year: number;
  end_year: string;
  status: 'ONGOING' | 'COMPLETED';
  status_display?: string;
  summary: string;
  display_order: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role_category: 'POSTDOC' | 'PHD_CURRENT' | 'PHD_ALUMNI' | 'MASTERS' | 'UNDERGRAD';
  role_category_display?: string;
  research_topic: string;
  enrollment_year?: number | null;
  graduation_year?: string;
  current_position?: string;
  photo?: string | null;
  photo_url?: string;
  scholar_url?: string;
  linkedin_url?: string;
  display_order: number;
}

export interface Course {
  id: number;
  code: string;
  title: string;
  level: 'UG' | 'PG' | 'PHD';
  level_display?: string;
  semester: string;
  description: string;
  syllabus_url?: string;
  is_current: boolean;
  display_order: number;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: 'PAPER' | 'AWARD' | 'TALK' | 'GRANT' | 'OPENING';
  category_display?: string;
  summary: string;
  external_link?: string;
  is_pinned: boolean;
  display_order: number;
}

export interface ResearchOpening {
  id: number;
  position_type: 'PHD' | 'POSTDOC' | 'MTECH' | 'INTERN';
  position_type_display?: string;
  title: string;
  is_open: boolean;
  prerequisites: string;
  stipend_or_funding_info: string;
  email_subject_prefix: string;
  display_order: number;
}

export interface ProspectiveApplicationPayload {
  applicant_name: string;
  email: string;
  phone?: string;
  current_institution: string;
  degree_and_cgpa: string;
  position_applied: string;
  research_interest_statement: string;
  paper_read_reference?: string;
  cv_link?: string;
}

export interface PortfolioBundle {
  site_config: SiteConfiguration;
  impact_metrics: ImpactMetric[];
  research_areas: ResearchArea[];
  publications: Publication[];
  projects: SponsoredProject[];
  team_members: TeamMember[];
  courses: Course[];
  news_items: NewsItem[];
  openings: ResearchOpening[];
}
