# Dr. Musheer Ahmad Site: Master Plan V2 (for Gemini)

This file supersedes `GEMINI_MASTER_PLAN.md` wherever they conflict. Everything in section 2 is verified against his own CV (`docs/source/mahmad9_cv.pdf`, last updated June 2025) and his JMI faculty page. Nothing in the site may contradict it.

Tell Gemini once: "Read GEMINI_MASTER_PLAN.md and GEMINI_MASTER_PLAN_V2.md fully. V2 wins on conflicts. docs/source/mahmad9_cv_extracted.txt is the source of truth for content."

---

## 0. Corrections to the current build (do this first, before any UI work)

The first seed command (`seed_academic_structure.py`) was written without the CV and contains invented data. It must be deleted and replaced from the CV.

| Item in current DB / seed | Problem | Correct value (from CV / JMI page) |
| --- | --- | --- |
| Five "selected publications" (titles, DOIs, citation counts, co-authors like "H. K. Verma") | Fabricated | Import real papers from the CV (section 2.4) |
| Citations 6850, h-index 45, i10 120 | Fabricated | Citations 5296 (Google Scholar), 3878 (Scopus); h-index 42 (GS), 36 (Scopus). i10 not stated: omit. Source: CV, June 2025 |
| Email `mahmad@jmi.ac.in` | Wrong | `mahmad9@jmi.ac.in` (official), `musheer.cse@gmail.com` (personal, optional) |
| Scopus ID 36987747800 | Wrong | 56339090200 |
| ORCID `0000-0002-8611-6677` | Not in CV, unverified | Remove. Show ORCID only when he supplies one |
| ResearchGate `Musheer-Ahmad` | Wrong slug | `https://www.researchgate.net/profile/Musheer-Ahmad-3` |
| LinkedIn URL | Unverified | Remove until he supplies it |
| "Room 304" office | Invented | Remove. Use "Department of Computer Engineering, Faculty of Engineering and Technology, JMI, New Delhi 110025" |
| News items ("Invited lecture...", "Paper accepted in Nonlinear Dynamics...") | Invented | Delete. Seed news only from CV facts (awards, editorial appointments) with real dates, or leave empty |
| "Research themes" bodies mentioning "nonlinearity exceeding 110", "FPGA/ASIC" | Invented specifics | Rewrite from his actual areas (section 2.3) in plain language |
| Hero statement "investigates ... at Jamia Millia Islamia" | Acceptable but generic | Replace with the statement in section 2.2 |

Also never display: date of birth, father's name, home details. They appear in the CV but must not be published.

---

## 1. Who he is (understand the person before designing)

- Associate Professor, Dept. of Computer Engineering, Faculty of Engineering and Technology, Jamia Millia Islamia (JMI), New Delhi. 18 years of teaching.
- Also Assistant Controller of Examinations, JMI (Office of the Controller of Examinations).
- A working cryptographer of the chaos-based school: S-boxes, chaotic maps and hyperchaotic systems for image and medical image encryption, plus a growing second line in authentication protocols (IoT, drones, smart grid) and deep learning applications.
- High standing in the field: Stanford/Elsevier World's Top 2% Scientists (career-long 2024; single-year 2022, 2023, 2024). Editorial board member of Scientific Reports (Springer Nature), received its Editorial Contribution Award 2025. Reviewer for 80 journals including IEEE TIFS, TPAMI, TNNLS, TIP, IoT Journal.
- Photograph: provided. File: `backend/media/portraits/dr_musheer_ahmad.png` (bearded, wearing a woven white kufi cap, light checked shirt, plain sandstone wall). Use as a straight, unretouched portrait. Do not crop away the cap. Do not overlay effects.
- Audience, in priority order: (1) prospective PhD and MTech students and interns, (2) collaborators and journal/conference organisers, (3) JMI colleagues and review committees (promotion, awards), (4) the general public via search.
- Tone: scholarly, modest, exact. He is established, so the site should look like a senior academic's home page, not a startup. Authority comes from real numbers with sources, not adjectives.

---

## 2. Verified content (use exactly; load into the CMS)

