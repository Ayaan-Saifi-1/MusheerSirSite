from django.db import models
from django.utils.text import slugify
from simple_history.models import HistoricalRecords


class ContentStatus(models.TextChoices):
    DRAFT = 'DRAFT', 'Draft (Hidden from public)'
    PUBLISHED = 'PUBLISHED', 'Published (Live on site)'


class SiteSettings(models.Model):
    """
    Global verified academic metadata, contact details, and bibliometric metrics
    for Dr. Musheer Ahmad, sourced directly from his official CV and JMI profile.
    """
    professor_name = models.CharField(
        max_length=200,
        default="Dr. Musheer Ahmad",
        help_text="Full academic name and title"
    )
    title = models.CharField(
        max_length=250,
        default="Associate Professor",
        help_text="Primary academic appointment"
    )
    secondary_roles = models.CharField(
        max_length=300,
        blank=True,
        default="Assistant Controller of Examinations (Office of the Controller of Examinations)",
        help_text="University administrative appointments"
    )
    department = models.CharField(
        max_length=250,
        default="Department of Computer Engineering, Faculty of Engineering and Technology"
    )
    university = models.CharField(
        max_length=250,
        default="Jamia Millia Islamia, New Delhi 110025, India"
    )
    location = models.CharField(
        max_length=300,
        default="Department of Computer Engineering, Faculty of Engineering and Technology, Jamia Millia Islamia, New Delhi 110025, India"
    )
    email_primary = models.EmailField(
        default="mahmad9@jmi.ac.in",
        help_text="Official university correspondence email (mahmad9@jmi.ac.in)"
    )
    email_secondary = models.EmailField(
        blank=True,
        default="musheer.cse@gmail.com",
        help_text="Personal/alternative research email (musheer.cse@gmail.com)"
    )
    office_phone = models.CharField(
        max_length=60,
        blank=True,
        default="+91 11 2698 0281",
        help_text="Official office telephone from JMI faculty directory"
    )

    # Portrait (Official photo provided by professor)
    portrait = models.ImageField(
        upload_to='portraits/',
        blank=True,
        null=True,
        help_text="Official portrait photograph"
    )
    portrait_alt = models.CharField(
        max_length=255,
        default="Official portrait of Dr. Musheer Ahmad, Associate Professor at Jamia Millia Islamia",
        help_text="Descriptive alt text for the portrait"
    )

    # Curriculum Vitae
    cv_file = models.FileField(
        upload_to='cv/',
        blank=True,
        null=True,
        help_text="Latest Curriculum Vitae PDF document"
    )
    cv_url = models.URLField(
        blank=True,
        default="https://www.jmi.ac.in/upload/employeeresume/mahmad9.pdf",
        help_text="Link to official resume PDF on JMI portal"
    )

    # Verified Academic Identifiers & Profiles (from CV)
    google_scholar_url = models.URLField(
        default="https://scholar.google.com/citations?user=cPbmjWoAAAAJ&hl=en&sortby=pubdate",
        help_text="Google Scholar profile link"
    )
    scopus_url = models.URLField(
        default="https://www.scopus.com/authid/detail.uri?authorId=56339090200",
        help_text="Scopus Author ID: 56339090200"
    )
    web_of_science_url = models.URLField(
        blank=True,
        default="https://www.webofscience.com/wos/author/record/H-9587-2018",
        help_text="Web of Science ResearcherID: H-9587-2018"
    )
    researchgate_url = models.URLField(
        blank=True,
        default="https://www.researchgate.net/profile/Musheer-Ahmad-3",
        help_text="ResearchGate academic profile link"
    )
    dblp_url = models.URLField(
        blank=True,
        default="https://dblp.org/pid/89/8467-2.html",
        help_text="DBLP Computer Science Bibliography profile"
    )
    csauthors_url = models.URLField(
        blank=True,
        default="https://www.csauthors.net/musheer-ahmad-002/",
        help_text="CSAuthors profile link"
    )
    top_researchers_url = models.URLField(
        blank=True,
        default="https://topresearcherslist.com/Home/Profile/862797",
        help_text="Top Researchers List profile link"
    )
    jmi_profile_url = models.URLField(
        blank=True,
        default="https://www.jmi.ac.in/ACADEMICS/Departments/Department-Of-Computer-Engineering/People/Faculty-Members/3148/Musheer_Ahmad",
        help_text="Official JMI faculty webpage"
    )
    orcid_url = models.URLField(blank=True, help_text="ORCID iD link (leave blank until verified)")
    linkedin_url = models.URLField(blank=True, help_text="LinkedIn profile (leave blank until verified)")
    github_url = models.URLField(blank=True, help_text="GitHub profile")

    # Verified Bibliometric Metrics (from CV, June 2025)
    total_papers = models.PositiveIntegerField(
        default=157,
        help_text="Total research papers: 157 (per CV, June 2025)"
    )
    scopus_papers = models.PositiveIntegerField(
        default=151,
        help_text="SCOPUS indexed papers: 151"
    )
    wos_papers = models.PositiveIntegerField(
        default=124,
        help_text="Web of Science indexed papers: 124"
    )
    scie_papers = models.PositiveIntegerField(
        default=87,
        help_text="SCIE indexed papers: 87"
    )
    citations_count = models.PositiveIntegerField(
        default=5296,
        help_text="Google Scholar citations: 5,296 (CV, June 2025)"
    )
    citations_scopus = models.PositiveIntegerField(
        default=3878,
        help_text="SCOPUS citations: 3,878 (CV, June 2025)"
    )
    h_index = models.PositiveIntegerField(
        default=42,
        help_text="Google Scholar h-index: 42 (CV, June 2025)"
    )
    h_index_scopus = models.PositiveIntegerField(
        default=36,
        help_text="SCOPUS h-index: 36 (CV, June 2025)"
    )
    cumulative_impact_factor = models.CharField(
        max_length=60,
        default="~ 300",
        help_text="Cumulative Impact Factor as per JCR"
    )
    teaching_experience_years = models.PositiveIntegerField(
        default=18,
        help_text="Total teaching experience: 18 years"
    )
    citations_source_url = models.URLField(
        default="https://scholar.google.com/citations?user=cPbmjWoAAAAJ&hl=en&sortby=pubdate",
        help_text="Verification source URL"
    )
    citations_as_of = models.CharField(
        max_length=60,
        default="June 2025",
        help_text="As of date for citations and metrics"
    )
    stanford_top_2_percent = models.BooleanField(
        default=True,
        help_text="Ranked among World's Top 2% Researchers by Stanford University and Elsevier"
    )
    stanford_recognition_text = models.CharField(
        max_length=300,
        default="World's Top 2% Researchers (Stanford University & Elsevier): Career-long 2024; Single-year 2022, 2023, 2024",
        help_text="Full description of the Stanford/Elsevier recognition"
    )

    # Prospective Students & Callout
    is_accepting_students = models.BooleanField(
        default=True,
        help_text="Controls prospective student callout visibility"
    )
    student_callout_heading = models.CharField(
        max_length=200,
        default="Prospective Researchers & Students"
    )
    student_callout_text = models.TextField(
        default=(
            "Dr. Ahmad welcomes inquiries from highly motivated prospective Ph.D. scholars, Master's thesis researchers, "
            "and student interns with rigorous foundations in discrete mathematics, nonlinear dynamical systems, and algorithm analysis. "
            "Inquiries should include your updated curriculum vitae, a one-paragraph statement of research interests, and a brief note on "
            "which of his published papers you have reviewed and propose to extend."
        ),
        help_text="Guidance text for students interested in joining the research lab"
    )

    # Announcement Banner & Site Governance
    announcement_banner_active = models.BooleanField(
        default=False,
        help_text="Display a single quiet text announcement line above the site header"
    )
    announcement_banner_text = models.CharField(
        max_length=350,
        blank=True,
        default="",
        help_text="Text of announcement (e.g. 'Call for Papers: Scientific Reports special issue open until 28 Feb 2026')"
    )
    announcement_banner_link = models.URLField(
        blank=True,
        help_text="Optional link for the announcement banner"
    )
    og_image = models.ImageField(
        upload_to='seo/',
        blank=True,
        null=True,
        help_text="Open Graph image for social link previews (1200x630)"
    )
    footer_text = models.CharField(
        max_length=350,
        blank=True,
        default="Department of Computer Engineering, Faculty of Engineering and Technology, Jamia Millia Islamia, New Delhi 110025, India",
        help_text="Affiliation text displayed in the site footer"
    )

    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return f"{self.professor_name} — Site Settings"


