from django.contrib import admin
from django.db import models
from unfold.admin import ModelAdmin
from unfold.contrib.forms.widgets import WysiwygWidget
from .models import Post, Normal, Sample, Idea
from .forms import PostAdminForm

class PostAdmin(ModelAdmin):
    form = PostAdminForm
    list_display = ('id', 'type', 'user', 'created_at', 'updated_at')
    list_filter = ('type', 'created_at')
    search_fields = ('user__email', 'type')
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(Post, PostAdmin)
admin.site.register(Normal)
admin.site.register(Sample)
admin.site.register(Idea)
