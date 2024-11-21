const request = require('supertest');
const app = require('../server'); 

let server;
let token;

describe('Task API Endpoints', () => {

  
  beforeAll(async () => {
    jest.setTimeout(20000); 
    
   
    server = app.listen(5001); 

    
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'kartikhirapara800@gmail.com',
        password: 'password123',
      });
    token = loginRes.body.token; 
  });


  afterAll(async () => {
    await server.close(); 
  });

  
  it('should create a new task for the user', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Task',
        description: 'Task Description',
        dueDate: '2024-12-31',
      });

    expect(res.status).toBe(201); 
    expect(res.body).toHaveProperty('title', 'New Task');
    expect(res.body).toHaveProperty('description', 'Task Description');
  });


  it('should fetch tasks for the user', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200); 
    expect(res.body).toBeInstanceOf(Array); 
  });

  it('should return 403 if user exceeds task limit (10 tasks)', async () => {
    
    for (let i = 0; i < 10; i++) {
      await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: `Task ${i + 1}`,
          description: 'Task exceeding limit',
          dueDate: '2024-12-31',
        });
    }

    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Exceeding Task',
        description: 'This should not be created',
        dueDate: '2024-12-31',
      });

    expect(res.status).toBe(403); 
    expect(res.body).toHaveProperty('message', 'Task limit reached. You can only create up to 10 tasks.');
  });
});
