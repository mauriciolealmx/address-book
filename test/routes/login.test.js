import { expect } from 'chai';
import request from 'supertest';
import * as admin from 'firebase-admin';
import assert from 'assert';

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
  it('Should redirect to "/login", user has no valid jwt token  ', (done) => {
    request(app)
      .get('/anyUrl')
      .expect(302)
      .end(function(err, res){
        console.log(res);
        expect(res);
        if (err) throw err;
        done();
      });
  });
});

