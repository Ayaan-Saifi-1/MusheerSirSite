from rest_framework import serializers
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


class SiteConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfiguration
        fields = '__all__'


class ImpactMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactMetric
        fields = '__all__'


class ResearchAreaSerializer(serializers.ModelSerializer):
    publication_count = serializers.SerializerMethodField()

    class Meta:
        model = ResearchArea
        fields = '__all__'

    def get_publication_count(self, obj):
        return obj.publications.count()


class PublicationSerializer(serializers.ModelSerializer):
    research_area_title = serializers.CharField(source='research_area.title', read_only=True)
    publication_type_display = serializers.CharField(source='get_publication_type_display', read_only=True)

    class Meta:
        model = Publication
        fields = '__all__'


class SponsoredProjectSerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = SponsoredProject
        fields = '__all__'


class TeamMemberSerializer(serializers.ModelSerializer):
    role_category_display = serializers.CharField(source='get_role_category_display', read_only=True)

    class Meta:
        model = TeamMember
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    level_display = serializers.CharField(source='get_level_display', read_only=True)

    class Meta:
        model = Course
        fields = '__all__'


class NewsItemSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = NewsItem
        fields = '__all__'


class ResearchOpeningSerializer(serializers.ModelSerializer):
    position_type_display = serializers.CharField(source='get_position_type_display', read_only=True)

    class Meta:
        model = ResearchOpening
        fields = '__all__'


class ProspectiveApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProspectiveApplication
        fields = [
            'id',
            'applicant_name',
            'email',
            'phone',
            'current_institution',
            'degree_and_cgpa',
            'position_applied',
            'research_interest_statement',
            'paper_read_reference',
            'cv_link',
            'created_at',
        ]


class BibtexImportSerializer(serializers.Serializer):
    raw_bibtex = serializers.CharField(required=True)
    research_area_id = serializers.IntegerField(required=False, allow_null=True)


class PortfolioBundleSerializer(serializers.Serializer):
    site_config = SiteConfigurationSerializer()
    impact_metrics = ImpactMetricSerializer(many=True)
    research_areas = ResearchAreaSerializer(many=True)
    publications = PublicationSerializer(many=True)
    projects = SponsoredProjectSerializer(many=True)
    team_members = TeamMemberSerializer(many=True)
    courses = CourseSerializer(many=True)
    news_items = NewsItemSerializer(many=True)
    openings = ResearchOpeningSerializer(many=True)
