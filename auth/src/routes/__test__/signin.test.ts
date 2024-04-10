import request from "supertest";
import { app } from "../../app";

it("returns a 400 status code if email is invalid", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "invalid_email",
      password: "password123",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      fullName: "John Doe",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "incorrect_password",
    })
    .expect(400);
});

it("Responds with a cookie when given valid credentials", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
        fullName: "John Doe",
      })
      .expect(201);
  
    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(200);

      expect(response.get("Set-Cookie")).toBeDefined();
  });


// it("returns a 400 status code if password is not provided", async () => {
//     await request(app)
//         .post("/api/users/signin")
//         .send({
//             email: "test@example.com",
//             password: "",
//         })
//         .expect(400);
// });

// it("returns a 400 status code if email and password are not provided", async () => {
//     await request(app)
//         .post("/api/users/signin")
//         .send({})
//         .expect(400);
// });

// it("returns a 400 status code if email and password are incorrect", async () => {
//     await request(app)
//         .post("/api/users/signin")
//         .send({
//             email: "test@example.com",
//             password: "incorrect_password",
//         })
//         .expect(400);
// });


