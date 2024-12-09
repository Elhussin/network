### Network App

This repository contains the server-side Django application and the client-side JavaScript code for a social network app.

<!-- #### Server Side (Django App) -->

#### Functions:

##### User Management:

1. **User Management User**; registration, login, and logout functionalities (Django: login_view,logout_view register)
2. **User profile management**:(Django: usersProfile, JavaScript: usersProfile)
3. **Following functionality**: (Django: follow, JavaScript: follow)
##### Content Creation and Management:
4. **Post creation**: with text and potentially other media support (JavaScript: add_post)
5. **Post editing and updating functionalities**: (JavaScript: editPost, UpdatePost)
6. **Post viewing with details and comments**: (Django: view_post, JavaScript: get_post)
#####
 Interactions:
7. **Adding comments to posts**:(JavaScript: addComment)
8. **Viewing comments on posts**:(JavaScript: commentView)
9. **Liking and unliking posts** (JavaScript: updtueLike, updtueUnLike)
##### Navigation and Pagination:
10. **Navigation functionalities**: for users to explore profiles and content (JavaScript: getPath)
11. **Pagination**: for managing large amounts of data (Django: paginate_data, JavaScript: generatePagination, PreviousPage, nextPage)
12. **Access to all posts**: (JavaScript: viewAllPost)


#### Technologies
Backend: Django (Python web framework)
Frontend: JavaScript 

### Installation

1. install Python  - https://www.python.org/downloads/
2. pip (package installer) - Usually comes with Python installation


#### How to Use:
1. Clone the repository to your local machine.
   
   ```bash
   git clone <https://github.com/Elhussin/network.git>
   ```

2. Set up the Django server-side application following the README in the `django_app` directory.

3. Bash
```cd network ``` # Navigate to the Django project directory

```pip install -r requirements.txt ``` # Install required Python dependencies

```python manage.py migrate```  # Apply database migrations (if applicable)

4. ``python manage.py runserver``  # Start the Django development server

### Usage

Register for a new account to start using the platform.
Log in to access existing user features.
Create posts to share content with your network.
Edit or update your existing posts.
View profiles of other users and their posts.
Follow other users to stay updated with their activity.
Comment on posts to participate in discussions.
Like or unlike posts to express your interest.
Navigate through the application using provided navigation features.
Explore all posts using the "viewAllPost" functionality.
Contributing
#### Server Side (JavaScript)
#### Functions:

1. **usersProfile**: Retrieve and display user profiles.

2. **follow**: Allow users to follow other users.

3. **paginate_data**: Paginate data to efficiently manage large amounts of content.

4. **view_post**: View and display posts.

5. **login_view**: Handle user login functionality.

6. **logout_view**: Handle user logout functionality.

7. **register**: Handle user registration.

8. **add_like**: Allow users to like posts.

9. **un_like**: Allow users to unlike posts.

10. **addComment**: Allow users to add comments to posts.

11. **add_post**: Allow users to add new posts.

#### Client Side (JavaScript)

##### Functions:

1. **usersProfile**: Display user profiles on the client-side.

2. **sendPost**: Send new posts from the client-side.

3. **editPost**: Edit existing posts.

4. **updatePost**: Update existing posts.

5. **addComment**: Add comments to posts from the client-side.

6. **commentView**: View comments on posts.

7. **updateLike**: Update likes on posts.

8. **updateUnlike**: Update unlikes on posts.

9. **getPath**: Retrieve paths for navigation.

10. **follow**: Handle follow functionality on the client-side.

11. **get_post**: Retrieve posts from the server.

12. **generatePagination**: Generate pagination controls.

13. **previousPage**: Navigate to the previous page of content.

14. **nextPage**: Navigate to the next page of content.

15. **viewAllPost**: View all posts on the client-side.

### License

This project is licensed under the MIT License: https://opensource.org/licenses/MIT.


### Enjoy networking with our app!