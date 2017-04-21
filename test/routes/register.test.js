import { expect } from 'chai';
import request from 'supertest';
import * as admin from 'firebase-admin';

describe('register route', () => {
  let app;
  beforeEach( () => {
    delete require.cache[require.resolve('../../src/index')];
    app = require('../../src/index');
  });

  afterEach( (done) => {
    app.close(done);
    admin.app().delete();
  });
  // TODO: Test cannot be running and adding new users to DB.
  it.skip('Should create new user and return a jwt Token', (done) => {
    request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({'email': 'mauriciolealmx7@gmail.com', 'password':'P@ssword'})
      .expect(201)
      .end(function(err, res){
        let { email, token } = res.body;
        if (err) throw err;
        done();
      });
  });  
  it('Should return "Bad Request", password is missing', (done) => {
    request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({'email': 'mauriciolealmx1@gmail.com'})
      .expect(400, 'Bad Request, password is missing')
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });
  it('Should return "Bad Request", email is missing', (done) => {
    request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({'password':'P@ssword'})
      .expect(400, 'Bad Request, email is missing')
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  }); 
  it('Should return "Bad Request", email is not valid', (done) => {
    request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({'email': 'mauriciolealmx6@%gmail.com', 'password':'P@ssword'})
      .expect(400, 'Bad Request, email is not valid')
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });    
  it('Should return "Bad Request", password is not valid', (done) => {
    request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({'email': 'mauriciolealmx6@gmail.com', 'password':'P@ssw'})
      .expect(400, 'Bad Request, password is not valid')
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });  
});

