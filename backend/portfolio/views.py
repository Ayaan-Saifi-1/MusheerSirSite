from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

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
    ContentStatus,
)
from .serializers import (
    SiteSettingsSerializer,
    NavigationItemSerializer,
    HomePageSerializer,
    ResearchThemeSerializer,
    NewsItemSerializer,
    PublicationSerializer,
    HonorSerializer,
    EditorialRoleSerializer,
    ServiceItemSerializer,
    TeamMemberSerializer,
    CourseSerializer,
    ResearchOpeningSerializer,
    ProspectiveApplicationSerializer,
)


class HomePageView(APIView):
    """
    Combined home endpoint: GET /api/v1/home/
    Returns all content required to render the editorial Home page in a single request.
    Public view: serves ONLY published items.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        settings_obj = SiteSettings.load()
        nav_items = NavigationItem.objects.filter(is_visible=True).order_by('order', 'id')
        home_obj = HomePage.load()
        themes = ResearchTheme.objects.filter(status=ContentStatus.PUBLISHED).order_by('order', 'id')

        # Selected publications (marked as is_selected=True)
        selected_pubs = Publication.objects.filter(
            status=ContentStatus.PUBLISHED,
            is_selected=True
        ).order_by('-year', 'order', '-id')[:6]

        if not selected_pubs.exists():
            selected_pubs = Publication.objects.filter(
                status=ContentStatus.PUBLISHED
            ).order_by('-year', 'order', '-id')[:6]

        honors = Honor.objects.filter(status=ContentStatus.PUBLISHED).order_by('-year', 'order', '-id')
        editorial = EditorialRole.objects.filter(status=ContentStatus.PUBLISHED).order_by('order', 'id')
        news = NewsItem.objects.filter(status=ContentStatus.PUBLISHED).order_by('-is_pinned', '-date', '-id')[:5]

        data = {
            'settings': SiteSettingsSerializer(settings_obj, context={'request': request}).data,
            'navigation': NavigationItemSerializer(nav_items, many=True).data,
            'home': HomePageSerializer(home_obj, context={'request': request}).data,
            'research_themes': ResearchThemeSerializer(themes, many=True).data,
            'selected_publications': PublicationSerializer(selected_pubs, many=True).data,
            'honors': HonorSerializer(honors, many=True).data,
            'editorial_roles': EditorialRoleSerializer(editorial, many=True).data,
            'latest_news': NewsItemSerializer(news, many=True).data,
        }
        return Response(data)


class NavigationListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = NavigationItem.objects.filter(is_visible=True).order_by('order', 'id')
    serializer_class = NavigationItemSerializer


class SiteSettingsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        settings_obj = SiteSettings.load()
        return Response(SiteSettingsSerializer(settings_obj, context={'request': request}).data)


class ResearchThemeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ResearchThemeSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return ResearchTheme.objects.filter(status=ContentStatus.PUBLISHED).order_by('order', 'id')


class PublicationViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = PublicationSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        qs = Publication.objects.filter(status=ContentStatus.PUBLISHED).order_by('-year', 'order', '-id')
        pub_type = self.request.query_params.get('type')
        year = self.request.query_params.get('year')
        search = self.request.query_params.get('search')
        selected = self.request.query_params.get('selected')
        theme_slug = self.request.query_params.get('theme')

        if pub_type:
            qs = qs.filter(publication_type=pub_type)
        if year:
            qs = qs.filter(year=year)
        if selected in ['true', '1']:
            qs = qs.filter(is_selected=True)
        if theme_slug:
            qs = qs.filter(theme__slug=theme_slug)
        if search:
            qs = qs.filter(
                Q(title__icontains=search) |
                Q(authors__icontains=search) |
                Q(venue__icontains=search) |
                Q(doi__icontains=search) |
                Q(abstract__icontains=search)
            )
        return qs


class HonorViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = HonorSerializer

    def get_queryset(self):
        return Honor.objects.filter(status=ContentStatus.PUBLISHED).order_by('-year', 'order', '-id')


class EditorialRoleViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = EditorialRoleSerializer

    def get_queryset(self):
        return EditorialRole.objects.filter(status=ContentStatus.PUBLISHED).order_by('order', 'id')


class ServiceItemViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ServiceItemSerializer

    def get_queryset(self):
        category = self.request.query_params.get('category')
        qs = ServiceItem.objects.filter(status=ContentStatus.PUBLISHED).order_by('order', 'id')
        if category:
            qs = qs.filter(category=category)
        return qs


class NewsItemViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = NewsItemSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return NewsItem.objects.filter(status=ContentStatus.PUBLISHED).order_by('-is_pinned', '-date', '-id')


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = TeamMemberSerializer

    def get_queryset(self):
        return TeamMember.objects.filter(status=ContentStatus.PUBLISHED).order_by('order', 'id')


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = CourseSerializer

    def get_queryset(self):
        return Course.objects.filter(status=ContentStatus.PUBLISHED).order_by('order', 'code')


class ResearchOpeningViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ResearchOpeningSerializer

    def get_queryset(self):
        return ResearchOpening.objects.filter(is_active=True).order_by('order', '-id')


class ProspectiveApplicationCreateView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = ProspectiveApplication.objects.all()
    serializer_class = ProspectiveApplicationSerializer

    def perform_create(self, serializer):
        application = serializer.save()

        # Send quiet acknowledgment to candidate & notification to professor
        from django.core.mail import send_mail
        from django.conf import settings

        try:
            subject_student = "Acknowledgment: Research Inquiry to Dr. Musheer Ahmad (JMI)"
            message_student = (
                f"Dear {application.full_name},\n\n"
                f"Thank you for submitting your prospective research inquiry for the position of "
                f"{application.position_applied_for} under Dr. Musheer Ahmad at the Department of Computer Engineering, "
                f"Jamia Millia Islamia.\n\n"
                f"Your dossier and paper critique have been recorded in our academic queue. "
                f"If your research background and qualifications align with active laboratory inquiries, you will be contacted directly.\n\n"
                f"Sincerely,\n"
                f"Laboratory of Nonlinear Cryptology & Cyber-Physical Security\n"
                f"Department of Computer Engineering\n"
                f"Jamia Millia Islamia, New Delhi 110025, India\n"
            )
            send_mail(
                subject_student,
                message_student,
                getattr(settings, 'DEFAULT_FROM_EMAIL', 'mahmad9@jmi.ac.in'),
                [application.email],
                fail_silently=True,
            )

            subject_prof = f"[New Application] {application.full_name} — {application.position_applied_for}"
            message_prof = (
                f"A new prospective research inquiry has been submitted:\n\n"
                f"Candidate: {application.full_name}\n"
                f"Email: {application.email}\n"
                f"Institution: {application.current_institution}\n"
                f"Degree & GPA: {application.degree_and_gpa}\n"
                f"Position: {application.position_applied_for}\n\n"
                f"Research Statement:\n{application.research_statement}\n\n"
                f"Paper Critique:\n{application.paper_reference}\n\n"
                f"CV Link: {application.cv_url_or_link}\n"
            )
            send_mail(
                subject_prof,
                message_prof,
                getattr(settings, 'DEFAULT_FROM_EMAIL', 'mahmad9@jmi.ac.in'),
                ['mahmad9@jmi.ac.in'],
                fail_silently=True,
            )
        except Exception:
            pass


def robots_txt(request):
    """
    Standard robots.txt allowing search engines to index public academic pages.
    """
    from django.http import HttpResponse
    host = request.get_host()
    scheme = 'https' if request.is_secure() else 'http'
    lines = [
        "User-agent: *",
        "Allow: /",
        "Disallow: /cms-admin/",
        "Disallow: /admin/",
        "Disallow: /api/",
        "",
        f"Sitemap: {scheme}://{host}/sitemap.xml",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain; charset=utf-8")


def sitemap_xml(request):
    """
    XML Sitemap indexing all public routes and research sections.
    """
    from django.http import HttpResponse
    host = request.get_host()
    scheme = 'https' if request.is_secure() else 'http'
    base = f"{scheme}://{host}"

    public_routes = [
        ('', '1.0', 'weekly'),
        ('research', '0.9', 'weekly'),
        ('publications', '0.9', 'weekly'),
        ('group', '0.8', 'monthly'),
        ('teaching', '0.8', 'monthly'),
        ('service', '0.8', 'monthly'),
        ('cv', '0.9', 'monthly'),
        ('news', '0.8', 'weekly'),
        ('join', '0.8', 'monthly'),
        ('contact', '0.8', 'yearly'),
    ]

    xml = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    for path_slug, priority, changefreq in public_routes:
        loc = f"{base}/{path_slug}".rstrip('/') if path_slug else f"{base}/"
        xml.append('  <url>')
        xml.append(f'    <loc>{loc}</loc>')
        xml.append(f'    <changefreq>{changefreq}</changefreq>')
        xml.append(f'    <priority>{priority}</priority>')
        xml.append('  </url>')

    xml.append('</urlset>')
    return HttpResponse("\n".join(xml), content_type="application/xml; charset=utf-8")
