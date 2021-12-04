# Create your models here.
import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse
from django.contrib.postgres.fields import ArrayField

class Instruction(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    recipe = models.OneToOneField('recipes.Recipe', on_delete=models.CASCADE)
    text_list = ArrayField(models.CharField(max_length=100, blank=True),size=15,)
    # image_list = ArrayField(models.ImageField(upload_to='media/', blank=True),blank=True, null=True,size=15,)

    def get_absolute_url(self):
        """Return absolute URL to the Instruction Detail page."""
        return reverse('instructions:detail', kwargs={"pk": self.id})

    def __str__(self):
        return str(self.text_list)
