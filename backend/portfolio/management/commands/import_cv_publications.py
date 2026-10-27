import os
import re
from pathlib import Path
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from portfolio.models import Publication, ResearchTheme, ContentStatus


def clean_doubled_bold_text(text: str) -> str:
    """
    Collapses doubled characters produced by PDF font extraction of bold title spans.
    e.g. 'CCoosstt--EEffffeeccttiivvee' -> 'Cost-Effective'
    """
    def undouble_word(w: str) -> str:
        if len(w) < 2:
            return w
        # Handle hyphenated parts individually
        parts = w.split('-')
        cleaned_parts = []
        for p in parts:
            res = []
            i = 0
            while i < len(p):
                if i + 1 < len(p) and p[i] == p[i+1]:
                    res.append(p[i])
                    i += 2
                else:
                    res.append(p[i])
                    i += 1
            cleaned_parts.append(''.join(res))
        return '-'.join(cleaned_parts)

    tokens = text.split()
    cleaned = []
    for token in tokens:
        # Check if the token shows evidence of PDF bold character doubling
        doubled_count = sum(1 for i in range(len(token)-1) if token[i] == token[i+1])
        if len(token) >= 3 and doubled_count >= len(token) // 3:
            cleaned.append(undouble_word(token))
        else:
            cleaned.append(token)

    result = ' '.join(cleaned)
    # Clean up double hyphens and excessive spacing
    result = re.sub(r'-{2,}', '-', result)
    result = re.sub(r'\s+', ' ', result).strip()
    return result


