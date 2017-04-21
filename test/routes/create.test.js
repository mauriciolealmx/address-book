import { expect } from 'chai';
import request from 'supertest';
import * as admin from 'firebase-admin';

let getValidJWTToken = () => {
  // TODO: Do create a Token.
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdXJpY2lvbGVhbG14MUBnbWFpbC5jb20iLCJlbmNyeXB0ZWRQYXNzIjoiNjUzOWZmODliMmIxYjhmOTMyMDViNzc1MzJhMjQ0MTAiLCJpYXQiOjE0OTI4MDY3ODYsImV4cCI6MTQ5Mjg5MzE4Nn0.0sF244AZA30qsv21LKCiGjTMo66S6ElC58j3bphcBMk';
}

describe('users :userId contacts route', () => {
  let app;
  beforeEach( () => {
    delete require.cache[require.resolve('../../src/index')];
    app = require('../../src/index');
  });

  afterEach( (done) => {
    app.close(done);
    admin.app().delete();
  });
  // Test breaks when running with the suit. Takes too long.
  it.skip('Should create new contact for existing user; Token, userId and contact are present', (done) => {
    let userId = 'mauriciolealmx1';
    let Token = getValidJWTToken();
    let contact = {
      'firstName':'Some',
      'lastName': 'Contact',
      'email': 'SomeContact@mauricioleal.com'
    };
    request(app)
      .post(`/users/${userId}/contacts`)
      .set('Content-Type', 'application/json')
      .set('X-Access-Token', Token)
      .type('form')
      .send(contact)
      .expect(201)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });
  // Test breaks when running with the suit. Takes too long.
  it.skip('Should not create contact for user, invalid userId', (done) => {
    let userId = 'nonExistenUser';
    let contact = {
      'firstName':'Some',
      'lastName': 'Contact',
      'email': 'SomeContact@mauricioleal.com'
    };
    let Token = getValidJWTToken();
    request(app)
      .post(`/users/${userId}/contacts`)
      .set('Content-Type', 'application/json')
      .set('X-Access-Token', Token)
      .type('form')
      .send(contact)
      .expect(404, 'Not Found')
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });
  // Test breaks when running with the suit. Takes too long.
  it.skip('Should not create contact for user, fields are too long', (done) => {
    let userId = 'mauriciolealmx1';
    let contact = {
      'firstName':'SomeNameThatIsLongerThan50Chaaaaaaaaaaaaaaaaaaaaaaa',
      'lastName': 'Contact',
      'email': 'SomeContact@mauricioleal.com'
    };
    let Token = getValidJWTToken();
    request(app)
      .post(`/users/${userId}/contacts`)
      .set('Content-Type', 'application/json')
      .set('X-Access-Token', Token)
      .type('form')
      .send(contact)
      .expect(404, 'Fields should not contain more than 20 characters')
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });
});

