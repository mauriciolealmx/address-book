import { expect } from 'chai';
import request from 'supertest';
import * as admin from 'firebase-admin';

describe('login route', () => {
  let app;
  beforeEach( () => {
    delete require.cache[require.resolve('../../src/index')];
    app = require('../../src/index');
  });

  afterEach( (done) => {
    app.close(done);
    admin.app().delete();
  });
  it('Should verify account and respond with user', (done) => {
    request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({'email': 'mauriciolealmx1@gmail.com', 'password':'P@ssword'})
      .expect(200)
      .end(function(err, res){
        let { email, token } = res.body;
        expect(email).to.be.equal('mauriciolealmx1@gmail.com');
        expect(!!token).to.be.true;
        if (err) throw err;
        done();
      });
  });  
  it('Should return Not Found, user does not exist in Database', (done) => {
    request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({'email': 'nonExistentUser@gmail.com', 'password':'P@ssword'})
      .expect(404, 'Not Found')
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });  
  it('Should return Not Found, password is incorrect', (done) => {
    request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({'email': 'mauriciolealmx1@gmail.com', 'password':'P@ssw0rd'})
      .expect(404, 'Not Found')
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });
});

