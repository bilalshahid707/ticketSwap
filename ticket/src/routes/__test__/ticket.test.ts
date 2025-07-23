import request from "supertest";
import { app } from "../../app";

// Create Ticket Tests
it("Should return 201 on ticket creation", async () => {
  const cookie = await global.signin();
  const res = await request(app)
    .post("/api/v1/tickets")
    .set("Cookie", cookie)
    .send({
      name: "test ticket",
      price: 100,
    })
    console.log(res)
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

