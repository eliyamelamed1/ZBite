from django.urls import path
from .views import (InstructionCreate, InstructionDetails,)

app_name = "instructions"
urlpatterns = [
    path('create/', InstructionCreate.as_view(), name='create'),
    path('<uuid:pk>/', InstructionDetails.as_view(), name='detail'),
]