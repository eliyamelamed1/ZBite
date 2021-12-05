from django.contrib import admin

from .models import Instruction


class InstructionAdmin(admin.ModelAdmin):
    list_display = ('text_list','image_list',)
    list_display_links = ('text_list','image_list',)
    list_filter = ('author', )
    list_per_page = 25

admin.site.register(Instruction, InstructionAdmin)
