# ==============================================================================
# Multi-Stage Production Dockerfile: Dr. Musheer Ahmad Academic Portfolio
# 1. Build Vite React TypeScript Frontend
# 2. Package Django Backend with Gunicorn & WhiteNoise
# ==============================================================================

# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Python Backend Runtime
FROM python:3.11-slim AS backend-runtime
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt gunicorn psycopg2-binary

# Copy backend application source
COPY backend/ ./backend/

# Copy built frontend assets to static collection target
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Set working directory to backend
WORKDIR /app/backend

# Create directory for uploads and static files
RUN mkdir -p /app/backend/media /app/backend/staticfiles /app/backend/backups

# Collect static files including Unfold CMS admin assets
RUN python manage.py collectstatic --noinput || true

EXPOSE 8000

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "120"]
