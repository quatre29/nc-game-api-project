# Northcoders House of Games API - Project Week

## Description of the api

The purpose of the API is to access games data. You would be able to:

- get `reviews` of the games you're interested in
- read `comments` from reviews
- access all `users` data
- add comments to reviews
- delete comments
- create new reviews
- delete reviews
- Vote for `reviews`
- Vote for `comments`

  - you can decrement `votes` on `reviews` and `comments`

---

> More information about all the endpoints and examples of their responses can be found - [HERE](https://nc-games-api-project.herokuapp.com/api/)

---

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

# Installation

You can `Fork` this project to be your own. For installation how to run the tests and seed `database`, follow the next steps

## 1. Clone the project

After you `forked` the project \*_**top right corner on github project page**_ \* navigate to your folder and you can use this command in your terminal to clone the project

```bash
git clone https://github.com/<username>/nc-games-api-project.git
```

## 2. Install dependencies

To be able to use the project you will need to install all dependencies of the project, located in `package.json`
You can use this command to install everything automatically

```bash
npm install
```

## 3. Seed DB

Firstly we need to set up the database, this is the step where we create our two databases, one for `test` and the other for `production`

```bash
npm run setup-dbs
```

## 4. Set up environment variables

In order to have access to different databases for `development` and for `testing` you will need to create two separate files and insert `PGDATABASE` env variable

- `.env.test`

```bash
PGDATABASE=nc_games_test
```

- `.env.development`

```bash
PGDATABASE=nc_games
```
