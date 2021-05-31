from django.urls import path

from .views import CommentCreate, CommentDelete, CommentDetail, CommentSearch

app_name = "comments"
urlpatterns = [
    path('create/', CommentCreate.as_view(), name='create'),
    path('<uuid:pk>/', CommentDetail.as_view(), name='detail'),
    path('search/', CommentSearch.as_view(), name='search'),
    path('delete/<uuid:pk>/', CommentDelete.as_view(), name='delete'),
]
