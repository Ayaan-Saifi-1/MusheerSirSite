from django.db import models
from django.utils.text import slugify


class SiteConfiguration(models.Model):
    """
    Singleton model holding global professor metadata, bio, contacts, and live recruitment state.
    """
    professor_name = models.CharField(max_length=200, default="Dr. Musheer Ahmad")
    designation = models.CharField(
        max_length=250,
        default="Associate Professor"
    )
    secondary_roles = models.CharField(
        max_length=250,
        blank=True,
        default="Assistant Controller of Examinations | Former Head, Department of Computer Engineering"
    )
    department = models.CharField(
        max_length=250,
        default="Department of Computer Engineering, Faculty of Engineering & Technology"
    )
    university = models.CharField(
        max_length=250,
        default="Jamia Millia Islamia (A Central University, NAAC A++ Accredited)"
    )
    location = models.CharField(
        max_length=200,
        default="New Delhi, Delhi 110025, India"
    )
    short_bio = models.TextField(
        default=(
            "Dr. Musheer Ahmad is an Associate Professor in the Department of Computer Engineering at "
            "Jamia Millia Islamia, New Delhi. Recognized among the World's Top 2% Scientists by Stanford University / "
            "Elsevier, he specializes in Chaos-Based Cryptography, Multimedia & Medical Image Security, "
            "Post-Quantum Cryptosystems, and Lightweight IoT Security."
        )
    )
    full_bio = models.TextField(
        blank=True,
        default=(
            "Dr. Musheer Ahmad received his Ph.D. in Computer Engineering from Jamia Millia Islamia, New Delhi. "
            "With over two decades of distinguished academic and research experience, he has authored more than "
            "150 peer-reviewed research papers in high-impact IEEE, Elsevier, Springer, and Wiley journals. "
            "His research focuses on mathematical cryptology, high-dimensional hyperchaotic systems, "
            "non-linear Substitution-Box (S-Box) synthesis, lightweight cipher design for resource-constrained "
            "IoT sensor networks, and secure medical multimedia transmission. He has supervised multiple Ph.D. scholars, "
            "guided funded research projects, and actively serves as reviewer and editorial board member for premier "
            "international scientific journals."
        )
    )
    hero_tagline = models.CharField(
        max_length=300,
        default="Pioneering Non-linear Chaos Cryptography, Resilient Multimedia Security & Next-Generation Post-Quantum Ciphers."
    )
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    profile_image_url = models.URLField(
        blank=True,
        default="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
    )
    cv_file = models.FileField(upload_to='cv/', blank=True, null=True)
    cv_external_url = models.URLField(
        blank=True,
        default="https://scholar.google.com/citations?user=cPbmjWoAAAAJ&hl=en"
    )
    email_primary = models.EmailField(default="mahmad@jmi.ac.in")
    email_secondary = models.EmailField(blank=True, default="musheer.cse@gmail.com")
    office_room = models.CharField(
        max_length=150,
        blank=True,
        default="Room 304, Department of Computer Engineering, JMI, New Delhi"
    )

    # Academic & Social Profiles
    google_scholar_url = models.URLField(
        default="https://scholar.google.com/citations?user=cPbmjWoAAAAJ&hl=en"
    )
    orcid_url = models.URLField(
        blank=True,
        default="https://orcid.org/0000-0002-8611-6677"
    )
    scopus_url = models.URLField(
        blank=True,
        default="https://www.scopus.com/authid/detail.uri?authorId=36987747800"
    )
    researchgate_url = models.URLField(
        blank=True,
        default="https://www.researchgate.net/profile/Musheer-Ahmad"
    )
    github_url = models.URLField(blank=True, default="https://github.com")
    linkedin_url = models.URLField(
        blank=True,
        default="https://www.linkedin.com/in/dr-musheer-ahmad-jmi"
    )

    # Badges & Recruitment Banner
    top_2_percent_badge_text = models.CharField(
        max_length=200,
        default="World's Top 2% Scientist — Stanford / Elsevier Citation Metrics"
    )
    is_accepting_phd = models.BooleanField(
        default=True,
        help_text="Controls live 'Openings' badge across site"
    )
    recruitment_banner_text = models.CharField(
        max_length=300,
        default="Admitting PhD Scholars & Postdoctoral Fellows for 2026/2027 • Funded Positions Available in Quantum-Safe Cryptography"
    )
    recruitment_banner_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Configuration (Singleton)"
        verbose_name_plural = "Site Configuration (Singleton)"

    def save(self, *args, **kwargs):
        # Guarantee singleton row (id=1)
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return f"{self.professor_name} — Site Configuration"


