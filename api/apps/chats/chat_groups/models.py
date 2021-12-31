import uuid

from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.urls.base import reverse

from apps.users.accounts.models import UserAccount
from apps.chats.chat_massages.models import ChatMassage


class ChatGroup(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(UserAccount(), on_delete=models.CASCADE)
    members = models.ManyToManyField(UserAccount(), default=None, blank=True, related_name='group_members')
    title = models.TextField(blank=True)
    massages = GenericRelation(ChatMassage)

    def __str__(self):
        return self.title

    def get_update_members_url(self):
        return reverse('chat_groups:update_members', kwargs={"pk": self.id})
    
    def get_update_title_url(self):
        return reverse('chat_groups:update_title', kwargs={"pk": self.id})
    
    @classmethod
    def get_create_url(cls):
        return reverse('chat_groups:create')
    @classmethod
    def get_list_url(cls):
        return reverse('chat_groups:list')