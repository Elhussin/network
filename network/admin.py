from django.contrib import admin

# Register your models here.
# Register your models here.
from .models import Posts, Coments ,Like ,Followrs 
    
class PostsAdmin(admin.ModelAdmin):
    list_display = ("__str__", "post")

class ComentsAdmin(admin.ModelAdmin):
    list_display = ("__str__", "comment")

class LikeAdmin(admin.ModelAdmin):

    list_display = ("__str__", "likes")

class FollowrsAdmin(admin.ModelAdmin):

    list_display = ("__str__", "followStatus")
    
    
admin.site.register(Posts,PostsAdmin)
admin.site.register(Coments, ComentsAdmin)
admin.site.register(Like, LikeAdmin)
admin.site.register(Followrs, FollowrsAdmin)
    