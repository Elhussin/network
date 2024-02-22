from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Posts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="UserPost")
    post = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def serialized(self):
        return {
            "id": self.id,
            "userID":self.user.id,
            "user":self.user.username,
            "timestamp": self.created_at.strftime("%b %d %Y, %I:%M %p"),
             'post':self.post
            }

    
    # def __str__(self):
    #     return f"Post by {self.user.username} at {self.created_at}"
 
class Coments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="UserComment")
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="PostComment")
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def serialized(self):
        return {
            "id": self.id,
            "user":self.user.username,
            'comment' : self.comment,
            "timestamp": self.created_at.strftime("%b %d %Y, %I:%M %p"),
            }

    # def __str__(self):
    #     return f"Comment by {self.user.username} on {self.post} at {self.created_at} " 





class Like(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="UserLike")
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="PostLike")
    likes = models.BooleanField(default=True)
    unlikes = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def serialized(self):
        return {
            "id": self.id,
            "user":self.user.username,
            'likes' : self.likes,
            'unlikes':self.unlikes,
            
            } 

class Followrs(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="FolowUser")
    userFollow = models.ForeignKey(User, on_delete=models.CASCADE, related_name="UserFollow")
    followStatus= models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    

     
    def serialized(self):
            return {
            "id": self.id,
            "user":self.user.username,
            'userFollow' : self.userFollow.username,
            'followStatus':self.followStatus,
             "timestamp": self.created_at.strftime("%b %d %Y, %I:%M %p"),
            }
     
    # def __str__(self):
    #     return f" Follow {self.user.username} By {self.userFollow.username} Start from  {self.timestamp} "





class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    title=models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    img = models.ImageField(upload_to='documents/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now_add=True)
    def serialized(self):
        return {
          
            "user":self.user.username,
            'title' : self.title,
            'bio':self.bio,
            'img':self.img,
            "timestamp": self.created_at.strftime("%b %d %Y, %I:%M %p"),
            'last_update':self.last_update.strftime("%b %d %Y, %I:%M %p"),
            }
     

    def __str__(self):
        return f"Profile of {self.user.username}"