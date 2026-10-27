from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q

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
from .serializers import (
    SiteConfigurationSerializer,
    ImpactMetricSerializer,
    ResearchAreaSerializer,
    PublicationSerializer,
    SponsoredProjectSerializer,
    TeamMemberSerializer,
    CourseSerializer,
    NewsItemSerializer,
    ResearchOpeningSerializer,
    ProspectiveApplicationSerializer,
    BibtexImportSerializer,
    PortfolioBundleSerializer,
)
from .bibtex_utils import parse_bibtex_entries


class PortfolioBundleView(APIView):
    """
    Public Aggregated Endpoint: GET /api/v1/portfolio-bundle/
    Delivers the complete site content in a single high-speed request to eliminate waterfalls.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        site_config = SiteConfiguration.load()
        impact_metrics = ImpactMetric.objects.filter(is_visible=True).order_by('display_order', 'id')
        research_areas = ResearchArea.objects.filter(is_active=True).order_by('display_order', 'id')
        publications = Publication.objects.all().order_by('-is_featured', 'display_order', '-year', '-id')
        projects = SponsoredProject.objects.all().order_by('display_order', '-start_year')
        team_members = TeamMember.objects.all().order_by('display_order', 'id')
        courses = Course.objects.all().order_by('display_order', 'code')
        news_items = NewsItem.objects.all().order_by('-is_pinned', 'display_order', '-date')
        openings = ResearchOpening.objects.all().order_by('display_order', 'id')

        data = {
            'site_config': SiteConfigurationSerializer(site_config, context={'request': request}).data,
            'impact_metrics': ImpactMetricSerializer(impact_metrics, many=True).data,
            'research_areas': ResearchAreaSerializer(research_areas, many=True).data,
            'publications': PublicationSerializer(publications, many=True).data,
            'projects': SponsoredProjectSerializer(projects, many=True).data,
            'team_members': TeamMemberSerializer(team_members, many=True).data,
            'courses': CourseSerializer(courses, many=True).data,
            'news_items': NewsItemSerializer(news_items, many=True).data,
            'openings': ResearchOpeningSerializer(openings, many=True).data,
        }
        return Response(data)


class SiteConfigurationViewSet(viewsets.ModelViewSet):
    queryset = SiteConfiguration.objects.all()
    serializer_class = SiteConfigurationSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class ImpactMetricViewSet(viewsets.ModelViewSet):
    queryset = ImpactMetric.objects.all()
    serializer_class = ImpactMetricSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class ResearchAreaViewSet(viewsets.ModelViewSet):
    queryset = ResearchArea.objects.all()
    serializer_class = ResearchAreaSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class PublicationViewSet(viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        qs = super().get_queryset()
        quartile = self.request.query_params.get('quartile')
        pub_type = self.request.query_params.get('type')
        year = self.request.query_params.get('year')
        area = self.request.query_params.get('area')
        search = self.request.query_params.get('search')
        featured = self.request.query_params.get('featured')

        if quartile:
            qs = qs.filter(quartile__iexact=quartile)
        if pub_type:
            qs = qs.filter(publication_type=pub_type)
        if year:
            qs = qs.filter(year=year)
        if area:
            qs = qs.filter(research_area__slug=area)
        if featured in ['true', '1']:
            qs = qs.filter(is_featured=True)
        if search:
            qs = qs.filter(
                Q(title__icontains=search) |
                Q(authors__icontains=search) |
                Q(venue_name__icontains=search) |
                Q(doi__icontains=search) |
                Q(abstract__icontains=search)
            )
        return qs


class SponsoredProjectViewSet(viewsets.ModelViewSet):
    queryset = SponsoredProject.objects.all()
    serializer_class = SponsoredProjectSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class NewsItemViewSet(viewsets.ModelViewSet):
    queryset = NewsItem.objects.all()
    serializer_class = NewsItemSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class ResearchOpeningViewSet(viewsets.ModelViewSet):
    queryset = ResearchOpening.objects.all()
    serializer_class = ResearchOpeningSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class ProspectiveApplicationViewSet(viewsets.ModelViewSet):
    queryset = ProspectiveApplication.objects.all()
    serializer_class = ProspectiveApplicationSerializer

    def get_permissions(self):
        # Allow anyone to create (submit application), authenticate to list/review
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class ImportBibtexAPIView(APIView):
    """
    POST /api/v1/publications/import-bibtex/
    Allows the professor or authorized frontend admin to paste raw BibTeX strings
    and instantly generate database records.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = BibtexImportSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        raw_bibtex = serializer.validated_data['raw_bibtex']
        research_area_id = serializer.validated_data.get('research_area_id')

        research_area = None
        if research_area_id:
            try:
                research_area = ResearchArea.objects.get(pk=research_area_id)
            except ResearchArea.DoesNotExist:
                pass

        parsed_entries = parse_bibtex_entries(raw_bibtex)
        if not parsed_entries:
            return Response(
                {'error': 'Could not parse any valid BibTeX entries. Please verify the format.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        created_records = []
        for item in parsed_entries:
            pub = Publication.objects.create(
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
                research_area=research_area,
            )
            created_records.append(pub)

        return Response({
            'message': f'Successfully imported {len(created_records)} publication(s).',
            'imported': PublicationSerializer(created_records, many=True).data
        }, status=status.HTTP_201_CREATED)
