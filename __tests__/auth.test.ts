import request from 'supertest';
import app from '../src/app';

describe('Auth API', () => {
   let accessToken: string;
   let refreshToken: string;

  test('login should return tokens with 200 status', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'Admin@123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  test('should return 401 status with a message', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test("logout should invalidate refresh token", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "Admin@123",
      });

    const refreshToken = loginRes.body.refreshToken;

    const res = await request(app)
      .post("/api/auth/logout")
      .send({ refreshToken });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Logged out successfully");
  });

  test("logout with same refresh token again should fail", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "Admin@123",
      });

    const refreshToken = loginRes.body.refreshToken;

    await request(app)
      .post("/api/auth/logout")
      .send({ refreshToken });

    const res = await request(app)
      .post("/api/auth/logout")
      .send({ refreshToken });

    expect(res.status).toBe(400);
  });

  test("refresh token should return new access token", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "Admin@123",
      });

    const refreshToken = loginRes.body.refreshToken;

    const res = await request(app)
      .post("/api/auth/refresh")
      .send({ refreshToken });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
  });

  test("refresh token with invalid token should fail", async () => {
    const res = await request(app)
      .post("/api/auth/refresh")
      .send({ refreshToken: "invalid-token" });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("concurrent logout should only allow one success", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "Admin@123",
      });

    const refreshToken = loginRes.body.refreshToken;

    const results = await Promise.allSettled([
      request(app).post("/api/auth/logout").send({ refreshToken }),
      request(app).post("/api/auth/logout").send({ refreshToken }),
    ]);

    const successCount = results.filter(
      r => r.status === "fulfilled" && (r as any).value.status === 200
    ).length;

    expect(successCount).toBe(1);
  });
});