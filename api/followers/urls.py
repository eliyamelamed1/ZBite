from django.urls import path

from .views import FollowSomeone

app_name = 'followers'
urlpatterns = [
    path('create/', FollowSomeone.as_view(), name='create'),
]