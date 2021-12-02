from django.urls import path
from .views import IngredientCreate, IngredientUpdate

app_name = "ingredients"
urlpatterns = [
    path('create/', IngredientCreate.as_view(), name='create'),
    path('update/', IngredientUpdate.as_view(), name='update'),
]