### 2.1 Identity and contact
- Name: Dr. Musheer Ahmad
- Titles: Associate Professor (Department of Computer Engineering); Assistant Controller of Examinations (Office of the Controller of Examinations)
- Address: Department of Computer Engineering, Faculty of Engineering and Technology, Jamia Millia Islamia, New Delhi 110025, India
- Official email: mahmad9@jmi.ac.in. Personal: musheer.cse@gmail.com
- Office phone (listed on the JMI page): +91 11 2698 0281
- JMI faculty page: https://www.jmi.ac.in/ACADEMICS/Departments/Department-Of-Computer-Engineering/People/Faculty-Members/3148/Musheer_Ahmad

### 2.2 Hero statement (draft, he may edit in admin)
"I work on chaos-based cryptography and secure multimedia: designing substitution boxes, chaotic and hyperchaotic systems, and image encryption schemes, and, with collaborators, authentication protocols and deep learning for security. I am an Associate Professor of Computer Engineering at Jamia Millia Islamia, New Delhi."

### 2.3 Research areas (his exact list, in this order)
1. Chaos-based cryptography
2. Multidisciplinary cryptography
3. Cybersecurity
4. Authentication
5. Deep learning
6. Optimization

Group these into 4 homepage themes. Summaries must be derived from paper titles in the CV, no invented claims:
- Chaos-based cryptography: chaotic and hyperchaotic maps (2D/3D/4D, memristive, fractional-order), pseudo-random bit generators, hash functions. Example real papers: J.14 (3-D hyperchaotic map with hidden attractor), J.36 (4D hyperchaotic system + Josephus permutation).
- Substitution boxes: S-box design by chaos, algebra (group theory, finite rings, coset graphs, Galois fields), and metaheuristics (firefly, cuckoo search, ABC, genetic). Examples: J.21, J.45, J.49, J.53, J.55.
- Secure multimedia and medical image encryption: image encryption with compressive sensing, DNA coding, watermarking; cryptanalysis of published schemes. Examples: J.2, J.32, J.37, J.38.
- Authentication, IoT security and applied deep learning: PUF/ECC authentication for Internet of Drones, smart grids, wearables, IoMT; deep learning for drowsiness, fire, deepfake, disaster, PCOS and Parkinson's detection. Examples: J.1, J.6, J.10, J.9, J.16.

### 2.4 Publications
- Totals (CV, June 2025): 157 research papers; 151 Scopus; 124 Web of Science; 87 SCIE; cumulative impact factor about 300 (JCR).
- Full list is in `docs/source/mahmad9_cv_extracted.txt`: 58 journal papers (J.1 to J.58) and 57 conference papers (C.1 to C.57). Note the extraction doubles bold characters in titles (for example "CCoosstt--EEffffeeccttiivvee"). Write a cleaning function that collapses doubled letters only in the bold-title span, then verify every title by eye.
- Parse fields: authors, year, title, venue, volume/pages, DOI if present, index tag (SCI-E, SCOPUS), impact factor shown in brackets (store as `impact_factor_as_listed`, label "IF as listed in CV").
- Import everything as Draft, then he ticks Published. Pre-mark these as Selected (all in the CV, recent, high IF): J.1 (IEEE IoT Journal 2025, IF 8.2), J.32 (Information Sciences 2022, IF 8.1), J.37 (Information Sciences 2022, IF 8.1), J.27 (IEEE T-ITS 2022, IF 7.9), J.39 (IEEE T-ITS 2021, IF 7.9), J.11 (Expert Systems with Applications 2024, IF 7.5).
- Do not add citation counts per paper, abstracts or BibTeX unless fetched from Crossref/OpenAlex by DOI at import time and shown with source.
- Add a Scopus/Google Scholar/WoS/DBLP link row. Verified identifiers: Scopus author ID 56339090200; WoS ResearcherID H-9587-2018; Google Scholar user cPbmjWoAAAAJ; DBLP pid 89/8467-2; ResearchGate Musheer-Ahmad-3; csauthors.net/musheer-ahmad-002; topresearcherslist.com profile 862797.

