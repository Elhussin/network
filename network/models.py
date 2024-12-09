from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Posts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="UserPost")
    post = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    
class Coments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post= models.ForeignKey(Posts, on_delete=models.CASCADE)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Like(models.Model):

    user = models.ForeignKey('network.User', on_delete=models.CASCADE)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    likes = models.BooleanField(default=True)
    unlikes = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    

class Followrs(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="FolowUser")
    userFollow = models.ForeignKey(User, on_delete=models.CASCADE, related_name="UserFollow")
    followStatus= models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)


