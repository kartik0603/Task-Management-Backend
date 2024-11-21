const request = require('supertest');
const app = require('./server.js');  

const loginUser = async (email, password) => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email, password });

  return res.body.token;  
};

module.exports = { loginUser };
