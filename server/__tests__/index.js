const app = require('../server');
const request = require('supertest'); //(app);
const expect = require('chai').expect;
const Todos = require('../models/ToDos');
const User = require('../models/User');

const server = 'http://localhost:5001';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });
});
