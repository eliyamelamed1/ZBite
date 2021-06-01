import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse

from recipes.models import Recipe


class Comment(models.Model):
    
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE)
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    title = models.CharField(max_length=255)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    image = models.ImageField(upload_to='media/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title

    def get_absolute_url(self):
        """Return absolute URL to the Comment Detail page."""
        return reverse('comments:detail', kwargs={'pk': self.id})

    def get_delete_url(self):
        return reverse('comments:delete', kwargs={'pk': self.id})
    
    @classmethod
    def get_comment_create_url(cls):
        return reverse('comments:create')