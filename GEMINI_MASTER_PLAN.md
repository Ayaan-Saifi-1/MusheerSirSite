# Dr. Musheer Ahmad Site: Master Plan and Prompts for Gemini

## How to use this file

1. Put this file in the repo root. Tell Gemini once: "Read GEMINI_MASTER_PLAN.md fully. It is the source of truth for every phase."
2. Attach 4 to 6 screenshots of academic or editorial sites you like (from Mobbin or anywhere) to the Phase 1 prompt. Gemini copies a picture far better than a description.
3. Paste the Phase 1 prompt. Review the result in the browser. Only then paste Phase 2, then Phase 3.
4. At the end of every phase, Gemini must run the Review Loop in section 9. Do not skip it. This is what stops the "generic AI look".

---

## 1. What went wrong with the first build (so it is not repeated)

The first build looked like a template because it used the standard AI-site kit:

- Icons and emoji-style glyphs on every card.
- A colored pill badge above every heading.
- Rounded cards with shadows and a bento grid used for everything.
- Glassmorphism, pulsing dots, floating "credential cards", gradient blobs.
- A stock photo of someone who is not the professor.
- Marketing copy ("Pioneering", "Next-Generation", "Flagship Engine").
- Invented publications, patents, grants and scholar names.
- Everything on one long scrolling page.

The new site must feel like an editorial publication that happens to belong to a professor. It should have restraint, typography, whitespace and real content. Think the research pages of a top university or a Google/Anthropic research blog, not a startup landing page.

---

## 2. Design direction

**One-line brief:** a calm, typographic, high-trust academic site. The writing and the work are the design.

**Reference points** (Gemini should study the structure and restraint, not copy pixels):

- Stripe Press and Distill.pub: editorial typography, generous margins, figures with captions.
- Anthropic and Google DeepMind research pages: large quiet headings, plain text lists, hairline dividers.
- Stanford HAI and MIT CSAIL people and research pages: clear information hierarchy, real photography.
- Andrej Karpathy's and Chris Olah's sites, and al-folio: publication lists that are fast to scan.
- Linear and Vercel marketing sites: spacing, alignment, and micro-interaction discipline only (not their dark neon look).

**Feeling words:** quiet, exact, confident, scholarly, spacious. **Not:** flashy, techy, playful, startup.

---

## 3. Design system (non-negotiable specifics)

**Layout**
- Multi-page site with real routes, not one long scroll. 12-column grid, max content width 1200px, text column max 68ch.
- Section vertical spacing 96 to 144px desktop, 64 to 80px mobile. Whitespace is the main design tool.
- Content aligned to a strict left edge. Use asymmetric two-column layouts (narrow label column, wide content column) as seen on editorial sites.

**Color (light theme only for v1)**
- Background `#FFFFFF`, secondary surface `#F6F5F2` (use sparingly, full-bleed bands only).
- Text `#14171A`, secondary text `#5B6168`, hairline rules `#E3E1DC`.
- ONE accent: deep green `#0E4B3B` (a quiet nod to Jamia). Used only for links, focus rings, and one primary button style. No second accent. No gradients anywhere.
- Dark mode is out of scope until Phase 3 and only if time permits.

**Typography**
- Headings: a refined text serif such as Newsreader or Source Serif 4. Body and UI: Inter. Monospace only for DOIs and BibTeX.
- Fluid scale with `clamp()`. Display (home hero) about 56 to 72px, tight leading (1.05), slight negative tracking. Body 17 to 18px with 1.65 leading. Small caps or uppercase micro-labels at 12px with +0.08em tracking for section labels.
- Never more than two weights per family on a page.

**Components**
- No cards with shadows. Use hairline dividers and whitespace. If a container is needed, a 1px border and 0 to 2px radius.
- Buttons: two styles only. Primary (solid green, white text, 2px radius). Secondary (text link with an underline that animates in). No pills.
- Links are underlined text. Hover changes underline offset and color over 150ms.
- Publication list rows: year in a left column in monospace, then title (serif), authors, venue, then plain text actions: "PDF", "DOI", "Cite", "Code". Own name in authors set in semibold, no highlight box.
- Tables and lists over tiles wherever content is list-like (team, news, courses, grants).
- Forms: large, label above field, 1px border, clear error text, no placeholder-as-label.

