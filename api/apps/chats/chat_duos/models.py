import uuid

from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.urls.base import reverse

from apps.users.accounts.models import UserAccount
from apps.chats.chat_massages.models import ChatMassage


class ChatDuo(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    members = models.ManyToManyField(UserAccount(), default=None, blank=True, related_name='duo_members')
    massages = GenericRelation(ChatMassage)
    
    @classmethod
    def get_list_url(cls):
        return reverse('chat_duos:list')
    @classmethod
    def get_create_url(cls):
        return reverse('chat_duos:create')