class ImpactMetric(models.Model):
    """
    Key bibliometric and career metrics displayed in the Hero Bento Grid.
    """
    label = models.CharField(max_length=150, help_text="e.g. Total Citations, h-Index, i10-Index, Q1 Papers")
    value = models.CharField(max_length=100, help_text="e.g. 6,850+, 45, 120, 150+")
    change_or_subtext = models.CharField(
        max_length=200,
        blank=True,
        help_text="e.g. Google Scholar Verified, Stanford/Elsevier Global Rank"
    )
    icon_name = models.CharField(
        max_length=100,
        default="Award",
        help_text="Lucide icon name: Award, BookOpen, TrendingUp, Quote, ShieldCheck, Users, Zap"
    )
    display_order = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order', 'id']
        verbose_name = "Impact Metric"
        verbose_name_plural = "Impact Metrics"

    def __str__(self):
        return f"{self.label}: {self.value}"


class ResearchArea(models.Model):
    """
    Core research pillars (e.g. Chaos Cryptography, Image Security, Post-Quantum).
    """
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    short_description = models.TextField()
    detailed_methodology = models.TextField(blank=True)
    icon_name = models.CharField(max_length=100, default="Lock")
    accent_color = models.CharField(max_length=50, default="#2563EB", help_text="Hex color code e.g. #2563EB")
    keywords_csv = models.TextField(
        blank=True,
        help_text="Comma-separated keywords e.g. Hyperchaos, S-Box Design, Lyapunov Exponent, FPGA"
    )
    featured_image = models.ImageField(upload_to='research/', blank=True, null=True)
    featured_image_url = models.URLField(blank=True)
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order', 'id']
        verbose_name = "Research Area"
        verbose_name_plural = "Research Areas"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Publication(models.Model):
    """
    Research publication with quartile rating, BibTeX support, and auto author highlight.
    """
    class PublicationType(models.TextChoices):
        JOURNAL_Q1 = 'JOURNAL_Q1', 'SCI Q1 Journal'
        JOURNAL_SCI = 'JOURNAL_SCI', 'SCI / Scopus Journal'
        CONFERENCE = 'CONFERENCE', 'IEEE / ACM Conference'
        BOOK_CHAPTER = 'BOOK_CHAPTER', 'Book Chapter (Springer / Elsevier)'
        PATENT = 'PATENT', 'Published / Granted Patent'
        BOOK = 'BOOK', 'Monograph / Book'

    class Quartile(models.TextChoices):
        Q1 = 'Q1', 'Q1 (Top Quartile)'
        Q2 = 'Q2', 'Q2'
        Q3 = 'Q3', 'Q3'
        Q4 = 'Q4', 'Q4'
        NA = 'NA', 'N/A'

    title = models.CharField(max_length=500)
    authors = models.TextField(
        help_text="Comma-separated list of authors. Frontend highlights 'Musheer Ahmad' / 'M. Ahmad'"
    )
    venue_name = models.CharField(max_length=350, help_text="Journal name or Conference proceedings")
    publication_type = models.CharField(
        max_length=30,
        choices=PublicationType.choices,
        default=PublicationType.JOURNAL_Q1
    )
    year = models.PositiveIntegerField()
    volume_issue_pages = models.CharField(max_length=150, blank=True)
    impact_factor = models.CharField(max_length=50, blank=True, help_text="e.g. 10.6, 7.8")
    quartile = models.CharField(
        max_length=10,
        choices=Quartile.choices,
        default=Quartile.Q1
    )
    doi = models.CharField(max_length=200, blank=True)
    pdf_url = models.URLField(blank=True)
    pdf_upload = models.FileField(upload_to='papers/', blank=True, null=True)
    code_url = models.URLField(blank=True)
    abstract = models.TextField(blank=True)
    bibtex_raw = models.TextField(blank=True, help_text="Raw BibTeX entry for 1-click citation copy")
    citation_count = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    research_area = models.ForeignKey(
        ResearchArea,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='publications'
    )
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-is_featured', 'display_order', '-year', '-id']
        verbose_name = "Publication"
        verbose_name_plural = "Publications"

    def __str__(self):
        return f"[{self.year}] {self.title[:80]}..."


