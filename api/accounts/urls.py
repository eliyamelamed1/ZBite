from django.urls import path

from .views import (LoggedUserDetailView, TopRatedAccounts, UserDetailView,
                    UserListView, UserWishlist)

app_name = 'accounts'
urlpatterns = [
    path('list/', UserListView.as_view(), name='list'),
    path('<uuid:pk>/', UserDetailView.as_view(), name='detail'),
    path('top/', TopRatedAccounts.as_view(), name='top'),
    path('logged_user/', LoggedUserDetailView.as_view(), name='logged_user'),
    path('wishlist/', UserWishlist.as_view(), name='wishlist'),
]

