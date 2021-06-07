from django.urls import path

from .views import RatingCreate, RatingDelete, RatingsInRecipe

app_name='ratings'
urlpatterns = [
    path('create/', RatingCreate.as_view(), name='create'),
    path('delete/<uuid:pk>/', RatingDelete.as_view(), name='delete'),
    path('ratings_in_recipe/', RatingsInRecipe.as_view(), name='ratings_in_recipe'),
]