from django.db import models
import uuid

from django.urls.base import reverse

from accounts.models import UserAccount


class ChatRoom(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(UserAccount(), on_delete=models.CASCADE)
    participants = models.ManyToManyField(UserAccount(), default=None, blank=True, related_name='room_participants')
    title = models.TextField(blank=True)

    def __str__(self):
        return self.title

    
    def get_update_participants_url(self):
        return reverse('chat_rooms:update_participants', kwargs={"pk": self.id})
    
    def get_update_title_url(self):
        return reverse('chat_rooms:update_title', kwargs={"pk": self.id})
    
    @classmethod
    def get_create_url(cls):
        return reverse('chat_rooms:create')