### 2.5 Metrics (show as a small sourced table, never as animated counters)
| Metric | Value | Source and date |
| --- | --- | --- |
| Total papers | 157 | CV, June 2025 |
| Scopus-indexed | 151 | CV, June 2025 |
| Web of Science | 124 | CV, June 2025 |
| SCIE | 87 | CV, June 2025 |
| Citations | 5,296 (Google Scholar); 3,878 (Scopus) | CV, June 2025 |
| h-index | 42 (Google Scholar); 36 (Scopus) | CV, June 2025 |
Each metric is a CMS field with a source URL and an "as of" date. The home page shows one quiet line; the Research or CV page shows the table. Add an admin reminder: "Metrics were last updated on [date]. Update them."

### 2.6 Awards and recognition (real dates where given)
- Editorial Contribution Award 2025, Scientific Reports (Springer Nature)
- FET Research Publication Award 2024, presented 5 Nov 2024 (Vice Chancellor Prof. Mazhar Asif, Registrar Prof. Md. Mehtab Alam Rizvi, Dean FET Prof. Mini Shaji Thomas)
- Jamia Achievers Award, 29 Oct 2023
- World's Top 2% Researchers (Stanford University and Elsevier): career-long 2024; single-year 2022, 2023, 2024. Appreciation from Dean FET for the 2022 listing
- Best paper awards at international conferences (CV does not name them; keep generic)

### 2.7 Editorial and service
- Editorial board: Scientific Reports (Springer Nature); Discover Computing (Springer)
- Associate Editor: International Journal of Information Security and Privacy (IGI Global); International Journal of Artificial Intelligence in Scientific Disciplines (IGI Global)
- Guest editor: Scientific Reports collection "Post-quantum cybersecurity and cryptography" (open until 28 Feb 2026); Discover Computing special issue "Securing Critical Infrastructure in Next-Generation Networks" (open until 30 Sep 2025); Int. J. of Rough Sets and Data Analysis special issue "Intelligent Informatics and Computing for Security"
- Book edited: "AI Based Cybersecurity Management: Securing Digital Economy", CRC Press (under production per CV)
- Reviewer: 80 journals (list in CV; show a compact text list of 10 to 15 prominent ones plus "full list in CV")
- Conference: reviewer/TPC member of 50+ conferences; session chair SSCC-2018; special session organiser FICTA-2016; track manager IC3T-2016 and INDIA-2016
- Institutional roles: Member, Institutional Multidisciplinary Research Advisory Committee, Regional Research Institute of Unani Medicine (Ministry of Ayush); Project Coordinator for MTech (since 2019); CBCS Programme Advisor (since 2015); Sub-Purchase Committee member, FTK-CIT JMI

### 2.8 Education
- PhD, Computer Engineering, Jamia Millia Islamia (year not stated in the CV; leave blank)
- M.Tech, Computer Science and Engineering, 2008, ZH College of Engineering and Technology, Aligarh Muslim University
- B.Tech, Computer Engineering, 2004, same institution

### 2.9 Teaching and supervision
- Courses taught: Analysis and Design of Algorithms; Algorithm Design; Discrete Mathematics; Microprocessor Theory and Applications; Soft Computing. Syllabi designed: Multimedia Systems, Artificial Neural Networks, Digital Forensics, Quantum Cryptography, M.Tech Algorithm Design, Soft Computing, Multimedia Technology, Digital Image Processing; introduced B.Tech elective Soft Computing Techniques.
- Programmes taught: M.Tech (Computer Engineering; Computer Science and Engineering; Computational Mathematics), B.Tech and B.E. (Computer Engineering), M.Sc (Industrial Maths with Computer Applications)
- Ongoing supervision: 6 PhD, 2 M.Tech dissertations, 3 B.Tech projects. Completed: 14 M.Tech dissertations, 16 M.Tech projects, 40+ B.Tech projects
- Teaching history: Associate Professor, JMI; guest/temporary lecturer 2006 to 2010, Dept. of Computer Engineering, ZHCET, AMU

### 2.10 What the CV does NOT give (do not invent; leave empty with "needs content" in admin)
Names of PhD students, alumni placements, grants/funded projects, patents, ORCID, LinkedIn, named best-paper awards, office hours, JMI-approved admission conditions, PhD year. The Group page and Join openings render empty-state notes in admin only; publicly the sections hide.

---

## 3. UI problems with the current build, and fixes

**Reported problem: a large dead space on the left of every section.**
Cause: `.section-grid` reserves a 240 to 280px label column on every section, and the label text (small mono caption) fills a tiny fraction of it. The result is a permanent empty left gutter and narrow content.

