"""
Django Unfold Admin Configuration for Dr. Musheer Ahmad Lab CMS.
Features sleek Tailwind UI, fieldsets, search, filtering, and 1-Click BibTeX import.
"""

from django.contrib import admin
from django.urls import path
from django.shortcuts import render, redirect
from django.contrib import messages
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from unfold.decorators import action

from .models import (
    SiteConfiguration,
    ImpactMetric,
    ResearchArea,
    Publication,
    SponsoredProject,
    TeamMember,
    Course,
    NewsItem,
    ResearchOpening,
    ProspectiveApplication,
)
from .bibtex_utils import parse_bibtex_entries


@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(ModelAdmin):
    list_display = ('professor_name', 'designation', 'is_accepting_phd', 'recruitment_banner_active', 'updated_at')
    fieldsets = (
        ("Personal & Academic Identity", {
            "fields": (
                ("professor_name", "designation"),
                "secondary_roles",
                ("department", "university"),
                ("location", "office_room"),
                "hero_tagline",
                ("top_2_percent_badge_text", "is_accepting_phd"),
            ),
        }),
        ("Biography & Portfolios", {
            "fields": (
                "short_bio",
                "full_bio",
                ("profile_image", "profile_image_url"),
                ("cv_file", "cv_external_url"),
            ),
        }),
        ("Recruitment & Live Banner", {
            "fields": (
                "recruitment_banner_text",
                "recruitment_banner_active",
            ),
        }),
        ("Communication & Verification Profiles", {
            "fields": (
                ("email_primary", "email_secondary"),
                ("google_scholar_url", "orcid_url"),
                ("scopus_url", "researchgate_url"),
                ("linkedin_url", "github_url"),
            ),
        }),
    )

    def has_add_permission(self, request):
        # Disallow creating multiple configuration records
        return not SiteConfiguration.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(ImpactMetric)
class ImpactMetricAdmin(ModelAdmin):
    list_display = ('label', 'value', 'change_or_subtext', 'icon_name', 'display_order', 'is_visible')
    list_editable = ('value', 'display_order', 'is_visible')
    search_fields = ('label', 'change_or_subtext')
    list_filter = ('is_visible',)


@admin.register(ResearchArea)
class ResearchAreaAdmin(ModelAdmin):
    list_display = ('title', 'slug', 'accent_color', 'display_order', 'is_active')
    list_editable = ('display_order', 'is_active')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'short_description', 'keywords_csv')
    list_filter = ('is_active',)


@admin.register(Publication)
class PublicationAdmin(ModelAdmin):
    list_display = (
        'title_preview',
        'year',
        'publication_type',
        'quartile_badge',
        'impact_factor',
        'citation_count',
        'is_featured',
        'display_order'
    )
    list_filter = ('publication_type', 'quartile', 'year', 'is_featured', 'research_area')
    list_editable = ('is_featured', 'display_order')
    search_fields = ('title', 'authors', 'venue_name', 'doi', 'abstract')
    change_list_template = "admin/portfolio/publication/change_list.html"

    fieldsets = (
        ("Publication Metadata", {
            "fields": (
                "title",
                "authors",
                ("venue_name", "publication_type"),
                ("year", "volume_issue_pages"),
                ("quartile", "impact_factor", "citation_count"),
                ("research_area", "is_featured", "display_order"),
            )
        }),
        ("Access Links & Identifiers", {
            "fields": (
                ("doi", "code_url"),
                ("pdf_url", "pdf_upload"),
            )
        }),
        ("Abstract & BibTeX Citation", {
            "fields": (
                "abstract",
                "bibtex_raw",
            )
        }),
    )

    def title_preview(self, obj):
        return obj.title[:75] + ("..." if len(obj.title) > 75 else "")
    title_preview.short_description = "Title"

    def quartile_badge(self, obj):
        colors = {
            'Q1': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
            'Q2': 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
            'Q3': 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
            'Q4': 'bg-zinc-100 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-300',
            'NA': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
        }
        color_class = colors.get(obj.quartile, 'bg-zinc-100 text-zinc-800')
        return format_html(
            f'<span class="px-2 py-0.5 rounded text-xs font-semibold {color_class}">{obj.quartile}</span>'
        )
    quartile_badge.short_description = "Quartile"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('import-bibtex-wizard/', self.admin_site.admin_view(self.import_bibtex_view), name='portfolio_publication_import_bibtex'),
        ]
        return custom_urls + urls

    def import_bibtex_view(self, request):
        if request.method == 'POST':
            raw_bibtex = request.POST.get('raw_bibtex', '')
            parsed = parse_bibtex_entries(raw_bibtex)
            created_count = 0
            for item in parsed:
                Publication.objects.create(
                    title=item['title'],
                    authors=item['authors'],
                    venue_name=item['venue_name'],
                    publication_type=item['publication_type'],
                    year=item['year'],
                    volume_issue_pages=item['volume_issue_pages'],
                    quartile=item['quartile'],
                    doi=item['doi'],
                    pdf_url=item['pdf_url'],
                    abstract=item['abstract'],
                    bibtex_raw=item['bibtex_raw'],
                    is_featured=item['is_featured'],
                )
                created_count += 1
            self.message_user(
                request,
                f"Successfully parsed and imported {created_count} publication(s) into database!",
                level=messages.SUCCESS
            )
            return redirect('..')
        
        context = dict(
            self.admin_site.each_context(request),
            title="1-Click BibTeX Auto-Import"
        )
        return render(request, "admin/portfolio/publication/import_bibtex.html", context)


