from django.urls import path

from .views import SaveRecipe

app_name = "saves"
urlpatterns = [
    path('save/', SaveRecipe.as_view(), name='save'),
]