Fixes (mandatory):
1. Remove the dead label column. Section labels become a short eyebrow line above the section heading, same left edge as content.
2. Use a true 12-column grid with max width 1280px and 24px gutters. Content blocks span columns by purpose: prose 7 columns, list rows 12 columns, figure 6 to 7 columns, side facts 4 columns.
3. Home hero is a two-column split at 1024px and above: left 7 columns (name, role, statement, two actions), right 5 columns (portrait, tall rectangle, aspect 4:5, 1px hairline border, caption line). Below 1024px stack with the portrait first.
4. Where a side panel is useful, fill it with real info instead of emptiness: a sticky "At a glance" column (affiliation, email, links, metrics) on About/CV; a sticky in-page contents list on long pages (Research, Publications filters).
5. No page may leave more than 24px of unexplained empty horizontal space at 1440px. Check at 1440, 1280, 1024, 768, 390.

**Other defects to fix in the same pass**
- Remove inline `style={{}}` clutter from pages. Move to CSS classes or CSS modules.
- The "Architecture Status" placeholder boxes must not render in production. Gate with `import.meta.env.DEV`.
- Replace `[PDF] [DOI] [Cite]` bracket links with plain text links separated by thin dividers.
- Theme blocks labelled "[Theme 01]" look like pseudo-code. Use numerals set in the serif at large size, with a hairline top rule.
- Portrait URL logic belongs in `lib/api.ts` (one `mediaUrl()` helper), not in a page component. Use env `VITE_API_URL`.
- Mobile nav: full-screen text menu with a visible Close, focus trap, `Esc` closes.

---

## 4. Visual direction (enhanced)

Keep the Swiss academic editorial base from V1 (white page, ink text, single deep green accent `#0E4B3B`, Newsreader/Inter/JetBrains Mono, hairlines, no cards with shadows, no icons, no emoji). Enhance as follows so it feels like a senior, well-resourced academic site, not a template.

