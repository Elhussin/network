document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('a').forEach(button => {
    button.onclick = function() {
        const section = this.dataset.section;
        console.log(section)
        history.pushState({section: section}, "", `${section}`);
        get_post(section);
    };
    // get_post('AllPost');
    get_post(getPath());
});

document.querySelector("#posts-form").addEventListener("submit", (event) => {event.preventDefault(); sendPost();});
  var userid =document.querySelector("#userid")
});

window.onpopstate = function(event) {
  get_post(event.state.section);
 
}


function get_post(title) {
  document.querySelector("#userDatiles").style.display='none'
  if (title =="Profile"){
    let username=document.querySelector("#username") 
    username=username.innerHTML
    user=userid.value
    usersProfile(user,username) 
  }else{

  document.querySelector("#page-title").innerHTML =title 
  document.querySelector("title").innerHTML =title ;

 fetch(`/posts/${title}`)
 .then((response) => response.json())
 .then((post) => {
  if( post.error){
    alert=document.querySelector("#alert")
    alert.style.display = "block";
    alert.innerHTML=`<p class="alert alert-warning>${post.error}</p>`
  }
  console.log("aaa",page_obj)
  // let data = JSON.parse(post);
  // console.log("s",post)
  // viewAllPost(data);
 
 })
 .catch((error) => {
  console.log("aaa")
     console.log(error);
 });
  }
}


function sendPost() {
fetch("/addposts", {
        method: "POST",
        body: JSON.stringify({
            newPost: document.querySelector("#newPost").value,
        }),
    })
    .then((response) => response.json())
    .then((result) => {
      if(result.error){
        alert=document.querySelector("#alert")
        alert.style.display = "block";
        alert.innerHTML=`<p class="alert alert-warning">${result.error}</p>`
      
         console.log(result.error)
      }else{
        alert.innerHTML=`<p class="alert alert-success">${result.message}</p>`
        document.querySelector("#newPost").value='';
        // get_post('Network')
        get_post(getPath());
      }
    }).catch((error) => {
      // print error
         console.log(error);
  });
}






function updtueLike(post_id) {
  console.log(post_id)
  fetch(`/like/${post_id}`)
  .then((response) => response.json())
   .then((post) => {

  if( post.message){
    // console.log("d",getPath())
     get_post(getPath());
  }
 })
  .catch((error) => {
   // print error
    console.log(error);
});
}


function getPath(){
  const pathname = window.location.pathname;
 myArray = pathname.split("/");
 if (myArray[1] !=''){
  return myArray[1] 
 }else{
  return 'Network'
 }

}

function updtueUnLike(post_id) {

  fetch(`/unlike/${post_id}`)
  .then((response) => response.json())
   .then((post) => {

  if( post.message){
    get_post(getPath());
  }
 })
  .catch((error) => {
   // print error
    console.log(error);
});
}

// view and close comment box 
function commentView(id){
let comentview=document.querySelector(`#comment${id}`)
console.log(comentview.style.display )
if(comentview.style.display =='none'){
  comentview.style.display = 'block';
}else{
  comentview.style.display = 'none';
}
}


function addComment (post_id){
fetch("/addComment", {
  method: "POST",
  body: JSON.stringify({
      newComment:document.querySelector(`#newComment${post_id}`).value,
      post_id:post_id,
      user:userid.value,

  }),
})
.then((response) => response.json())
.then((result) => {
if(result.error){
  alert=document.querySelector(`#alert2${post_id}`)
  alert.style.display = "block";
  alert.innerHTML=`<p class="alert alert-warning">${result.error}</p>`

   console.log(result.error)
}else{
  alert.innerHTML=`<p class="alert alert-success">${result.message}</p>`
  document.querySelector(`#newComment${post_id}`).value='';
  get_post(getPath());
}
}).catch((error) => {
// print error
   console.log(error);
});

}

