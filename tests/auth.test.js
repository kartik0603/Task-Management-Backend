const request = require('supertest');
const app = require('../server'); 

describe('Auth API Endpoints', () => {


  it('should register a new user and return a JWT', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Kartik Hirapara',
        email: 'kartikhirapara800@gmail.com',
        password: 'password123',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token'); 
  });

  
  it('should log in an existing user and return a JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'kartikhirapara800@gmail.com',
        password: 'password123',
      });

    expect(res.status).toBe(200); 
    expect(res.body).toHaveProperty('token'); 
  });

 
  it('should return 401 for invalid login credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'kartikhirapara800@gmail.com',
        password: 'wrongpassword',
      });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });

  
  it('should send a password reset email', async () => {
    const res = await request(app)
      .post('/api/auth/reset-password')
      .send({
        email: 'kartikhirapara800@gmail.com',
      });

    expect(res.status).toBe(200); 
    expect(res.body).toHaveProperty('message', 'Password reset email sent');
  });
});
