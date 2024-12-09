import json
from .models import User,    Followrs , Like ,Coments ,Posts
from django.db import IntegrityError
from django.http import JsonResponse
#  get all Posts
def  get_iteams_datile(title,user_id) :  
     data=[] 
     if title== 'AllPost':
          data =Posts.objects.all().order_by('-created_at')
     if title=='Network'  :
         # data =Posts.objects.count() 
         data =Posts.objects.all().order_by('-created_at')[:3]
 
     if title== 'Following':
          try: 
             folow=Followrs.objects.filter(userFollow=user_id,followStatus=True)
             follower_post=[]
             for iteam in folow:   
                f_post = Posts.objects.filter(user_id=iteam.user.id)
                follower_post +=f_post
             data=follower_post      
             if not data :
                data=[]
          except IntegrityError as e:
               pass
     else:
        pass
     posts=postHnadel(user_id,data)
     data={"posts": posts}
     return data
   #  user userFollow
   
   #  get user brofile 

# get broflie for selected user 
def get_profile_datile(activeUser,user_id):
   posts= Posts.objects.filter(user_id=user_id).order_by('-created_at')
   user_posts=postHnadel(activeUser,posts)
   data={"posts": user_posts, }

   return data

#  handel data then return it in list 
def postHnadel(user_id,data):
    dat_post=[] 
    for post in data:
             comments= Coments.objects.filter(post=post).order_by('-created_at')
             like= Like.objects.filter(post=post).order_by('-created_at')
             allcomment=[]
             alllike=[]
             commentcount=0
             unlikecount=0
             likecount=0
             onepost={}
             onepost['user']=post.user
             onepost['user_id']=post.user.id
             onepost['post_id']=post.id
             onepost['created_at']=post.created_at.strftime("%b %d %Y, %I:%M %p")
             onepost['post']=post.post
             for comment in comments :
                onecomment={}
                onecomment['comment']=comment.comment
                onecomment['user_comment']=comment.user
                onecomment['comment_id']=comment.id
                onecomment['created_at']=comment.created_at.strftime("%b %d %Y, %I:%M %p")
                allcomment.append(onecomment)
                commentcount +=1      
             onepost['comment']=allcomment
             onepost['Totalcomment']=commentcount

             for i in like :

                if i.user.id == user_id:
                   onelike={}

                   if i.likes:
                      onelike['user']=i.user.id
                      onelike['likes']=i.likes
                      onelike['unlikes']=i.unlikes
                      alllike.append(onelike)
                
                  
                   if i.unlikes:
                       onelike['user']=i.user.id
                       onelike['likes']=i.likes
                       onelike['unlikes']=i.unlikes
                       alllike.append(onelike)
    
                
                if i.likes:
                   likecount +=1
                if i.unlikes:
                    unlikecount +=1
    
             onepost['like']=likecount
             onepost['unlike']=unlikecount
             onepost['postLike']=alllike
            
             dat_post.append(onepost)  
   #  resualts={}
   #  resualts['resualt']=dat_post
    return dat_post


