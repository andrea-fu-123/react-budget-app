import app from './index.js'
import request from 'supertest'; 

describe('Express App Tests', () => {
    test('Home page should respond with "Connected to backend" on GET /', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('"Connected to backend"');
    });

    test ('GET /transactions', async () => {
        const getResponse = await request(app).get('/transactions');
        expect(getResponse).toBeDefined();
        expect(getResponse.status).toBe(200)
        
    })
    test ('POST - happy case' , async () => {
        const postResponse = await request(app).post('/transactions').send({
            date: '2010-02-01',
            amount: 62039.38
          })
        expect(postResponse.body.date).toBe('2010-02-01')
        expect(postResponse.body.amount).toBe(62039.38)
      });
  });