1. **Header:** wordmark left in serif, nav centre-right, a quiet "Prospective students" text link far right in green. 72px tall, hairline bottom. Auto-hide on scroll down.
2. **Hero:** large serif name (clamp 56 to 88px), role line in Inter, one-paragraph statement in 22px serif, two actions (primary "Prospective students", secondary "Publications"). Portrait right as in 3.3. Below, a full-width "credential strip": four columns separated by hairlines showing real values, for example `157 papers`, `h-index 42`, `5,296 citations`, `Stanford/Elsevier Top 2%, 2022 to 2024`. Static text, each with source and date in 11px mono below. No counters, no animation.
3. **Figure (the only 3D allowed, see section 5):** a contained interactive figure titled "Figure 1. A chaotic attractor" placed beside the statement or directly under the hero, with caption.
4. **Research:** four themes in a 2x2 text grid separated by hairlines (not cards). Each: large serif numeral, title, two-sentence summary, "N papers" count computed from the imported publications by theme tag, link to the theme page.
5. **Selected publications:** dense list. Row = year (mono) | title (serif) + authors (own name semibold) + venue (italic) + "IF 8.2 as listed in CV" in small mono | right-aligned plain links (DOI, PDF if available). Show 6 rows and "All 157 publications".
6. **Recognition:** a two-column definition list of awards and editorial roles with years. Plain text. Add the Stanford/Elsevier line as a text row, not a badge.
7. **Prospective students:** a full-width band using the secondary surface `#F6F5F2`, split 5/7: left heading and one plain sentence; right the checklist of what to send (CV, one paragraph on research interest, one of his papers you read and what you would extend), email link, deadline text from CMS. Primary green button "Write to Dr. Ahmad".
8. **News:** only real items; hide the section if none.
9. **Footer:** 4 columns (Affiliation, Navigate, Scholarly profiles with the verified links, Contact). A bottom line with "Last updated: <date from CMS>".
10. **Micro-interactions:** underline slide on links (150ms), 8px fade-rise on scroll-in (200 to 280ms), `prefers-reduced-motion` honoured. Nothing else.
11. **Typography polish:** `font-feature-settings` for old-style figures in prose, tabular figures in lists, `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs, hanging punctuation where supported.
12. **Images:** portrait served with `srcset` (400, 800, 1200w WebP generated by the backend), explicit width/height to avoid layout shift, `fetchpriority="high"` on the hero portrait.

---

## 5. React Three Fiber: allowed use, strictly limited

**Decision rule from the owner:** use it only if it looks professional; if it does not, drop it and keep the SVG.

Why it can be justified here: his research is chaotic systems. A real attractor, computed from the equations he works with, is content, not decoration.

Allowed:
- Exactly one `<Canvas>` on the site: the Figure 1 component on the home page (optionally reused on `/research/chaos-based-cryptography`).
- Content: a single 3D chaotic attractor drawn as one thin polyline (Lorenz as default; optionally toggle to Chen or Lu), monochrome ink on white (`#14171A` at 0.9 opacity), line width 1px equivalent, no glow, no bloom, no gradient, no particles, no post-processing.
- Interaction: slow auto-rotation (0.05 rad/s), drag to orbit with damping, scroll does NOT zoom (do not hijack page scroll). A small text control row beneath: "Lorenz | Chen | Lu" and "Pause rotation". Caption states system, parameters and what it is used for in his area (pseudo-random keystreams, S-box construction), without overclaiming.
- Library: `@react-three/fiber` plus `three` only. Optionally `@react-three/drei` `OrbitControls` only (tree-shake, no other helpers). Reference repo for patterns: https://github.com/pmndrs/react-three-fiber.
- Loading: `React.lazy` + `Suspense` so the 3D chunk loads after first paint and only when the figure is within 1 viewport of scrolling. Server-rendered/initial fallback is the existing static SVG (`chaoticAttractorSvg.ts`), so SEO and no-JS users still see the figure.
- Performance guards: `frameloop="demand"` while paused or off-screen (IntersectionObserver); `dpr={[1, 2]}`; disable entirely when `prefers-reduced-motion` is set, when `navigator.hardwareConcurrency <= 2`, or WebGL context creation fails. Hard cap: the 3D chunk must be under 180 KB gzipped; Lighthouse performance on mobile must stay at 95 or higher.
- Accessibility: canvas has `role="img"` and an `aria-label`; the caption carries the meaning; all controls are keyboard-reachable buttons.

Not allowed: 3D backgrounds, floating shapes, a 3D portrait, parallax, scroll-linked camera moves, shader effects, any second canvas, anything that animates continuously without the user able to pause it.

Acceptance check by Gemini (screenshot at 1440 and 390, rotating state and paused state): if the figure looks like a stock "tech" visual (glow, colour, particles, busy), remove it and ship the SVG. If it looks like a figure from a paper, keep it.

---

## 6. Information architecture (unchanged routes, with the real content mapped)

| Route | Content now available from CV | Notes |
| --- | --- | --- |
| `/` | hero, credential strip, Figure 1, 4 themes, 6 selected papers, recognition, prospective students band, news (if any) | as section 4 |
| `/research` and `/research/:slug` | four themes, related papers (by tag) | tags assigned at import review |
| `/publications` | all 157, filters: year, type (journal/conference), index (SCIE/Scopus), theme, search; BibTeX export | Phase 2 |
| `/group` | ongoing supervision counts (6 PhD, 2 MTech, 3 BTech) and completed counts | member names empty until supplied |
| `/teaching` | courses taught, programmes, syllabi designed, supervision counts | real |
| `/service` (new, link under About) | editorial boards, guest editorships, book, reviewer list, conference roles, committees | from CV 2.7 |
| `/news` | empty until real items | hide if empty |
| `/join` | the real expectations, how to apply, email | openings from CMS only |
| `/contact` | address, official email, office phone, profile links | |
| `/cv` | embedded `mahmad9_cv.pdf` plus structured timeline (education, positions, awards) | PDF replaced in admin |

Nav (text): Research, Publications, Group, Teaching, Service, Join, Contact, with CV as a secondary link. Brand: "Musheer Ahmad".

---

## 7. Admin (professor is non-technical)

