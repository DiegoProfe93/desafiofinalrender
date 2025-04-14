const request = require('supertest');
const app = require('../app');
const path = require('path');

let token = '';

describe('Auth Routes', () => {
  it('Register user', async () => {
    const res = await request(app).post('/api/register').send({
      name: 'Usuario de Prueba',
      email: 'prueba@fugumarket.com',
      password: '1234',
    });
    expect(res.statusCode).toEqual(201);
  });

  it('Login user', async () => {
    const res = await request(app).post('/api/login').send({
      email: 'prueba@fugumarket.com',
      password: '1234',
    });
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('Access profile with token', async () => {
    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Bienvenido/);
  });

  it('Upload file with token', async () => {
    const res = await request(app)
      .post('/api/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', path.join(__dirname, 'archivo-ejemplo.txt'));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('file');
    expect(res.body.message).toBe('Archivo subido exitosamente');
  });
});
