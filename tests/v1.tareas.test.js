import request from "supertest"
import app from "../src/app.js"

describe("V1 Tareas Endpoints (API Key)", () => {
  const apiKey = process.env.API_KEY

  test("GET /v1/tareas - Debe devolver 401 si no se envía API Key", async () => {
    const res = await request(app).get("/v1/tareas")
    expect(res.statusCode).toBe(401)
  })

  test("GET /v1/tareas - Debe listar tareas si se envía x-api-key correcta", async () => {
    const res = await request(app)
      .get("/v1/tareas")
      .set("x-api-key", apiKey)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})