# Dr. Musheer Ahmad — Academic Website Management Guide

Welcome to your academic website administration console. This guide explains how to manage your website content, update your citations and metrics, upload new research publications, and review prospective student inquiries without needing technical assistance.

---

## 1. Accessing Your Administration Portal

1. Open your web browser and navigate to:
   ```text
   http://your-site-domain.com/cms-admin/
   ```
2. Log in using your assigned username and password.
3. You will be greeted by the **Django Unfold Modern CMS Dashboard**, designed with dark-mode scholarly aesthetics and grouped navigation.

---

## 2. Common Administrative Tasks

### A. Updating Your Citation Metrics & Identifiers
*(Recommended every 3 to 6 months)*
1. In the left navigation menu, click **Site settings** under the *Configuration* section.
2. Scroll to the **Verified Bibliometric Figures** section.
3. Update your:
   - **Total papers** (e.g., 157)
   - **Google Scholar citations** (e.g., 5,296) and **h-index** (e.g., 42)
   - **Scopus citations** and **Scopus h-index**
   - **Citations as of date** (e.g., "October 2026")
4. Click **Save** at the bottom right. The updated numbers will reflect instantly across your site.

---

### B. Uploading a New Curriculum Vitae (CV) PDF
1. Go to **Site settings**.
2. Under **Official Photograph & Curriculum Vitae**, click **Choose file** next to **CV file**.
3. Select your updated `mahmad9.pdf` from your computer.
4. Click **Save**.
5. The public **CV page** will immediately update its interactive embedded viewer and download link.

---

### C. Adding a New Research Publication
1. In the left navigation menu, click **Publications** under *Editorial Content*.
2. Click the **+ Add Publication** button in the top right.
3. Fill in the fields:
   - **Title**: Full paper title.
   - **Authors**: Author list (e.g., *Musheer Ahmad, Collaborator Name*). Your name is automatically highlighted in semibold on the public site.
   - **Venue**: Journal or Conference name (e.g., *IEEE Internet of Things Journal*).
   - **Publication type**: Select **Journal Article** or **Conference Proceeding**.
   - **Year**: Year of publication (e.g., 2026).
   - **DOI**: Full DOI or link (e.g., `10.1109/JIOT.2025.1098765`).
   - **Impact factor as listed in CV**: (e.g., `IF: 8.2`).
   - **Index tags**: (e.g., `SCI-E, SCOPUS`).
   - **Featured**: Check **Is selected** if you want this paper featured on your Home page.
   - **Status**: Set to **Published**.
4. Click **Save**.

---

### D. Posting News, Awards, or Calls for Papers
1. Click **News** under *Editorial Content*.
2. Click **+ Add News Item**.
3. Enter:
   - **Title**: Headline of the award or special collection.
   - **Date**: Date or submission deadline.
   - **Category**: Select *Award*, *Editorial*, or *Institutional*.
   - **Details / Body**: Brief explanation.
   - **Pinned**: Check to display at the top of the news section.
4. Click **Save**.

---

### E. Activating the Top Announcement Banner
1. Go to **Site settings**.
2. Scroll to **Announcement Banner (Top of Site)**.
3. Check **Announcement banner active**.
4. Type your announcement text (e.g., *"Call for Papers: Scientific Reports collection open until 28 Feb 2026"*).
5. Optionally paste a link to the submission portal.
6. Click **Save**. A clean banner will appear at the very top of all pages.

---

### F. Reviewing Prospective Student Applications
1. In the left navigation menu, click **Applications** under *Lab & Academics*.
2. You will see a chronological inbox of all inquiries submitted through your public **/join** page.
3. Click on any candidate's name to view:
   - Current university and academic CGPA / percentage.
   - GATE / UGC-NET JRF qualifications.
   - Their statement of research interest.
   - **Their critique of your published paper and proposed extension.**
   - Link to their full CV.
4. Use the **Status** dropdown to mark candidates as **New**, **Shortlisted**, or **Archived**.
5. You can type confidential notes in the **Private notes** field.
6. To download all applicants for committee review, select the checkboxes and choose **Export selected applications to CSV file** from the Action menu.

---

### G. Exporting a Full Backup of Your Website
1. If you ever wish to save an archive of all data and uploaded documents, you can run:
   ```bash
   python manage.py export_full_backup
   ```
2. A complete timestamped ZIP archive containing your entire database and media uploads will be generated in the `backups/` folder.

---

## 3. Support & Maintenance Contacts

If you experience any technical issues or need help configuring institutional server DNS:
- **Lead Developer & System Administrator:** Ayaan Saifi (`Ayaan-Saifi-1` on GitHub)
- **Repository:** `https://github.com/Ayaan-Saifi-1/MusheerSirSite`
