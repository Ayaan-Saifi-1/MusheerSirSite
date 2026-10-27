"""
Django settings for Dr. Musheer Ahmad Portfolio & Research Lab CMS.
"""

from pathlib import Path
import os
import dj_database_url
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get(
    'DJANGO_SECRET_KEY',
    'django-insecure-academic-portfolio-secret-key-dr-musheer-ahmad-jmi-2026'
)

DEBUG = os.environ.get('DJANGO_DEBUG', 'True').lower() in ('true', '1', 'yes')

ALLOWED_HOSTS = ['*']

# Application definition
# Important: 'unfold' must come before 'django.contrib.admin'
INSTALLED_APPS = [
    'unfold',
    'unfold.contrib.filters',
    'unfold.contrib.forms',
    'unfold.contrib.inlines',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third party packages
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',

    # Local application
    'portfolio.apps.PortfolioConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# Default to SQLite, override with DATABASE_URL if present
DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
    )
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# Static & Media Files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static'] if (BASE_DIR / 'static').exists() else []

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_PAGINATION_CLASS': None,  # Bundle and endpoints handle pagination or direct lists
}

# SimpleJWT configuration
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=7),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# CORS Configuration
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^http://localhost:\d+$",
    r"^http://127\.0\.0\.1:\d+$",
]

# Django Unfold Configuration (Tailwind Modern Admin UI)
UNFOLD = {
    "SITE_TITLE": "Dr. Musheer Ahmad — Lab CMS",
    "SITE_HEADER": "Dr. Musheer Ahmad Research Lab",
    "SITE_SUBHEADER": "Jamia Millia Islamia • Cryptography & Multimedia Security",
    "SITE_SYMBOL": "shield",  # Material symbol
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": True,
    "THEME": "dark",
    "COLORS": {
        "primary": {
            "50": "240 249 255",
            "100": "224 242 254",
            "200": "186 230 253",
            "300": "125 211 252",
            "400": "56 189 248",
            "500": "14 165 233",
            "600": "2 132 199",
            "700": "3 105 161",
            "800": "7 89 133",
            "900": "12 74 110",
            "950": "8 47 73",
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": True,
        "navigation": [
            {
                "title": "Professor Profile & CMS",
                "separator": True,
                "items": [
                    {
                        "title": "Site Configuration",
                        "icon": "settings",
                        "link": "/cms-admin/portfolio/siteconfiguration/",
                    },
                    {
                        "title": "Impact Metrics",
                        "icon": "analytics",
                        "link": "/cms-admin/portfolio/impactmetric/",
                    },
                    {
                        "title": "Research Areas",
                        "icon": "biotech",
                        "link": "/cms-admin/portfolio/researcharea/",
                    },
                ],
            },
            {
                "title": "Scholarly Works & Grants",
                "separator": True,
                "items": [
                    {
                        "title": "Publications (Auto-BibTeX)",
                        "icon": "menu_book",
                        "link": "/cms-admin/portfolio/publication/",
                    },
                    {
                        "title": "Sponsored Grants",
                        "icon": "account_balance",
                        "link": "/cms-admin/portfolio/sponsoredproject/",
                    },
                ],
            },
            {
                "title": "Lab & Academics",
                "separator": True,
                "items": [
                    {
                        "title": "Lab Members & Alumni",
                        "icon": "groups",
                        "link": "/cms-admin/portfolio/teammember/",
                    },
                    {
                        "title": "Teaching & Courses",
                        "icon": "school",
                        "link": "/cms-admin/portfolio/course/",
                    },
                    {
                        "title": "News & Announcements",
                        "icon": "campaign",
                        "link": "/cms-admin/portfolio/newsitem/",
                    },
                ],
            },
            {
                "title": "Recruitment & Inquiries",
                "separator": True,
                "items": [
                    {
                        "title": "PhD / Intern Openings",
                        "icon": "work",
                        "link": "/cms-admin/portfolio/researchopening/",
                    },
                    {
                        "title": "Student Applications",
                        "icon": "inbox",
                        "link": "/cms-admin/portfolio/prospectiveapplication/",
                    },
                ],
            },
        ],
    },
}
