import uuid

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.urls.base import reverse

from accounts.models import UserAccount


class ChatMassage(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(UserAccount(), on_delete=models.CASCADE)
    text = models.TextField(default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content_type = models.ForeignKey(ContentType,related_name='content_obj', on_delete=models.CASCADE)
    object_id = models.UUIDField(
        blank=True,
        null=True,
        default=None,
    )
    room = GenericForeignKey('content_type', 'object_id')
    

    def __str__(self):
        return self.text

    def get_absolute_url(self):
        """Return absolute URL to the Chat Massage Detail page."""
        return reverse('chat_massages:details', kwargs={"pk": self.id})

    def get_update_url(self):
        """Return absolute URL to the Chat Massage Update page."""
        return reverse('chat_massages:update', kwargs={"pk": self.id})

    @classmethod
    def get_create_url(cls):
        return reverse('chat_massages:create')

    @classmethod
    def get_massages_in_room_url(cls):
        return reverse('chat_massages:massages_in_room')

