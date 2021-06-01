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
    admins = models.ManyToManyField(UserAccount(), default=None, blank=True, related_name='room_admins')
    participents = models.ManyToManyField(UserAccount(), default=None, blank=True, related_name='room_participents')

