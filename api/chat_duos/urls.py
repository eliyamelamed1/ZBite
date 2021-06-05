from .views import ChatDuoList, ChatDuoCreate
from django.urls import path

app_name = 'chat_duos'

urlpatterns = [
    path('list/', ChatDuoList.as_view(), name='list'),
    path('create/', ChatDuoCreate.as_view(), name='create'),
]
