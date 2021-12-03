from django.urls import path
from .views import IngredientCreate, IngredientUpdate

app_name = "ingredients"
urlpatterns = [
    path('create/', IngredientCreate.as_view(), name='create'),
    path('<uuid:pk>/', IngredientUpdate.as_view(), name='detail'),
]