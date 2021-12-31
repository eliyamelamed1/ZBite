from django.urls import path

from .views import (ChatMassageCreate, ChatMassageDetails, ChatMassagesInRoom,
                    ChatMassageUpdate)

app_name = 'chat_massages'

urlpatterns = [
    path('create/', ChatMassageCreate.as_view(), name='create'),
    path('<uuid:pk>/', ChatMassageDetails.as_view(), name='details'),
    path('<uuid:pk>/update/', ChatMassageUpdate.as_view(), name='update'),
    path('massages_in_room/', ChatMassagesInRoom.as_view(), name='massages_in_room'),
]

