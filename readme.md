# blog-app (10/2017)
 
## Description:
- A simple blog app where anybody can write down anything helpful and everyone can view. Implemented and UX improved by security authentication and authorization.
- Built in [cloud9](https://c9.io) - a powerful online code editor with a full Ubuntu workspace in the cloud.

### Setup MongoDB
* If built with [cloud 9](https://community.c9.io/t/setting-up-mongodb/1717) 

### NPM Install
```
npm install --save 
```
- express (Server-side Javascript)
- ejs (Embedded Javascript)
- express-sanitizer
- body-parser 
- mongoose (mongoDB for Express version)
- method-override (used for method PUT and DELETE in RESTful ROUTE that form type in cliend-side doesn't support
- passport
- passport-local
- passport-local-mongoose
- express-session

## Simple guideline from scratch

 1. The differences between Authentication and Authorization:
 - Authentication: get people signup/login. In other words, people need to tell app/website who they are.
 - Authorization: Once figure out who user is, grant permission on specific things they are allowed to do.
 
 2. How To Do?
 - Hint: 
   + Verify the id of current user with id of author who creates the post
   + However, id of current user - a string (req.user._id) is different than id of author (foundBlog.author.id) - a mongoose object
   + Instead of using: if(req.user._id === foundBlog.author.id). We use:
   ```
   if(foundBlog.author.id.equals(req.user._id)){
                  ...
          }
   ```

### Blog Index
* Setup the Blog App
* Create the Blog model
* Add INDEX route and template
* Add Simple Nav Bar

### Basic Layout
* Add Header and Footer Partials
* Include Semantic UI
* Add Simple Nav

### Putting the C in CRUD
* Add NEW route
* Add NEW template
* Add CREATE route
* Add CREATE template

### SHOW
* Add SHOW route
* Add SHOW template
* Add links to show page
* Style show template

### Edit/Update
* Add EDIT route
* Add EDIT form
* Add UPDATE route
* Add UPDATE form
* Add Method-Override

### DESTROY
* Add Method-Override
* Add EDIT and DESTROY links

### Optional updated
* Sanitize blog body
* Style Index

### Create comments
* Update/Edit route + form
* Destroy route

### Create Authentication 
* register
* login
* logout
* hide/show links if user has logged in or not
* Authenticated author

### Finalize by adding Authorization
* User can only edit his/her campground
* User can only delete his/her campground
* Hide/Show edit and delete buttons

### Authorization for Post + Comment

### Refactor of Models, Views and Middleware

#### Inspired by Steel Colt - Web Development Bootcamp in Udemy