**Imagery**
- Only real imagery. The professor's portrait is uploaded in the admin. If none is uploaded, the layout renders without an image (never a stock photo or placeholder face).
- One optional figure on the home page: a static, thin-line (0.75px, monochrome ink) plot of a chaotic attractor, set like "Figure 1" with a caption explaining it. It is rendered once as SVG, not an animated canvas.

**Motion**
- Subtle only: 8px fade-and-rise on first scroll into view, 200 to 300ms, ease-out. No parallax, no looping animation, no pulsing, no counters ticking up. Respect `prefers-reduced-motion`.

**Writing tone (applies to all default copy)**
- Plain, factual, short sentences. No superlatives, no "cutting-edge", "pioneering", "world-class", "next-generation". State what the research is and what it is for.

---

## 4. Banned list (Gemini must never do these)

- Emoji anywhere (UI, copy, commit messages, comments). Icon libraries are not installed. If a symbol is needed, use text such as the arrow characters in link labels, or a tiny hand-written inline SVG for the menu toggle only.
- Pill badges and tags used as decoration, colored status chips, "live" dots, "NEW" markers.
- Box shadows, glassmorphism, blur, gradient backgrounds, gradient text, glowing blobs.
- Bento grids, icon-topped feature cards, three-up "feature" tiles.
- Animated number counters, marquees, typing effects, particle or canvas backgrounds.
- Stock or AI-generated portraits. Invented people, papers, grants, patents, quotes, metrics.
- Hardcoded content in React. Every string the visitor reads comes from the CMS.
- Lorem ipsum. If content is missing, the section hides itself on the public site and the admin shows a "needs content" notice.

---

## 5. Information architecture

Top navigation (text only, wordmark left): **Research, Publications, Group, Teaching, News, Join, Contact**. A secondary "CV" text link. A sticky header that hides on scroll down and returns on scroll up. Mobile: a full-screen text menu.

| Route | Purpose | Key content |
| --- | --- | --- |
| `/` | First impression and routing | Name, role, one-paragraph statement of research, portrait, Figure 1, three to four research themes with short text, 5 selected publications, "Prospective students" call-out, latest news (5 items), quiet metrics line with source and "as of" date |
| `/research` | What the lab studies | Each theme as a long-form page section with problem, approach, open questions, selected papers |
| `/research/<slug>` | Theme detail | Editorial article layout, related papers and people |
| `/publications` | Full bibliography | Search, year, type, theme, venue filters; sort; export filtered BibTeX; per-paper abstract and cite |
| `/group` | People | Current members, alumni with placements, collaborators; individual short profiles |
| `/teaching` | Courses and supervision | Courses by level and semester, syllabus links, supervision statistics |
| `/news` | Updates | Dated list with category filter, individual news pages optional |
| `/join` | Recruitment | Who we want, what we offer, how to apply, current openings, application form |
| `/contact` | Reach and locate | Address, office hours, email, map link, ORCID, Scholar, Scopus, ResearchGate |
| `/cv` | CV | Embedded CV PDF plus structured timeline (education, positions, awards, service) |

---

## 6. Admin requirements (the professor never calls a developer)

The professor is not technical. Design the admin for him, not for developers.

1. **One friendly admin**, using Django admin themed with django-unfold, but reorganized in plain language: sections named "Home page", "Research", "Publications", "People", "Teaching", "News", "Recruitment", "Applications", "Site settings". No Django jargon, no model names visible.
2. **Everything editable:** all page text, navigation labels and order, hero statement, portrait, research themes, news, team, courses, openings, footer, contact details, social links, SEO title and description per page.
3. **Rich text without HTML:** use a clean editor (Markdown with live preview, or a lightweight rich-text editor). Support headings, links, lists, figures with captions, simple math via KaTeX.
4. **Draft and Publish** on every content type, with a "Preview on site" button that opens the real page with draft content.
5. **Publication import** (the most important tool):
   - Import by ORCID iD or OpenAlex author ID (fetches his real works).
   - Import by DOI (Crossref) and by pasted BibTeX.
   - Duplicate detection. A review screen where he ticks which items to keep before saving.
   - Manual fields for quartile, impact factor, citation count, theme, "selected" flag, PDF, code link.