class SponsoredProject(models.Model):
    """
    Government & industry funded research projects (DST, AICTE, SERB, DRDO, etc.).
    """
    class Role(models.TextChoices):
        PI = 'PI', 'Principal Investigator (PI)'
        CO_PI = 'CO_PI', 'Co-Principal Investigator (Co-PI)'
        MENTOR = 'MENTOR', 'Faculty Mentor'

    class Status(models.TextChoices):
        ONGOING = 'ONGOING', 'Ongoing'
        COMPLETED = 'COMPLETED', 'Completed'

    title = models.CharField(max_length=400)
    funding_agency = models.CharField(max_length=250, help_text="e.g. DST-SERB, AICTE, UGC, MeitY")
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.PI)
    grant_amount = models.CharField(max_length=100, help_text="e.g. ₹35.00 Lakhs")
    start_year = models.PositiveIntegerField()
    end_year = models.CharField(max_length=50, blank=True, default="Ongoing")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ONGOING)
    summary = models.TextField(blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', '-start_year']
        verbose_name = "Sponsored Grant / Project"
        verbose_name_plural = "Sponsored Grants / Projects"

    def __str__(self):
        return f"{self.title[:60]} ({self.funding_agency})"


class TeamMember(models.Model):
    """
    Research group members: Postdocs, PhD scholars, and Alumni.
    """
    class RoleCategory(models.TextChoices):
        POSTDOC = 'POSTDOC', 'Postdoctoral Fellow'
        PHD_CURRENT = 'PHD_CURRENT', 'Ph.D. Scholar (Current)'
        PHD_ALUMNI = 'PHD_ALUMNI', 'Ph.D. Alumni'
        MASTERS = 'MASTERS', 'M.Tech / Master Scholar'
        UNDERGRAD = 'UNDERGRAD', 'Undergraduate Researcher'

    name = models.CharField(max_length=200)
    role_category = models.CharField(
        max_length=30,
        choices=RoleCategory.choices,
        default=RoleCategory.PHD_CURRENT
    )
    research_topic = models.CharField(max_length=350)
    enrollment_year = models.PositiveIntegerField(null=True, blank=True)
    graduation_year = models.CharField(max_length=50, blank=True)
    current_position = models.CharField(
        max_length=300,
        blank=True,
        help_text="For alumni: e.g. Assistant Professor at NIT Delhi, Senior Research Scientist"
    )
    photo = models.ImageField(upload_to='team/', blank=True, null=True)
    photo_url = models.URLField(blank=True)
    scholar_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'id']
        verbose_name = "Team Member & Alumni"
        verbose_name_plural = "Team Members & Alumni"

    def __str__(self):
        return f"{self.name} ({self.get_role_category_display()})"


