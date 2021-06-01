from django.db import models

from models.chat_rooms import ChatRoom
from models.accounts import UserAccount

class ChatMassage(models.Model):
    id = models.UUIDField(
        primary_key=Trie,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(UserAccount(), on_delete=models.CASCADE)
    room = models.ForeignKey(ChatRoom(), on_delete=models.CASCADE)