# Northcoders House of Games API - Project Week

## Description of the api

The purpose of the API is to access games data. We would be able to:

- get `reviews` of games
- get `comments` from reviews
- get all `users` data
- Vote for `reviews`
- Vote for `comments`

  - you can decrement `votes` on `reviews` and `comments`

**Endpoints of the api**

```http
GET /api
GET /api/categories

GET /api/reviews

GET /api/reviews/:review_id
PATCH /api/reviews/:review_id

GET /api/reviews/:review_id/comments
POST /api/reviews/:review_id/comments

DELETE /api/comments/:comment_id
PATCH /api/comments/:comment_id

GET /api/users
GET /api/users/:username
```

### The app it's hosted on `heroku` - [link](https://nc-games-api-project.herokuapp.com/api/)

# How to use the API

## Installation
