//  java scrio lloadesd file
//  to get the active page number 
var pagNum=1;
//  to count how many pag in dat prview
var pagecount=0
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('a').forEach(button => {
    button.onclick = function() {
        const section = this.dataset.section;
        // update page header 
        history.pushState({section: section}, "", `${section}`);
        if(section == 'AllPost' ){
           addPost=document.querySelector('#newPost_div').style.display='block'
        }
        get_post(section,pagNum);
    };
    

    get_post(getPath(),pagNum);
 
});
// hend sen post 
document.querySelector("#posts-form").addEventListener("submit", (event) => {event.preventDefault(); sendPost();});
  var userid =document.querySelector("#userid")
});
//

window.onpopstate = function(event) {
  get_post(event.state.section,pagNum);
 
}





function usersProfile(user_id, user,pagNu){
  pagNum=pagNu
//  user profile view
// update user to upper case
  user=user.toUpperCase()
  // history.pushState('json', "", Profile);
  history.replaceState(user, "",'Profile');
  let titles=document.querySelector("#page-title") 
  let userDatiles=document.querySelector("#userDatiles")
  userDatiles.innerHTML=''
  document.querySelector("title").innerHTML ='Profile:'+ user;
  titles.innerHTML=user + ' '+ 'Profile'  ;
  userDatiles.style.display='block'

  fetch(`/profile/?page=`+pagNum+`&brofileId=`+user_id)
  .then((response) => response.json())
  .then((post) => {
      post=JSON.parse(post)
      // console.log(post)
      if(userid.value == 'no'){
        userDatiles.innerHTML+=    `   Log In To start Follow  <a class="nav-link" href="/login">Log In</a>  `
      }
      if (userid.value != user_id & userid.value != 'no'){

        console.log(post.followStatus)
      if (post.followStatus == true){
   
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
  console.log(post,post.followStatus)

   viewAllPost(post.data,1);

  //  viewAllPost(post);
 
  })
  .catch((error) => {
      // print error
      console.log(error);
  });
 
 

}




// three functon to add post our updet and send post to serever after update 

  // send post    for server 
function sendPost() {
  // fetch new post to server 
fetch("/addposts", {
        method: "POST",
        body: JSON.stringify({
            newPost: document.querySelector("#newPost").value,
        }),
    })
    // jet response
    .then((response) => response.json())
    .then((result) => {
      // view error message 
      if(result.error){
        alert=document.querySelector("#alert")
        alert.style.display = "block";
        alert.innerHTML=`<p class="alert alert-warning">${result.error}</p>`
      }else{
        // print  netfiction message 
        alert.innerHTML=`<p class="alert alert-success">${result.message}</p>`
        document.querySelector("#newPost").value='';
      //  updtau page fou creent title 
        get_post(getPath(),pagNum);
      }
      // print error response 
    }).catch((error) => {
      // print error
         console.log(error);
  });
}


   // edit post 
function editPost(post_id){
  //  get post select py post id 
let contnt=document.querySelector(`#postConect${post_id}`)
// close edit btn display 
document.querySelector(`#editBtn${post_id}`).style.display='none'
// get post contant 
let vlaue= contnt.innerHTML;
// print post in text area to edit at 
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


  // get post after edit contant then fetch to server
function updatepost(post_id){
// fetch post after update 
  fetch("/addposts", {
    method: "PUt",
    body: JSON.stringify({
        updatePost: document.querySelector(`#updatePost${post_id}`).value ,
        post_id:post_id
    }),
  })
  .then((response) => response.json())
  .then((result) => {
    // error response
  if(result.error){
    alert=document.querySelector(`#alert2${post_id}`)
    alert.style.display = "block";
    alert.innerHTML=`<p class="alert alert-warning">${result.error}</p>`
  }else{
    // messag after success update 
    alert.innerHTML=`<p class="alert alert-success">${result.message}</p>`
    document.querySelector("#newPost").value='';
    // re updat page with active header
    get_post(getPath(),pagNum);
  }
  }).catch((error) => {
  // print error
     console.log(error);
  });
     
  
  }

// end for posts functon 


// tow function to add new comment our viw comment for selected post  ,  commentView, addComment
   //  add new comment for post 
  function addComment (post_id){
    // get dat frpm comment form 
    fetch("/addComment", {
      method: "POST",
      body: JSON.stringify({
          newComment:document.querySelector(`#newComment${post_id}`).value,
          post_id:post_id,
          user:userid.value,

      }),
    })
    // get response 
    .then((response) => response.json())
    .then((result) => {
    if(result.error){
      // alert error message
      alert=document.querySelector(`#alert2${post_id}`)
      alert.style.display = "block";
      alert.innerHTML=`<p class="alert alert-warning">${result.error}</p>`

    }else{
      // aler success message 
      alert.innerHTML=`<p class="alert alert-success">${result.message}</p>`
      document.querySelector(`#newComment${post_id}`).value='';
      // refresh page contant 
      get_post(getPath(),pagNum);
    }
    }).catch((error) => {
    
       console.log(error);
    });
    
    }

   // view and close comment for posts
function commentView(post_id){
  // get  post id 
  let comentview=document.querySelector(`#comment${post_id}`)
  if(comentview.style.display =='none'){
    comentview.style.display = 'block';
  }else{
    comentview.style.display = 'none';
  }
  }
  // end tow function to comment 


// tow function to add lik and un like to posts

  //  add like foe selectd post 
function updtueLike(post_id) {
  //  fetch post id 
  fetch(`/like/${post_id}`)
  .then((response) => response.json())
   .then((post) => {
// refrech conent if get sucussec response
  if( post.message){
// refrech conent 
     get_post(getPath(),pagNum);
  }
 })
  .catch((error) => {
   // print error
    console.log(error);
});
}
   // add unlike post 
function updtueUnLike(post_id) {
 //  fetch post id 
  fetch(`/unlike/${post_id}`)
  .then((response) => response.json())
   .then((post) => {
// refrech conent if get sucussec response
  if( post.message){
    // refrech page content 
    get_post(getPath(),pagNum);
  }
 })
  .catch((error) => {
   // print error
    console.log(error);
});
}
// end like function 


// get curren path then render it to re uploud pag for same conent   getPath
function getPath(){
  const pathname = window.location.pathname;
 myArray = pathname.split("/");
 if (myArray[1] !=''){
  return myArray[1] 
 }else{
  return 'Network'
 }

}

// foloww function to update y=user foloower
function folow(user_id,user_name){
  // fetch dat to updat or add foloow
    fetch(`/follow/${user_id}`)
    .then((response) => response.json())
     .then((post) => {
      
  // get respom=nse if error
      // update page 
    if( post.message){
      usersProfile(user_id,user_name,pagNum)
    }
   })
    .catch((error) => {
     // print error
      console.log(error);
  });
    
    
  }

//   // // get post from server  then send it to view function ou  user profile function 
function get_post(title,page) {
  // updat pag number value 
  pagNum=page
  // close user datiles from show 
  // get profile four userlogin 
  if (title =="Profile"){
  //  get user name for use he is login session 
    let username=document.querySelector("#username").innerHTML
    //  get user id for login session 
  
    // get dat for user profile  functian will tow argment
    usersProfile(userid.value,username,page) 
  }if(title =="addBio"){
     userPio(userid.value)
  }
  
  else{
// set titile for active section
  document.querySelector("#page-title").innerHTML =title 
  // set page title
  document.querySelector("title").innerHTML =title 
  fetch('/viewPost/?page='+page+'&title='+title)
 .then((response) => response.json())
 .then((post) => {

  post=JSON.parse(post)
    viewAllPost(post.data);
    generatePagination(post)
    
 })
//  print error if hapend 
 .catch((error) => {
     console.log("err",error);
 });
  }
}


function generatePagination(post) {
  const curentpath =getPath();


   pagecount=Math.ceil(post.total_items/10);

  
  let  current_path =getPath()
    let paginationHTML = '';
    if(post.has_previous){
      paginationHTML+=
    `<button    class="page-item page-link" onclick="PreviousPage(${post.data[0].user_id },'${post.data[0].user}')">Previous</button>`
    }
    // console.log(post.data[0].user_id ,post.data[0].user )
    for (let i=1; i <pagecount+1; i++){

      if(pagNum == i ){
      
        if(curentpath== 'Profile'){
          paginationHTML+=`
          <button class="btn-info" onclick="usersProfile(${post.data[0].user_id },'${post.data[0].user}',${i})" >${i}</button> `
          }
          else{
          paginationHTML+=`
          <button class=" btn-info" onclick="get_post('${current_path}',${i})" >${i}</button> `
          }
        
      }else{
        
      if(curentpath== 'Profile'){
        paginationHTML+=`
        <button class="btn-light" onclick="usersProfile(${post.data[0].user_id },'${post.data[0].user}',${i})" >${i}</button> `
        }
        else{
        paginationHTML+=`
        <button class=" btn-light" onclick="get_post('${current_path}',${i})" >${i}</button> `
        }
      }
    }
    if(post.has_next){
      paginationHTML+=
      `<button  class="page-item page-link"  onclick="nextPage(${post.data[0].user_id },'${post.data[0].user}')">Next</button>`
      }
      document.getElementById('pagination-container').innerHTML=paginationHTML;
    

}

//  to get previous page 
function PreviousPage(userid,userName){
  const pathpag=getPath()
  if(pagNum>1){
    pagNum--;
  }
  if (pathpag =='Profile')
  {
    usersProfile(userid,userName,pagNum)
  }else{
    get_post(pathpag,pagNum)
  }
 

}
// to get next page 
function nextPage(userid,userName){
  const pathpag=getPath()
  if(pagNum<pagecount){
    pagNum++;
  }
  if (pathpag =='Profile')
  {
    usersProfile(userid,userName,pagNum)
  }else{
    get_post(pathpag,pagNum)
  }
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
       <span class="float-left"> Post py<a class=" btn btn-outline-info"  data-section="Profile"  onclick="usersProfile( ${item.user_id} , '${item.user}','${pagNum}' )"> ${item.user} </a></span> 
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
  