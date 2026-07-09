const request = require("supertest");
const app = require("../src/server");

describe("GET / (static file)", () => {
  it("serves index.html", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
  });
});

describe("GET /api/calculator", () => {
  it("adds two numbers", async () => {
    const res = await request(app).get("/api/calculator?op=add&a=10&b=5");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ operation: "add", a: 10, b: 5, result: 15 });
  });

  it("subtracts two numbers", async () => {
    const res = await request(app).get("/api/calculator?op=subtract&a=10&b=3");
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(7);
  });

  it("multiplies two numbers", async () => {
    const res = await request(app).get("/api/calculator?op=multiply&a=4&b=5");
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(20);
  });

  it("divides two numbers", async () => {
    const res = await request(app).get("/api/calculator?op=divide&a=10&b=2");
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(5);
  });

  it("returns 400 for division by zero", async () => {
    const res = await request(app).get("/api/calculator?op=divide&a=5&b=0");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Division by zero is not allowed");
  });

  it("returns 400 for missing params", async () => {
    const res = await request(app).get("/api/calculator?op=add");
    expect(res.status).toBe(400);
    expect(res.body.error).toContain("Missing");
  });

  it("returns 400 for invalid numbers", async () => {
    const res = await request(app).get("/api/calculator?op=add&a=abc&b=5");
    expect(res.status).toBe(400);
    expect(res.body.error).toContain("valid numbers");
  });

  it("returns 400 for unknown operation", async () => {
    const res = await request(app).get("/api/calculator?op=modulo&a=10&b=3");
    expect(res.status).toBe(400);
    expect(res.body.error).toContain("Unknown operation");
  });
});