function editPost(post_id){
let contnt=document.querySelector(`#postConect${post_id}`)
document.querySelector(`#editBtn${post_id}`).style.display='none'
let vlaue= contnt.innerHTML;
contnt.innerHTML =`
<div>
  <div class="form-group">
    <label for="newPost">   Update Post </label>
    <textarea class="form-control" id="updatePost${post_id}" rows="3">${vlaue.trim()}</textarea>
    <input class="btn btn-primary m-1 " type="submit" id="addPost" onclick="updatepost(${post_id})" value="Update">
  </div>

</div>
`
}
function updatepost(post_id){
console.log(document.querySelector(`#updatePost${post_id}`).value)
fetch("/addposts", {
  method: "PUt",
  body: JSON.stringify({
      updatePost: document.querySelector(`#updatePost${post_id}`).value ,
      post_id:post_id
  }),
})
.then((response) => response.json())
.then((result) => {
if(result.error){
  alert=document.querySelector(`#alert2${post_id}`)
  alert.style.display = "block";
  alert.innerHTML=`<p class="alert alert-warning">${result.error}</p>`

   console.log(result.error)
}else{
  alert.innerHTML=`<p class="alert alert-success">${result.message}</p>`
  document.querySelector("#newPost").value='';
  get_post(getPath());
}
}).catch((error) => {
// print error
   console.log(error);
});
   

}

function usersProfile(user_id, user){
  user=user.toUpperCase()
  let titles=document.querySelector("#page-title") 
  let userDatiles=document.querySelector("#userDatiles")
  userDatiles.innerHTML=''
  document.querySelector("title").innerHTML ='Profile:'+ user;
  titles.innerHTML=user + ' '+ 'Profile'  ;
  userDatiles.style.display='block'
  fetch(`/profile/${user_id}`)
  .then((response) => response.json())
  .then((post) => {
      post=JSON.parse(post)
      if(userid.value == 'no'){
        userDatiles.innerHTML+= 
        ` 
       <span> Log In To start Follow  <a class="nav-link" href="/login">Log In</a>  </span> `
      }
    
      if (userid.value != user_id &userid.value != 'no'){
      if (post.followStatus  ){
        userDatiles.innerHTML+= `<button class="btn btn-warning " id="follow${user_id}"  onclick="folow(${user_id},'${user}')" > Unfolow   </button> `
      }else{
        userDatiles.innerHTML += `<button class="btn btn-info " id="follow${user_id}"  onclick="folow(${user_id},'${user}')" > Folow   </button> `
      }

    }
      userDatiles.innerHTML+=`

      <p>folower : ${post.folowr_count} </p>
      <p> folow : ${post.folow_count} </p>
   
    
      `
   if( post.error){
     alert=document.querySelector("#alert")
     alert.style.display = "block";
     alert.innerHTML=`<p class="alert alert-warning>${post.error}</p>`
   }
  // console.log()
   viewAllPost(post.posts);
  })
  .catch((error) => {
      // print error
      console.log(error);
  });
 
 

}


function folow(user_id,user_name){
  
  
  fetch(`/follow/${user_id}`)
  .then((response) => response.json())
   .then((post) => {

  if( post.error){
      alert=document.querySelector("#alert")
      alert.style.display = "block";
      alert.innerHTML=`<p class="alert alert-warning>${post.error}</p>`
    }
  if( post.message){
    document.querySelector("#newPost_div").style.display='none';
    usersProfile(user_id,user_name)

  }
 })
  .catch((error) => {
   // print error
    console.log(error);
});
  
  
}