6. **Drag-and-drop ordering** wherever order matters (themes, selected papers, team, news pins).
7. **Image upload with crop** and automatic responsive sizes and alt text field (required).
8. **Applications inbox:** list with status (New, Shortlisted, Archived), notes, filters, CSV export, and an email notification to him on each new application.
9. **Safety nets:** change history on every item, one-click "undo to previous version" for text pages, an "Export full backup" button (database plus media zip), password reset by email, and a help page inside the admin written for non-technical users with screenshots.
10. **Empty-state guidance:** each section in the admin shows what the public page looks like and what is missing.

---

## 7. Data integrity rules

- Do not invent anything: no publications, patents, grants, citations, scholar names, awards, quotes or photos.
- Seed data contains structure only (site settings, navigation, page skeletons) and clearly labeled sample text marked "Sample, replace in admin" that never renders on the public site.
- Real publication data is loaded through the importer (ORCID or OpenAlex) after setup, by the professor or by the developer running the import command once.
- Any metric shown (citations, h-index) must be a CMS field with a source link and an "as of" date, entered by the professor. Never a hardcoded number.
- The existing seed command and the fabricated sample data in `backend/portfolio/management/commands/seed_musheer_data.py` and `frontend/src/data/fallbackSeed.ts` must be deleted or replaced.

---

## 8. Tech decisions

- **Backend:** keep Django 5, DRF, django-unfold, SimpleJWT, django-cors-headers, Pillow. Audit and refactor the existing models rather than starting blind. Rename for clarity, add `status` (draft or published), `slug`, SEO fields and revision history (django-simple-history). Add `django-import-export` for CSV, `django-ordered-model` or similar for drag-ordering. Use WhiteNoise for static files. PostgreSQL via `DATABASE_URL` in production, SQLite locally.
- **Frontend:** React and Vite and TypeScript with React Router (real routes), TanStack Query for data. **No Tailwind component soup and no icon library.** Write plain CSS with CSS variables (design tokens in one `tokens.css`, a small `components.css`, per-page CSS modules). Fonts self-hosted via Fontsource, not Google CDN.
- **SEO and sharing:** this is a public academic site, so pages must be indexable. Use react-helmet-async for titles and meta, JSON-LD (`Person`, `ScholarlyArticle`), a Django-generated `sitemap.xml` and `robots.txt`, and Open Graph images. If client-side rendering proves weak for SEO, prerender public routes at build time (vite-plugin-prerender or similar). Gemini must justify the choice in the README.
- **Accessibility:** WCAG 2.2 AA, visible focus rings, semantic landmarks, skip link, keyboard-reachable everything, color contrast checked.
- **Performance:** Lighthouse 95+ on Performance, Accessibility, Best Practices, SEO on the home and publications pages, mobile profile.

---

## 9. Review Loop (Gemini runs this at the end of every phase)

1. Start both servers. Open the site in the browser at 1440px, 768px and 390px widths. Take a screenshot of each new page at each width.
2. Compare the screenshots against the attached reference screenshots and sections 3 and 4. List every deviation honestly.
3. Fix at least the top 10 deviations. Typical problems to look for: cramped spacing, too many font sizes, anything that looks like a card, any decoration without information, any element that is not aligned to the grid, any invented text.
4. Run a text search for emoji and for any icon import. There must be zero matches.
5. Run the production build, Lighthouse, and an accessibility check. Report scores.
6. Write a short "what changed and what is still weak" note. Do not claim perfection.

---

## 10. Phase prompts (paste one at a time)

### PHASE 1: Foundations, design system, shell, and Home page

