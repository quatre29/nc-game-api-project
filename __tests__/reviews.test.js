const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

//-------------------------------------------------------------

describe("GET /api/reviews/:review_id", () => {
  it("200: return the review object by Id", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual(
          expect.objectContaining({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          })
        );
      });
  });

  it("400: when id is invalid", () => {
    return request(app).get("/api/reviews/s2").expect(400);
  });
});

//-------------------------------------------------------------

describe("PATCH /api/reviews/:review_id", () => {
  it("201: updates reviews votes by increasing number", () => {
    const body = { inc_votes: 5 };
    return request(app)
      .patch("/api/reviews/3")
      .send(body)
      .expect(201)
      .then(({ body }) => {
        expect(body.review).toEqual(
          expect.objectContaining({
            votes: 10,
          })
        );
      });
  });

  it("201: updates review votes by decrementing number", () => {
    const body = { inc_votes: -100 };
    return request(app)
      .patch("/api/reviews/3")
      .send(body)
      .expect(201)
      .then(({ body }) => {
        expect(body.review).toEqual(
          expect.objectContaining({
            votes: -95,
          })
        );
      });
  });

  it("400: increment with something else than a number", () => {
    const body = { inc_votes: "s" };
    return request(app)
      .patch("/api/reviews/3")
      .send(body)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  it("404: when review_id is not found", () => {
    const body = { inc_votes: 5 };
    return request(app)
      .patch("/api/reviews/2222")
      .send(body)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found!");
      });
  });
});

//-------------------------------------------------------------

describe("GET /api/reviews", () => {
  it("200: get all the reviews", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        body.reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              review_body: expect.any(String),
              designer: expect.any(String),
              review_img_url: expect.any(String),
              category: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String),
            })
          );
        });
      });
  });

  it("200: get all the reviews sorted by votes descending", () => {
    return request(app)
      .get("/api/reviews?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        const arr = body.reviews.map((rev) => rev.votes);

        expect(arr).toBeSorted({ descending: true });
      });
  });

  it("200: get all the reviews sorted by votes ascending", async () => {
    const { body } = await request(app)
      .get("/api/reviews?sort_by=votes&order=ascending")
      .expect(200);

    const arr = body.reviews.map((rev) => rev.votes);
    expect(arr).toBeSorted();
  });

  it("200: get all the reviews filtered by category", async () => {
    const { body } = await request(app)
      .get("/api/reviews?category=dexterity")
      .expect(200);

    const arr = body.reviews.every((rev) => rev.category === "dexterity");
    expect(arr).toBe(true);
  });

  it("400: when requesting with query that doesn't exist", async () => {
    const { body } = await request(app)
      .get("/api/reviews?sort_by=lol")
      .expect(400);

    expect(body.msg).toBe("Bad request!");
  });

  it("404: when requesting with category that doesn't exist", async () => {
    const { body } = await request(app)
      .get("/api/reviews?category=lol")
      .expect(404);

    expect(body.msg).toBe("Not found!");
  });
});

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
