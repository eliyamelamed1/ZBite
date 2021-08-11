from django.urls import path

from .views import (RecipeCreate, RecipeDetail, RecipeList, RecipeSearch,
                    RecipesOfAccountsFollowed, SaveFavoriteRecipe, TopRatedRecipes)

app_name = "recipes"
urlpatterns = [
    path('list/', RecipeList.as_view(), name='list'),
    path('create/', RecipeCreate.as_view(), name='create'),
    path('<uuid:pk>/', RecipeDetail.as_view(), name='detail'),
    path('search/', RecipeSearch.as_view(), name='search'),
    path('recipes_of_accounts_followed/', RecipesOfAccountsFollowed.as_view(), name='recipes_of_accounts_followed'),
    path('top_rated/', TopRatedRecipes.as_view(), name='top_rated'),
    path('favorites/', SaveFavoriteRecipe.as_view(), name='favorites'),
]