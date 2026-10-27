# Dr. Musheer Ahmad — Flagship Academic Portfolio & Research Lab CMS

[![Django](https://img.shields.io/badge/Django-5.1+-092E20?style=for-the-badge&logo=django&logoColor=white)](https://djangoproject.com)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Django Unfold](https://img.shields.io/badge/Admin-Django--Unfold-1E293B?style=for-the-badge)](https://unfoldadmin.com)

Official full-stack academic portfolio and research lab website for **Dr. Musheer Ahmad** (Associate Professor, Department of Computer Engineering, Jamia Millia Islamia, New Delhi — World's Top 2% Scientist by Stanford / Elsevier, h-index: 45, i10-index: 120, 6,850+ citations).

---

## 🏛️ Key Capabilities

- **Zero-Developer CMS Dependency (`django-unfold`):**
  - Modern, Tailwind-styled admin dashboard at `/cms-admin/`.
  - Singleton `SiteConfiguration` controlling all bio, links, and status badges.
  - **1-Click BibTeX Auto-Import:** Paste raw BibTeX directly from Google Scholar or IEEE Xplore to automatically parse and populate papers.
- **Swiss Academic Editorial Design System:**
  - High-contrast editorial light mode (`#FAF8F5` Warm Alabaster) & deep obsidian dark mode.
  - Google Fonts: `Instrument Serif`, `Plus Jakarta Sans`, and `JetBrains Mono`.
  - Real-time interactive HTML5 3D **Chaotic Attractor Canvas** reflecting Dr. Ahmad's hallmark cryptology research.
- **Interactive Scholarly Exploration:**
  - Fast public bundle endpoint `GET /api/v1/portfolio-bundle/` to eliminate network waterfalls.
  - Full publication filtering by Quartile (`SCI Q1`), year, and thrust, with automatic author highlighting for `Musheer Ahmad`.
  - 1-Click Copy BibTeX modal and direct DOI linking.
- **Dedicated Inbound Prospective Researcher Funnel:**
  - Live Ph.D., Postdoctoral, and intern openings.
  - Inbound application portal submitting directly into the professor's database (`POST /api/v1/apply/`).
- **Global `⌘K` / `Ctrl+K` Command Palette:** Instant keyboard-driven search over papers, research pillars, courses, and announcements.

---

## 📁 Repository Structure

```text
├── backend/
│   ├── config/              # Django settings, URLs, WSGI/ASGI
│   ├── portfolio/           # Core academic lab models, serializers, views, admin
│   │   ├── management/      # Database seeding scripts (seed_musheer_data)
│   │   ├── bibtex_utils.py  # BibTeX parsing and automatic import engine
│   │   ├── models.py        # Comprehensive relational + singleton schema
│   │   ├── admin.py         # Django Unfold tailored CMS dashboard
│   │   ├── serializers.py   # DRF serialisation + BundleSerializer
│   │   └── views.py         # Bundle, CRUD ViewSets, BibTeX import API
│   ├── templates/           # Custom Unfold admin templates & BibTeX wizard
│   ├── requirements.txt     # Python dependencies
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, HeroSection, BentoGrid, Publications, etc.
│   │   ├── context/         # PortfolioContext with API sync + offline seed fallback
│   │   ├── data/            # fallbackSeed.ts for zero-delay rendering
│   │   ├── types/           # Strict TypeScript contracts matching DRF bundle
│   │   ├── index.css        # Swiss editorial tokens & glassmorphism
│   │   ├── App.tsx          # Master application shell
│   │   └── main.tsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
└── README.md
```

---

## 🚀 Quickstart Guide

### 1. Backend Setup (Django REST API & Unfold CMS)

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate
# Linux/macOS: source venv/bin/activate

pip install -r requirements.txt
python manage.py makemigrations portfolio
python manage.py migrate
python manage.py seed_musheer_data
python manage.py runserver 127.0.0.1:8000
```

- **Frontend Public API:** `http://127.0.0.1:8000/api/v1/portfolio-bundle/`
- **Professor CMS Admin:** `http://127.0.0.1:8000/cms-admin/`
  - **Username:** `admin`
  - **Password:** `admin123`

---

### 2. Frontend Setup (React 18 + Vite + TypeScript)

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📜 License

Created for Dr. Musheer Ahmad, Department of Computer Engineering, Jamia Millia Islamia, New Delhi.
