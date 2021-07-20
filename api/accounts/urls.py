from django.urls import path

from .views import TopRatedAccounts, UserDetailView, UserListView

app_name = 'accounts'
urlpatterns = [
    path('list/', UserListView.as_view(), name='list'),
    path('<uuid:pk>/', UserDetailView.as_view(), name='detail'),
    path('top/', TopRatedAccounts.as_view(), name='top'),
]

