from django.urls import path

from .views import FollowSomeone

app_name = 'followers'
urlpatterns = [
    path('follow/', FollowSomeone.as_view(), name='follow'),
]