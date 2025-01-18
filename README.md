# Blog and Such API
This is a an API made for my full stack blog website at [Blog and Such](https://blogandsuch.netlify.app/)

An admin website is also available to handle CRUD operations at [Blog and Such Studio](https://blogandsuchstudio.netlify.app/)

Blog and Such Repo: https://github.com/ImmaCheetah/blog-api-frontend

Studio Repo: https://github.com/ImmaCheetah/blog-api-frontend-cms

## Authentication
This API uses JWT for stateless authentication on protected routes and passport local for checking user credentials on login.

## Features

- Login: Secure user login using a username and password with JWT-based authentication
- Token-based Authorization: Use JWT tokens to authorize requests to protected routes 
- Role-Based Access Control: Protect routes based on user roles (e.g., author, user)
- Input validation: Use express validator to validate inputs

## Tools/Languages

[![JS](https://img.shields.io/badge/-JAVASCRIPT-000?style=for-the-badge&logo=javascript&logoColor=F0DB4F)](#)  [![NPM](https://img.shields.io/badge/-npm-000?style=for-the-badge&logo=npm)](#)  [![EXPRESS](https://img.shields.io/badge/-express-000?style=for-the-badge&logo=express)](#) 
[![POSTGRES](https://img.shields.io/badge/postgres-black?style=for-the-badge&logo=postgresql&)](#)
[![PRISMA](https://img.shields.io/badge/prisma-black?style=for-the-badge&logo=prisma&)](#)
[![PASSPORT](https://img.shields.io/badge/passportjs-black?style=for-the-badge&logo=passport&)](#)

## Endpoints
| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/user/login`                             | Retrieve login page                    |
| `GET`   | `/api/user/sign-up`                             | Retrieve sign up page                       |
| `POST`    | `/api/user/sign-up`                          | Create user                      |
| `POST`  | `/api/user/login`                          | Log user in                |
| `POST`   | `/api/user/author/sign-up`                 | Give user permission to author blogs  |
| `GET`   | `/api/posts`                 | Check origin (user or adming) then retrieve all posts  |
| `GET`   | `/api/posts/:postId`                 | Retrieve single post using id  |
| `POST`   | `/api/posts`                 | Create new post |
| `POST`   | `/api/posts/:postId/comments`                 | Create new comment |
| `POST`   | `/api/posts/api-key`                 | Access API key for TinyMCE |
| `PUT`   | `/api/posts/:postId`                 | Update post with new content |
| `PATCH`   | `/api/posts/:postId`                 | Update post published state |
| `DELETE`   | `/api/posts/:postId`                 | Delete selected post |
| `DELETE`   | `/api/posts/:postId/comments/:commentId`                 | Delete selected comment |


## Learning Outcomes

- Create API endpoints that follow RESTful conventions
- Implement JWT authentication
- Using prisma ORM for relational database queries
- Utilize GET, POST, PUT, PATCH, DELETE methods
- Protect selected routes with authentication