class Course(models.Model):
    """
    Courses taught at Undergrad, Postgrad, and Ph.D. level.
    """
    class Level(models.TextChoices):
        UG = 'UG', 'Undergraduate (B.Tech)'
        PG = 'PG', 'Postgraduate (M.Tech)'
        PHD = 'PHD', 'Ph.D. Coursework'

    code = models.CharField(max_length=50, help_text="e.g. CEN-501, CS-402")
    title = models.CharField(max_length=250)
    level = models.CharField(max_length=10, choices=Level.choices, default=Level.PG)
    semester = models.CharField(max_length=100, default="Monsoon Semester")
    description = models.TextField(blank=True)
    syllabus_url = models.URLField(blank=True)
    is_current = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'code']
        verbose_name = "Course & Teaching"
        verbose_name_plural = "Courses & Teaching"

    def __str__(self):
        return f"{self.code}: {self.title}"


class NewsItem(models.Model):
    """
    Lab announcements, paper acceptances, keynote talks, and awards.
    """
    class Category(models.TextChoices):
        PAPER = 'PAPER', 'Paper Accepted'
        AWARD = 'AWARD', 'Award / Honor'
        TALK = 'TALK', 'Invited Talk / Keynote'
        GRANT = 'GRANT', 'Research Grant'
        OPENING = 'OPENING', 'Lab Opening'

    title = models.CharField(max_length=300)
    date = models.DateField()
    category = models.CharField(
        max_length=20,
        choices=Category.choices,
        default=Category.PAPER
    )
    summary = models.TextField()
    external_link = models.URLField(blank=True)
    is_pinned = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-is_pinned', 'display_order', '-date']
        verbose_name = "News & Announcement"
        verbose_name_plural = "News & Announcements"

    def __str__(self):
        return f"[{self.date}] {self.title}"


class ResearchOpening(models.Model):
    """
    Active positions in the lab with criteria and stipend notes.
    """
    class PositionType(models.TextChoices):
        PHD = 'PHD', 'Ph.D. Fellowship'
        POSTDOC = 'POSTDOC', 'Postdoctoral Fellow'
        MTECH = 'MTECH', 'M.Tech Thesis Student'
        INTERN = 'INTERN', 'Research Intern'

    position_type = models.CharField(
        max_length=20,
        choices=PositionType.choices,
        default=PositionType.PHD
    )
    title = models.CharField(max_length=250)
    is_open = models.BooleanField(default=True)
    prerequisites = models.TextField(
        help_text="e.g. GATE Qualified in CS/IT, strong Python/C++ skills, cryptography fundamentals."
    )
    stipend_or_funding_info = models.CharField(
        max_length=250,
        blank=True,
        default="Institute Fellowship / CSIR-JRF / Project JRF as per Govt. of India norms."
    )
    email_subject_prefix = models.CharField(
        max_length=150,
        default="[PhD Application 2026 - Cryptography Lab]"
    )
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'id']
        verbose_name = "Research Opening"
        verbose_name_plural = "Research Openings"

    def __str__(self):
        status = "OPEN" if self.is_open else "CLOSED"
        return f"[{status}] {self.title} ({self.get_position_type_display()})"


class ProspectiveApplication(models.Model):
    """
    Prospective student applications submitted via the website portal.
    """
    class Status(models.TextChoices):
        NEW = 'NEW', 'New Inbound'
        SHORTLISTED = 'SHORTLISTED', 'Shortlisted'
        ARCHIVED = 'ARCHIVED', 'Archived'

    applicant_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    current_institution = models.CharField(max_length=250)
    degree_and_cgpa = models.CharField(max_length=150, help_text="e.g. B.Tech CSE, 8.9 CGPA")
    position_applied = models.CharField(max_length=150, default="Ph.D. Fellowship")
    research_interest_statement = models.TextField()
    paper_read_reference = models.TextField(
        blank=True,
        help_text="Which paper of Dr. Musheer Ahmad did you read and what ideas would you extend?"
    )
    cv_link = models.URLField(blank=True, help_text="Google Drive / Dropbox / personal website link to CV")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Prospective Application"
        verbose_name_plural = "Prospective Applications"

    def __str__(self):
        return f"{self.applicant_name} ({self.position_applied}) - {self.created_at.strftime('%Y-%m-%d')}"
