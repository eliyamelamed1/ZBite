from django.contrib.auth.models import User
from django.db import models
import uuid

from accounts.models import UserAccount


class ChatRoom(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(UserAccount(), on_delete=models.CASCADE)
    participents = models.ManyToManyField(UserAccount(), default=None, blank=True, related_name='room_participents')
    title = models.TextField(blank=True)

    def __str__(self):
        return self.title

    