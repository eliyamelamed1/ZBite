from django.urls import path
from .views import IngredientCreate, IngredientDetails

app_name = "ingredients"
urlpatterns = [
    path('create/', IngredientCreate.as_view(), name='create'),
    path('<uuid:pk>/', IngredientDetails.as_view(), name='details'),
]