```text
Read GEMINI_MASTER_PLAN.md completely before doing anything. It overrides any earlier instruction and the earlier frontend, which the user rejected as generic and AI-looking.

Context: the repo has a Django backend (backend/) and a React frontend (frontend/) from a first attempt. The frontend is to be rebuilt from scratch. The backend is to be audited and refactored. I have attached reference screenshots of designs I like. Study them before writing CSS.

Phase 1 goals:

1. Reset the frontend. Delete all existing components, the fallback seed data, and the Tailwind setup. Remove the icon library and framer-motion. Create a new structure: src/styles/tokens.css, src/styles/base.css, src/components/, src/pages/, src/lib/.

2. Implement the design system exactly as in section 3 and obey the banned list in section 4: tokens (color, type scale with clamp, spacing scale, grid), self-hosted fonts via Fontsource, a Layout shell with a sticky auto-hiding text header, mobile menu, and a footer. Build a small kit: Container, Section with label column, Heading, TextLink, Button (primary and secondary only), DateList, PublicationRow, Figure with caption. Show them on a hidden /styleguide route for review.

3. Backend audit and refactor for Phase 1 content. Keep what is useful, remove what is not. Models needed now: SiteSettings (singleton: name, title, department, university, address, emails, portrait with alt text, CV file, profile links, metrics with source URL and as-of date), NavigationItem (ordered, editable, visible flag), HomePage (hero statement, intro paragraph, figure caption, call-out text for prospective students, SEO fields), ResearchTheme (title, slug, summary, body, order, status), NewsItem (title, date, category, body, link, pinned, status), plus Publication and SelectedPublication placeholders only as needed for the home list. Add status (draft or published) and revision history to editable content. Public read-only endpoints serve only published items. Add one endpoint that returns everything the Home page needs in a single request.

4. Admin in plain language as in section 6, items 1, 2, 3, 4, 6, 7, 10 for the models above. Group sidebar sections as listed. Add help text to every field written for a non-technical user. Delete the fabricated seed command and replace it with one that creates structure and clearly-labeled sample text that does not render publicly.

5. Build the Home page (route /) per section 5 with real data from the API: hero (name, role, statement, portrait if present), Figure 1 as a static SVG thin-line chaotic attractor with caption, research themes as numbered text blocks, five selected publications as PublicationRow, prospective-students call-out, latest five news items, a single quiet metrics line with source and date, footer. If the CMS lacks content for a section, the section does not render.

6. Add the real routes as simple placeholder pages that render their title and a "coming in the next phase" note only in development, so the navigation is final now.

7. Run the Review Loop in section 9 and show screenshots at 1440, 768 and 390 for the home page. Be critical. Fix the top 10 deviations. Confirm zero emoji and zero icon imports.

Deliver: the working site, a README section "Running locally", and the review note. Do not invent any content.
```

### PHASE 2: Scholarly content (Publications, Research, People, Teaching, News, CV)

```text
Read GEMINI_MASTER_PLAN.md again, then continue from Phase 1. Same rules: sections 3, 4, 7 and the Review Loop in section 9 apply.

Phase 2 goals:

1. Publications. Build the full /publications page: instant search (title, authors, venue, DOI, abstract), filters (year, type, research theme, quartile, selected), sorting (newest, most cited, impact factor), live count, "Export filtered BibTeX", per-paper expandable abstract, a Cite panel (BibTeX, APA, IEEE with copy and .bib download), links for PDF, DOI and Code. Authors list renders his name in semibold only. URL state: filters live in the query string so a filtered view can be shared. List style is typographic and dense like al-folio or Karpathy's site, not cards.

2. Publication import tools in the admin (section 6, item 5): import by ORCID iD or OpenAlex author ID, by DOI via Crossref, and by pasted BibTeX. Include duplicate detection and a review screen where the professor ticks what to keep. Add a management command for the same import so the developer can run it once. Do not ship any publication data that did not come from these imports.

3. Research pages. Build /research (themes as long-form editorial sections) and /research/<slug> (article layout with problem, approach, open questions, related papers, related people). Body content supports headings, figures with captions, lists, links and KaTeX math from the editor.

4. People. Build /group: current members, alumni with placements, collaborators, each with name, role, topic, years, photo (optional with required alt text), and links. Optional individual profile pages. Rendered as clean lists and a restrained grid of portraits only when photos exist.

5. Teaching and CV. Build /teaching (courses by level and term, syllabus links, supervision summary) and /cv (embedded PDF plus structured timeline for education, positions, awards, service, talks).

6. News. Build /news with category filter and optional detail pages. Keep the Home news list in sync.

7. Extend the admin for all of the above with the same standards: draft and publish with real preview, drag ordering, rich text, image crop and alt text, change history, empty-state guidance. Add admin dashboard counts of "needs content" items.

8. Performance and SEO foundations: per-page titles and meta from the CMS, canonical URLs, JSON-LD (Person on Home, ScholarlyArticle on publications), sitemap.xml and robots.txt from Django.

9. Run the Review Loop. Screenshots of every new page at 1440, 768 and 390. Report Lighthouse scores for Home and Publications. Fix the top 10 deviations. Confirm zero emoji and zero icon imports.

Deliver: working pages, import tools demonstrated with a screen recording or screenshots using the professor's real ORCID or OpenAlex ID if I provide it, and the review note.
```

