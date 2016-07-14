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

});
