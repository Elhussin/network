import json
from .models import User,    Followrs , Like ,Coments ,Posts
from django.db import IntegrityError
from django.http import JsonResponse
def get_iteams_datile(request,title):
  
     data=[]
     if title=='Network'  or title== 'AllPost':
          data =Posts.objects.all().order_by('-created_at')
     if title== 'Following':
          try: 
             folow=Followrs.objects.filter(userFollow=request.user,followStatus=True)
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
     posts=postHnadel(request,data)
     obj=json.dumps(posts, indent=4, sort_keys=True, default=str)
     return obj
   #  user userFollow
def get_profile_datile(request,user_id):
   posts= Posts.objects.filter(user_id=user_id).order_by('-created_at')
   user_posts=postHnadel(request,posts)
   folowr=Followrs.objects.filter(user_id=user_id, followStatus=True)
   folow=Followrs.objects.filter(userFollow_id=user_id,followStatus=True)
   
   followStatus=False
   for i in folowr:
      if request.user.id == i.userFollow_id :
         followStatus=i.followStatus
      
   folow_count=folow.count()
   folowr_count= folowr.count()
    
   data={"posts": user_posts,
     'followStatus':followStatus,
     'folowr_count':folowr_count,
     'folow_count':folow_count, }
   # obj=json.dumps(data, indent=4, sort_keys=True, default=str)
   
   return data
def postHnadel(request,data):
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

                if i.user.id == request.user.id:
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
    return dat_post


