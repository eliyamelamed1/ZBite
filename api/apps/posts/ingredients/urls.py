from django.urls import path
from .views import IngredientCreate

app_name = "ingredients"
urlpatterns = [
    path('create/', IngredientCreate.as_view(), name='create'),
]