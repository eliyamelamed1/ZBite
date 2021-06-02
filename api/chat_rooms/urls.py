from .views import ChatRoomCreate, ChatRoomMassagesList, ChatRoomList, ChatRoomUpdateParticipents, ChatRoomUpdateTitle
from django.urls import path


app_name = 'chat_rooms'

urlpatterns = [
    path('list/', ChatRoomList.as_view(), name='list'),
    path('massages_list/', ChatRoomMassagesList.as_view(), name='massages_list'),
    path('create/', ChatRoomCreate.as_view(), name='create'),
    path('<uuid:pk>/update_participents/', ChatRoomUpdateParticipents.as_view(), name='update_participents'),
    path('<uuid:pk>/update_title/', ChatRoomUpdateTitle.as_view(), name='update_title'),
]
