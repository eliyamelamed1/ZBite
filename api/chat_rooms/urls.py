from .views import ChatRoomCreate, ChatRoomList, ChatRoomUpdateParticipants, ChatRoomUpdateTitle
from django.urls import path


app_name = 'chat_rooms'

urlpatterns = [
    path('list/', ChatRoomList.as_view(), name='list'),
    path('create/', ChatRoomCreate.as_view(), name='create'),
    path('<uuid:pk>/update_participants/', ChatRoomUpdateParticipants.as_view(), name='update_participants'),
    path('<uuid:pk>/update_title/', ChatRoomUpdateTitle.as_view(), name='update_title'),
]
