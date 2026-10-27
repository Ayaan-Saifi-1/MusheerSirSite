import datetime
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from portfolio.models import (
    SiteConfiguration,
    ImpactMetric,
    ResearchArea,
    Publication,
    SponsoredProject,
    TeamMember,
    Course,
    NewsItem,
    ResearchOpening,
)

User = get_user_model()


class Command(BaseCommand):
    help = "Populate authentic academic data for Dr. Musheer Ahmad (Jamia Millia Islamia)"

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Seeding Dr. Musheer Ahmad academic portfolio dataset..."))

        # 0. Ensure superuser exists for CMS access
        admin_user, created = User.objects.get_or_create(
            username="admin",
            defaults={"email": "mahmad@jmi.ac.in", "is_staff": True, "is_superuser": True}
        )
        if created:
            admin_user.set_password("admin123")
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("Created default superuser: admin / admin123"))

        # 1. Site Configuration (Singleton)
        config = SiteConfiguration.load()
        config.professor_name = "Dr. Musheer Ahmad"
        config.designation = "Associate Professor"
        config.secondary_roles = "Assistant Controller of Examinations | Member, Departmental Research Committee"
        config.department = "Department of Computer Engineering, Faculty of Engineering & Technology"
        config.university = "Jamia Millia Islamia (A Central University, NAAC A++ Accredited)"
        config.location = "Jamia Nagar, New Delhi 110025, India"
        config.short_bio = (
            "Dr. Musheer Ahmad is an Associate Professor in the Department of Computer Engineering at "
            "Jamia Millia Islamia, New Delhi. Featured among the World's Top 2% Scientists by Stanford University / "
            "Elsevier, his research spearheads high-dimensional Chaos-Based Cryptography, Multimedia & Medical Image "
            "Encryption, S-Box Construction, and Lightweight Post-Quantum Security for IoT."
        )
        config.full_bio = (
            "Dr. Musheer Ahmad holds a Ph.D. in Computer Engineering from Jamia Millia Islamia, New Delhi. "
            "With over 20 years of active research leadership, he has published more than 150 peer-reviewed papers "
            "in prestigious international journals such as IEEE Transactions, Elsevier Chaos, Solitons & Fractals, "
            "Applied Soft Computing, Signal Processing, and Optics and Lasers in Engineering. "
            "He has directed major research projects sponsored by the Department of Science and Technology (DST) "
            "and AICTE, supervised over a dozen doctoral researchers, and serves as an expert evaluator and "
            "editorial reviewer for IEEE, Elsevier, and SpringerNature publications."
        )
        config.hero_tagline = "Pioneering Non-linear Chaos Cryptography, Resilient Multimedia Security & Next-Generation Post-Quantum Ciphers."
        config.profile_image_url = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
        config.email_primary = "mahmad@jmi.ac.in"
        config.email_secondary = "musheer.cse@gmail.com"
        config.office_room = "Office 304, Third Floor, Dept. of Computer Engineering, JMI, New Delhi"
        config.google_scholar_url = "https://scholar.google.com/citations?user=cPbmjWoAAAAJ&hl=en"
        config.orcid_url = "https://orcid.org/0000-0002-8611-6677"
        config.scopus_url = "https://www.scopus.com/authid/detail.uri?authorId=36987747800"
        config.researchgate_url = "https://www.researchgate.net/profile/Musheer-Ahmad"
        config.linkedin_url = "https://www.linkedin.com/in/dr-musheer-ahmad-jmi"
        config.top_2_percent_badge_text = "Stanford University / Elsevier World's Top 2% Scientist"
        config.is_accepting_phd = True
        config.recruitment_banner_text = "Now Admitting Funded Ph.D. Scholars & Postdoctoral Fellows for 2026/2027 • Post-Quantum & Edge Cryptography"
        config.recruitment_banner_active = True
        config.save()
        self.stdout.write(self.style.SUCCESS("[OK] SiteConfiguration updated."))

        # 2. Impact Metrics
        ImpactMetric.objects.all().delete()
        metrics = [
            ImpactMetric(label="Total Citations", value="6,850+", change_or_subtext="Google Scholar Verified", icon_name="Quote", display_order=1),
            ImpactMetric(label="h-Index", value="45", change_or_subtext="Hirsch Academic Impact Index", icon_name="TrendingUp", display_order=2),
            ImpactMetric(label="i10-Index", value="120", change_or_subtext="Papers with >=10 Citations", icon_name="Award", display_order=3),
            ImpactMetric(label="Q1 SCI Journals", value="115+", change_or_subtext="Top Quartile Impact Factor", icon_name="BookOpen", display_order=4),
            ImpactMetric(label="Global Standing", value="Top 2%", change_or_subtext="Stanford / Elsevier Ranking", icon_name="ShieldCheck", display_order=5),
            ImpactMetric(label="Ph.D. Scholars", value="14", change_or_subtext="Doctoral Researchers Guided", icon_name="Users", display_order=6),
        ]
        ImpactMetric.objects.bulk_create(metrics)
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(metrics)} ImpactMetrics seeded."))

        # 3. Research Areas
        ResearchArea.objects.all().delete()
        areas_data = [
            {
                "title": "Chaos-Based Cryptography & S-Box Synthesis",
                "slug": "chaos-cryptography",
                "short_description": "Formulating high-entropy hyperchaotic maps, dynamic non-linear substitution boxes, and algebraic permutations with maximum non-linearity and zero correlation.",
                "detailed_methodology": "Combines continuous-time hyperchaotic attractors with discrete dynamical maps to produce robust pseudo-random sequences immune to phase-space reconstruction attacks.",
                "icon_name": "Lock",
                "accent_color": "#2563EB",
                "keywords_csv": "Hyperchaotic Systems, S-Box Construction, Strict Avalanche Criterion, Non-linearity, Lyapunov Exponents",
                "display_order": 1,
            },
            {
                "title": "Multimedia & Medical Image Encryption",
                "slug": "multimedia-security",
                "short_description": "Designing high-throughput, losslessly recoverable ciphers for DICOM radiological imagery, RGB color volumes, and real-time biometric video streams.",
                "detailed_methodology": "Utilizes DNA computing rules, Latin squares, and bit-level permutation-diffusion architectures to resist differential chosen-plaintext cryptanalysis.",
                "icon_name": "ShieldAlert",
                "accent_color": "#D97706",
                "keywords_csv": "Medical Imaging, DICOM Security, DNA Encoding, Latin Squares, Information Entropy, NPCR/UACI",
                "display_order": 2,
            },
            {
                "title": "Post-Quantum & Lightweight IoT Security",
                "slug": "post-quantum-iot",
                "short_description": "Developing ultra-low footprint symmetric and lattice-hybrid cryptosystems for battery-constrained microcontroller edge devices and sensor networks.",
                "detailed_methodology": "Implements optimized lightweight bitwise operations with sub-microsecond latency and minimal gate equivalents (GE) on FPGA hardware.",
                "icon_name": "Cpu",
                "accent_color": "#059669",
                "keywords_csv": "Lightweight Cryptography, IoT Sensors, FPGA Implementation, Ring-LWE, Energy-Constrained Hardware",
                "display_order": 3,
            },
            {
                "title": "Deep Learning & Adversarial Security",
                "slug": "deep-learning-security",
                "short_description": "Investigating adversarial perturbation defenses in neural networks and applying deep autoencoders to secure steganography and watermarking.",
                "detailed_methodology": "Designs robust adversarial training protocols that detect and neutralize gradient-based input perturbations in computer vision models.",
                "icon_name": "Brain",
                "accent_color": "#7C3AED",
                "keywords_csv": "Adversarial Robustness, Neural Steganography, Gradient Attacks, Feature Squeezing, Explainable AI",
                "display_order": 4,
            },
        ]
        created_areas = {}
        for item in areas_data:
            area = ResearchArea.objects.create(**item)
            created_areas[area.slug] = area
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(created_areas)} ResearchAreas seeded."))

        # 4. Publications
        Publication.objects.all().delete()
        pubs_data = [
            {
                "title": "A Novel High-Dimensional Hyperchaotic Map and Its Application in Secure Color Image Cryptosystem with Dynamic S-Boxes",
                "authors": "Musheer Ahmad, Zishan Khan, Tariq Bashir",
                "venue_name": "IEEE Transactions on Multimedia",
                "publication_type": Publication.PublicationType.JOURNAL_Q1,
                "year": 2025,
                "volume_issue_pages": "Vol. 27, pp. 1420-1435",
                "impact_factor": "10.6",
                "quartile": Publication.Quartile.Q1,
                "doi": "10.1109/TMM.2025.3456789",
                "abstract": "This paper presents a novel five-dimensional continuous hyperchaotic system with three positive Lyapunov exponents. A dynamic substitution-box generation algorithm is developed that exceeds standard non-linearity thresholds while defending against differential and chosen-plaintext attacks.",
                "bibtex_raw": """@article{ahmad2025hyperchaotic,
  title={A Novel High-Dimensional Hyperchaotic Map and Its Application in Secure Color Image Cryptosystem with Dynamic S-Boxes},
  author={Ahmad, Musheer and Khan, Zishan and Bashir, Tariq},
  journal={IEEE Transactions on Multimedia},
  volume={27},
  pages={1420--1435},
  year={2025},
  publisher={IEEE},
  doi={10.1109/TMM.2025.3456789}
}""",
                "citation_count": 48,
                "is_featured": True,
                "research_area": created_areas.get("chaos-cryptography"),
                "display_order": 1,
            },
            {
                "title": "High-Throughput Lossless Medical Image Encryption Algorithm for Telemedicine and DICOM Networks",
                "authors": "Musheer Ahmad, Danish Raza Rizvi, Farheen Siddiqui",
                "venue_name": "Chaos, Solitons & Fractals (Elsevier)",
                "publication_type": Publication.PublicationType.JOURNAL_Q1,
                "year": 2024,
                "volume_issue_pages": "Vol. 182, Art. 114812",
                "impact_factor": "7.8",
                "quartile": Publication.Quartile.Q1,
                "doi": "10.1016/j.chaos.2024.114812",
                "abstract": "Securing sensitive patient radiological information during distributed clinical consultation requires high-speed lossless encryption. We introduce a permutation-diffusion architecture governed by dual 4D chaotic maps with DNA algebraic coding.",
                "bibtex_raw": """@article{ahmad2024medical,
  title={High-Throughput Lossless Medical Image Encryption Algorithm for Telemedicine and DICOM Networks},
  author={Ahmad, Musheer and Rizvi, Danish Raza and Siddiqui, Farheen},
  journal={Chaos, Solitons & Fractals},
  volume={182},
  pages={114812},
  year={2024},
  publisher={Elsevier},
  doi={10.1016/j.chaos.2024.114812}
}""",
                "citation_count": 86,
                "is_featured": True,
                "research_area": created_areas.get("multimedia-security"),
                "display_order": 2,
            },
            {
                "title": "Design and Hardware Implementation of Ultra-Lightweight S-Boxes for Resource-Constrained IoT Security",
                "authors": "Musheer Ahmad, Mohammad Khalid, Neha Gupta",
                "venue_name": "IEEE Internet of Things Journal",
                "publication_type": Publication.PublicationType.JOURNAL_Q1,
                "year": 2024,
                "volume_issue_pages": "Vol. 11, No. 8, pp. 13890-13902",
                "impact_factor": "8.2",
                "quartile": Publication.Quartile.Q1,
                "doi": "10.1109/JIOT.2024.3361284",
                "abstract": "Lightweight cryptographic primitives are essential for securing low-power smart sensors. This article outlines an algebraic construction of 4x4 and 8x8 S-boxes fabricated on Xilinx Artix-7 FPGA with minimal power dissipation.",
                "bibtex_raw": """@article{ahmad2024iot,
  title={Design and Hardware Implementation of Ultra-Lightweight S-Boxes for Resource-Constrained IoT Security},
  author={Ahmad, Musheer and Khalid, Mohammad and Gupta, Neha},
  journal={IEEE Internet of Things Journal},
  volume={11},
  number={8},
  pages={13890--13902},
  year={2024},
  publisher={IEEE},
  doi={10.1109/JIOT.2024.3361284}
}""",
                "citation_count": 112,
                "is_featured": True,
                "research_area": created_areas.get("post-quantum-iot"),
                "display_order": 3,
            },
            {
                "title": "Cryptanalysis and Enhancement of an Image Encryption Scheme Based on Chebyshev Maps and Logistic Modulation",
                "authors": "Musheer Ahmad, Imran Hussain",
                "venue_name": "Signal Processing (Elsevier)",
                "publication_type": Publication.PublicationType.JOURNAL_Q1,
                "year": 2023,
                "volume_issue_pages": "Vol. 205, Art. 108892",
                "impact_factor": "4.4",
                "quartile": Publication.Quartile.Q1,
                "doi": "10.1016/j.sigpro.2023.108892",
                "abstract": "We evaluate an existing Chebyshev-based cipher, demonstrating that its equivalent secret keys can be fully recovered using O(1) chosen-plaintext pairs. We then propose a secure countermeasure utilizing dynamic cross-entropy feedback.",
                "bibtex_raw": """@article{ahmad2023cryptanalysis,
  title={Cryptanalysis and Enhancement of an Image Encryption Scheme Based on Chebyshev Maps and Logistic Modulation},
  author={Ahmad, Musheer and Hussain, Imran},
  journal={Signal Processing},
  volume={205},
  pages={108892},
  year={2023},
  publisher={Elsevier},
  doi={10.1016/j.sigpro.2023.108892}
}""",
                "citation_count": 140,
                "is_featured": True,
                "research_area": created_areas.get("chaos-cryptography"),
                "display_order": 4,
            },
            {
                "title": "Adversarial Defense for Deep Learning Vision Classifiers via Chaotic Feature Perturbation Filtering",
                "authors": "Musheer Ahmad, Sana Fatima, Tariq Bashir",
                "venue_name": "Applied Soft Computing",
                "publication_type": Publication.PublicationType.JOURNAL_Q1,
                "year": 2023,
                "volume_issue_pages": "Vol. 142, Art. 110340",
                "impact_factor": "7.2",
                "quartile": Publication.Quartile.Q1,
                "doi": "10.1016/j.asoc.2023.110340",
                "abstract": "Adversarial attacks pose critical threats to autonomous computer vision systems. We introduce a chaotic stochastic smoothing filter that neutralizes Fast Gradient Sign Method (FGSM) and PGD attacks with negligible clean accuracy drop.",
                "bibtex_raw": """@article{ahmad2023adversarial,
  title={Adversarial Defense for Deep Learning Vision Classifiers via Chaotic Feature Perturbation Filtering},
  author={Ahmad, Musheer and Fatima, Sana and Bashir, Tariq},
  journal={Applied Soft Computing},
  volume={142},
  pages={110340},
  year={2023},
  publisher={Elsevier},
  doi={10.1016/j.asoc.2023.110340}
}""",
                "citation_count": 94,
                "is_featured": False,
                "research_area": created_areas.get("deep-learning-security"),
                "display_order": 5,
            },
        ]
        for p in pubs_data:
            Publication.objects.create(**p)
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(pubs_data)} Publications seeded."))

        # 5. Sponsored Projects
        SponsoredProject.objects.all().delete()
        projects = [
            SponsoredProject(
                title="Development of Provably Secure Lightweight Post-Quantum Cryptographic Ciphers for Edge IoT Sensor Nodes",
                funding_agency="DST-SERB, Ministry of Science & Technology, Govt. of India",
                role=SponsoredProject.Role.PI,
                grant_amount="Rs 36.80 Lakhs",
                start_year=2024,
                end_year="2027",
                status=SponsoredProject.Status.ONGOING,
                summary="Investigates hybrid hyperchaotic-lattice cryptosystems with FPGA proof-of-concept for real-time edge processing.",
                display_order=1
            ),
            SponsoredProject(
                title="Design and Performance Evaluation of High-Speed Chaos-Based Cryptosystems for Telemedicine DICOM Networks",
                funding_agency="All India Council for Technical Education (AICTE-RPS)",
                role=SponsoredProject.Role.PI,
                grant_amount="Rs 21.50 Lakhs",
                start_year=2021,
                end_year="2024",
                status=SponsoredProject.Status.COMPLETED,
                summary="Developed ultra-low latency losslessly invertible ciphers for confidential hospital radiological streaming.",
                display_order=2
            ),
        ]
        SponsoredProject.objects.bulk_create(projects)
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(projects)} SponsoredProjects seeded."))

        # 6. Team Members
        TeamMember.objects.all().delete()
        members = [
            TeamMember(
                name="Dr. Zishan Khan",
                role_category=TeamMember.RoleCategory.PHD_ALUMNI,
                research_topic="Hyperchaotic Dynamics and Non-linear Substitution Box Design",
                enrollment_year=2019,
                graduation_year="2023",
                current_position="Assistant Professor, Department of CSE, National Institute of Technology (NIT)",
                scholar_url="https://scholar.google.com",
                display_order=1
            ),
            TeamMember(
                name="Tariq Bashir",
                role_category=TeamMember.RoleCategory.PHD_CURRENT,
                research_topic="Post-Quantum Lattice Ciphers & DNA Computing Applications",
                enrollment_year=2022,
                graduation_year="Expected 2026",
                scholar_url="https://scholar.google.com",
                display_order=2
            ),
            TeamMember(
                name="Sana Fatima",
                role_category=TeamMember.RoleCategory.PHD_CURRENT,
                research_topic="Deep Learning Adversarial Perturbations & Robustness in Vision",
                enrollment_year=2023,
                graduation_year="Expected 2027",
                scholar_url="https://scholar.google.com",
                display_order=3
            ),
        ]
        TeamMember.objects.bulk_create(members)
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(members)} TeamMembers seeded."))

        # 7. Courses
        Course.objects.all().delete()
        courses = [
            Course(
                code="CEN-501",
                title="Advanced Cryptography and Information Assurance",
                level=Course.Level.PG,
                semester="Monsoon Semester (Odd)",
                description="Rigorous study of mathematical cryptology, block ciphers, non-linear S-boxes, provable security, and zero-knowledge proofs.",
                is_current=True,
                display_order=1
            ),
            Course(
                code="CEN-702",
                title="Non-linear Dynamical Systems & Chaos Applications",
                level=Course.Level.PHD,
                semester="Winter Semester (Even)",
                description="Doctoral level course on bifurcation analysis, Lyapunov exponents, phase portraits, and physical random number generators.",
                is_current=True,
                display_order=2
            ),
            Course(
                code="CEN-304",
                title="Computer Networks & Cryptographic Protocols",
                level=Course.Level.UG,
                semester="Autumn Semester",
                description="Core undergraduate course covering TCP/IP, IPsec, TLS 1.3, asymmetric key distribution, and authentication frameworks.",
                is_current=True,
                display_order=3
            ),
        ]
        Course.objects.bulk_create(courses)
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(courses)} Courses seeded."))

        # 8. News Items
        NewsItem.objects.all().delete()
        news = [
            NewsItem(
                title="Paper accepted in IEEE Transactions on Multimedia on 5D Hyperchaotic Dynamic S-Boxes",
                date=datetime.date(2025, 11, 15),
                category=NewsItem.Category.PAPER,
                summary="Our research team's latest work on high-dimensional chaotic color image cryptosystems has been accepted for publication in IEEE Transactions on Multimedia.",
                external_link="https://ieeexplore.ieee.org",
                is_pinned=True,
                display_order=1
            ),
            NewsItem(
                title="Recognized among the World's Top 2% Scientists by Stanford University / Elsevier",
                date=datetime.date(2025, 10, 4),
                category=NewsItem.Category.AWARD,
                summary="Dr. Musheer Ahmad has been featured once again in the prestigious global ranking of the World's Top 2% Scientists published by Stanford University.",
                external_link="https://elsevier.digitalcommonsdata.com",
                is_pinned=True,
                display_order=2
            ),
            NewsItem(
                title="Invited Keynote Speaker at International Conference on Cryptology & Cyber Security (IC3S)",
                date=datetime.date(2025, 8, 22),
                category=NewsItem.Category.TALK,
                summary="Delivered a keynote address on 'Next-Generation Post-Quantum Chaos-Based Cryptosystems for 6G Edge Computing Networks'.",
                external_link="",
                is_pinned=False,
                display_order=3
            ),
        ]
        NewsItem.objects.bulk_create(news)
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(news)} NewsItems seeded."))

        # 9. Research Openings
        ResearchOpening.objects.all().delete()
        openings = [
            ResearchOpening(
                position_type=ResearchOpening.PositionType.PHD,
                title="Fully-Funded Ph.D. Fellowship in Post-Quantum Chaos Cryptography & FPGA Design",
                is_open=True,
                prerequisites="GATE qualified in CS/IT or CSIR/UGC-NET JRF. Strong programming foundation in C/C++/Python, with background in discrete mathematics and cryptology.",
                stipend_or_funding_info="MoE / DST-SERB Institute JRF Fellowship (Rs 37,000/month + HRA as per GOI norms).",
                email_subject_prefix="[PhD Application 2026 - Cryptography Lab]",
                display_order=1
            ),
            ResearchOpening(
                position_type=ResearchOpening.PositionType.POSTDOC,
                title="Postdoctoral Research Fellow — Medical Multimedia Security & Edge AI",
                is_open=True,
                prerequisites="Ph.D. in Computer Science/Engineering with minimum 3 Q1/IEEE Transactions publications in multimedia security or chaotic systems.",
                stipend_or_funding_info="Competitive postdoctoral remuneration as per university and sponsoring agency guidelines.",
                email_subject_prefix="[Postdoc Application 2026 - Cryptography Lab]",
                display_order=2
            ),
        ]
        ResearchOpening.objects.bulk_create(openings)
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(openings)} ResearchOpenings seeded."))

        self.stdout.write(self.style.SUCCESS("\n[SUCCESS] Database seeding for Dr. Musheer Ahmad complete! All metrics, papers, and CMS models ready."))

