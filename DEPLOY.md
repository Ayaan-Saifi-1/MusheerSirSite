# Production Deployment Guide: Dr. Musheer Ahmad Academic Portfolio

This document outlines the step-by-step deployment procedure for Dr. Musheer Ahmad's academic portfolio and laboratory CMS on a Linux VPS (Ubuntu 22.04 / 24.04 LTS), university server, or containerized cloud host.

---

## 1. Architecture Overview

- **Frontend:** React 19 + TypeScript + Vite, served as pre-rendered static assets via Nginx with HTTP/2 and Brotli/Gzip compression.
- **Backend:** Django 5 + Django REST Framework + Django Unfold (Tailwind Admin UI), running behind Gunicorn WSGI workers.
- **Database:** PostgreSQL 16 (or SQLite for lightweight departmental single-node hosting).
- **Media & Static Storage:** WhiteNoise for compressed hashed static assets; local persistent volume for media uploads (`portraits/`, `cv/`, `applications/`).
- **Reverse Proxy & SSL:** Nginx with Let's Encrypt automated TLS certificates.

---

## 2. Prerequisites on Target Host

Install Docker Engine and Docker Compose Plugin:
```bash
# Update and install Docker
sudo apt update && sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable --now docker

# Optional: Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

---

## 3. Deployment Steps via Docker Compose

### Step 1: Clone Repository
```bash
git clone https://github.com/Ayaan-Saifi-1/MusheerSirSite.git /opt/musheer-portfolio
cd /opt/musheer-portfolio
```

### Step 2: Configure Environment
Copy the environment template and set production secrets:
```bash
cp .env.example .env
nano .env
```
Ensure you set:
- `DJANGO_SECRET_KEY`: A strong random 64-character secret.
- `POSTGRES_PASSWORD`: A secure database password.
- `ALLOWED_HOSTS`: Your domain name (e.g., `musheerahmad.jmi.ac.in,www.musheerahmad.jmi.ac.in`).

### Step 3: Build & Launch Containers
```bash
# Build and run in detached mode
docker compose up -d --build
```

### Step 4: Run Migrations & Import Initial Verified Data
```bash
# Run database migrations
docker compose exec web python manage.py migrate

# Seed verified academic structure from CV
docker compose exec web python manage.py seed_academic_structure

# Import verified publication bibliography (58 journals + 57 conferences)
docker compose exec web python manage.py import_cv_publications

# Create CMS superuser account for Dr. Musheer Ahmad
docker compose exec web python manage.py createsuperuser
```

---

## 4. Setting Up SSL with Let's Encrypt (Certbot)

To enable HTTPS with Let's Encrypt:
```bash
# Install certbot on host or run via docker certbot container
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d musheerahmad.jmi.ac.in
```

---

## 5. Automated Daily Backups

Add a cron job to automatically backup the database and media assets every night at 3:00 AM:
```bash
crontab -e
```
Add the following line:
```cron
0 3 * * * cd /opt/musheer-portfolio && docker compose exec -T web python manage.py export_full_backup --output-dir=/app/backend/backups >> /var/log/portfolio_backup.log 2>&1
```

---

## 6. Manual Host Deployment (Without Docker)

If deploying directly on an Ubuntu VPS with Nginx, Gunicorn, and Systemd:

### Backend Setup:
```bash
cd /opt/musheer-portfolio/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt gunicorn psycopg2-binary
python manage.py migrate
python manage.py collectstatic --noinput
```

### Frontend Build:
```bash
cd /opt/musheer-portfolio/frontend
npm ci
npm run build
# The dist/ directory is now ready for Nginx to serve
```

### Systemd Service for Gunicorn (`/etc/systemd/system/musheer-backend.service`):
```ini
[Unit]
Description=Dr. Musheer Ahmad Academic Portfolio Gunicorn Daemon
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/opt/musheer-portfolio/backend
ExecStart=/opt/musheer-portfolio/backend/venv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind 127.0.0.1:8000 \
          config.wsgi:application

[Install]
WantedBy=multi-user.target
```
Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now musheer-backend
```
