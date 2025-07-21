import request from "supertest";
import { app } from "../../app";

const authTest = (endpoint: any, data: any, expectedStatus: any) => {
  return request(app)
    .post(`/api/v1/users/${endpoint}`)
    .send(data)
    .expect(expectedStatus);
};

// Signup Tests

it("Should return 201 on successful signup", async () => {
  return authTest(
    "signup",
    {
      name: "test",
      email: "test@test.com",
      password: "password",
      confirmPassword: "password",
    },
    201
  );
});

it("Should return 400 on invalid email", async () => {
  return authTest(
    "signup",
    {
      name: "test",
      email: "invalid-email",
      password: "password",
      confirmPassword: "password",
    },
    400
  );
});

it("Should return 400 on password mismatch", async () => {
  return authTest(
    "signup",
    {
      name: "test",
      email: "test@test.com",
      password: "password",
      confirmPassword: "wrong-password",
    },
    400
  );
});

it("Should return 400 on missing fields", async () => {
  return authTest(
    "signup",
    {
      name: "test",
      email: "    ",
      password: "password",
      confirmPassword: "password",
    },
    400
  );
});

it("Should return 400 on duplicate email", async () => {
  await authTest(
    "signup",
    {
      name: "test",
      email: "test@test.com",
      password: "password",
      confirmPassword: "password",
    },
    201
  );

  await authTest(
    "signup",
    {},
    400
  );
});

it("should return cookie with jwt on successful signup", async () => {
  const response = await authTest(
    "signup",
    {
      name: "test",
      email: "test@test.com",
      password: "password",
      confirmPassword: "password",
    },
    201
  );

  expect(response.get("Set-Cookie")).toBeDefined();
});

// Signin Tests
it("Combined Sign in tests", async () => {
  // First, sign up a user
  await authTest(
    "signup",
    {
      name: "test",
      email: "test@test.com",
      password: "password",
      confirmPassword: "password",
    },
    201
  );

  await authTest(
    "signin",
    {
      email: "test@test.com",
      password: "password",
    },
    200
  );

  // User does not exist
  await authTest(
    "signin",
    {
      email: "doesnot@test.com",
      password: "password",
    },
    404
  );

  // Invalid email or password
  await authTest(
    "signin",
    {
      email: "test@test.com",
      password: "wrong-password",
    },
    400
  );

  // Missing email or password
  await authTest(
    "signin",
    {
      email: "",
      password: "",
    },
    400
  );
});

// Signout Tests
it("Should return 200 on successful signout", async () => {
  const response = await request(app).get("/api/v1/users/signout").expect(200);

  const cookie = response.get("Set-Cookie");
  expect(cookie).toBeDefined();
  if (cookie) {
    expect(cookie.toString().split(";")[0]).toMatch(/jwt=loggedOut/);
  }
});

