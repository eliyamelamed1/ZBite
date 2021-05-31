from django.urls import path

from .views import (RecipeCreate, RecipeDetail, RecipeList, RecipeSearch,
                    RecipesOfAccountsFollowed, TopRatedRecipes)

app_name = "recipes"
urlpatterns = [
    path('list/', RecipeList.as_view(), name='list'),
    path('create/', RecipeCreate.as_view(), name='create'),
    path('<uuid:pk>/', RecipeDetail.as_view(), name='detail'),
    path('search/', RecipeSearch.as_view(), name='search'),
    path('followed/', RecipesOfAccountsFollowed.as_view(), name='followed'),
    path('top/', TopRatedRecipes.as_view(), name='top'),
]
