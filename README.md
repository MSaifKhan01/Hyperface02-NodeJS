
**Hyperface02-NodeJS**

This repository contains a Node.js application called Hyperface02, which serves as a backend system for managing courses, articles, tweets, and user registrations.


### Deployment
The application is deployed on Render and can be accessed at [https://hyperface-02.onrender.com](https://hyperface-02.onrender.com).


### Main Features
- User registration and login with JWT authentication
- Managing base items (title, duration, link) #Note for the link i am using Amazon S3 for storing videos 
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

### Middlewares
- auth.js: Middleware for JWT authentication.
- Role.js: Middleware for role-based authorization.




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

#### Managing Users

##### Endpoints:
- **POST /User/register:** 
  - Description: Register a new user.
    - Attributes:
      - Name
      - Email
      - Mobile Number
      - Password
      - Age

- **POST /User/login:** 
  - Description: Login an existing user.
    - Attributes:
      - Email
      - Password

####  Managing Base Items

##### Attributes:
- **Title:** The title of the base item.
- **Duration:** The duration of the base item.
- **Link:** A reference link, typically pointing to a video stored on Amazon S3.

##### Endpoints:
- **GET /BaseItems:** 
  - Description: Retrieve all base items.
- **GET /BaseItems/:id:** 
  - Description: Retrieve a specific base item by ID.
- **POST /BaseItems:** 
  - Description: Create a new base item.
- **PATCH /BaseItems/:id:** 
  - Description: Update a base item.
- **DELETE /BaseItems/:id:** 
  - Description: Delete a base item.



#### Managing Courses

##### Attributes:
- **Base Item:** Reference to the base item associated with the course.
- **Chapters:** Number of chapters in the course.

##### Endpoints:
- **GET /courses:** 
  - Description: Retrieve all courses.
- **GET /courses/:id:** 
  - Description: Retrieve a specific course by ID.
- **POST /courses:** 
  - Description: Create a new course.
- **PATCH /courses/:id:** 
  - Description: Update a course.
- **DELETE /courses/:id:** 
  - Description: Delete a course.




#### Managing Articles

##### Attributes:
- **Base Item:** Reference to the base item associated with the article.
- **Chapters:** Number of chapters in the article.

##### Endpoints:
- **GET /articles:** 
  - Description: Retrieve all articles.
- **GET /articles/:id:** 
  - Description: Retrieve a specific article by ID.
- **POST /articles:** 
  - Description: Create a new article.
- **PATCH /articles/:id:** 
  - Description: Update an article.
- **DELETE /articles/:id:** 
  - Description: Delete an article.
#### Managing Tweets

##### Attributes:
- **Base Item:** Reference to the base item associated with the tweet.
- **Author:** Reference to the user who authored the tweet.

##### Endpoints:
- **GET /tweets:** 
  - Description: Retrieve all tweets.
- **GET /tweets/:id:** 
  - Description: Retrieve a specific tweet by ID.
- **POST /tweets:** 
  - Description: Create a new tweet.
- **PATCH /tweets/:id:** 
  - Description: Update a tweet.
- **DELETE /tweets/:id:** 
  - Description: Delete a tweet.






