import request from "supertest"
import app from "../src/app.js"

describe("V2 Tareas Endpoints (JWT)", () => {
  let tokenUsuario

  beforeAll(async () => {
    const email = `v2_user_${Date.now()}@gmail.com`
    await request(app).post("/auth/registro").send({
      nombre: "V2 User",
      email: email,
      password: "Password123!"
    })

    const loginRes = await request(app).post("/auth/login").send({
      email: email,
      password: "Password123!"
    })

    tokenUsuario = loginRes.body.token
  })

  test("GET /v2/tareas - Debe denegar acceso sin Bearer token (401)", async () => {
    const res = await request(app).get("/v2/tareas")
    expect(res.statusCode).toBe(401)
  })

  test("POST /v2/tareas - Debe permitir crear una tarea con Bearer Token", async () => {
    const res = await request(app)
      .post("/v2/tareas")
      .set("Authorization", `Bearer ${tokenUsuario}`)
      .send({
        titulo: "Tarea de prueba automatizada"
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty("id")
  })
})