class NavigationItem(models.Model):
    """
    Main site navigation links, editable in the CMS.
    """
    title = models.CharField(max_length=100, help_text="Navigation link label")
    path = models.CharField(max_length=200, help_text="Route path")
    order = models.PositiveIntegerField(default=0, help_text="Order from left to right")
    is_visible = models.BooleanField(default=True, help_text="Toggle visibility")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Navigation Link"
        verbose_name_plural = "Navigation Links"

    def __str__(self):
        return f"{self.order}. {self.title} ({self.path})"


class HomePage(models.Model):
    """
    Editorial content for the Home page (Route: /), verified against Dr. Ahmad's career.
    """
    hero_statement = models.TextField(
        default=(
            "I work on chaos-based cryptography and secure multimedia: designing substitution boxes, "
            "chaotic and hyperchaotic systems, and image encryption schemes, and, with collaborators, "
            "authentication protocols and deep learning for security. I am an Associate Professor of "
            "Computer Engineering at Jamia Millia Islamia, New Delhi."
        ),
        help_text="Opening headline statement in refined serif typography."
    )
    intro_body = models.TextField(
        blank=True,
        default=(
            "With over 18 years of academic teaching and research experience at Jamia Millia Islamia and Aligarh Muslim University, "
            "my work investigates the mathematical design of non-linear Substitution Boxes (S-boxes), multi-dimensional continuous and discrete "
            "hyperchaotic attractors, lightweight cryptographic frameworks for Internet of Things and smart grids, and secure biomedical multimedia transmission."
        ),
        help_text="Contextual paragraph following the hero statement."
    )
    figure_caption = models.TextField(
        default=(
            "Figure 1: Numerical orbit of the Lorenz chaotic attractor projected in phase space "
            "(sigma = 10, rho = 28, beta = 8/3), demonstrating continuous non-repeating trajectories "
            "exploited in pseudo-random keystream synthesis and non-linear block cipher design."
        ),
        help_text="Scholarly caption for the mathematical chaotic attractor."
    )
    callout_heading = models.CharField(
        max_length=200,
        default="Prospective Researchers & Students",
        help_text="Section heading for prospective researchers"
    )
    callout_text = models.TextField(
        default=(
            "We welcome inquiries from prospective doctoral candidates and research fellows with strong backgrounds "
            "in discrete mathematics, nonlinear systems, and cryptographic implementations."
        ),
        help_text="Callout text on the home page"
    )
    seo_title = models.CharField(
        max_length=200,
        default="Dr. Musheer Ahmad — Associate Professor | Cryptography & Multimedia Security (JMI)",
        help_text="Page title tag for search engines"
    )
    seo_description = models.CharField(
        max_length=300,
        default="Official academic site of Dr. Musheer Ahmad, Associate Professor in Computer Engineering at Jamia Millia Islamia, New Delhi. Research in chaos-based cryptography, S-box synthesis, multimedia security, and authentication.",
        help_text="Meta description for search engine results"
    )
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        verbose_name = "Home Page Content"
        verbose_name_plural = "Home Page Content"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "Home Page Content"


