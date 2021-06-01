import uuid

from django.contrib.auth import get_user_model
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models
from django.urls import reverse


class UserAccountManager(BaseUserManager):

    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email adress')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.set_password(password)
        user.save()

        return user
    
    


# TODO - learn about PermissionsMixin
class UserAccount(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    followers = models.ManyToManyField('self', default=None, blank=True, related_name='followers_list', symmetrical=False)
    following = models.ManyToManyField('self', default=None, blank=True, related_name='following_list', symmetrical=False)
    stars = models.TextField(blank=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    def get_absolute_url(self):
        """Return absolute URL to the user Detail page."""
        return reverse('accounts:detail', kwargs={"pk": self.id})

    def __str__(self):
        return self.email
    
    @classmethod
    def get_top_rated_accounts_url(cls):
        return reverse('accounts:top')