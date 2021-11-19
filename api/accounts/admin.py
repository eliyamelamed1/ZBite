from django.contrib import admin

from .models import UserAccount


class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'name')
    list_display_links = ('email', 'name')

admin.site.register(UserAccount, UserAccountAdmin)


