"""
Zero-effort BibTeX Parser for Dr. Musheer Ahmad's Research Lab.
Handles single or bulk BibTeX entries pasted from Google Scholar, IEEE Xplore,
Elsevier ScienceDirect, Springer, etc.
"""

import re
import bibtexparser
from bibtexparser.bparser import BibTexParser
from bibtexparser.customization import homogenize_latex_encoding


def clean_bib_text(val):
    """Remove LaTeX escapes and braces from BibTeX string values."""
    if not val:
        return ""
    val = str(val).strip()
    # Remove outer braces or quotes
    val = re.sub(r'^[{"\']|[}"\']$', '', val)
    # Remove inner LaTeX braces
    val = re.sub(r'[{}]', '', val)
    return val.strip()


def format_authors(raw_author_str):
    """
    Format 'Last, First and Last2, First2' into readable academic author list:
    'First Last, First2 Last2'.
    """
    if not raw_author_str:
        return "Musheer Ahmad"
    
    raw_clean = clean_bib_text(raw_author_str)
    author_list = [a.strip() for a in raw_clean.split(" and ")]
    formatted = []
    
    for author in author_list:
        if "," in author:
            parts = author.split(",", 1)
            formatted.append(f"{parts[1].strip()} {parts[0].strip()}")
        else:
            formatted.append(author.strip())
            
    return ", ".join(formatted)


def infer_publication_type(entry_type, venue_name):
    """Infer publication type choice from entry_type and venue."""
    entry_type = (entry_type or "").lower()
    venue = (venue_name or "").lower()

    if any(q1_kw in venue for q1_kw in [
        'ieee transactions', 'chaos', 'applied soft computing',
        'expert systems with applications', 'signal processing', 'information sciences',
        'computers & security', 'optics and lasers', 'optik', 'non-linear'
    ]):
        return 'JOURNAL_Q1', 'Q1'

    if entry_type in ['article', 'journal']:
        return 'JOURNAL_SCI', 'Q1'
    elif entry_type in ['inproceedings', 'proceedings', 'conference']:
        return 'CONFERENCE', 'NA'
    elif entry_type in ['incollection', 'inbook']:
        return 'BOOK_CHAPTER', 'NA'
    elif entry_type == 'patent':
        return 'PATENT', 'NA'
    elif entry_type == 'book':
        return 'BOOK', 'NA'
    
    return 'JOURNAL_SCI', 'Q1'


def parse_bibtex_entries(raw_bibtex_str):
    """
    Parses a raw BibTeX string containing one or multiple citations.
    Returns a list of structured dictionaries ready for Publication model creation.
    """
    if not raw_bibtex_str or not raw_bibtex_str.strip():
        return []

    entries = []
    try:
        parser = BibTexParser(common_strings=True)
        parser.customization = homogenize_latex_encoding
        bib_database = bibtexparser.loads(raw_bibtex_str, parser=parser)
        parsed_entries = bib_database.entries
    except Exception:
        parsed_entries = []

    # If bibtexparser failed or returned empty, use robust regex fallback
    if not parsed_entries:
        parsed_entries = regex_bibtex_fallback(raw_bibtex_str)

    for entry in parsed_entries:
        entry_type = entry.get('ENTRYTYPE', entry.get('entrytype', 'article'))
        title = clean_bib_text(entry.get('title', 'Untitled Publication'))
        raw_authors = entry.get('author', 'Musheer Ahmad')
        authors = format_authors(raw_authors)
        venue = clean_bib_text(entry.get('journal', entry.get('booktitle', entry.get('publisher', 'Academic Press'))))
        
        # Year parsing
        raw_year = clean_bib_text(entry.get('year', '2025'))
        year_match = re.search(r'\b(19\d{2}|20\d{2})\b', raw_year)
        year = int(year_match.group(1)) if year_match else 2025

        # Volume / Issue / Pages
        vol = clean_bib_text(entry.get('volume', ''))
        number = clean_bib_text(entry.get('number', ''))
        pages = clean_bib_text(entry.get('pages', ''))
        vol_parts = []
        if vol:
            vol_parts.append(f"Vol. {vol}")
        if number:
            vol_parts.append(f"No. {number}")
        if pages:
            vol_parts.append(f"pp. {pages}")
        volume_issue_pages = ", ".join(vol_parts)

        # DOI & URLs
        doi = clean_bib_text(entry.get('doi', ''))
        url = clean_bib_text(entry.get('url', ''))
        abstract = clean_bib_text(entry.get('abstract', ''))
        
        pub_type, quartile = infer_publication_type(entry_type, venue)

        # Preserve / synthesize clean raw BibTeX
        bibtex_key = entry.get('ID', f"ahmad{year}{re.sub(r'[^a-zA-Z0-9]', '', title[:15]).lower()}")
        clean_bib = f"""@{entry_type}{{{bibtex_key},
  title = {{{title}}},
  author = {{{raw_authors}}},
  journal = {{{venue}}},
  year = {{{year}}},
  volume = {{{vol}}},
  pages = {{{pages}}},
  doi = {{{doi}}}
}}"""

        entries.append({
            'title': title,
            'authors': authors,
            'venue_name': venue,
            'publication_type': pub_type,
            'year': year,
            'volume_issue_pages': volume_issue_pages,
            'quartile': quartile,
            'doi': doi,
            'pdf_url': url if url.endswith('.pdf') else '',
            'abstract': abstract,
            'bibtex_raw': clean_bib.strip(),
            'is_featured': True if quartile == 'Q1' else False,
        })

    return entries


def regex_bibtex_fallback(text):
    """Fallback parser using regular expressions for resilient extraction."""
    entries = []
    entry_blocks = re.split(r'@\w+\s*\{', text)
    matches = list(re.finditer(r'@(\w+)\s*\{\s*([^,\s]+)\s*,', text))
    
    for i, match in enumerate(matches):
        entry_type = match.group(1)
        entry_id = match.group(2)
        start_pos = match.end()
        end_pos = matches[i+1].start() if i + 1 < len(matches) else len(text)
        block = text[start_pos:end_pos]
        
        data = {'ENTRYTYPE': entry_type, 'ID': entry_id}
        field_matches = re.findall(r'(\w+)\s*=\s*[\{"\'](.*?)[\}"\'],?', block, re.DOTALL)
        for key, val in field_matches:
            data[key.lower()] = val.strip()
        entries.append(data)
        
    return entries