class ResearchTheme(models.Model):
    """
    Core research themes grouped from Dr. Ahmad's verified research areas:
    1. Chaos-based cryptography
    2. Substitution boxes
    3. Secure multimedia & medical image encryption
    4. Authentication, IoT security & applied deep learning
    """
    title = models.CharField(max_length=255, help_text="Theme title")
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    summary = models.TextField(
        help_text="Factual summary derived from published research in CV."
    )
    body = models.TextField(
        blank=True,
        help_text="Detailed description of methodology and theoretical foundations."
    )
    order = models.PositiveIntegerField(default=0, help_text="Display order")
    status = models.CharField(
        max_length=20,
        choices=ContentStatus.choices,
        default=ContentStatus.PUBLISHED,
        help_text="Draft or Published status"
    )
    history = HistoricalRecords()

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Research Theme"
        verbose_name_plural = "Research Themes"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.order}. {self.title} [{self.get_status_display()}]"


class Publication(models.Model):
    """
    Peer-reviewed scientific works imported directly from Dr. Ahmad's CV.
    """
    class PublicationType(models.TextChoices):
        JOURNAL = 'JOURNAL', 'Journal Article'
        CONFERENCE = 'CONFERENCE', 'Conference Proceedings'
        BOOK_CHAPTER = 'BOOK_CHAPTER', 'Book Chapter'
        PATENT = 'PATENT', 'Patent'

    title = models.CharField(max_length=500, help_text="Full article title")
    slug = models.SlugField(max_length=520, unique=True, blank=True)
    authors = models.CharField(
        max_length=500,
        help_text="Author list as listed in CV"
    )
    venue = models.CharField(
        max_length=300,
        help_text="Journal name or conference title"
    )
    year = models.PositiveIntegerField(help_text="Publication year")
    volume_issue_pages = models.CharField(
        max_length=150,
        blank=True,
        help_text="Volume, issue, pages (e.g. vol. 113, no. 10, pp. 12289-12307)"
    )
    publication_type = models.CharField(
        max_length=50,
        choices=PublicationType.choices,
        default=PublicationType.JOURNAL
    )
    doi = models.CharField(
        max_length=200,
        blank=True,
        help_text="Digital Object Identifier"
    )
    pdf_url = models.URLField(blank=True, help_text="Link to open-access PDF")
    code_url = models.URLField(blank=True, help_text="Link to code repository")
    abstract = models.TextField(blank=True, help_text="Paper abstract")
    bibtex = models.TextField(blank=True, help_text="BibTeX entry")

    # New fields required by V2 plan
    theme = models.ForeignKey(
        ResearchTheme,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='publications',
        help_text="Associated research theme"
    )
    index_tags = models.CharField(
        max_length=150,
        blank=True,
        help_text="Indexing as listed in CV: e.g. SCI-E, SCOPUS"
    )
    impact_factor_as_listed = models.CharField(
        max_length=50,
        blank=True,
        help_text="Impact factor as listed in CV: e.g. IF: 8.2"
    )
    raw_reference = models.TextField(
        blank=True,
        help_text="Original unparsed reference text from CV for verification"
    )

    is_selected = models.BooleanField(
        default=False,
        help_text="Featured in Selected Publications on the Home page"
    )
    citation_count = models.PositiveIntegerField(default=0, help_text="Citations count")
    order = models.PositiveIntegerField(default=0, help_text="Display order")
    status = models.CharField(
        max_length=20,
        choices=ContentStatus.choices,
        default=ContentStatus.PUBLISHED,
        help_text="Draft or Published status"
    )
    history = HistoricalRecords()

    class Meta:
        ordering = ['-year', 'order', '-id']
        verbose_name = "Publication"
        verbose_name_plural = "Publications"

    def save(self, *args, **kwargs):
        if not self.slug:
            clean_title = slugify(self.title[:50])
            self.slug = f"{self.year}-{clean_title}"[:500]
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.year}] {self.title[:65]} — {self.venue}"


