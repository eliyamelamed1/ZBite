from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view( # new
    openapi.Info(
        title="Blog API",
        default_version="v1",
        description="A sample API for learning DRF",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="hello@example.com"),
        license=openapi.License(name="BSD License"),
    ),
        public=True,
        permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    # browser api
    path('api/browser_api/', include('dj_rest_auth.urls')), 

    # admim
    path('api/admin/', admin.site.urls),

    # auth
    path('api/djoser/', include('djoser.urls')),
    path('api/djoser/', include('djoser.urls.authtoken')),

    # Users
    path('api/accounts/', include('apps.users.accounts.urls', namespace='accounts')), 
    path('api/followers/', include('apps.users.followers.urls', namespace='followers')), 

    # Posts
    path('api/recipes/', include('apps.posts.recipes.urls', namespace='recipes')),
    path('api/saves/', include('apps.posts.saves.urls', namespace='saves')), 
    path('api/reviews/', include('apps.posts.reviews.urls', namespace='reviews')),
    path('api/ingredients/', include('apps.posts.ingredients.urls', namespace='ingredients')),

    # Chats
    path('api/chat_groups/', include('apps.chats.chat_groups.urls', namespace='chat_groups')),
    path('api/chat_massages/', include('apps.chats.chat_massages.urls', namespace='chat_massages')),
    path('api/chat_duos/', include('apps.chats.chat_duos.urls', namespace='chat_duos')),

    path('swagger/', schema_view.with_ui( 'swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui( 'redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]


# djoser.urls includes:
    # /users/ - create user
    # /users/me/ - user details
    # /users/confirm/
    # /users/resend_activation/
    # /users/set_password/
    # /users/reset_password/
    # /users/reset_password_confirm/
    # /users/set_username/
    # /users/reset_username/
    # /users/reset_username_confirm/

# djoser.urls.authtoken:
    # /token/login/
    # /token/logout/


# dj_rest_auth includes:
    # login - /login
    # logout - /logout
    # password reset - /password/reset
    # password confirm - /password/reset/confirm

