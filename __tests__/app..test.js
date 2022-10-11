const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/*connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.DATABASE_URL);
});

/*closing the connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

//CREATE-POST
describe("POST /components", () => {
  it("should create a new component", async () => {
    const res = await request(app).post("/api/components").send({
      component: "swallow-tail drawer back",
      stockLevel: 24,
      triggerPoint: 12,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.component).toBe("swallow-tail drawer back");
    expect(res.body).hasOwnProperty(id);
  });
});

//READ-GET
describe("GET /components", () => {
  it("should return all components", async () => {
    const res = await request(app).get("/api/components");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[1]).toBeInstanceOf(Object);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
describe("GET /components/:id", () => {
  it("should return a component with the matching id number", async () => {
    const res = await request(app).get("/api/components/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe({
      id: 1,
      component: "to be decided", //make this dynamic
      stockLevel: 42, //make this dynamic
      triggerPoint: 21, //make this dynamic
    });
  });
});

//UPDATE-PATCH
describe("PATCH /components/:id", () => {
  it("should update a product", async () => {
    const res = await request(app)
      .patch("/api/components/2")
      .send({
        component: "dove-tailed joint drawer back",
        stockLevel: 24,
        triggerPoint: 12,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.component).toBe("dove-tailed joint drawer back");
    expect(res.body.id).toBe(2);
  });
});
//DELETE-DELETE
describe("DELETE /api/components/:id", () => {
  it("should delete a product", async () => {
    const res = await request(app).delete("/api/components/2");
    expect(res.statusCode).toBe(200);
  });
});
