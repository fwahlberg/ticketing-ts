import request from "supertest";
import { app } from "../../app";

describe("POST /api/users/signup", () => {
  // it("returns a 400 status code if name is not provided", async () => {
  //     await request(app)
  //         .post("/api/users/signup")
  //         .send({
  //             email: "test@example.com",
  //             password: "password123",
  //         })
  //         .expect(400);
  // });

  // it("returns a 400 status code if email is not valid", async () => {
  //     await request(app)
  //         .post("/api/users/signup")
  //         .send({
  //             fullName: "John Doe",
  //             email: "invalidemail",
  //             password: "password123",
  //         })
  //         .expect(400);
  // });

  // it("returns a 400 status code if password is not between 4 and 20 characters", async () => {
  //     await request(app)
  //         .post("/api/users/signup")
  //         .send({
  //             fullName: "John Doe",
  //             email: "test@example.com",
  //             password: "pass",
  //         })
  //         .expect(400);
  // });

  it("Returns a 201 on succesful signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        fullName: "John Doe",
        email: "test@example.com",
        password: "password123",
      })
      .expect(201);

    //expect(response.body.token).toBeDefined();
  });

  it("Returns a 400 with an invalid email", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        fullName: "John Doe",
        email: "invalidemail",
        password: "password123",
      })
      .expect(400);
  });

  it("Returns a 400 with an invalid password", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        fullName: "John Doe",
        email: "test@test.com",
        password: "pas",
      })
      .expect(400);
  });

  it("Returns a 400 with missing email and password", async () => {
    return request(app).post("/api/users/signup").send({}).expect(400);
  });

  it("Disallows duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        fullName: "John Doe",
        email: "test1@test.com",
        password: "password123",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signup")
      .send({
        fullName: "John Doe",
        email: "test1@test.com",
        password: "password123",
      })
      .expect(400);
  });

  it("Sets a cookie after successful signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        fullName: "John Doe",
        email: "test2@test.com",
        password: "password123",
      })
      .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
