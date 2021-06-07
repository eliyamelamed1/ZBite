from django.urls import path

from .views import ChatDuoCreate, ChatDuoList

app_name = 'chat_duos'

urlpatterns = [
    path('list/', ChatDuoList.as_view(), name='list'),
    path('create/', ChatDuoCreate.as_view(), name='create'),
]
