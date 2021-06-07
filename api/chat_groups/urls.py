from django.urls import path

from .views import (ChatGroupCreate, ChatGroupList, ChatGroupUpdateMembers,
                    ChatGroupUpdateTitle)

app_name = 'chat_groups'

urlpatterns = [
    path('list/', ChatGroupList.as_view(), name='list'),
    path('create/', ChatGroupCreate.as_view(), name='create'),
    path('update_members/<uuid:pk>/', ChatGroupUpdateMembers.as_view(), name='update_members'),
    path('<uuid:pk>/update_title/', ChatGroupUpdateTitle.as_view(), name='update_title'),
]
