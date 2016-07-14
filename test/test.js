'use strict';

const request = require('supertest');
const chai = require('chai');
chai.should();

const app = require('../server');
const agent = request.agent(app);

describe('Counter App', () => {

  describe('GET /api/counters', () => {

    let response;

    beforeEach((setup) => {
      response = null;
      agent.get('/api/counters')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => response = res)
        .end(setup);
    });

    it('should be a json object', ()=>{
      response.body.should.not.be.an.instanceof(Array);
    });

    it('should have at least one counter', ()=>{
      Object.keys(response.body).length.should.be.greaterThan(0);
    });

    it('each value should be an object with a count property', ()=>{
      Object.keys(response.body).every((key) => response.body[ key ].hasOwnProperty('count')).should.be.true;
    });

  });

  describe('GET /api/counters/1', () => {

    let response;

    beforeEach((setup) => {
      response = null;
      agent.get('/api/counters/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => response = res)
        .end(setup);
    });

    it('should be a json object', ()=>{
      response.body.should.not.be.an.instanceof(Array);
    });

    it('should have only one property', ()=>{
      Object.keys(response.body).should.have.length(1);
    });

    it('should only have the "count" property', ()=>{
      response.body.should.have.property('count');
    });

  });

  describe('GET /api/counters/1/increment', () => {

    let currentCount;
    let response;

    beforeEach((setup) => {
      currentCount = null;
      agent.get('/api/counters/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => res.body.hasOwnProperty('count') && ( currentCount = res.body.count ) )
        .end(setup);
    });

    it('should increment the counter count value by one', (done)=>{
      agent.get('/api/counters/1/increment')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => res.body.hasOwnProperty('count') && res.body.count.should.equal( currentCount + 1 ) )
        .end(done);
    });

  });

  describe('GET /api/counters/1/decrement', () => {

    let currentCount;
    let response;

    beforeEach((setup) => {
      currentCount = null;
      agent.get('/api/counters/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => res.body.hasOwnProperty('count') && ( currentCount = res.body.count ) )
        .end(setup);
    });

    it('should decrement the counter count value by one', (done)=>{
      agent.get('/api/counters/1/decrement')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => res.body.hasOwnProperty('count') && res.body.count.should.equal( currentCount - 1 ) )
        .end(done);
    });

  });

  describe('PUT /api/counters/1', (should) => {

    let currentCount;

    beforeEach((setup) => {
      currentCount = null;
      agent.get('/api/counters/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => res.body.hasOwnProperty('count') && ( currentCount = res.body.count ) )
        .end(setup);
    });

    it('should update the value and return the updated counter', (done)=>{

      let payload = {
        count : 99
      };

      agent.put('/api/counters/1')
        .send(payload)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => res.body.hasOwnProperty('count') && res.body.should.deepEqual( payload ) )
        .end(() => {
          agent.get('/api/counters/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(res => res.body.hasOwnProperty('count') && ( res.body.count.should.equal( payload.count ) ) )
            .end(done);
        });
    });
  });

});
