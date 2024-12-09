from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.shortcuts import render 
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import User
from django.http import JsonResponse
import json
from .models import User,Posts,Like,Coments,Followrs
from .helper import  get_iteams_datile,get_profile_datile 
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.core.paginator import Paginator
import json



def index(request):
    return render(request, "network/index.html")


@csrf_exempt
@login_required
def usersProfile(request):
    page =request.GET.get('page', 1)
    brofileId =request.GET.get('brofileId', 1)
    activeUser=request.user.id
    folowr=Followrs.objects.filter(user_id=brofileId, followStatus=True)
    folow=Followrs.objects.filter(userFollow_id=brofileId,followStatus=True)
    followStatus=False
    for i in folowr:
      if activeUser == i.userFollow_id :
         followStatus=i.followStatus
         
    folow_count=folow.count()
    folowr_count= folowr.count()

    
    paginated_data=get_profile_datile(activeUser,brofileId)
    data = paginate_data(paginated_data['posts'], page, 10) 
    data['followStatus']=followStatus
    data['folowr_count']=folowr_count
    data['folow_count']=folow_count

    obj=json.dumps(data, indent=4, sort_keys=True, default=str)
    return  JsonResponse(obj, safe=False)

  
@csrf_exempt
@login_required
def follow(request,user_id):    
    data=[]
    # check if this iteam add like from user our not 
    print(user_id)
    try:
        data=Followrs.objects.get(user_id=user_id, userFollow_id=request.user.id)
    except:
        pass
    # if add befor will change status 
    if data :
        if data.followStatus== False:
            data.followStatus= True
            data.save()
            return JsonResponse({"message": "Update folow to true"}, status=200)
        elif data.followStatus == True:
            data.followStatus =False
            data.save()
            return JsonResponse({"message": "Update folow to false"}, status=200)
    
    #  if no addd befor will add  new status 
    else:
           add=Followrs.objects.create(user_id=user_id, userFollow_id=request.user.id, followStatus = True)
         
           add.save()
           return JsonResponse({"message": "done"}, status=200)





def paginate_data(data, page_number, items_per_page):
    """
    Takes a list of data, page number, and items per page, and returns
    a paginated dictionary.
    """
    paginator = Paginator(data, items_per_page)
    page_obj = paginator.get_page(page_number)
    return{
        'has_previous': page_obj.has_previous(),
        'has_next': page_obj.has_next(),
        'data': list(page_obj),
        'total_items': paginator.count,
    }



  
  
def view_post(request):
    """
    Retrieves posts and paginates them based on query parameters.
    # """
    page =request.GET.get('page', 1)
    title =request.GET.get('title', 1)
    data=get_iteams_datile(title,request.user.id)
    paginated_data = paginate_data(data['posts'], page, 10)    
    obj=json.dumps(paginated_data, indent=4, sort_keys=True, default=str)  
    return  JsonResponse(obj, safe=False)
 


def hendelPAth(request, path):
    if path == 'admin':
         return HttpResponseRedirect(reverse("admin"))  
    #  redirect to index for non exist path
    else:
    # pass
         return HttpResponseRedirect(reverse("index"))  

#  log in 
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")

#  log out 
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


# register 
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")



#  add like 
@login_required
def add_like(request,post_id):    

    data=[]
    # check if this iteam add like from user our not 
    try:
        data= Like.objects.get(user=request.user.id, post=post_id)
    except:
        pass
    # if add befor will change status 
    if data :
                if data.likes == True:
                    data.likes =False

                elif data.likes == False:
                   data.likes = True
                   data.unlikes= False
                data.save()
                return JsonResponse({"message": "done"}, status=200)        
    #  if no addd befor will add  new status 
    else:
           add = Like.objects.create(user_id =request.user.id,  post_id = post_id, likes = True, unlikes = False )
           add.save()
           return JsonResponse({"message": "done"}, status=200)
       


#un like 
@login_required
def un_like(request,post_id):  

     # check if this iteam add like from user our not   
    data=[]
    try:
        data= Like.objects.get(user=request.user.id, post=post_id)
    except:
        pass
        # if add befor will change status 
    if data :
                if data.unlikes== False:
                    data.likes =False
                    data.unlikes= True
                elif data.unlikes == True:
                      data.unlikes =False
                data.save()
                return JsonResponse({"message": "done"}, status=200)
      #  if no addd befor will add  new status 
    else:
           add = Like.objects.create(user_id =request.user.id,  post_id = post_id, likes = False, unlikes = True )
           add.save()
           return JsonResponse({"message": "done"}, status=200)


# add comment 
@csrf_exempt
@login_required
def addComment(request):
    #  to cnfiarm request py bost
    if request.method != "POST":
        return JsonResponse({"error": "Not Allow"}, status=400)
   # get form data 
    data = json.loads(request.body)
    newComment=data.get("newComment")
    post_id=data.get("post_id")
    user=data.get("user")
    #  if comment nell  will return erro mesage 
    if not newComment :
        return JsonResponse({  "error": "You should add content to your Comment." }, status=404)
    #  insert comment to comment table
    try:
       add = Coments.objects.create(post_id=post_id , comment=newComment,  user_id=user)
       add.save()
       return JsonResponse({"message": "Your post added successfully."}, status=200)
    # returen error message if not edd 
    except IntegrityError as e:
   
        return JsonResponse({  "error": "Error Comment didn't add" }, status=404)


# add post 
@csrf_exempt
@login_required
def add_post(request):
    #  poust metho to add new posts
    if request.method == "POST":
        # get form data 
       data = json.loads(request.body)
       newPost=data.get("newPost")
    #     error mesage fou null form 
       if not newPost :
           return JsonResponse({    "error": "You should add content to your post."   }, status=400)
    # insert dat to post table
       add = Posts.objects.create(post=newPost,  user_id = request.user.id)
       add.save()
    # return HttpResponseRedirect(reverse("view_post"))
       return JsonResponse({"message": "Your post added successfully."}, status=200)
    #  put method to ubdta post 
    if request.method == "PUT":
        # get form data    
        data = json.loads(request.body)
        updatePost=data.get("updatePost")
        post_id=data.get("post_id")
        #     error mesage fou null form 
        if not updatePost :
           return JsonResponse({    "error": "You should add content to your Post."   }, status=400)
    #     check if this post exits
        try:
            post_data= Posts.objects.get(user_id=request.user.id, pk=post_id)
        except IntegrityError as e:
            return JsonResponse({    "error": "This post Not Allow to edit."   }, status=400)
        # updat post with new data 
        if post_data :
            post_data.post=updatePost
            
            post_data.save()
            return JsonResponse({"message": "Your post Updated successfully."}, status=200)
    # erroe mesage 
    return JsonResponse({"error": "Not Allow."}, status=400)
      