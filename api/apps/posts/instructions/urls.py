from django.urls import path
from .views import (InstructionCreate,IngredientDetails,)

app_name = "recipes"
urlpatterns = [
    path('create/', InstructionCreate.as_view(), name='create'),
    path('<uuid:pk>/', IngredientDetails.as_view(), name='detail'),
]