class Honor(models.Model):
    """
    Academic awards, honours, and international recognition verified from CV.
    """
    title = models.CharField(max_length=300, help_text="Award or recognition title")
    year = models.PositiveIntegerField(help_text="Year awarded")
    date_details = models.CharField(max_length=150, blank=True, help_text="e.g. 5th November, 2024")
    awarding_body = models.CharField(max_length=300, blank=True, help_text="Awarding institution or publisher")
    description = models.TextField(blank=True, help_text="Details of the award or ceremony")
    order = models.PositiveIntegerField(default=0, help_text="Display order")
    status = models.CharField(
        max_length=20,
        choices=ContentStatus.choices,
        default=ContentStatus.PUBLISHED
    )
    history = HistoricalRecords()

    class Meta:
        ordering = ['-year', 'order', '-id']
        verbose_name = "Honor / Award"
        verbose_name_plural = "Honors & Awards"

    def __str__(self):
        return f"[{self.year}] {self.title}"


class EditorialRole(models.Model):
    """
    Editorial board memberships, associate editorships, and guest editor collections from CV.
    """
    class RoleType(models.TextChoices):
        BOARD = 'BOARD', 'Editorial Board Member'
        ASSOCIATE = 'ASSOCIATE', 'Associate Editor'
        GUEST = 'GUEST', 'Guest Editor / Special Issue'

    role_type = models.CharField(max_length=30, choices=RoleType.choices, default=RoleType.BOARD)
    journal_name = models.CharField(max_length=300, help_text="Name of the scientific journal")
    publisher = models.CharField(max_length=200, blank=True, help_text="e.g. Springer Nature, IGI Global")
    indexing = models.CharField(max_length=100, blank=True, help_text="e.g. SCIE-indexed, ESCI-SCOPUS")
    special_issue_title = models.CharField(max_length=350, blank=True, help_text="Special issue title if guest editor")
    submission_deadline = models.CharField(max_length=100, blank=True, help_text="e.g. 28th February, 2026")
    order = models.PositiveIntegerField(default=0)
    status = models.CharField(
        max_length=20,
        choices=ContentStatus.choices,
        default=ContentStatus.PUBLISHED
    )
    history = HistoricalRecords()

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Editorial Role"
        verbose_name_plural = "Editorial Roles"

    def __str__(self):
        return f"{self.get_role_type_display()}: {self.journal_name}"


