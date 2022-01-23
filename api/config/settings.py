import os
import sys
from pathlib import Path
from pickle import TRUE

from django.conf import settings
from django.conf.global_settings import EMAIL_USE_SSL, EMAIL_USE_TLS

from environs import Env

env = Env()
env.read_env()

# Build paths inside the project save this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'zbite.herokuapp.com',]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.postgres',
    
    # browser api
    'dj_rest_auth',

    #3rd party
    'whitenoise.runserver_nostatic',
    'djoser',
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
    'django_extensions',
    'drf_yasg', # docs
    'elasticsearch_dsl',
    'django_elasticsearch_dsl',
    'storages', # amazons s3

    # Local apps
        # Users
        'apps.users.accounts',
        'apps.users.followers',

        # Posts
        'apps.posts.recipes',
        'apps.posts.saves',
        'apps.posts.reviews',

        # Chats
        'apps.chats.chat_groups',
        'apps.chats.chat_duos',
        'apps.chats.chat_massages',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
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
        'DIRS': [os.path.join(BASE_DIR, 'build')],
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

# ---------- heroku Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env('DB_NAME',default='postgres'),
        'USER': env('DB_USER',default='postgres'),
        'PASSWORD': env('DB_PASSWORD',default='postgres'),
        'HOST': env('DB_HOST',default='postgres'),
        'PORT': '5432',
    },
}
# ---------- Prod Database
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'dduv1ml0qmj7uq',
#         'USER': 'orrejnjldzhkik',
#         'PASSWORD': '7da3a8a8796af42e2678215a529f4ba763b7295bc46114f83cafaf79e8a15a2f',
#         'HOST': 'ec2-54-220-243-77.eu-west-1.compute.amazonaws.com',
#         'PORT': '5432',
#     },
# }


# ------------ dev Database
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'postgres',
#         'USER': 'postgres',
#         'PASSWORD': 'postgres',
#         'HOST': 'localhost',
#         'PORT': '5432',
#     }
# }

# Send emails
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True 
SENDGRID_SANDBOX_MODE_IN_DEBUG = True
DEFAULT_FROM_EMAIL = 'eliyamelamed1@gmail.com'

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

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static')
]
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# Rest Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],

    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
   
        # browser api
        'rest_framework.authentication.SessionAuthentication',
    ),
}


# Djoser settings
DOMAIN = 'zbite.vercel.app'
SITE_NAME = 'Zbite'
DJOSER = {
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True, 
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'SEND_CONFIRAMTION_EMAIL': True,
    'SET_USERNAME_RETYPE': True,
    'SET_PASSWORD_RETYPE': True,
    # 'SEND_ACTIVATION_EMAIL': True,

    'PASSWORD_RESET_CONFIRM_URL': 'users/reset_password/UserResetPassword/{uid}/{token}/',
    # 'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}/',
    # 'ACTIVATION_URL': 'activate/{uid}/{token}',

    'SERIALIZERS': {
        'user_create': 'apps.users.accounts.serializers.UserCreateSerializer',
        'user': 'apps.users.accounts.serializers.UserCreateSerializer',
        'user_delete': 'apps.users.accounts.serializers.UserDeleteSerializer',
    },
}

AUTH_USER_MODEL = 'accounts.UserAccount'

SITE_ID = 1

ELASTICSEARCH_DSL={
    'default':{
        'hosts':'https://3ng0nd8r83:9b711z6cyt@dogwood-516101910.eu-west-1.bonsaisearch.net:443',
    },
}


# amazon s3 storage
AWS_ACCESS_KEY_ID = 'AKIAQAUQJESZOQBHAKTZ'
AWS_SECRET_ACCESS_KEY = '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'
AWS_STORAGE_BUCKET_NAME = 'zbite'
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}
AWS_LOCATION = 'static'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static'),
]
STATIC_URL = 'https://%s/%s/' % (AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

DEFAULT_FILE_STORAGE = 'config.storage_backends.MediaStorage'

# Security
# SECRET_KEY = '0o%+e2tv@q!wiot0i3m*#)&q2w3v8nd74ew64+!ilm6&qq-9o5'
SECRET_KEY = env("DJANGO_SECRET_KEY", default='secret_key')
# DEBUG = env.bool("DJANGO_DEBUG", default=False)
DEBUG = True
SECURE_HSTS_SECONDS = env.int("DJANGO_SECURE_HSTS_SECONDS", default=2592000)
SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool("DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS", default=True)
SECURE_HSTS_PRELOAD = env.bool("DJANGO_SECURE_HSTS_PRELOAD", default=True)
SESSION_COOKIE_SECURE = env.bool("DJANGO_SESSION_COOKIE_SECURE", default=True)
CSRF_COOKIE_SECURE = env.bool("DJANGO_CSRF_COOKIE_SECURE", default=True)
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    'https://zbite.vercel.app',
)
SECURE_SSL_REDIRECT = env.bool("DJANGO_SECURE_SSL_REDIRECT", default=False)
