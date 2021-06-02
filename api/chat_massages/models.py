from django.db import models
import uuid

from django.urls.base import reverse

from chat_rooms.models import ChatRoom
from accounts.models import UserAccount

class ChatMassage(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(UserAccount(), on_delete=models.CASCADE)
    text = models.TextField(default=None)
    room = models.ForeignKey(ChatRoom(), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        """Return absolute URL to the Chat Massage Detail page."""
        return reverse('chat_massages:details', kwargs={"pk": self.id})

    @classmethod
    def get_create_url(cls):
        return reverse('chat_massages:create')