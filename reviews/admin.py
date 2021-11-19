from django.contrib import admin

from .models import Review


class CommentAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'stars','id',)
    list_display_links = ('id', )
    list_filter = ('author', )
    search_fields = ('stars',)
    list_per_page = 25

admin.site.register(Review, CommentAdmin)
