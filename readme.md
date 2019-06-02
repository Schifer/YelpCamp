## YelpCamp

# Live on: https://spothunt.herokuapp.com

# Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

# Show Page
* Review RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

 # Refactor Mongoose Code
 * Create a models directory
 * Use module.exports
 * Require everything correctly!

 # Add Seeds File
 * Add a seeds.js file
 * Run the seeds file every time the server starts

 # Add the Comment model!
 * Make errors go away
 * Display comments on campgrounds show page

 # Comments New/Create
 * Discuss nested routes
 * Add the comment new and create routes
 * Add new comment form

 # Style Show Page
 * Add sidebar to showpage
 * Display comments nicely

 # Finish Styling Show Page
 * Add public directory
 * Add custom stylesheet

# Auth pt.1 - Add User Model
* Install All packages needed for auth
* Define User Model

# Auth pt.2 - Register
* Configure Passport
* Add register routes
* Add register template

# Auth pt.3 - Login
* Add login routes
* Add login template

# Auth pt.4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

# Auth pt.5 - Show/Hide links
* Show/Hide auth links in navbar correctly

## Refactor The Routes
* Use Express router to reorganize all routes

## Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

## Users + Campgrounds 
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set problem

# Deleting Campgrounds
* Add Destroy Route
* Add Delete Route

# Authorization
* User can only edit/delete his/her campground
* Hide/show edit and delete buttons
