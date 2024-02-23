from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect,Http404
from django.shortcuts import render ,redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import User
from django.http import JsonResponse
import json
from .models import User,Posts,Like,Coments,Followrs
from .helper import  get_iteams_datile,get_profile_datile

from .forms import  profileForm
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


from django.template import RequestContext







def index(request):
    return render(request, "network/index.html")
  


def view_post(request,title):
    data=get_iteams_datile(request,title)
   
    paginator = Paginator(data, 10)  # Show 10 contacts per page.

    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)
    print(page_obj)
    data_list=json.dumps(page_obj, indent=4, sort_keys=True, default=str)
    obj=json.dumps(data_list, indent=4, sort_keys=True, default=str)
    return HttpResponse( {"page_obj": obj})
    # return render(request, "index.html", {"page_obj": page_obj})
    


# @csrf_exempt
# def view_post(request,title):
#     if title:
   
#         data=get_iteams_datile(request,title)
     
#         p = Paginator(data, 10)
        
#         # data=json.dumps(page, indent=4, sort_keys=True, default=str)
#         data_list=json.dumps(data, indent=4, sort_keys=True, default=str)
#         obj=json.dumps(data_list, indent=4, sort_keys=True, default=str)
#         # # print(data_list)
        
#         # paginator = Paginator(data, 10)
#         # page_number = request.GET.get('page')
#         # page_obj = paginator.get_page(page_number)
#         # return JsonResponse([obj for post in page_obj],safe=False)
#         # return HttpResponse(page)

#     else:
#         raise Http404("No such section")
    



# if path not avilbeal will return to  inde
def hendelPAth(request, path):

      return HttpResponseRedirect(reverse("index"))


@login_required
def add_like(request,post_id):    

    data=[]
    try:
        data= Like.objects.get(user=request.user.id, post=post_id)
    except:
        pass
    if data :
                if data.likes == True:
                    data.likes =False
                elif data.likes == False:
                   data.likes = True
                   data.unlikes= False
                data.save()
                return JsonResponse({"message": "done"}, status=200)
                # return HttpResponse(request.META.get('HTTP_REFERER'))
         
    else:
           add = Like.objects.create(user_id =request.user.id,  post_id = post_id, likes = True, unlikes = False )
           add.save()
           return JsonResponse({"message": "done"}, status=200)
        #    return HttpResponse(request.META.get('HTTP_REFERER'))

@login_required
def un_like(request,post_id):    
    data=[]
    try:
        data= Like.objects.get(user=request.user.id, post=post_id)
    except:
        pass
    if data :
                if data.unlikes== False:
                    data.likes =False
                    data.unlikes= True
                elif data.unlikes == True:
                      data.unlikes =False
                data.save()
                return JsonResponse({"message": "done"}, status=200)
    else:
           add = Like.objects.create(user_id =request.user.id,  post_id = post_id, likes = False, unlikes = True )
           add.save()
           return JsonResponse({"message": "done"}, status=200)



@csrf_exempt
@login_required
def addComment(request):

    if request.method != "POST":
        return JsonResponse({"error": "Not Allow"}, status=400)
        
    data = json.loads(request.body)
    newComment=data.get("newComment")
   
    post_id=data.get("post_id")
    user=data.get("user")
    user=int(user)

    if not newComment :
        return JsonResponse({  "error": "You should add content to your Comment." }, status=404)
    try:
       add = Coments.objects.create(post_id=post_id , comment=newComment,  user_id=user)
       add.save()
       return JsonResponse({"message": "Your post added successfully."}, status=200)
    except IntegrityError as e:
   
        return JsonResponse({  "error": "Error Comment didn't add" }, status=404)
    
@csrf_exempt
def usersProfile(request,user_id):
    
    data=get_profile_datile(request,user_id)
    obj=json.dumps(data, indent=4, sort_keys=True, default=str)
    print('here')
    return  JsonResponse(obj, safe=False)

  
@csrf_exempt
@login_required
def follow(request,user_id):
    
    data=[]
    try:
        data=Followrs.objects.get(user_id=user_id, userFollow_id=request.user.id)
        if data :
                if data.followStatus== False:
                    data.followStatus= True
                elif data.followStatus == True:
                    data.followStatus =False
                data.save()
                return JsonResponse({"message": "done"}, status=200)
        else:
           add=Followrs.objects.create(user_id=user_id, userFollow_id=request.user.id,followStatus=True)
           add.save()
           return JsonResponse({"message": "done"}, status=200)
    except:
        pass
   
       
    return JsonResponse({"error": "can not follow"}, status=404)
    
    

@csrf_exempt
@login_required
def add_post(request):
    if request.method == "POST":
        
       data = json.loads(request.body)
       newPost=data.get("newPost")
       if not newPost :
           return JsonResponse({    "error": "You should add content to your post."   }, status=400)

       add = Posts.objects.create(post=newPost,  user_id = request.user.id)
       add.save()
    # return HttpResponseRedirect(reverse("view_post"))
       return JsonResponse({"message": "Your post added successfully."}, status=200)
    if request.method == "PUT":
        
        data = json.loads(request.body)
        updatePost=data.get("updatePost")
        post_id=data.get("post_id")
        if not updatePost :
           return JsonResponse({    "error": "You should add content to your Post."   }, status=400)
        try:
            post_data= Posts.objects.get(user_id=request.user.id, pk=post_id)
        except IntegrityError as e:

            return JsonResponse({    "error": "This post Not Allow to edit."   }, status=400)

        if post_data :
            post_data.post=updatePost
            
            post_data.save()
            return JsonResponse({"message": "Your post Updated successfully."}, status=200)
  
    return JsonResponse({"error": "Not Allow."}, status=400)
      

@login_required 
def addBio(request):
    if request.method =='Post':
        form= profileForm(request.Post,request.File)
        if form.is_valid():
            form.save()
            return redirect('success_url')
    else :
        form= profileForm()
        return render(request,'network/bio.html',{'form':form})
        




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


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))



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






