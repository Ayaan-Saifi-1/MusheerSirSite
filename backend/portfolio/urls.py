from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    PortfolioBundleView,
    SiteConfigurationViewSet,
    ImpactMetricViewSet,
    ResearchAreaViewSet,
    PublicationViewSet,
    SponsoredProjectViewSet,
    TeamMemberViewSet,
    CourseViewSet,
    NewsItemViewSet,
    ResearchOpeningViewSet,
    ProspectiveApplicationViewSet,
    ImportBibtexAPIView,
)

router = DefaultRouter()
router.register(r'site-config', SiteConfigurationViewSet, basename='site-config')
router.register(r'impact-metrics', ImpactMetricViewSet, basename='impact-metrics')
router.register(r'research-areas', ResearchAreaViewSet, basename='research-areas')
router.register(r'publications', PublicationViewSet, basename='publications')
router.register(r'projects', SponsoredProjectViewSet, basename='projects')
router.register(r'team-members', TeamMemberViewSet, basename='team-members')
router.register(r'courses', CourseViewSet, basename='courses')
router.register(r'news-items', NewsItemViewSet, basename='news-items')
router.register(r'openings', ResearchOpeningViewSet, basename='openings')
router.register(r'applications', ProspectiveApplicationViewSet, basename='applications')

urlpatterns = [
    # Flagship single-payload endpoint
    path('portfolio-bundle/', PortfolioBundleView.as_view(), name='portfolio-bundle'),
    
    # BibTeX direct API import
    path('publications/import-bibtex/', ImportBibtexAPIView.as_view(), name='api-import-bibtex'),
    
    # Public application submission shorthand
    path('apply/', ProspectiveApplicationViewSet.as_view({'post': 'create'}), name='public-apply'),
    
    # REST CRUD ViewSets
    path('', include(router.urls)),
]
