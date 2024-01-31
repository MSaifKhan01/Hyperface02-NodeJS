
**Hyperface02-NodeJS**

This repository contains a Node.js application called Hyperface02, which serves as a backend system for managing courses, articles, tweets, and user registrations.


### Deployment
The application is deployed on Render and can be accessed at [https://hyperface-02.onrender.com](https://hyperface-02.onrender.com).


### Main Features
- User registration and login with JWT authentication
- Managing base items (title, duration, link)
- Managing courses
- Managing articles
- Managing tweets
- Middleware for authentication and authorization


### Technologies Used
- Amazon S3 for storing videos
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Bcrypt for password hashing
- CORS for enabling cross-origin resource sharing






### Getting Started
1. Clone the repository:
   ```
   git clone https://github.com/MSaifKhan01/Hyperface02-NodeJS.git
   ```
2. Navigate to the project directory:
   ```
   cd Hyperface02-NodeJS
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=5038
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   S3bucketName=<your_s3_bucket_name>
   S3SecretAccesKey=<your_s3_key>
   S3AccessKeyId=<your_s3_Id>
   ```
5. Start the server:
   ```
   npm run server
   ```
6. Access the API endpoints using a tool like Postman or a web browser.


### API Endpoints
- POST /User/register: Register a new user.
- POST /User/login: Login an existing user.
- GET /BaseItems: Get all base items.
- GET /BaseItems/:id: Get a specific base item by ID.
- POST /BaseItems: Create a new base item.
- PATCH /BaseItems/:id: Update a base item.
- DELETE /BaseItems/:id: Delete a base item.
- GET /course: Get all courses.
- GET /course/:id: Get a specific course by ID.
- POST /course: Create a new course.
- PATCH /course/:id: Update a course.
- DELETE /course/:id: Delete a course.
- GET /Article: Get all articles.
- GET /Article/:id: Get a specific article by ID.
- POST /Article: Create a new article.
- PATCH /Article/:id: Update an article.
- DELETE /Article/:id: Delete an article.
- GET /tweet: Get all tweets.
- GET /tweet/:id: Get a specific tweet by ID.
- POST /tweet: Create a new tweet.
- PATCH /tweet/:id: Update a tweet.
- DELETE /tweet/:id: Delete a tweet.


### Middlewares
- auth.js: Middleware for JWT authentication.
- Role.js: Middleware for role-based authorization.


