#clubhouse

Clubhouse application from The Odin Project.

Created with:
- Express over Node.js
- Pug for view templating
- SASS for CSS preprocessing
- MongoDB (accessed with Mongoose)
- Passport LocalStrategy for user authentication
- bcrypt for password encrypting

Usage:

From the homepage you can click 'See posts as anonymous' to view all posts, but you will not be able to see who wrote them unless you are a member!

At the homepage, click 'Sign Up', enter your information on the form, and submit. You will then be redirected to the login page.

At the login page, log in!

You are not a member yet! You can view all posts as a user, but are still unable to see the author. Click the link on the home page to go to your profile and activate membership. 

Once you have activated your membership, you will be able to see the author of each post when viewing all posts.

On the all posts page, you can click 'View Post' to see only that post. On this page, there is a 'Delete Post' button that is ONLY visible to users who are admins.