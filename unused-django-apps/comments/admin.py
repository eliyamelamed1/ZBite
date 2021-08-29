from django.contrib import admin

from .models import Comment

# class CommentInline(admin.TabularInline):
#     model = Comment

class CommentAdmin(admin.ModelAdmin):
    # inlines = [CommentInline,]
    list_display = ('recipe','id', 'title')
    list_display_links = ('id', 'title')
    list_filter = ('author', )
    search_fields = ('title',)
    list_per_page = 25

admin.site.register(Comment, CommentAdmin)