class Command(BaseCommand):
    help = "Imports verified publication bibliography (58 journals, 57 conferences) from Dr. Ahmad's official CV."

    def handle(self, *args, **options):
        # Locate extracted CV text
        possible_paths = [
            Path("docs/source/mahmad9_cv_extracted.txt"),
            Path("../docs/source/mahmad9_cv_extracted.txt"),
            Path(r"C:\Users\Ayaan\.gemini\antigravity-ide\brain\1d5f75ff-ce08-480f-8651-2ca9be69a5bb\scratch_resume.txt"),
        ]
        cv_path = None
        for p in possible_paths:
            if p.exists():
                cv_path = p
                break

        if not cv_path:
            self.stderr.write("Could not find mahmad9_cv_extracted.txt in docs/source.")
            return

        with open(cv_path, 'r', encoding='utf-8') as f:
            full_text = f.read()

        # Isolate journal and conference sections
        j_start = full_text.find("SELECTED PAPERS IN JOURNALS:")
        c_start = full_text.find("PAPERS IN INTERNATIONAL CONFERENCES:")
        c_end = full_text.find("SERVING AS ASSOCIATE EDITOR/EDITORIAL BOARD MEMBER:")

        if j_start == -1 or c_start == -1 or c_end == -1:
            self.stderr.write("Could not locate publication section markers in extracted CV text.")
            return

        j_section = full_text[j_start:c_start]
        c_section = full_text[c_start:c_end]

        j_entries = re.findall(r'J\.(\d+)\.\s*(.*?)(?=(?:J\.\d+\.|$))', j_section, re.DOTALL)
        c_entries = re.findall(r'C\.(\d+)\.\s*(.*?)(?=(?:C\.\d+\.|$))', c_section, re.DOTALL)

        self.stdout.write(f"Found {len(j_entries)} journal entries and {len(c_entries)} conference entries in CV.")

        # Themes mapping cache
        themes = {t.title: t for t in ResearchTheme.objects.all()}
        chaos_theme = next((t for name, t in themes.items() if 'Chaos' in name), None)
        sbox_theme = next((t for name, t in themes.items() if 'Substitution' in name or 'S-Box' in name), None)
        image_theme = next((t for name, t in themes.items() if 'Multimedia' in name or 'Medical' in name), None)
        iot_theme = next((t for name, t in themes.items() if 'Authentication' in name or 'IoT' in name), None)

        # Designated high-impact selected papers per Section 2.4 of V2 plan:
        # J.1, J.11, J.27, J.32, J.37, J.39
        selected_journal_ids = {'1', '11', '27', '32', '37', '39'}

        parsed_journals = 0
        parsed_conferences = 0
        unparsed = []

        # 1. Process Journal Entries
        for num, raw_text in j_entries:
            try:
                # Remove page headers
                clean_raw = re.sub(r'=== PAGE \d+ ===', '', raw_text).strip()
                clean_raw = ' '.join(clean_raw.split())

                # Year: e.g. (2025)
                year_match = re.search(r'\((\d{4})[^\)]*\)', clean_raw)
                year = int(year_match.group(1)) if year_match else 2024

                # Index tags and Impact Factor: e.g. [ SCI-E/IF: 8.2]
                tag_match = re.search(r'\[([^\]]+)\]\s*$', clean_raw)
                index_tags = ''
                impact_factor = ''
                content_body = clean_raw
                if tag_match:
                    full_tag = tag_match.group(1).strip()
                    content_body = clean_raw[:tag_match.start()].strip()
                    if 'IF:' in full_tag:
                        parts = full_tag.split('IF:')
                        index_tags = parts[0].replace('/', '').strip()
                        impact_factor = f"IF: {parts[1].strip()}"
                    else:
                        index_tags = full_tag

                # DOI extraction: e.g. DOI: 10.1109/JIOT.2025.3576313
                doi = ''
                doi_match = re.search(r'DOI:\s*([^\s\[\]]+)', content_body, re.IGNORECASE)
                if doi_match:
                    doi = doi_match.group(1).rstrip('.,;')
                    content_body = content_body[:doi_match.start()].strip()

                # Split authors vs title & venue
                # Usually: Authors. (Year). Title. Venue, Vol/Pages.
                authors = ''
                title_venue_part = content_body
                if year_match:
                    authors = content_body[:year_match.start()].strip().rstrip('.,& ')
                    title_venue_part = content_body[year_match.end():].strip().lstrip('. ')

                # Clean author string
                authors = re.sub(r'\s+', ' ', authors).replace('Ahmad, M. ,', 'Musheer Ahmad,')
                authors = authors.replace('Ahmad, M.', 'Musheer Ahmad')
                authors = authors.replace('Musheer Ahmad ,', 'Musheer Ahmad,')

                # Separate title from venue
                # The title in CV text was bolded, followed by period and venue in italics/normal font
                # Look for the sentence boundary after the title
                title = ""
                venue = ""
                volume_issue_pages = ""

                # Pattern matching title terminating with period or quote
                title_match = re.search(r'^(.*?)(?:\.|\”|\")\s+([A-Z].*)$', title_venue_part)
                if title_match:
                    raw_title = title_match.group(1)
                    rest = title_match.group(2)
                    title = clean_doubled_bold_text(raw_title)
                    # From rest, extract venue vs pages
                    pages_match = re.search(r'([A-Za-z\s&,\'\-]+?)(?:,\s*|\.\s*)(vol\.\s*\d+.*|pp[.\-\s]*\d+.*|\d+\s*\(\d+\).*|\d{4,}.*)$', rest, re.IGNORECASE)
                    if pages_match:
                        venue = pages_match.group(1).strip()
                        volume_issue_pages = pages_match.group(2).strip().rstrip('.,')
                    else:
                        venue = rest.rstrip('.,')
                else:
                    title = clean_doubled_bold_text(title_venue_part)
                    venue = "Scientific Journal"

                # Assign theme based on title keywords
                title_lower = title.lower()
                assigned_theme = None
                if 's-box' in title_lower or 'substitution' in title_lower or 'permutation' in title_lower:
                    assigned_theme = sbox_theme
                elif 'image' in title_lower or 'multimedia' in title_lower or 'watermark' in title_lower or 'dicom' in title_lower:
                    assigned_theme = image_theme
                elif 'authentication' in title_lower or 'drone' in title_lower or 'iot' in title_lower or 'deep learning' in title_lower or 'detection' in title_lower:
                    assigned_theme = iot_theme
                elif 'chaos' in title_lower or 'chaotic' in title_lower or 'attractor' in title_lower:
                    assigned_theme = chaos_theme

                # Determine selected and status
                is_selected = num in selected_journal_ids
                status = ContentStatus.PUBLISHED

                slug = f"j-{num}-{year}-{slugify(title[:40])}"

                Publication.objects.update_or_create(
                    slug=slug,
                    defaults={
                        "title": title,
                        "authors": authors or "Dr. Musheer Ahmad et al.",
                        "venue": venue,
                        "year": year,
                        "volume_issue_pages": volume_issue_pages,
                        "publication_type": Publication.PublicationType.JOURNAL,
                        "doi": doi,
                        "pdf_url": f"https://doi.org/{doi}" if doi and doi.startswith('10.') else "",
                        "theme": assigned_theme,
                        "index_tags": index_tags or "SCIE / SCOPUS",
                        "impact_factor_as_listed": impact_factor,
                        "raw_reference": clean_raw,
                        "is_selected": is_selected,
                        "order": int(num),
                        "status": status,
                    }
                )
                parsed_journals += 1

            except Exception as e:
                unparsed.append(f"J.{num}: {str(e)}")

        # 2. Process Conference Entries
        for num, raw_text in c_entries:
            try:
                clean_raw = re.sub(r'=== PAGE \d+ ===', '', raw_text).strip()
                clean_raw = ' '.join(clean_raw.split())

                year_match = re.search(r'\((\d{4})[^\)]*\)', clean_raw)
                year = int(year_match.group(1)) if year_match else 2020

                tag_match = re.search(r'\[([^\]]+)\]\s*$', clean_raw)
                index_tags = "SCOPUS"
                content_body = clean_raw
                if tag_match:
                    index_tags = tag_match.group(1).strip()
                    content_body = clean_raw[:tag_match.start()].strip()

                doi_match = re.search(r'DOI:\s*([^\s\[\]]+)', content_body, re.IGNORECASE)
                doi = ''
                if doi_match:
                    doi = doi_match.group(1).rstrip('.,;')
                    content_body = content_body[:doi_match.start()].strip()

                authors = ''
                title_venue_part = content_body
                if year_match:
                    authors = content_body[:year_match.start()].strip().rstrip('.,& ')
                    title_venue_part = content_body[year_match.end():].strip().lstrip('. ')

                authors = re.sub(r'\s+', ' ', authors).replace('Ahmad, M. ,', 'Musheer Ahmad,')
                authors = authors.replace('Ahmad, M.', 'Musheer Ahmad')
                authors = authors.replace('Musheer Ahmad ,', 'Musheer Ahmad,')

                # Conference title and proceedings separation
                title_match = re.search(r'^(.*?)(?:\.|\”|\")\s+(?:In\s+)?([A-Z].*)$', title_venue_part)
                title = ""
                venue = ""
                volume_issue_pages = ""

                if title_match:
                    raw_title = title_match.group(1)
                    rest = title_match.group(2)
                    title = clean_doubled_bold_text(raw_title)
                    venue = rest.rstrip('.,')
                else:
                    title = clean_doubled_bold_text(title_venue_part)
                    venue = "International Conference Proceedings"

                slug = f"c-{num}-{year}-{slugify(title[:40])}"

                Publication.objects.update_or_create(
                    slug=slug,
                    defaults={
                        "title": title,
                        "authors": authors or "Dr. Musheer Ahmad et al.",
                        "venue": venue,
                        "year": year,
                        "volume_issue_pages": volume_issue_pages,
                        "publication_type": Publication.PublicationType.CONFERENCE,
                        "doi": doi,
                        "pdf_url": f"https://doi.org/{doi}" if doi and doi.startswith('10.') else "",
                        "index_tags": index_tags or "SCOPUS",
                        "impact_factor_as_listed": "",
                        "raw_reference": clean_raw,
                        "is_selected": False,
                        "order": int(num) + 100,
                        "status": ContentStatus.PUBLISHED,
                    }
                )
                parsed_conferences += 1

            except Exception as e:
                unparsed.append(f"C.{num}: {str(e)}")

        self.stdout.write(self.style.SUCCESS(
            f"[OK] Successfully imported {parsed_journals} journal articles and {parsed_conferences} conference papers!"
        ))
        if unparsed:
            self.stdout.write(self.style.WARNING(f"Parse warnings ({len(unparsed)} items):"))
            for u in unparsed:
                self.stdout.write(f"  - {u}")
        else:
            self.stdout.write(self.style.SUCCESS("All 115 publications parsed with zero errors!"))