Same requirements as V1 section 6, plus these CV-driven items:
- A one-click "Replace CV" upload that also updates the public CV page.
- Metrics screen with the six verified fields, "as of" dates, source URLs, and an on-screen reminder when older than 6 months.
- Editorial roles, awards and guest-editor items as simple add/edit/reorder lists (new models: `Honor`, `EditorialRole`, `ServiceItem`) with year, title, body, optional link, status.
- Publication import: (a) one-time command `import_cv_publications` reading `docs/source/mahmad9_cv_extracted.txt` into Draft rows; (b) later OpenAlex or Crossref import by DOI. Review screen with tick boxes, duplicate detection by DOI or normalised title.
- Each Publication gets `theme` (FK to ResearchTheme, nullable), `index_tags` (SCIE, Scopus, WoS), `impact_factor_as_listed`.

---

## 8. Acceptance checklist (Gemini must prove each with screenshots at 1440, 1024, 768, 390)

1. No empty left gutter anywhere. Content edges align on the 12-column grid.
2. Home hero shows the real portrait at right, correctly framed, no crop of the cap.
3. Every number on the site traces to section 2 and shows a source and date.
4. Zero emoji, zero icon-library imports, zero `box-shadow`, zero gradients (search the repo).
5. Only one `<Canvas>`; lazy; fallback SVG; reduced-motion and no-WebGL paths tested.
6. No placeholder boxes visible in production build.
7. Lighthouse mobile: Performance, Accessibility, Best Practices, SEO all 95 or higher on `/` and `/publications`.
8. Seed contains no invented people, papers, dates, awards, quotes or metrics; run a script that diffs seed strings against the CV text.
9. A final "what is still weak" note. Do not claim perfection.

---

## 9. Prompts to paste into Gemini (one at a time)

### Prompt A: Data correction and import (no UI)
```text
Read GEMINI_MASTER_PLAN.md and GEMINI_MASTER_PLAN_V2.md fully. V2 overrides V1.
Do section 0 and sections 2, 7 only:
1. Delete backend/portfolio/management/commands/seed_academic_structure.py and rewrite it so every value comes from section 2 of V2 and docs/source/mahmad9_cv_extracted.txt. Remove all invented content listed in the section 0 table.
2. Add models Honor, EditorialRole, ServiceItem; add Publication fields theme, index_tags, impact_factor_as_listed; migrate.
3. Write import_cv_publications that parses docs/source/mahmad9_cv_extracted.txt into Draft Publication rows (58 journal, 57 conference), cleaning doubled bold characters, then print a report of any entry it could not parse. Mark J.1, J.11, J.27, J.32, J.37, J.39 as selected.
4. Update the admin so the professor can edit metrics, honors, editorial roles and service items, and replace the CV, using plain language and help text.
5. Show me the report and counts. Do not touch the frontend.
```

### Prompt B: Layout and UI rebuild
```text
Read both plan files again. Implement sections 3, 4 and 6 of V2 on the existing frontend: remove the dead label column, move to a 12-column grid, rebuild the home page (hero split with the real portrait, credential strip, themes 2x2, selected publications, recognition, prospective students band, news, footer), add /service and the final nav, remove inline styles, hide dev-only placeholders in production. Keep the static SVG figure for now.
Run the Review Loop at 1440, 1024, 768, 390. Fix the top 10 deviations. Prove zero emoji, icons, shadows, gradients. Report Lighthouse.
```

### Prompt C: The single 3D figure
```text
Read section 5 of GEMINI_MASTER_PLAN_V2.md. Implement exactly the one lazy-loaded React Three Fiber attractor figure with the static SVG fallback, the guards, and the controls described. Measure the chunk size and Lighthouse mobile score. Take screenshots rotating and paused at 1440 and 390. Then judge honestly: if it looks decorative or like a generic tech visual, delete it and keep the SVG, and tell me why.
```

### Prompt D: Phase 2 pages
Use Phase 2 from V1 (Publications with filters and BibTeX export, Research theme pages, Teaching, CV, Group, News) with the real data above. Re-run the acceptance checklist.

### Prompt E: Phase 3
Use Phase 3 from V1 (Join application flow, applications inbox, admin polish, SEO, accessibility, deployment, handover).

---

## 10. Reminder line if Gemini drifts
"You are violating GEMINI_MASTER_PLAN_V2.md. Remove the invented content or decoration and re-verify against docs/source/mahmad9_cv_extracted.txt."
