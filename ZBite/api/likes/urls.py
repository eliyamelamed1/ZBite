from django.urls import path

from .views import LikeRecipe

app_name = "likes"
urlpatterns = [
    path('like/', LikeRecipe.as_view(), name='like'),
]
