from django.urls import path

from .views import RatingCreate, RatingDelete, RatingSearch

app_name='ratings'
urlpatterns = [
    path('create/', RatingCreate.as_view(), name='create'),
    path('delete/<uuid:pk>/', RatingDelete.as_view(), name='delete'),
    path('search/', RatingSearch.as_view(), name='search'),
]