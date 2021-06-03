from .views import ChatRoomCreate, ChatRoomList, ChatRoomUpdateMembers, ChatRoomUpdateTitle
from django.urls import path


app_name = 'chat_rooms'

urlpatterns = [
    path('list/', ChatRoomList.as_view(), name='list'),
    path('create/', ChatRoomCreate.as_view(), name='create'),
    path('<uuid:pk>/update_members/', ChatRoomUpdateMembers.as_view(), name='update_members'),
    path('<uuid:pk>/update_title/', ChatRoomUpdateTitle.as_view(), name='update_title'),
]
