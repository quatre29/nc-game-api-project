const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

//-------------------------------------------------------------

describe("GET /api/users", () => {
  it("200: requesting for all users", async () => {
    const { body } = await request(app).get("/api/users").expect(200);

    body.users.forEach((user) => {
      expect(user).toEqual(
        expect.objectContaining({
          username: expect.any(String),
        })
      );
    });
  });
});

//-------------------------------------------------------------

describe("GET /api/users/:username", () => {
  it("200: get user by username", async () => {
    const { body } = await request(app)
      .get("/api/users/mallionaire")
      .expect(200);

    expect(body.user).toEqual(
      expect.objectContaining({
        username: "mallionaire",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        name: "haz",
      })
    );
  });

  it("404: user not found ", async () => {
    const { body } = await request(app).get("/api/users/quatre29").expect(404);
    expect(body.msg).toBe("Not found!");
    expect(body.user).toBe(undefined);
  });
});

//-------------------------------------------------------------

describe("PATCH /api/users/:username", () => {
  it("200: when updating user", async () => {
    const userInfo = {
      name: "John",
    };

    const { body } = await request(app)
      .patch("/api/users/mallionaire")
      .send(userInfo)
      .expect(200);

    console.log(body, "tests");
  });
});

//-------------------------------------------------------------
