const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

//-------------------------------------------------------------

describe("GET /api/reviews/:review_id/comments", () => {
  it("200: getting all comments from reviews", async () => {
    const { body } = await request(app)
      .get("/api/reviews/3/comments")
      .expect(200);

    const arr = body.comments.every((com) => com.review_id === 3);
    expect(body.comments).toHaveLength(3);
    expect(arr).toBe(true);
  });

  it("404: if the row cannot be found", async () => {
    const { body } = await request(app)
      .get("/api/reviews/200/comments")
      .expect(404);

    expect(body.msg).toBe("Not found!");
  });

  it("400: if the review id is of a different type", async () => {
    const { body } = await request(app)
      .get("/api/reviews/ss/comments")
      .expect(400);

    expect(body.msg).toBe("Invalid input");
  });
});

//-------------------------------------------------------------

describe("POST /api/reviews/:review_id/comments", () => {
  it("201: when posting a new comment", async () => {
    const commentBody = { username: "bainesface", body: "Nice review!" };

    const { body } = await request(app)
      .post("/api/reviews/4/comments")
      .expect(201)
      .send(commentBody);

    expect(body.comment).toEqual(
      expect.objectContaining({
        // username: expect.any(String),
        // body: expect.any(String),
        author: "bainesface",
        body: "Nice review!",
        review_id: 4,
      })
    );
  });

  it("400: bad request when sending different type of data into the body", async () => {
    const commentBody = ["lasdsad", "asddd"];

    const { body } = await request(app)
      .post("/api/reviews/4/comments")
      .expect(400)
      .send(commentBody);

    expect(body.msg).toBe("Bad request!");
  });

  it("404: not found when review id does not exist", async () => {
    const commentBody = { username: "bainesface", body: "Nice review!" };

    const { body } = await request(app)
      .post("/api/reviews/444/comments")
      .expect(404)
      .send(commentBody);

    expect(body.msg).toBe("Not found!");
  });

  it("404: when an non existent user tries to comment", async () => {
    const commentBody = { username: "quatre29", body: "Nice review!" };

    const { body } = await request(app)
      .post("/api/reviews/4/comments")
      .expect(404)
      .send(commentBody);

    expect(body.msg).toBe("Not found!");
  });
});

//-------------------------------------------------------------

describe("DEL /api/comments/:comment_id", () => {
  it("204: when removing a comment", async () => {
    const { body } = await request(app).delete("/api/comments/3").expect(204);
    console.log(body, "test");
  });

  it("404: when comment id does not exist", async () => {
    const { body } = await request(app).delete("/api/comments/333").expect(404);
    expect(body.msg).toEqual("Not found!");
  });

  it("400: when comment id is the wrong type", async () => {
    const { body } = await request(app).delete("/api/comments/ss").expect(400);
    expect(body.msg).toEqual("Invalid input");
  });
});

//-------------------------------------------------------------

describe("PATCH /api/comments/:comments_id", () => {
  it("201: updates comments votes by increasing number", () => {
    const body = { inc_votes: 5 };
    return request(app)
      .patch("/api/comments/2")
      .send(body)
      .expect(200)
      .then(({ body }) => {
        expect(body.comment).toEqual(
          expect.objectContaining({
            votes: 18,
          })
        );
      });
  });

  it("201: updates comment votes by decrementing number", () => {
    const body = { inc_votes: -100 };
    return request(app)
      .patch("/api/comments/2")
      .send(body)
      .expect(200)
      .then(({ body }) => {
        expect(body.comment).toEqual(
          expect.objectContaining({
            votes: -87,
          })
        );
      });
  });

  it("400: increment with something else than a number", () => {
    const body = { inc_votes: "s" };
    return request(app)
      .patch("/api/comments/s")
      .send(body)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  it("404: when comment_id is not found", () => {
    const body = { inc_votes: 5 };
    return request(app)
      .patch("/api/comments/2222")
      .send(body)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found!");
      });
  });
});

//-------------------------------------------------------------