### PHASE 3: Join the Lab, admin polish, SEO, accessibility, deployment, handover

```text
Read GEMINI_MASTER_PLAN.md again, then continue from Phase 2. Same rules apply.

Phase 3 goals:

1. Join page and application flow. Build /join as an editorial page: who we are looking for, what the lab offers, research directions open to new students, selection process, then current openings as a plain list (position type, title, requirements, funding, deadline, status) and a clear application form. The form asks for name, email, phone, current institution, degree and CGPA or GATE/NET score, position, research statement, which paper of his they read and what they would extend, and a CV link. Add honeypot spam protection, rate limiting, server-side validation, a confirmation screen, and a confirmation email to the applicant. Applications save to the database and email the professor. The form must be calm and professional, no confetti, no decorative success animation.

2. Applications inbox in admin (section 6, item 8): status workflow (New, Shortlisted, Archived), private notes, filters, search, CSV export, bulk actions.

3. Admin polish for a non-technical user: a Dashboard home with "What do you want to do?" shortcuts (Add news, Import publications, Update openings, View applications, Edit Home page), "View live site" button, per-section help text, a built-in Help page with written guidance and screenshots, role setup for two users (Professor with full access, Assistant with no delete rights), password reset by email, change history with one-click restore for text pages, and an "Export full backup" button (database plus media as a zip).

4. Site settings the professor can change without developer help: navigation, footer, contact details, social links, SEO defaults, announcement line (text only, shown above the header when active), Open Graph image.

5. Quality bar: WCAG 2.2 AA audit (keyboard, focus, landmarks, contrast, reduced motion), Lighthouse 95+ on all four categories for Home, Publications, Join (mobile profile), image optimization with responsive sizes and lazy loading, self-hosted fonts preloaded, no layout shift. Optional dark theme only if everything above is done and it can match the same restraint.

6. Deployment and handover: Dockerfile and docker-compose (web, Postgres, reverse proxy with HTTPS), environment variable template, production settings (security headers, secure cookies, allowed hosts, WhiteNoise, media storage), automated daily database backup script, and a DEPLOY.md written step by step. Add a short ADMIN_GUIDE.md aimed at the professor, plain language, no jargon.

7. Final Review Loop across the whole site at three widths. Produce a final report listing what is strong, what is still weak, known limitations, and what content the professor must still provide. Confirm zero emoji and zero icon imports, no invented data, and that every public string comes from the CMS.

Deliver: deployable repository, DEPLOY.md, ADMIN_GUIDE.md, and the final report.
```

---

## 11. Things only you and the professor can supply

Gemini cannot make up these. Collect them before Phase 2 and Phase 3:

- A good, recent portrait photo (with permission to publish).
- His ORCID iD or OpenAlex author ID, to import real publications.
- His CV as PDF.
- A short, truthful paragraph in his own words on what he works on and who he wants to work with.
- Real student placement details if he wants alumni shown.
- The text of current openings and any official admission conditions from JMI.
- Domain name and hosting preference (JMI server, a VPS, or a managed platform).

---

## 12. One caution about the model

Flash-class models drift back to the generic template style over long sessions. If the output starts getting cards, badges, or icons again, paste this line: "You are violating section 4 of GEMINI_MASTER_PLAN.md. Remove it and re-review against the reference screenshots." Keeping the reference screenshots attached in every phase is the best defense.
