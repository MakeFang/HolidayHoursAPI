// const mongoose = require('mongoose');
const chai = require('chai');
const app = require('../../index.js');
const chaiHttp = require('chai-http');
const User = require('./auth.model.js'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
// const should = chai.should();

chai.config.includeStack = true;
// const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const agent = chai.request.agent(app);

describe('## Auth APIs', () => {
    // # TODO: Implement Authentication Tests.
  it('Should test 3!=2', (done) => {
    expect(3).to.be.not.equal(2);
    done();
  });
});

describe('Testing Unauthenticated Routes', () => {
  it('Should get json message for sign-up', (done) => {
    chai.request(app)
        .get('/api/auth/sign-up')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('curl --cookie-jar cookies.txt -d "{"username":"username", "password":"password"}" -H "Content-Type: application/json" -X POST http://localhost:4040/api/auth/sign-up');
          done();
        });
  });
  it('Should get json message for login', (done) => {
    chai.request(app)
        .get('/api/auth/login')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('curl --cookie-jar cookies.txt -d "{"username":"username", "password":"password"}" -H "Content-Type: application/json" -X POST http://localhost:4040/api/auth/login');
          done();
        });
  });
  it('should not be able to sign in if not registered', (done) => {
    chai.request(app)
        .post('/api/auth/login', { username: 'fake', password: 'fake' })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
  });
  it('should be able to sign up', (done) => {
    User.findOneAndRemove({ username: 'mock1' }, () => {
      agent.post('/api/auth/sign-up')
           .send({ username: 'mock1', password: 'mock1', name: 'mock1' })
           .end((err, res) => {
             expect(res).to.have.status(200);
             expect(agent).to.have.cookie('nToken');
             done();
           });
    });
  });
  it('should be able to log out', (done) => {
    agent.get('/api/auth/logout')
         .end((err, res) => {
           expect(res).to.have.status(200);
           expect(agent).to.not.have.cookie('nToken');
           done();
         });
  });
  it('should be able to log in', (done) => {
    agent.post('/api/auth/login')
         .send({ username: 'mock1', password: 'mock1' })
         .end((err, res) => {
           expect(res).to.have.status(200);
           expect(agent).to.have.cookie('nToken');
           done();
         });
  });
  it('should be able to delete current user', (done) => {
    agent.delete('/api/auth')
         .end((err, res) => {
           expect(res).to.have.status(200);
           expect(agent).to.not.have.cookie('nToken');
           done();
         });
  });
});

describe('Testing Unauthorized Routes', () => {

});