class ServiceItem(models.Model):
    """
    Professional service: peer reviewing, conference committees, university administration, books edited.
    """
    class ServiceCategory(models.TextChoices):
        REVIEWER = 'REVIEWER', 'Journal Reviewer'
        CONFERENCE = 'CONFERENCE', 'Conference Role / Session Chair'
        COMMITTEE = 'COMMITTEE', 'Institutional Committee / Responsibility'
        BOOK = 'BOOK', 'Book Edited'

    category = models.CharField(max_length=30, choices=ServiceCategory.choices, default=ServiceCategory.REVIEWER)
    title = models.CharField(max_length=350, help_text="e.g. IEEE Transactions on Information Forensics & Security")
    details = models.TextField(blank=True, help_text="Details or description")
    year = models.CharField(max_length=100, blank=True, help_text="Year or timeframe")
    order = models.PositiveIntegerField(default=0)
    status = models.CharField(
        max_length=20,
        choices=ContentStatus.choices,
        default=ContentStatus.PUBLISHED
    )
    history = HistoricalRecords()

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Service Item"
        verbose_name_plural = "Service & Leadership"

    def __str__(self):
        return f"[{self.get_category_display()}] {self.title}"


class NewsItem(models.Model):
    """
    Lab announcements, journal acceptances, keynote addresses, and updates.
    """
    title = models.CharField(max_length=300, help_text="Factual update title")
    slug = models.SlugField(max_length=300, unique=True, blank=True)
    date = models.DateField(help_text="Publication or event date")
    category = models.CharField(
        max_length=100,
        default="Announcement",
        help_text="Category label e.g. Award, Keynote, Publication, Appointment"
    )
    body = models.TextField(blank=True, help_text="Full news text")
    link = models.URLField(blank=True, help_text="Optional external link or DOI")
    is_pinned = models.BooleanField(default=False, help_text="Pin to top of news list")
    status = models.CharField(
        max_length=20,
        choices=ContentStatus.choices,
        default=ContentStatus.PUBLISHED,
        help_text="Only published news items appear on public site"
    )
    history = HistoricalRecords()

    class Meta:
        ordering = ['-is_pinned', '-date', '-id']
        verbose_name = "News Item"
        verbose_name_plural = "News Items"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.date}-{self.title[:50]}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.date.strftime('%Y-%m')} — {self.title[:60]}"