//  view all data
function viewAllPost(data) {
let postView =   document.querySelector("#view-post")

postView.innerHTML = "";

// let data = JSON.parse(post);
data.forEach((item) => {

    //  creat new dev

    let element = document.createElement("div");
    element.className="m-2 bg-light text-left"
    //  inner html by 
    element.innerHTML += 
    `
    <div class="w-100  ">

    <p  class=" border-bottom">
     <span class="float-left"> Post py<a class=" btn btn-outline-info"  data-section="Profile"  onclick="usersProfile( ${item.user_id} , '${item.user}' )"> ${item.user} </a></span> 
     <span class="float-right"> ${item.created_at} </span>
     </p>

    <div style="min-height:200px;" >
    <br>
    <div id="postConect${item.post_id}">      ${item.post}</div>
   </div> 
    

    </div>
    `

    if(userid.value  != 'no'){
      if(userid.value ==item.user_id){
        // edit for user how add post only 
        element.innerHTML += `
        <div class="border-bottom bg-light"> 
          <span><button class="btn btn-info float-right" id="editBtn${item.post_id}"  onclick="editPost(${item.post_id})" > Edit   </button>  </span>`
      }
      // comment button 
      element.innerHTML += ` <span><button class="btn "  onclick="commentView(${item.post_id})" > Comment ${item.Totalcomment}   </button>  </span>`
    //  view like
    if(item.postLike.length >0){
    item.postLike.forEach((lik) =>{

    if(userid.value == lik.user & lik.likes == true & lik.unlikes == false  ){
      element.innerHTML += `
      <span><button class="btn btn-info" onclick="updtueLike(${item.post_id})">   <img  style="width:30px "  src="static/network/uploud/like.jpg"/> ${item.like} </button> </span>
      <span><button class="btn" onclick="updtueUnLike(${item.post_id})" >   <img  style="width:30px " src="static/network/uploud/unlik.jpg"/> ${item.unlike}</button>  </span>
      `
       ;
      
      
    }else if(userid.value ==lik.user & lik.unlikes == true  &lik.likes== false){
      element.innerHTML += `
      <span><button class="btn"  onclick="updtueLike(${item.post_id})">   <img  style="width:30px " src="static/network/uploud/like.jpg"/> ${item.like} </button> </span>
      <span><button class="btn btn-info " onclick="updtueUnLike(${item.post_id})">   <img  style="width:30px " src="static/network/uploud/unlik.jpg"/> ${item.unlike}</button>  </span>
      `
    }else if(userid.value ==lik.user & lik.unlikes == false & lik.likes == false   ){
    // }else if(userid.value != lik.user ) {
      element.innerHTML += `
      <span><button class="btn"  onclick="updtueLike(${item.post_id})">   <img  style="width:30px " src="static/network/uploud/like.jpg"/> ${item.like} </button> </span>
      <span><button class="btn " onclick="updtueUnLike(${item.post_id})">   <img  style="width:30px " src="static/network/uploud/unlik.jpg"/> ${item.unlike}</button>  </span>
   `; }else{
    element.innerHTML += `<span><button class="btn" onclick="updtueLike(${item.post_id})">   <img  style="width:30px "  src="static/network/uploud/like.jpg"/> ${item.like} </button> </span>
    <span><button class="btn " onclick="updtueUnLike(${item.post_id})">   <img  style="width:30px " src="static/network/uploud/unlik.jpg"/> ${item.unlike}</button>  </span>`
   }

   
    })
    element.innerHTML+=` </div>`
  }
    else{
      element.innerHTML += `<span><button class="btn"  onclick="updtueLike(${item.post_id})" >   <img  style="width:30px " src="static/network/uploud/like.jpg"/> ${item.like} </button> </span>
      <span><button class="btn " onclick="updtueUnLike(${item.post_id})">   <img  style="width:30px " src="static/network/uploud/unlik.jpg"/> ${item.unlike}</button>  </span>
      </div>`
     
    }

  //  style="display:none;"  
  element.innerHTML+=` <div>
  <div id="alert2${item.post_id}" style="display:none"> </div>
  <div class="form-group ">     
    <textarea class="form-control" id="newComment${item.post_id}"  rows="2"  ></textarea>
    </div>

    <div class="form-group  ">
    <input class="btn btn-primary m-1 " onclick="addComment(${item.post_id})"  type="submit"  value="Comment">
   </div>


   </div>

   `

   let commentdiv=document.createElement('div')
   commentdiv.id==""
   commentdiv.setAttribute("id", `comment${item.post_id}`);
   item.comment.forEach((comm) =>{
  //  console.log(comm)

  commentdiv.innerHTML+= `<div class="m-2 bg-info border-bottom-1">
   

     <p >${comm.user_comment} </p>
     <p id="${comm.comment_id}"> ${comm.comment}    <span class="float-right">${comm.created_at} </span></p>
     </div>`}
   )
   commentdiv.style.display='none';
   element.append(commentdiv)

    }

    else{
      element.innerHTML += ` 
      <div class="border-bottom bg-secondary">  
      to comment and like please
      <a class="nav-link" href="/login">Log In</a>
      </div> `;
    }
 
   
    postView.append(element);
});
}





