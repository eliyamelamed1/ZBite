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
    path('api/admin/', admin.site.urls),

    # auth
    path('api/djoser/', include('djoser.urls')),
    path('api/djoser/', include('djoser.urls.authtoken')),
    path('api/accounts/', include('accounts.urls', namespace='accounts')), 

    # features
    path('api/recipes/', include('recipes.urls', namespace='recipes')),
    path('api/comments/', include('comments.urls', namespace='comments')), 
    path('api/likes/', include('likes.urls', namespace='likes')), 
    path('api/followers/', include('followers.urls', namespace='followers')), 
    path('api/ratings/', include('ratings.urls', namespace='ratings')),

    # chat
    path('api/chat_groups/', include('chat_groups.urls', namespace='chat_groups')),
    path('api/chat_massages/', include('chat_massages.urls', namespace='chat_massages')),
    path('api/chat_duos/', include('chat_duos.urls', namespace='chat_duos')),

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

