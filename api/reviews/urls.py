from django.urls import path

from .views import ReviewCreate, ReviewDelete, ReviewsInRecipe

app_name='reviews'
urlpatterns = [
    path('create/', ReviewCreate.as_view(), name='create'),
    path('delete/<uuid:pk>/', ReviewDelete.as_view(), name='delete'),
    path('reviews_in_recipe/', ReviewsInRecipe.as_view(), name='reviews_in_recipe'),
]