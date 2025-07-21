import request from "supertest";
import { app } from "../../app";

// Create Ticket Tests
it("Should return 201 on ticket creation", async () => {
  const cookie = await global.signin();
  console.log("Cookie:", cookie);
  const res = await request(app)
    .post("/api/v1/tickets")
    .set("Cookie", cookie)
    .send({
      name: "test ticket",
      price: 100,
      userId: "test",
    })
    .expect(201);
});

it("Should return 400 as not token exists", async () => {
  const res = await request(app)
    .post("/api/v1/tickets")
    .send({
      name: "test ticket",
      price: 100,
      userId: "test",
    })
    .expect(400);
});

it("Should return 404 as no user exists token exists", async () => {
  const res = await request(app)
    .post("/api/v1/tickets").set('Cookie','no user exists')
    .send({
      name: "test ticket",
      price: 100,
      userId: "test",
    })
    .expect(404);
});
