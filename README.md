# Network App

This repository contains the server-side Django application and the client-side JavaScript code for a social network app.

## Server Side (Django App)

### Functions:

#### User Management:

- **User Registration, Login, and Logout**: 
  - Django: `login_view`, `logout_view`, `register`
- **User Profile Management**: 
  - Django: `usersProfile`, JavaScript: `usersProfile`
- **Follow Functionality**: 
  - Django: `follow`, JavaScript: `follow`

#### Content Creation and Management:

- **Post Creation**: Create posts with text and potentially other media support. 
  - JavaScript: `add_post`
- **Post Editing and Updating**: 
  - JavaScript: `editPost`, `UpdatePost`
- **Post Viewing with Details and Comments**: 
  - Django: `view_post`, JavaScript: `get_post`

#### Interactions:

- **Adding Comments to Posts**: 
  - JavaScript: `addComment`
- **Viewing Comments on Posts**: 
  - JavaScript: `commentView`
- **Liking and Unliking Posts**: 
  - JavaScript: `updateLike`, `updateUnLike`

#### Navigation and Pagination:

- **Navigation Functionality**: Users can explore profiles and content.
  - JavaScript: `getPath`
- **Pagination**: For managing large amounts of data.
  - Django: `paginate_data`, JavaScript: `generatePagination`, `PreviousPage`, `nextPage`
- **Access to All Posts**: 
  - JavaScript: `viewAllPost`

## Technologies:

- **Backend**: Django (Python web framework)
- **Frontend**: JavaScript

## Installation

1. Install Python - [Download Python](https://www.python.org/downloads/)
2. Install `pip` (Python package installer) - usually comes with Python installation.

### How to Use:

1. Clone the repository to your local machine.

   ```bash
   git clone <https://github.com/Elhussin/network.git>

2. Set up the Django server-side application following the README in the django_app directory.

```bash
cd network  # Navigate to the Django project directory
pip install -r requirements.txt  # Install required Python dependencies
python manage.py migrate  # Apply database migrations (if applicable)
```
Start the Django development server:

bash
Start the Django development server:

```bash
python manage.py runserver

```

### Usage:
- **Register** for a new account to start using the platform.
- **Log in** to access existing user features.
- **Create posts** to share content with your network.
- **Edit** or update your existing posts.
- **View** profiles of other users and their posts.
- **Follow** other users to stay updated with their activity.
- **Comment** on posts to participate in discussions.
- **Like** or unlike posts to express your interest.
- **Navigate** through the application using the provided navigation features.
- **Explore** all posts using the viewAllPost functionality.

### Contributing
If you would like to contribute to this project, feel free to fork the repository and submit pull requests.

Server Side (Django)
1. Functions:
2. usersProfile: Retrieve and display user profiles.
3. follow: Allow users to follow other users.
4. paginate_data: Paginate data to efficiently manage large amounts of content.
5. view_post: View and display posts.
6. login_view: Handle user login functionality.
7. logout_view: Handle user logout functionality.
8. register: Handle user registration.
9. add_like: Allow users to like posts.
10. un_like: Allow users to unlike posts.
11. addComment: Allow users to add comments to posts.
12. add_post: Allow users to add new posts.

### Client Side (JavaScript)

#### Functions:
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


## License

This project is open-source and available under the [MIT License](LICENSE).

---
