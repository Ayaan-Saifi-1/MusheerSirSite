from rest_framework import serializers
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


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'


class NavigationItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavigationItem
        fields = ['id', 'title', 'path', 'order']


class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePage
        fields = '__all__'


class ResearchThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchTheme
        fields = ['id', 'title', 'slug', 'summary', 'body', 'order']


class PublicationSerializer(serializers.ModelSerializer):
    theme_title = serializers.CharField(source='theme.title', read_only=True)

    class Meta:
        model = Publication
        fields = [
            'id',
            'title',
            'slug',
            'authors',
            'venue',
            'year',
            'volume_issue_pages',
            'publication_type',
            'doi',
            'pdf_url',
            'code_url',
            'abstract',
            'bibtex',
            'theme',
            'theme_title',
            'index_tags',
            'impact_factor_as_listed',
            'is_selected',
            'citation_count',
            'order',
        ]


class HonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Honor
        fields = '__all__'


class EditorialRoleSerializer(serializers.ModelSerializer):
    role_type_display = serializers.CharField(source='get_role_type_display', read_only=True)

    class Meta:
        model = EditorialRole
        fields = '__all__'


class ServiceItemSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = ServiceItem
        fields = '__all__'


class NewsItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItem
        fields = ['id', 'title', 'slug', 'date', 'category', 'body', 'link', 'is_pinned']


class HomePagePayloadSerializer(serializers.Serializer):
    """
    Combined home payload delivering everything needed for route '/' in a single request.
    """
    settings = SiteSettingsSerializer()
    navigation = NavigationItemSerializer(many=True)
    home = HomePageSerializer()
    research_themes = ResearchThemeSerializer(many=True)
    selected_publications = PublicationSerializer(many=True)
    honors = HonorSerializer(many=True)
    editorial_roles = EditorialRoleSerializer(many=True)
    latest_news = NewsItemSerializer(many=True)


class TeamMemberSerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source='get_role_display', read_only=True)

    class Meta:
        model = TeamMember
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class ResearchOpeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchOpening
        fields = '__all__'


class ProspectiveApplicationSerializer(serializers.ModelSerializer):
    website_hp = serializers.CharField(required=False, write_only=True, allow_blank=True)

    class Meta:
        model = ProspectiveApplication
        fields = [
            'id',
            'full_name',
            'email',
            'phone',
            'current_institution',
            'degree_and_gpa',
            'position_applied_for',
            'research_statement',
            'paper_reference',
            'cv_url_or_link',
            'website_hp',
            'created_at',
        ]

    def validate_website_hp(self, value):
        if value:
            raise serializers.ValidationError("Bot submission rejected.")
        return value
