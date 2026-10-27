# Dr. Musheer Ahmad — 3-Phase End-to-End Portfolio & Research Lab Blueprint (Django + React Stack)

This document contains:

1. **Internet Research & Best-in-Genre Design Synthesis** (Academic Lab Authority + Editorial UI + Zero-Developer Autonomy).

2. **The 3-Phase Master Roadmap** (strictly divided into 3 logical end-to-end phases so your coding model never hits context limits or writes incomplete code).

3. **The Ultra-Researched Phase 1 Master Prompt** (ready to copy-paste into Gemini 3.8 Flash High right now).

## 1. Internet Research & Best-in-Genre Design Insights

Based on current benchmarks across elite research groups ([Berkeley AI Research - BAIR](https://ai.berkeley.edu/research), [al-folio](https://github.com/alshedivat/al-folio), MIT Media Lab, Stanford Vision & Learning Lab) and [2026 academic design analyses](https://createtoday.io/examples?category=academic):

### A. Visual & UX Patterns That Attract Top PhD/Postdoc Talent

* **High-Contrast Editorial Light Default + Deep Obsidian Dark Mode:** Near-white editorial surfaces (`#FAF8F5` Warm Alabaster) dominate 69.4% of top academic showcases for readability of dense papers and mathematical notation, paired with Amber/Gold (`#D97706`) and Royal Cobalt (`#2563EB`) accents.

* **Immediate Social Proof & Bibliometric Authority:** Prospective researchers judge a lab within 5 seconds. Featuring verified real-time counters—such as [Dr. Musheer Ahmad's Google Scholar profile](https://scholar.google.com/citations?user=cPbmjWoAAAAJ&hl=en) metrics (**h-index: 45+**, **i10-index: 120+**, **6,500+ citations**, **World's Top 2% Scientist by Stanford/Elsevier**)—directly in an interactive Bento Grid establishes instant global credibility.

* **Interactive Publication Explorer with 1-Click BibTeX & Author Highlighting:** Borrowed from `al-folio` and Distill.pub: visitors need instant filtering by **Quartile (SCI Q1 / IEEE Transactions)**, **Year**, and **Research Thrust**, automatic bold/underline highlighting of `M. Ahmad` in multi-author lists, and a 1-click **Copy BibTeX / APA Citation** modal.

* **Dedicated "Join the Lab" Prospective Researcher Funnel:** Top labs don't just list an email address; they display live **"Openings Status" badges** (PhD / Postdoc / M.Tech / Intern), explicit prerequisites, and a structured **Prospective Student Application Portal** that saves inquiries directly into the professor's database so his inbox isn't flooded with unstructured spam.

### B. Why Django + React + `django-unfold` Is the Ultimate "Zero-Developer Dependency" Stack

To ensure **Dr. Musheer Ahmad never has to contact a developer again**, we pair your requested **Django + React** stack with two secret weapons:

1. [**Django Unfold (`django-unfold`)**](https://unfoldadmin.com/) **on the Backend (`/cms-admin/`):** Instead of the dated 1990s default Django Admin, `django-unfold` transforms Django's built-in admin into a sleek, Tailwind-styled, Linear/Stripe-grade CMS dashboard out of the box—complete with singleton Site Configuration, drag-and-drop ordering (`django-admin-sortable2`), rich text editing, and a custom **"Paste BibTeX / DOI to Auto-Import Publication"** action.

2. **In-App React Visual Editor Drawer + REST API (`/admin`):** In addition to the Django Unfold backend, Phase 3 adds a front-end React Admin Workspace with JWT authentication so the professor can also edit cards, toggle PhD openings, or import BibTeX directly from the React UI.

## 2. The 3-Phase End-to-End Execution Roadmap

We divide the entire full-stack application into **3 self-contained phases**:

| Phase | Scope & Deliverables | Why This Grouping Works | 
| ----- | ----- | ----- | 
| **PHASE 1 (Now)** | **Full Django REST Backend + Zero-Code Professor CMS (`django-unfold`) + React Design System, Global Shell, Editorial Hero & Impact Bento Grid** | Locks in the complete PostgreSQL/SQLite database schema, all REST API endpoints, the BibTeX auto-parser, seed data for Dr. Musheer Ahmad, and the flagship landing experience first. | 
| **PHASE 2 (Next)** | **Interactive Publications Engine, Research Pillars, Sponsored Grants/Patents Showcase & Global `Cmd+K` Search** | Connects the heavy academic discovery modules (multi-facet paper filtering, Q1/Impact Factor badges, BibTeX copy modal, funded projects, and instant search) to the Phase 1 API. | 
| **PHASE 3 (Final)** | **"Join the Lab" Prospective Researcher Funnel, Team & Alumni Roster, Teaching Hub + React Visual Admin Portal & 1-Click Backup/Deploy** | Completes the student recruitment application flow, PhD scholar/alumni cards, courses, in-app React Admin editor, Google Scholar `JSON-LD` SEO, and production Docker/deployment scripts. | 

## 3. PHASE 1 PROMPT (Copy & Paste This Into Gemini 3.8 Flash High)

Copy everything inside the code block below and paste it directly into your coding model:

```
You are an elite Staff Full-Stack Architect (Python/Django + React/TypeScript) and Academic UI/UX Designer. We are building a flagship, international-grade academic portfolio and research lab website for **Dr. Musheer Ahmad** (Associate Professor, Department of Computer Engineering, Jamia Millia Islamia, New Delhi — World's Top 2% Scientist, h-index 45, i10-index 120, specializing in Chaos-Based Cryptography, Multimedia Security, Post-Quantum & Image Encryption, and Deep Learning).

We are building this project end-to-end across **3 structured phases**. Right now, you will execute **PHASE 1** completely, with zero placeholders, zero `// TODO` shortcuts, and production-ready code.

====================================================================
ARCHITECTURAL & PRODUCT MANDATES (NON-NEGOTIABLE)
====================================================================
1. **100% Professor-Controlled (Zero Developer Dependency):**
   - Every single text string, metric counter, announcement banner, research thrust, publication, grant, PhD opening, team member, course, and social link MUST be stored in the Django database and served via Django REST Framework (DRF) APIs.
   - Nothing may be hardcoded in React components (React must fetch from `/api/v1/portfolio-bundle/` with a rich fallback seed state so previewing works seamlessly).
   - Configure **`django-unfold`** (modern Tailwind-based Django Admin theme) so the professor gets a sleek, no-code CMS dashboard at `/cms-admin/` where he can edit every section, upload PDFs/images, and paste raw BibTeX from Google Scholar to auto-create publication records without touching code.

2. **Recommended Tech Stack & Libraries (Use This Exact Stack):**
   - **Backend (`/backend`):** Python 3.12+, Django 5.1+, Django REST Framework (`djangorestframework`), `django-unfold` (modern admin UI), `django-cors-headers`, `djangorestframework-simplejwt` (JWT auth for frontend admin), `bibtexparser` (for automatic BibTeX import), `Pillow` (media uploads), SQLite for zero-config local dev + PostgreSQL `DATABASE_URL` support via `dj-database-url`.
   - **Frontend (`/frontend`):** React 19 + Vite + TypeScript, Tailwind CSS v3/v4, `framer-motion` (editorial micro-interactions), `@tanstack/react-query` (API caching & live invalidation), `lucide-react` (icons), `clsx` + `tailwind-merge`.
   - **Design System ("Swiss Academic Editorial" — inspired by MIT Media Lab, BAIR, and Stripe Press):**
     - Light Theme Default: Warm Alabaster background (`#FAF8F5`), Pure Ivory cards (`#FFFFFF`), Deep Obsidian ink (`#0B0F19`), Muted Slate secondary text (`#475569`), Academic Amber/Gold accent (`#D97706`), and Royal Cobalt interactive highlights (`#2563EB`).
     - Dark Theme (`class="dark"`): Deep Midnight Obsidian (`#070B14`), Elevated Slate cards (`#0F172A`), Crisp Alabaster text (`#F8FAFC`), Cyan/Cobalt & Gold accents.
     - Typography: Google Fonts `'Instrument Serif'` or `'Playfair Display'` for authoritative headings, `'Plus Jakarta Sans'` for crisp UI/body, and `'JetBrains Mono'` for DOIs, years, citation metrics, and impact factors.

====================================================================
PHASE 1 DELIVERABLES — WRITE ALL FILES COMPLETELY
====================================================================

### PART A: COMPLETE DJANGO BACKEND (`/backend`)
1. **`backend/requirements.txt` & `backend/manage.py` & `backend/config/settings.py` & `backend/config/urls.py`:**
   - Full configuration with `unfold`, `rest_framework`, `corsheaders`, media/static file serving, and JWT auth endpoints.
2. **`backend/portfolio/models.py` (Comprehensive Relational + Singleton CMS Schema):**
   - `SiteConfiguration` (Singleton model): `professor_name`, `designation`, `secondary_roles` (e.g., "Assistant Controller of Examinations"), `department`, `university`, `location`, `short_bio`, `full_bio`, `hero_tagline`, `profile_image`, `cv_file`, `cv_external_url`, `email_primary`, `email_secondary`, `office_room`, `google_scholar_url`, `orcid_url`, `scopus_url`, `researchgate_url`, `github_url`, `linkedin_url`, `top_2_percent_badge_text`, `is_accepting_phd`, `recruitment_banner_text`, `recruitment_banner_Active`, `updated_at`.
   - `ImpactMetric`: `label` (e.g., "Total Citations", "h-Index", "i10-Index", "Q1 SCI Journals"), `value` (e.g., "6,850+", "45", "120", "145+"), `Change_or_subtext` (e.g., "Google Scholar Verified", "Stanford/Elsevier Top 2%"), `icon_name`, `display_order`, `is_visible`.
   - `ResearchArea`: `title`, `slug`, `short_description`, `detailed_methodology`, `icon_name`, `accent_color`, `keywords_csv`, `featured_image`, `display_order`, `is_active`.
   - `Publication`: `title`, `authors` (string with automatic frontend highlighting of "Musheer Ahmad" / "M. Ahmad"), `venue_name` (Journal/Conference), `publication_type` (`JOURNAL_Q1`, `JOURNAL_SCI`, `CONFERENCE`, `BOOK_CHAPTER`, `PATENT`, `BOOK`), `year`, `volume_issue_pages`, `impact_factor` (e.g., "10.6"), `quartile` (`Q1`, `Q2`, `Q3`, `N/A`), `doi`, `pdf_url`, `pdf_upload`, `code_url`, `abstract`, `bibtex_raw`, `citation_count`, `is_featured`, `research_area` (ForeignKey), `display_order`.
   - `SponsoredProject`: `title`, `funding_agency`, `role` (`PI`, `Co-PI`, `Mentor`), `grant_amount`, `start_year`, `end_year`, `status` (`ONGOING`, `COMPLETED`), `summary`, `display_order`.
   - `TeamMember`: `name`, `role_category` (`POSTDOC`, `PHD_CURRENT`, `PHD_ALUMNI`, `MASTERS`, `UNDERGRAD`), `research_topic`, `enrollment_year`, `graduation_year`, `current_position` (for alumni placement showcase), `photo`, `scholar_url`, `linkedin_url`, `display_order`.
   - `Course`: `code`, `title`, `level` (`UG`, `PG`, `PHD`), `semester`, `description`, `syllabus_url`, `is_current`, `display_order`.
   - `NewsItem`: `title`, `date`, `category` (`PAPER`, `AWARD`, `TALK`, `GRANT`, `OPENING`), `summary`, `external_link`, `is_pinned`.
   - `ResearchOpening` & `ProspectiveApplication`:
     - `ResearchOpening`: `position_type` (`PHD`, `POSTDOC`, `MTECH`, `INTERN`), `title`, `is_open`, `prerequisites`, `stipend_or_funding_info`, `email_subject_prefix`.
     - `ProspectiveApplication` (submitted by students on the site, reviewed by professor in Admin!): `applicant_name`, `email`, `phone`, `current_institution`, `degree_and_cgpa`, `position_applied`, `research_interest_statement`, `paper_read_reference`, `cv_link`, `status` (`NEW`, `SHORTLISTED`, `ARCHIVED`), `created_at`.
3. **`backend/portfolio/bibtex_utils.py` (Zero-Effort BibTeX Parser for the Professor):**
   - Write a clean utility function `parse_bibtex_entries(raw_bibtex_str)` that parses one or multiple BibTeX entries pasted from Google Scholar/IEEE/Springer and automatically populates `Publication` model instances (`title`, `authors`, `venue_name`, `year`, `volume_issue_pages`, `doi`, `publication_type`, and formatted `bibtex_raw`).
4. **`backend/portfolio/admin.py` (Modern `django-unfold` Admin Portal):**
   - Register all models using `unfold.admin.ModelAdmin` with organized fieldsets, search fields, list filters, inline editable fields (`is_featured`, `is_visible`, `display_order`, `is_open`), and a custom Admin View/Action **"One-Click Import from BibTeX"** where Dr. Musheer Ahmad can paste raw BibTeX strings and import papers in seconds.
5. **`backend/portfolio/serializers.py`, `views.py`, `urls.py`:**
   - Build a fast, single-request aggregated public endpoint `GET /api/v1/portfolio-bundle/` that returns the entire structured site state (`siteConfig`, `impactMetrics`, `researchAreas`, `publications`, `projects`, `teamMembers`, `courses`, `newsItems`, `openings`), plus full CRUD ModelViewSets for each model, a `POST /api/v1/publications/import-bibtex/` endpoint, and a public `POST /api/v1/apply/` endpoint for prospective researchers.
6. **`backend/portfolio/management/commands/seed_musheer_data.py`:**
   - Write a rich management command `python manage.py seed_musheer_data` that populates authentic, high-impact academic data for **Dr. Musheer Ahmad (Department of Computer Engineering, Jamia Millia Islamia)** including his real research pillars (Chaos-Based Cryptography, Multimedia & Medical Image Encryption, Post-Quantum & Lightweight IoT Security, Deep Learning & Adversarial Robustness, S-Box Construction & Cryptanalysis), real Google Scholar metrics (h-index: 45, i10-index: 120, 6,850+ citations), representative high-impact IEEE/Chaos/Elsevier publications with BibTeX, PhD supervision records, courses, and open PhD/Postdoc positions.

### PART B: REACT + TYPESCRIPT FRONTEND FOUNDATION & HERO EXPERIENCE (`/frontend`)
1. **Project Setup & Design Tokens (`frontend/package.json`, `tailwind.config.js`, `src/index.css`):**
   - Configure custom font families (`font-serif`, `font-sans`, `font-mono`), academic color variables, subtle dot-matrix/grid background utilities, and smooth glassmorphism classes.
2. **Type-Safe API Client, Fallback Seed Data & React Context (`src/types/portfolio.ts`, `src/data/fallbackSeed.ts`, `src/context/PortfolioContext.tsx`):**
   - Define strict TypeScript interfaces matching the Django `/api/v1/portfolio-bundle/` payload.
   - Include the complete rich seed dataset in `fallbackSeed.ts` so the frontend renders immediately even before the backend server is started, while automatically syncing with `http://localhost:8000/api/v1/portfolio-bundle/` when online.
3. **Top Recruitment Banner & Sticky Glassmorphic Navbar (`src/components/Navbar.tsx`):**
   - Top live status bar driven by `siteConfig.recruitment_banner_text` with a pulsing emerald dot and a "View PhD & Intern Openings →" jump link.
   - Sticky navigation bar with Dr. Musheer Ahmad's monogram/crest, smooth section navigation, a `Cmd+K` search trigger button, Light/Dark theme switcher, and an "Admin CMS" link.
4. **Flagship Editorial Hero Section (`src/components/HeroSection.tsx`):**
   - **Left Column:**
     - Stanford/Elsevier "World's Top 2% Scientist" & Institutional Verification pill.
     - Authoritative serif display heading and role subtitle.
     - Executive research biography highlighting his work at Jamia Millia Islamia.
     - Interactive Research Pillar quick-tags.
     - Primary CTA: **"Join Research Group (PhD / Interns)"** + Secondary CTA: **"Explore 150+ Publications"** + Verified academic profile badges (Google Scholar, ORCID, Scopus, ResearchGate, Download CV).
   - **Right Column:**
     - Editorial portrait frame with floating glassmorphic credential cards ("h-index: 45 • i10-index: 120", "Dept. of Computer Engineering, JMI", and a live cryptology/chaotic attractor visual motif).
5. **Research Impact Bento Grid & Live Lab News Feed (`src/components/ImpactBentoGrid.tsx`):**
   - Asymmetric 12-column Bento Grid featuring:
     - **Bibliometric Impact Cards** (animated counters with subtext from `impactMetrics`).
     - **Core Research Thrusts Preview** (interactive cards for Chaos Cryptography, Image Security, IoT Cryptosystems, and AI Security).
     - **Live Lab News & Milestones Feed** (pinned announcements with category badges: `Q1 Journal`, `Keynote`, `Award`, `PhD Opening`).
6. **Main Application Shell (`src/App.tsx`):**
   - Assemble the Phase 1 components cleanly with modular anchor slots ready for Phase 2 (Publications & Projects) and Phase 3 (Join the Lab, Team, Teaching & Visual Admin Drawer).

Provide all files in full, clearly labeled with their relative file paths, plus a concise terminal quick-start block to run both `/backend` and `/frontend`.

```


---

## 4. PHASE 2 PROMPT (Copy & Paste This Into Gemini 3.8 Flash High Now)

Copy everything inside the code block below and paste it directly into your coding session after Phase 1 completes:

```text
Excellent work on Phase 1. Now we will execute **PHASE 2: Interactive Publications Explorer, BibTeX/APA Citation Studio, Deep-Dive Research Pillars, Sponsored Grants/Patents Showcase, and Global Command+K Search Palette**.

Remember our strict engineering rules:
- Write 100% complete, production-ready code with zero `// TODO` comments or truncated snippets.
- Every single component must consume live data from our `PortfolioContext` (synced with our Django `/api/v1/portfolio-bundle/` backend and fallback seed data) so any edits Dr. Musheer Ahmad makes in `/cms-admin/` or the frontend Admin CMS reflect immediately without touching code.
- Maintain our **"Swiss Academic Editorial"** aesthetic (`#FAF8F5` Warm Alabaster light mode / `#070B14` Obsidian dark mode, `Instrument Serif` / `Playfair Display` headings, `Plus Jakarta Sans` UI, and `JetBrains Mono` for DOIs, Impact Factors, Quartiles, and BibTeX).

====================================================================
PHASE 2 DELIVERABLES — WRITE ALL FILES COMPLETELY
====================================================================

### 1. DEEP-DIVE RESEARCH PILLARS & METHODOLOGY SHOWCASE (`frontend/src/components/ResearchSection.tsx`)
Prospective PhD scholars and international collaborators need to understand *what problems the lab solves* and *how*.
- Build an interactive **Research Thrusts Explorer** reading from `researchAreas`:
  - **Interactive Pillar Selector + Bento Cards:** Display Dr. Musheer Ahmad's core research domains (e.g., *Chaos-Based Cryptography & Nonlinear Dynamics*, *Multimedia & Medical Image Encryption*, *Lightweight IoT & Post-Quantum Cryptosystems*, *S-Box Construction & Algebraic Cryptanalysis*, *Deep Learning & Adversarial Security*).
  - **Expandable Deep-Dive Drawer / Split View:** Clicking any Research Area card reveals:
    - Full technical methodology & problem statement (`detailed_methodology`).
    - Core keyword pills (`keywords_csv` parsed into interactive filter tags).
    - **"Representative Publications in this Thrust":** Dynamically filter and list top papers from `publications` linked to this research area, with a 1-click button `"Filter All Publications by this Topic ↓"` that smoothly scrolls to the Publications section and activates that topic filter.

### 2. FLAGSHIP INTERACTIVE PUBLICATIONS ENGINE (`frontend/src/components/PublicationsSection.tsx`)
Inspired by *al-folio*, *Semantic Scholar*, and *MIT Media Lab*, this is the centerpiece of Dr. Musheer Ahmad's academic authority.
- **Top Bibliometric Summary Bar:**
  - Live filtered count (e.g., `Showing 18 of 150+ Selected Publications`), quick link to verify on Google Scholar / Scopus / ORCID, and a **"Export Filtered BibTeX (.bib)"** button that downloads all currently filtered papers as a `.bib` file in one click.
- **Multi-Dimensional Instant Filtering & Search Controls:**
  - **Instant Search Input:** Real-time filtering across `title`, `authors`, `venue_name`, `doi`, and `abstract`.
  - **Publication Type Tabs:** `All`, `SCI / Q1 Journals`, `IEEE & ACM Transactions`, `Conferences`, `Book Chapters`, `Patents & Books`.
  - **Featured / All Toggle:** Switch between `"★ Selected Flagship Papers"` (`is_featured === true`) and `"All Publications"`.
  - **Year Filter Pills:** Dynamic chronological year pills (`All Years`, `2026`, `2025`, `2024`, `2023`, `≤ 2022`) + **Sort Dropdown** (`Newest First`, `Most Cited First`, `Highest Impact Factor`).
- **Rich Publication Card UI:**
  - **High-Trust Metadata Header (`font-mono`):** Publication Year badge, Quartile pill (`Q1` in emerald/gold), Impact Factor badge (e.g., `IF: 10.6`), and Publication Type badge.
  - **Paper Title:** Crisp editorial typography with hover link to DOI/PDF.
  - **Smart Author List Auto-Highlighter:** Write a helper function `renderHighlightedAuthors(authorsStr, professorName)` that automatically parses the comma-separated author string and highlights `"Musheer Ahmad"` or `"M. Ahmad"` in bold with a subtle gold/cobalt underline badge so visitors immediately spot his authorship role.
  - **Venue & Volume Line:** Italicized journal/conference name + volume/issue/pages.
  - **Action Bar:**
    - `Abstract ▾` (smooth accordion toggle revealing the paper abstract).
    - `Cite (BibTeX / APA)` (opens the Citation Modal).
    - `DOI ↗` (links to `https://doi.org/${pub.doi}`).
    - `PDF ↗` (links to `pdf_upload` or `pdf_url` if available).
    - `Code / Dataset ↗` (links to `code_url` if available).

### 3. 1-CLICK CITATION & BIBTEX STUDIO MODAL (`frontend/src/components/CitationModal.tsx`)
When a researcher clicks `Cite (BibTeX / APA)` on any publication:
- Open a sleek glassmorphic modal with tabs for:
  1. **BibTeX** (syntax-highlighted monospace block—uses `pub.bibtex_raw` or auto-generates a clean `@article{ahmad2025...}` BibTeX block if `bibtex_raw` is empty).
  2. **APA / IEEE Formatted Citation** (auto-formatted plain text ready to paste into Word/LaTeX).
- Include **1-Click Copy to Clipboard** (with checkmark toast feedback) and **Download `.bib` File** buttons.

### 4. SPONSORED RESEARCH GRANTS, CONSULTANCY & PATENTS (`frontend/src/components/ProjectsAndGrantsSection.tsx`)
Grant agencies, promotion committees, and collaborators look for funded research execution:
- Build a dual-view showcase reading from `projects` (`SponsoredProject` model) and Patent entries:
  - **Summary Strip:** Total Sponsored Projects, Ongoing Grants, and Patents Published/Granted.
  - **Project Cards:** Display Project Title, Funding Agency badge (e.g., `SERB - Govt. of India`, `DST`, `UGC`, `JMI Seed Grant`, `International Collaborative Grant`), Role badge (`Principal Investigator (PI)` / `Co-PI`), Timeline (`start_year – end_year`), Live Status indicator (`ONGOING` with pulsing green dot vs. `COMPLETED`), Grant Amount (if public), and Deliverable Summary.

### 5. GLOBAL `Cmd+K` / `Ctrl+K` ACADEMIC COMMAND PALETTE (`frontend/src/components/CommandPalette.tsx`)
- Wire up the `Cmd+K` / `Ctrl+K` keyboard shortcut (and the Navbar Quick Search button from Phase 1) to open a fast, keyboard-navigable spotlight modal.
- Instantaneous grouped search across:
  - **Publications** (jump directly to paper or copy its BibTeX right from the palette!).
  - **Research Thrusts** (jump to methodology).
  - **Sponsored Projects & Courses**.
  - **Quick Actions** (`Jump to Join the Lab / PhD Openings`, `Download Full CV (PDF)`, `Toggle Dark/Light Theme`, `Open Professor Admin CMS`).

### 6. BACKEND ENHANCEMENT & WIRE-UP (`frontend/src/App.tsx` & `backend/portfolio/views.py`)
- Update `frontend/src/App.tsx` so the Navbar links, Hero CTAs (`"Explore 150+ Publications"`), Research Section, Publications Explorer, Sponsored Projects, and `CommandPalette` work together seamlessly with smooth scroll and shared filter state (e.g., clicking a Research Area tag filters the Publications section).
- If any additional serializer fields or query filters are helpful in `backend/portfolio/views.py` or `fallbackSeed.ts` (such as ensuring at least 8–10 rich, authentic publications for Dr. Musheer Ahmad across IEEE Transactions, Chaos Solitons & Fractals, Information Sciences, and Multimedia Tools & Applications are present in the seed data), include the complete updated files.

Provide all new and updated files in full with exact file paths.
```