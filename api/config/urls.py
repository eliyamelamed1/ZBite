from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/djoser/', include('djoser.urls')),
    path('api/accounts/', include('accounts.urls', namespace='accounts')), 
    path('api/recipes/', include('recipes.urls', namespace='recipes')),
    path('api/users/', include('dj_rest_auth.urls')), 
    path('api/comments/', include('comments.urls', namespace='comments')), 
    path('api/likes/', include('likes.urls', namespace='likes')), 
    path('api/followers/', include('followers.urls', namespace='followers')), 
    path('api/ratings/', include('ratings.urls', namespace='ratings')),
    path('api/chat_groups/', include('chat_groups.urls', namespace='chat_groups')),
    path('api/chat_massages/', include('chat_massages.urls', namespace='chat_massages')),
    path('api/chat_duos/', include('chat_duos.urls', namespace='chat_duos')),
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

# dj_rest_auth includes:
    # login - /login
    # logout - /logout
    # password reset - /password/reset
    # password confirm - /password/reset/confirm