class TeamMember(models.Model):
    class MemberRole(models.TextChoices):
        PHD = 'PHD', 'Ph.D. Scholar'
        MTECH = 'MTECH', 'M.Tech / Master\'s Researcher'
        BTECH = 'BTECH', 'Undergraduate Researcher'
        ALUMNI = 'ALUMNI', 'Alumni'
        COLLABORATOR = 'COLLABORATOR', 'External Research Collaborator'

    name = models.CharField(max_length=150)
    role = models.CharField(max_length=50, choices=MemberRole.choices, default=MemberRole.PHD)
    research_topic = models.CharField(max_length=250, blank=True)
    affiliation_or_placement = models.CharField(max_length=250, blank=True)
    start_year = models.PositiveIntegerField(default=2024)
    end_year = models.PositiveIntegerField(blank=True, null=True)
    profile_photo = models.ImageField(upload_to='team/', blank=True, null=True)
    photo_alt = models.CharField(max_length=255, blank=True)
    scholar_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    status = models.CharField(
        max_length=20,
        choices=ContentStatus.choices,
        default=ContentStatus.PUBLISHED
    )
    history = HistoricalRecords()

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Lab Member / Alumni"
        verbose_name_plural = "Lab Members & Alumni"

    def __str__(self):
        return f"{self.name} ({self.get_role_display()})"


class Course(models.Model):
    code = models.CharField(max_length=50, help_text="e.g. CEN-701")
    title = models.CharField(max_length=200, help_text="e.g. Analysis and Design of Algorithms")
    level = models.CharField(max_length=100, default="Postgraduate / B.Tech", help_text="e.g. M.Tech, B.Tech, M.Sc")
    semester = models.CharField(max_length=50, blank=True)
    syllabus_url = models.URLField(blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    status = models.CharField(
        max_length=20,
        choices=ContentStatus.choices,
        default=ContentStatus.PUBLISHED
    )
    history = HistoricalRecords()

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Course"
        verbose_name_plural = "Courses"

    def __str__(self):
        return f"{self.code}: {self.title}"


class ResearchOpening(models.Model):
    position_type = models.CharField(max_length=100, default="Ph.D. Position")
    title = models.CharField(max_length=250)
    funding_info = models.CharField(max_length=200, blank=True)
    deadline = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    history = HistoricalRecords()

    class Meta:
        ordering = ['order', '-id']
        verbose_name = "Research Opening"
        verbose_name_plural = "Research Openings"

    def __str__(self):
        return f"{self.title} ({self.position_type})"


class ProspectiveApplication(models.Model):
    class ApplicationStatus(models.TextChoices):
        NEW = 'NEW', 'New'
        SHORTLISTED = 'SHORTLISTED', 'Shortlisted'
        ARCHIVED = 'ARCHIVED', 'Archived'

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    current_institution = models.CharField(max_length=250)
    degree_and_gpa = models.CharField(max_length=150)
    position_applied_for = models.CharField(max_length=100)
    research_statement = models.TextField()
    paper_reference = models.TextField(help_text="Which paper of Dr. Ahmad they read and what they would extend")
    cv_url_or_link = models.URLField(blank=True)
    cv_file = models.FileField(upload_to='applications/', blank=True, null=True)
    status = models.CharField(
        max_length=50,
        choices=ApplicationStatus.choices,
        default=ApplicationStatus.NEW
    )
    private_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Student Application"
        verbose_name_plural = "Student Applications"

    def __str__(self):
        return f"{self.full_name} — {self.position_applied_for} ({self.created_at.strftime('%Y-%m-%d')})"