@admin.register(SponsoredProject)
class SponsoredProjectAdmin(ModelAdmin):
    list_display = ('title', 'funding_agency', 'role', 'grant_amount', 'start_year', 'end_year', 'status', 'display_order')
    list_filter = ('status', 'role', 'funding_agency')
    search_fields = ('title', 'funding_agency', 'summary')
    list_editable = ('status', 'display_order')


@admin.register(TeamMember)
class TeamMemberAdmin(ModelAdmin):
    list_display = ('name', 'role_category', 'research_topic', 'enrollment_year', 'graduation_year', 'display_order')
    list_filter = ('role_category',)
    search_fields = ('name', 'research_topic', 'current_position')
    list_editable = ('display_order',)


@admin.register(Course)
class CourseAdmin(ModelAdmin):
    list_display = ('code', 'title', 'level', 'semester', 'is_current', 'display_order')
    list_filter = ('level', 'is_current')
    search_fields = ('code', 'title', 'description')
    list_editable = ('is_current', 'display_order')


@admin.register(NewsItem)
class NewsItemAdmin(ModelAdmin):
    list_display = ('title', 'date', 'category', 'is_pinned', 'display_order')
    list_filter = ('category', 'is_pinned')
    search_fields = ('title', 'summary')
    list_editable = ('is_pinned', 'display_order')


@admin.register(ResearchOpening)
class ResearchOpeningAdmin(ModelAdmin):
    list_display = ('title', 'position_type', 'is_open', 'stipend_or_funding_info', 'display_order')
    list_filter = ('position_type', 'is_open')
    search_fields = ('title', 'prerequisites')
    list_editable = ('is_open', 'display_order')


@admin.register(ProspectiveApplication)
class ProspectiveApplicationAdmin(ModelAdmin):
    list_display = (
        'applicant_name',
        'email',
        'position_applied',
        'current_institution',
        'degree_and_cgpa',
        'status',
        'created_at'
    )
    list_filter = ('status', 'position_applied', 'created_at')
    search_fields = ('applicant_name', 'email', 'current_institution', 'research_interest_statement')
    readonly_fields = ('created_at',)
    fieldsets = (
        ("Applicant Identity", {
            "fields": (
                ("applicant_name", "email"),
                ("phone", "current_institution"),
                ("degree_and_cgpa", "position_applied"),
                ("cv_link", "status"),
                "created_at",
            )
        }),
        ("Research Interests & References", {
            "fields": (
                "research_interest_statement",
                "paper_read_reference",
            )
        }),
    )
