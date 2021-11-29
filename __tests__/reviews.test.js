const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

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
  it("400: when review_id is not found", () => {
    const body = { inc_votes: 5 };
    return request(app)
      .patch("/api/reviews/2222")
      .send(body)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request! Review could not be found");
      });
  });
});

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
});
