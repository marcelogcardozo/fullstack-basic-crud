from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'username', 'created_datetime']
    list_filter = ['created_datetime', 'username']
    search_fields = ['title', 'username', 'content']
    readonly_fields = ['created_datetime']
    
    def get_queryset(self, request):
        return super().get_queryset(request)


admin.site.site_header = "Crud Test List Administration"
admin.site.site_title = "Crud Test List Admin"
admin.site.index_title = "Welcome to Crud Test List Administration"
