import { app } from '../app';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('GET /api/name-list/static', () => {
  it('should return response', () => {
    return chai.request(app).get('/api/name-list/static')
      .then(res => {
        chai.expect(res.text).to.eql(`["Edsger Dijkstra","Donald Knuth","Alan Turing","Grace Hopper"]`);
      });
  });
});
