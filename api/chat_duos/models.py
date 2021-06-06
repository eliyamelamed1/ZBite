from django.db import models
import uuid
from accounts.models import UserAccount
from chat_massages.models import ChatMassage
from django.contrib.contenttypes.fields import GenericRelation
from django.urls.base import reverse

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