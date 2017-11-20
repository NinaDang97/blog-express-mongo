# blog-app (10/2017)
 
### Description:
A simple blog app where anybody can write down anything that helpful and everyone can view. 
Built in [cloud9](https://c9.io) - a powerful online code editor with a full Ubuntu workspace in the cloud.

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

# Blog Index
* Setup the Blog App
* Create the Blog model
* Add INDEX route and template
* Add Simple Nav Bar

----------------------------------------------
## Basic Layout
* Add Header and Footer Partials
* Include Semantic UI
* Add Simple Nav

---------------------------------------------
## Putting the C in CRUD
* Add NEW route
* Add NEW template
* Add CREATE route
* Add CREATE template

----------------------------------------------
## SHOW
* Add SHOW route
* Add SHOW template
* Add links to show page
* Style show template

-----------------------------------------------
## Edit/Update
* Add EDIT route
* Add EDIT form
* Add UPDATE route
* Add UPDATE form
* Add Method-Override

------------------------------------------------
## DESTROY
* Add Method-Override
* Add EDIT and DESTROY links

-----------------------------------------
## Final Updates
* Sanitize blog body
* Style Index
* Update REST Table

------------------------------------------
## Create comments

---------------------------------------
## Create Authentication 
* register
* login
* logout
* hide/show links if user has logged in or not
* Authenticated author

#### Inspired by Steel Colt - Web Development Bootcamp in Udemy