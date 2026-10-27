from django.contrib import admin
from unfold.admin import ModelAdmin
from simple_history.admin import SimpleHistoryAdmin
from import_export.admin import ImportExportModelAdmin

from .models import (
    SiteSettings,
    NavigationItem,
    HomePage,
    ResearchTheme,
    NewsItem,
    Publication,
    Honor,
    EditorialRole,
    ServiceItem,
    TeamMember,
    Course,
    ResearchOpening,
    ProspectiveApplication,
)


@admin.register(SiteSettings)
class SiteSettingsAdmin(SimpleHistoryAdmin, ModelAdmin):
    list_display = ('professor_name', 'title', 'total_papers', 'citations_count', 'h_index', 'updated_at')
    fieldsets = (
        ("Academic Identity & Faculty Position", {
            "description": "Core identity details displayed across site header, hero, and footer.",
            "fields": (
                ("professor_name", "title"),
                "secondary_roles",
                ("department", "university"),
                ("location", "office_phone"),
                ("email_primary", "email_secondary"),
            ),
        }),
        ("Official Photograph & Curriculum Vitae", {
            "description": "Upload the professor's official photograph and replace the CV PDF. If updated, the public website updates automatically.",
            "fields": (
                ("portrait", "portrait_alt"),
                ("cv_file", "cv_url"),
            ),
        }),
        ("Verified Bibliometric Figures (from Official CV)", {
            "description": "Official citation metrics and career output numbers verified against CV (June 2025).",
            "fields": (
                ("total_papers", "scopus_papers"),
                ("wos_papers", "scie_papers"),
                ("citations_count", "citations_scopus"),
                ("h_index", "h_index_scopus"),
                ("cumulative_impact_factor", "teaching_experience_years"),
                ("citations_as_of", "citations_source_url"),
                ("stanford_top_2_percent", "stanford_recognition_text"),
            ),
        }),
        ("Announcement Banner (Top of Site)", {
            "description": "Quiet text-only announcement banner displayed above the site header when activated.",
            "fields": (
                "announcement_banner_active",
                "announcement_banner_text",
                "announcement_banner_link",
            ),
        }),
        ("Social Sharing & Footer Governance", {
            "description": "Social media sharing image and institutional affiliation text in the site footer.",
            "fields": (
                "og_image",
                "footer_text",
            ),
        }),
        ("Prospective Students & Recruitment Notice", {
            "description": "Callout box encouraging prospective doctoral researchers and interns to reach out.",
            "fields": (
                "is_accepting_students",
                "student_callout_heading",
                "student_callout_text",
            ),
        }),
        ("Verified Academic Profiles & Identifiers", {
            "description": "Author IDs and scholarly repository links directly from Dr. Ahmad's CV.",
            "fields": (
                ("google_scholar_url", "scopus_url"),
                ("web_of_science_url", "researchgate_url"),
                ("dblp_url", "csauthors_url"),
                ("top_researchers_url", "jmi_profile_url"),
                ("orcid_url", "linkedin_url", "github_url"),
            ),
        }),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(NavigationItem)
class NavigationItemAdmin(ModelAdmin):
    list_display = ('title', 'path', 'order', 'is_visible')
    list_editable = ('order', 'is_visible')
    ordering = ('order',)


@admin.register(HomePage)
class HomePageAdmin(SimpleHistoryAdmin, ModelAdmin):
    list_display = ('__str__', 'updated_at')
    fieldsets = (
        ("Hero Headline & Introduction", {
            "description": "Primary editorial statement displayed at the top of the Home page in large serif typography.",
            "fields": (
                "hero_statement",
                "intro_body",
            ),
        }),
        ("Figure 1 (Chaotic Attractor)", {
            "description": "Scholarly caption accompanying the mathematical phase space projection.",
            "fields": (
                "figure_caption",
            ),
        }),
        ("Prospective Students Callout", {
            "description": "Brief invitation message directing candidates to the Join page.",
            "fields": (
                "callout_heading",
                "callout_text",
            ),
        }),
        ("Search Engine Metadata (SEO)", {
            "description": "Search engine title tag and meta description for public indexing.",
            "fields": (
                "seo_title",
                "seo_description",
            ),
        }),
    )

    def has_add_permission(self, request):
        return not HomePage.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(ResearchTheme)
class ResearchThemeAdmin(SimpleHistoryAdmin, ModelAdmin):
    list_display = ('title', 'order', 'status')
    list_editable = ('order', 'status')
    list_filter = ('status',)
    search_fields = ('title', 'summary', 'body')
    prepopulated_fields = {'slug': ('title',)}
    fieldsets = (
        ("Theme Information", {
            "fields": (
                "title",
                "slug",
                "order",
                "status",
            ),
        }),
        ("Editorial Narrative", {
            "fields": (
                "summary",
                "body",
            ),
        }),
    )


@admin.register(Publication)
class PublicationAdmin(SimpleHistoryAdmin, ImportExportModelAdmin, ModelAdmin):
    list_display = ('title_preview', 'year', 'venue_preview', 'impact_factor_as_listed', 'is_selected', 'status')
    list_editable = ('is_selected', 'status')
    list_filter = ('status', 'is_selected', 'year', 'publication_type', 'theme')
    search_fields = ('title', 'authors', 'venue', 'doi', 'abstract')
    prepopulated_fields = {'slug': ('title',)}
    fieldsets = (
        ("Publication Metadata", {
            "fields": (
                "title",
                "slug",
                "authors",
                ("venue", "publication_type"),
                ("year", "volume_issue_pages"),
                ("doi", "citation_count"),
                ("theme", "is_selected", "order", "status"),
            ),
        }),
        ("CV Indexing & Impact Factor", {
            "fields": (
                ("index_tags", "impact_factor_as_listed"),
                "raw_reference",
            ),
        }),
        ("Full-Text & Source Code", {
            "fields": (
                ("pdf_url", "code_url"),
            ),
        }),
        ("Abstract & BibTeX Citation", {
            "fields": (
                "abstract",
                "bibtex",
            ),
        }),
    )

    def title_preview(self, obj):
        return obj.title[:65] + ("..." if len(obj.title) > 65 else "")
    title_preview.short_description = "Title"

    def venue_preview(self, obj):
        return obj.venue[:40] + ("..." if len(obj.venue) > 40 else "")
    venue_preview.short_description = "Venue"


@admin.register(Honor)
class HonorAdmin(SimpleHistoryAdmin, ModelAdmin):
    list_display = ('title', 'year', 'awarding_body', 'order', 'status')
    list_editable = ('order', 'status')
    list_filter = ('status', 'year')
    search_fields = ('title', 'awarding_body', 'description')


@admin.register(EditorialRole)
class EditorialRoleAdmin(SimpleHistoryAdmin, ModelAdmin):
    list_display = ('journal_name', 'role_type', 'publisher', 'order', 'status')
    list_editable = ('order', 'status')
    list_filter = ('status', 'role_type', 'publisher')
    search_fields = ('journal_name', 'publisher', 'special_issue_title')


@admin.register(ServiceItem)
class ServiceItemAdmin(SimpleHistoryAdmin, ModelAdmin):
    list_display = ('title', 'category', 'year', 'order', 'status')
    list_editable = ('order', 'status')
    list_filter = ('status', 'category')
    search_fields = ('title', 'details')


@admin.register(NewsItem)
class NewsItemAdmin(SimpleHistoryAdmin, ModelAdmin):
    list_display = ('title', 'date', 'category', 'is_pinned', 'status')
    list_editable = ('is_pinned', 'status')
    list_filter = ('status', 'category', 'is_pinned', 'date')
    search_fields = ('title', 'body')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(TeamMember)
class TeamMemberAdmin(SimpleHistoryAdmin, ModelAdmin):
    list_display = ('name', 'role', 'order', 'affiliation_or_placement', 'status')
    list_editable = ('order', 'status')
    list_filter = ('status', 'role')
    search_fields = ('name', 'research_topic', 'affiliation_or_placement')


@admin.register(Course)
class CourseAdmin(SimpleHistoryAdmin, ModelAdmin):
    list_display = ('code', 'title', 'order', 'level', 'status')
    list_editable = ('order', 'status')
    list_filter = ('status', 'level')
    search_fields = ('code', 'title')


@admin.register(ResearchOpening)
class ResearchOpeningAdmin(SimpleHistoryAdmin, ModelAdmin):
    list_display = ('title', 'position_type', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active', 'position_type')
    search_fields = ('title', 'description')


@admin.register(ProspectiveApplication)
class ProspectiveApplicationAdmin(ModelAdmin):
    list_display = ('full_name', 'position_applied_for', 'current_institution', 'status', 'created_at')
    list_editable = ('status',)
    list_filter = ('status', 'created_at', 'position_applied_for')
    search_fields = ('full_name', 'email', 'current_institution', 'research_statement', 'paper_reference')
    readonly_fields = ('created_at',)
    actions = ['export_applications_csv', 'mark_shortlisted', 'mark_archived']

    fieldsets = (
        ("Applicant Identity & Academic Qualifications", {
            "description": "Candidate personal and academic credentials.",
            "fields": (
                ("full_name", "email"),
                ("phone", "current_institution"),
                ("degree_and_gpa", "position_applied_for"),
                "cv_url_or_link",
            ),
        }),
        ("Research Intent & Paper Critique", {
            "description": "Research direction proposal and candidate review of Dr. Ahmad's published work.",
            "fields": (
                "research_statement",
                "paper_reference",
            ),
        }),
        ("Internal Review & Workflow State", {
            "description": "Professor's private notes and recruitment status.",
            "fields": (
                ("status", "created_at"),
                "private_notes",
            ),
        }),
    )

    def export_applications_csv(self, request, queryset):
        import csv
        from django.http import HttpResponse

        response = HttpResponse(content_type='text/csv; charset=utf-8')
        response['Content-Disposition'] = 'attachment; filename="dr_musheer_ahmad_applications.csv"'
        writer = csv.writer(response)
        writer.writerow([
            'ID', 'Full Name', 'Email', 'Phone', 'Institution',
            'Degree & GPA', 'Position', 'Status', 'Research Statement',
            'Paper Reference', 'CV Link', 'Date Submitted'
        ])
        for app in queryset:
            writer.writerow([
                app.id, app.full_name, app.email, app.phone, app.current_institution,
                app.degree_and_gpa, app.position_applied_for, app.status,
                app.research_statement, app.paper_reference, app.cv_url_or_link,
                app.created_at.strftime('%Y-%m-%d %H:%M') if app.created_at else ''
            ])
        return response
    export_applications_csv.short_description = "Export selected applications to CSV file"

    def mark_shortlisted(self, request, queryset):
        updated = queryset.update(status='SHORTLISTED')
        self.message_user(request, f"{updated} candidate applications marked as Shortlisted.")
    mark_shortlisted.short_description = "Mark selected as Shortlisted"

    def mark_archived(self, request, queryset):
        updated = queryset.update(status='ARCHIVED')
        self.message_user(request, f"{updated} candidate applications marked as Archived.")
    mark_archived.short_description = "Mark selected as Archived"
