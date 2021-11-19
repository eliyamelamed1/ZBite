from django.urls import path

from .views import CommentCreate, CommentDelete, CommentDetail, CommentsInRecipe, CommentUpdate

app_name = "comments"
urlpatterns = [
    path('create/', CommentCreate.as_view(), name='create'),
    path('<uuid:pk>/', CommentDetail.as_view(), name='detail'),
    path('<uuid:pk>/update/', CommentUpdate.as_view(), name='update'),
    path('comments_in_recipe/', CommentsInRecipe.as_view(), name='comments_in_recipe'),
    path('<uuid:pk>/delete/', CommentDelete.as_view(), name='delete'),
]
