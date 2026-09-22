import request from "supertest"
import app from "../src/app.js"

describe("Auth Endpoints", () => {
  const emailUnico = `test_${Date.now()}@gmail.com`
  const password = "Password123!"

  test("POST /auth/registro - Debe registrar un nuevo usuario", async () => {
    const res = await request(app)
      .post("/auth/registro")
      .send({
        nombre: "Test User",
        email: emailUnico,
        password: password
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty("id")
  })

  test("POST /auth/login - Debe hacer login y devolver un JWT", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: emailUnico,
        password: password
      })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("token")
  })
})