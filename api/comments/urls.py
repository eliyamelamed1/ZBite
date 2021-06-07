from django.urls import path

from .views import CommentCreate, CommentDelete, CommentDetail, CommentsInRecipe

app_name = "comments"
urlpatterns = [
    path('create/', CommentCreate.as_view(), name='create'),
    path('<uuid:pk>/', CommentDetail.as_view(), name='detail'),
    path('comments_in_recipe/', CommentsInRecipe.as_view(), name='comments_in_recipe'),
    path('delete/<uuid:pk>/', CommentDelete.as_view(), name='delete'),
]
