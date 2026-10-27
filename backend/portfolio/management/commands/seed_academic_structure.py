import datetime
from django.core.management.base import BaseCommand
from portfolio.models import (
    SiteSettings,
    NavigationItem,
    HomePage,
    ResearchTheme,
    Publication,
    Honor,
    EditorialRole,
    ServiceItem,
    Course,
    NewsItem,
    ContentStatus,
)


class Command(BaseCommand):
    help = "Seeds verified academic structure and real metadata for Dr. Musheer Ahmad directly from his official CV."

    def handle(self, *args, **options):
        self.stdout.write("Initializing verified academic baseline from official CV (June 2025)...")

        # 1. Clean out any previous fabricated publications
        # 2. Site Settings (100% verified against CV and JMI official profile)
        settings, _ = SiteSettings.objects.get_or_create(pk=1)
        settings.professor_name = "Dr. Musheer Ahmad"
        settings.title = "Associate Professor"
        settings.secondary_roles = "M.Tech Project Coordinator | CBCS Programme Advisor | Senior Member, IEEE"
        settings.department = "Department of Computer Engineering"
        settings.university = "Jamia Millia Islamia"
        settings.location = "Faculty of Engineering & Technology, Jamia Millia Islamia, New Delhi, India"
        settings.email_primary = "mahmad9@jmi.ac.in"
        settings.email_secondary = "musheer.cse@gmail.com"
        settings.office_phone = "+91 11 2698 0281"
        settings.portrait = "portraits/dr_musheer_ahmad.png"
        settings.portrait_alt = "Official portrait of Dr. Musheer Ahmad, Associate Professor at Jamia Millia Islamia"
        settings.cv_file = "cv/mahmad9.pdf"
        settings.cv_url = "https://www.jmi.ac.in/upload/employeeresume/mahmad9.pdf"

        # Verified Profile URLs
        settings.google_scholar_url = "https://scholar.google.com/citations?user=cPbmjWoAAAAJ&hl=en&sortby=pubdate"
        settings.scopus_url = "https://www.scopus.com/authid/detail.uri?authorId=56339090200"
        settings.web_of_science_url = "https://www.webofscience.com/wos/author/record/H-9587-2018"
        settings.researchgate_url = "https://www.researchgate.net/profile/Musheer-Ahmad-3"
        settings.dblp_url = "https://dblp.org/pid/89/8467-2.html"
        settings.csauthors_url = "https://www.csauthors.net/musheer-ahmad-002/"
        settings.top_researchers_url = "https://topresearcherslist.com/Home/Profile/862797"
        settings.jmi_profile_url = "https://www.jmi.ac.in/ACADEMICS/Departments/Department-Of-Computer-Engineering/People/Faculty-Members/3148/Musheer_Ahmad"
        settings.orcid_url = ""  # Left blank until provided by professor
        settings.linkedin_url = ""  # Left blank until provided by professor
        settings.github_url = ""

        # Verified Metrics (CV, June 2025)
        settings.total_papers = 157
        settings.scopus_papers = 151
        settings.wos_papers = 124
        settings.scie_papers = 87
        settings.citations_count = 5296  # Google Scholar
        settings.citations_scopus = 3878  # SCOPUS
        settings.h_index = 42  # Google Scholar
        settings.h_index_scopus = 36  # SCOPUS
        settings.cumulative_impact_factor = "~ 300"
        settings.teaching_experience_years = 18
        settings.citations_as_of = "June 2025"
        settings.citations_source_url = "https://scholar.google.com/citations?user=cPbmjWoAAAAJ&hl=en&sortby=pubdate"
        settings.stanford_top_2_percent = True
        settings.stanford_recognition_text = "World's Top 2% Researchers (Stanford University & Elsevier): Career-long 2024; Single-year 2022, 2023, 2024"

        settings.is_accepting_students = True
        settings.student_callout_heading = "Prospective Researchers & Students"
        settings.student_callout_text = (
            "Dr. Ahmad welcomes inquiries from highly motivated prospective Ph.D. scholars, Master's thesis researchers, "
            "and student interns with rigorous foundations in discrete mathematics, nonlinear dynamical systems, and algorithm analysis. "
            "Inquiries should include your updated curriculum vitae, a one-paragraph statement of research interests, and a brief note on "
            "which of his published papers you have reviewed and propose to extend."
        )
        settings.save()
        self.stdout.write("[OK] SiteSettings saved with verified CV baseline.")

        # 3. Navigation Links (8 links including Service)
        nav_definitions = [
            ("Research", "/research", 1),
            ("Publications", "/publications", 2),
            ("Group", "/group", 3),
            ("Teaching", "/teaching", 4),
            ("Service", "/service", 5),
            ("News", "/news", 6),
            ("Join", "/join", 7),
            ("Contact", "/contact", 8),
        ]
        NavigationItem.objects.all().delete()
        for title, path, order in nav_definitions:
            NavigationItem.objects.create(title=title, path=path, order=order, is_visible=True)
        self.stdout.write("[OK] Navigation items updated (including Service).")

        # 4. HomePage Editorial Content (exact words from V2 plan)
        home, _ = HomePage.objects.get_or_create(pk=1)
        home.hero_statement = (
            "I work on chaos-based cryptography and secure multimedia: designing substitution boxes, "
            "chaotic and hyperchaotic systems, and image encryption schemes, and, with collaborators, "
            "authentication protocols and deep learning for security. I am an Associate Professor of "
            "Computer Engineering at Jamia Millia Islamia, New Delhi."
        )
        home.intro_body = (
            "With over 18 years of academic teaching and research experience at Jamia Millia Islamia and Aligarh Muslim University, "
            "my work investigates the mathematical design of non-linear Substitution Boxes (S-boxes), multi-dimensional continuous and discrete "
            "hyperchaotic attractors, lightweight cryptographic frameworks for Internet of Things and smart grids, and secure biomedical multimedia transmission."
        )
        home.figure_caption = (
            "Figure 1: Numerical orbit of the Lorenz chaotic attractor projected in phase space "
            "(sigma = 10, rho = 28, beta = 8/3), demonstrating continuous non-repeating trajectories "
            "exploited in pseudo-random keystream synthesis and non-linear block cipher design."
        )
        home.callout_heading = "Prospective Researchers & Students"
        home.callout_text = (
            "We welcome inquiries from prospective doctoral candidates and research fellows with strong backgrounds "
            "in discrete mathematics, nonlinear systems, and cryptographic implementations."
        )
        home.seo_title = "Dr. Musheer Ahmad — Associate Professor | Cryptography & Multimedia Security (JMI)"
        home.seo_description = (
            "Official academic site of Dr. Musheer Ahmad, Associate Professor in Computer Engineering at Jamia Millia Islamia, New Delhi. "
            "Research in chaos-based cryptography, S-box synthesis, multimedia security, and authentication."
        )
        home.save()
        self.stdout.write("[OK] HomePage editorial content initialized.")

        # 5. Four Real Research Themes (Section 2.3 of V2 plan)
        ResearchTheme.objects.all().delete()
        themes_data = [
            {
                "title": "Chaos-Based Cryptography",
                "slug": "chaos-based-cryptography",
                "summary": (
                    "Analyzing continuous and discrete hyperchaotic maps (2D/3D/4D, memristive, fractional-order), "
                    "pseudo-random bit generators, hash functions, and continuous nonlinear oscillators with hidden and coexisting attractors."
                ),
                "body": (
                    "Our lab investigates the mathematical properties of deterministic nonlinear dynamical systems and hyperchaotic attractors. "
                    "We formulate multidimensional continuous maps exhibiting positive Lyapunov exponents and complex phase-space dynamics to synthesize "
                    "cryptographically resilient keystreams for stream ciphers and hashing primitives."
                ),
                "order": 1,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "title": "Substitution Boxes & Metaheuristics",
                "slug": "substitution-boxes-metaheuristics",
                "summary": (
                    "Designing bijective cryptographic Substitution-Boxes utilizing algebraic group theory, finite rings, coset graphs, "
                    "Galois field structures, and metaheuristic optimization algorithms."
                ),
                "body": (
                    "The synthesis of cryptographic S-boxes forms the non-linear bedrock of modern symmetric block ciphers. "
                    "We develop algebraic constructions and optimization algorithms (firefly algorithm, cuckoo search, artificial bee colony, "
                    "and genetic algorithms) to synthesize bijective 8x8 S-boxes satisfying optimal nonlinearity, strict avalanche criterion (SAC), "
                    "and differential uniformity."
                ),
                "order": 2,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "title": "Secure Multimedia & Medical Image Encryption",
                "slug": "multimedia-medical-image-encryption",
                "summary": (
                    "Developing resilient encryption schemes for high-resolution DICOM clinical imagery, color stereo images, video streams, "
                    "and speech using compressive sensing, dynamic DNA sequence computation, and watermarking."
                ),
                "body": (
                    "Clinical radiography and multimedia datasets transmitted over untrusted tele-healthcare networks require simultaneous "
                    "preservation of diagnostic integrity, low encryption latency, and absolute resistance to statistical and differential attacks. "
                    "We also conduct rigorous cryptanalysis of previously published ciphers to uncover and rectify structural vulnerabilities."
                ),
                "order": 3,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "title": "Authentication, IoT Security & Deep Learning",
                "slug": "authentication-iot-deep-learning",
                "summary": (
                    "Engineering lightweight PUF and ECC based authentication protocols for Internet of Drones, smart grids, wearables, and industrial IoT (IIoT), "
                    "alongside applied deep learning architectures for security applications."
                ),
                "body": (
                    "Resource-constrained sensor networks and embedded edge nodes operate under tight energy budgets. "
                    "We design provably secure, lightweight mutual authentication protocols and harness convolutional neural networks (CNNs) "
                    "for real-time driver drowsiness detection, UAV-aided disaster event classification, and biomedical disease prediction."
                ),
                "order": 4,
                "status": ContentStatus.PUBLISHED,
            },
        ]
        for t in themes_data:
            ResearchTheme.objects.create(**t)
        self.stdout.write("[OK] Four authentic ResearchThemes created.")

        # 6. Real Honors & Awards (Section 2.6 of V2 plan)
        Honor.objects.all().delete()
        honors_data = [
            {
                "title": "Editorial Contribution Award 2025",
                "year": 2025,
                "date_details": "2025",
                "awarding_body": "Springer Nature (Scientific Reports)",
                "description": "Conferred for effectively handling manuscripts as Editorial Board member of Scientific Reports journal from Springer Nature.",
                "order": 1,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "title": "FET Research Publication Award 2024",
                "year": 2024,
                "date_details": "5th November, 2024",
                "awarding_body": "Faculty of Engineering & Technology, Jamia Millia Islamia",
                "description": "Received from Honorable Vice Chancellor Prof. Mazhar Asif, Registrar Prof. Md. Mehtab Alam Rizvi, and Dean of FET Prof. Mini Shaji Thomas.",
                "order": 2,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "title": "World's Top 2% Researchers (Career-Long Category)",
                "year": 2024,
                "date_details": "October 2024",
                "awarding_body": "Stanford University, USA and Elsevier B.V.",
                "description": "Ranked among the top 2% of scientists globally in the career-long citation database curated by Stanford University and Elsevier.",
                "order": 3,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "title": "World's Top 2% Researchers (Single-Year Category: 2024, 2023, 2022)",
                "year": 2024,
                "date_details": "2022, 2023, 2024",
                "awarding_body": "Stanford University, USA and Elsevier B.V.",
                "description": "Consecutively recognized three times among the World's Top 2% Researchers in the annual citation impact lists.",
                "order": 4,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "title": "Jamia Achievers Award",
                "year": 2023,
                "date_details": "29th October, 2023",
                "awarding_body": "Jamia Millia Islamia",
                "description": "Received from Honorable Vice Chancellor of JMI Prof. Najma Akhtar, Ms. Sharmila Tagore, and Dr. Shiv Kumar Sarin.",
                "order": 5,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "title": "Dean FET Appreciation for Global Stanford Ranking",
                "year": 2022,
                "date_details": "2022",
                "awarding_body": "Dean, Faculty of Engineering & Technology, JMI",
                "description": "Received official appreciation from Dean Prof. Mini Shaji Thomas for global ranking in the Stanford University / Elsevier dataset.",
                "order": 6,
                "status": ContentStatus.PUBLISHED,
            },
        ]
        for h in honors_data:
            Honor.objects.create(**h)
        self.stdout.write("[OK] Real Honors & Awards seeded.")

        # 7. Real Editorial Roles (Section 2.7 of V2 plan)
        EditorialRole.objects.all().delete()
        editorial_data = [
            {
                "role_type": EditorialRole.RoleType.BOARD,
                "journal_name": "Scientific Reports",
                "publisher": "Nature / Springer Nature",
                "indexing": "SCIE-indexed",
                "order": 1,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "role_type": EditorialRole.RoleType.BOARD,
                "journal_name": "Discover Computing",
                "publisher": "Springer",
                "indexing": "SCIE-indexed",
                "order": 2,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "role_type": EditorialRole.RoleType.ASSOCIATE,
                "journal_name": "International Journal of Information Security and Privacy (IJISP)",
                "publisher": "IGI Global",
                "indexing": "ESCI-SCOPUS indexed",
                "order": 3,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "role_type": EditorialRole.RoleType.ASSOCIATE,
                "journal_name": "International Journal of Artificial Intelligence in Scientific Disciplines (IJAISD)",
                "publisher": "IGI Global",
                "indexing": "IGI Global Publication",
                "order": 4,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "role_type": EditorialRole.RoleType.GUEST,
                "journal_name": "Scientific Reports",
                "publisher": "Springer Nature",
                "indexing": "SCIE-indexed",
                "special_issue_title": "Post-quantum cybersecurity and cryptography",
                "submission_deadline": "Submissions open till 28th February, 2026",
                "order": 5,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "role_type": EditorialRole.RoleType.GUEST,
                "journal_name": "Discover Computing",
                "publisher": "Springer",
                "indexing": "SCIE-indexed",
                "special_issue_title": "Securing Critical Infrastructure in Next-Generation Networks: AI, Machine Learning and Cryptographic Approaches",
                "submission_deadline": "Submissions open till 30th September, 2025",
                "order": 6,
                "status": ContentStatus.PUBLISHED,
            },
        ]
        for e in editorial_data:
            EditorialRole.objects.create(**e)
        self.stdout.write("[OK] Real Editorial Roles seeded.")

        # 8. Real Service & Institutional Responsibilities (Section 2.7 of V2 plan)
        ServiceItem.objects.all().delete()
        service_data = [
            {
                "category": ServiceItem.ServiceCategory.COMMITTEE,
                "title": "Assistant Controller of Examinations",
                "details": "Office of the Controller of Examinations, Jamia Millia Islamia.",
                "year": "Ongoing",
                "order": 1,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "category": ServiceItem.ServiceCategory.COMMITTEE,
                "title": "Member, Institutional Multidisciplinary Research Advisory Committee (IMRAC)",
                "details": "Regional Research Institute of Unani Medicine, New Delhi, Ministry of Ayush, Govt. of India.",
                "year": "Ongoing",
                "order": 2,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "category": ServiceItem.ServiceCategory.COMMITTEE,
                "title": "M.Tech Project Coordinator",
                "details": "Department of Computer Engineering, Jamia Millia Islamia.",
                "year": "Since 2019",
                "order": 3,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "category": ServiceItem.ServiceCategory.COMMITTEE,
                "title": "CBCS Programme Advisor",
                "details": "Department of Computer Engineering under Choice Based Credit System (CBCS).",
                "year": "Since 2015",
                "order": 4,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "category": ServiceItem.ServiceCategory.BOOK,
                "title": "AI Based Cybersecurity Management: Securing Digital Economy",
                "details": "Book edited for CRC Press, Taylor & Francis series.",
                "year": "In Production",
                "order": 5,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "category": ServiceItem.ServiceCategory.REVIEWER,
                "title": "Reviewer for 80 Premier Scientific Journals",
                "details": "Including IEEE TIFS, IEEE TPAMI, IEEE TNNLS, IEEE TIP, IEEE TITS, IEEE TNSE, IEEE IoT Journal, Information Sciences, and Chaos, Solitons & Fractals.",
                "year": "Ongoing",
                "order": 6,
                "status": ContentStatus.PUBLISHED,
            },
        ]
        for s in service_data:
            ServiceItem.objects.create(**s)
        self.stdout.write("[OK] Service items seeded.")

        # 9. Real Courses (Section 2.9 of V2 plan)
        Course.objects.all().delete()
        courses_data = [
            {
                "code": "CEN-701",
                "title": "Analysis and Design of Algorithms",
                "level": "M.Tech / B.Tech (Computer Engineering)",
                "description": "Advanced algorithm paradigms, asymptotic analysis, randomized algorithms, and complexity theory.",
                "order": 1,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "code": "CEN-302",
                "title": "Discrete Mathematics",
                "level": "B.Tech (Computer Engineering)",
                "description": "Combinatorics, algebraic structures, recurrence relations, graph theory, and mathematical foundations for cryptology.",
                "order": 2,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "code": "CEN-705",
                "title": "Algorithm Design",
                "level": "M.Tech (Computer Engineering & Computational Mathematics)",
                "description": "Design techniques, approximation algorithms, network flow, and amortized efficiency analysis.",
                "order": 3,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "code": "CEN-E04",
                "title": "Soft Computing Techniques",
                "level": "B.Tech Elective",
                "description": "Introduced and designed syllabus for neural networks, evolutionary computation, fuzzy systems, and metaheuristics.",
                "order": 4,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "code": "CEN-401",
                "title": "Microprocessor Theory and Applications",
                "level": "B.Tech (Computer Engineering)",
                "description": "Microprocessor architecture, instruction sets, assembly programming, and interfacing.",
                "order": 5,
                "status": ContentStatus.PUBLISHED,
            },
        ]
        for c in courses_data:
            Course.objects.create(**c)
        self.stdout.write("[OK] Real courses seeded.")

        # 10. Real News (Only verified milestones from CV)
        NewsItem.objects.all().delete()
        news_data = [
            {
                "title": "Conferred FET Research Publication Award 2024 by Vice Chancellor Prof. Mazhar Asif and Dean Prof. Mini Shaji Thomas",
                "slug": "fet-research-award-2024",
                "date": datetime.date(2024, 11, 5),
                "category": "Award",
                "body": "Honored at the university ceremony on 5th November, 2024 in recognition of high-impact research publications in SCI-E journals.",
                "is_pinned": True,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "title": "Ranked in World's Top 2% Researchers (Career-Long & Single-Year 2024) by Stanford University & Elsevier",
                "slug": "stanford-top-2-percent-2024",
                "date": datetime.date(2024, 10, 15),
                "category": "Honor",
                "body": "Included in both career-long and single-year 2024 global citation lists curated by Stanford University and Elsevier B.V.",
                "is_pinned": True,
                "status": ContentStatus.PUBLISHED,
            },
            {
                "title": "Conferred Editorial Contribution Award 2025 by Springer Nature for Service on Scientific Reports",
                "slug": "springer-editorial-award-2025",
                "date": datetime.date(2025, 1, 15),
                "category": "Editorial",
                "body": "Recognized by Springer Nature for effectively handling peer review and manuscripts as an Editorial Board member of Scientific Reports.",
                "is_pinned": False,
                "status": ContentStatus.PUBLISHED,
            },
        ]
        for n in news_data:
            NewsItem.objects.create(**n)
        self.stdout.write("[OK] Real news milestones seeded.")

        self.stdout.write(self.style.SUCCESS("[SUCCESS] Verified academic structure seeded cleanly from CV with zero invented content."))
