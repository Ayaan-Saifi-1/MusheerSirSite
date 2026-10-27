from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    HomePageView,
    SiteSettingsView,
    NavigationListView,
    ResearchThemeViewSet,
    PublicationViewSet,
    HonorViewSet,
    EditorialRoleViewSet,
    ServiceItemViewSet,
    NewsItemViewSet,
    TeamMemberViewSet,
    CourseViewSet,
    ResearchOpeningViewSet,
    ProspectiveApplicationCreateView,
    robots_txt,
    sitemap_xml,
)

router = DefaultRouter()
router.register(r'research-themes', ResearchThemeViewSet, basename='research-themes')
router.register(r'publications', PublicationViewSet, basename='publications')
router.register(r'honors', HonorViewSet, basename='honors')
router.register(r'editorial', EditorialRoleViewSet, basename='editorial')
router.register(r'service', ServiceItemViewSet, basename='service')
router.register(r'news', NewsItemViewSet, basename='news')
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'courses', CourseViewSet, basename='courses')
router.register(r'openings', ResearchOpeningViewSet, basename='openings')

urlpatterns = [
    # Flagship single-payload endpoint for Home page
    path('home/', HomePageView.as_view(), name='home-payload'),
    path('portfolio-bundle/', HomePageView.as_view(), name='portfolio-bundle-legacy'),

    # Individual endpoints
    path('settings/', SiteSettingsView.as_view(), name='site-settings'),
    path('navigation/', NavigationListView.as_view(), name='navigation-list'),
    path('apply/', ProspectiveApplicationCreateView.as_view(), name='apply'),

    # ViewSet routes
    path('', include(router.urls)),
]
