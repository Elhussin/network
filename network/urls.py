
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("posts/<str:title>", views.view_post, name="posts"),
  
    path("like/<int:post_id>", views.add_like, name="like"),
    path("profile/<int:user_id>", views.usersProfile, name="profile"),
    path("unlike/<int:post_id>", views.un_like, name="unlike"),
    
    path("addposts", views.add_post , name="addposts"),
    path("addBio", views.addBio , name="addBio"),
    path("addComment", views.addComment , name="addComment"),
    path("follow/<int:user_id>", views.follow , name="follow"),
    # path('home', views.home, name="home")
    path("<path:path>", views.hendelPAth, name="hendelPAth")
]
