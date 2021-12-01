const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

//-------------------------------------------------------------

describe("GET /api/categories", () => {
  it("200: return an array of categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories).toBeInstanceOf(Array);
        body.categories.forEach((cat) => {
          expect(cat).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

//-------------------------------------------------------------

describe("POST /api/categories", () => {
  it("201: when creating a new category", async () => {
    const newCategory = {
      slug: "hardcore",
      description: "No noobs allowed, only pro gamers!",
    };

    const { body } = await request(app)
      .post("/api/categories")
      .expect(201)
      .send(newCategory);

    expect(body.category).toEqual(
      expect.objectContaining({
        slug: "hardcore",
        description: expect.any(String),
      })
    );
  });

  it("400: when creating a new category with the same name as an existing one", async () => {
    const newCategory = {
      slug: "dexterity",
      description: "No noobs allowed, only pro gamers!",
    };

    const { body } = await request(app)
      .post("/api/categories")
      .expect(400)
      .send(newCategory);

    expect(body.msg).toBe(
      "you cannot have duplicate values in unique columns!"
    );
  });
});
