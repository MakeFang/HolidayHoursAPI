const mongoose = require('mongoose');
const chai = require('chai');
const app = require('../../index.js');
const User = require('../auth/auth.model.js');
// const Hour = require('./thing.model.js');
const chaiHttp = require('chai-http'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;

chai.config.includeStack = true;
chai.use(chaiHttp);
const agent = chai.request.agent(app);

const fakehours = {
  date: '2018-12-25',
  open: '1200',
  close: '1800'
};

const fakehours2 = {
  date: '2018-12-25',
  open: '0900',
  close: '2000'
};

let hourId;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('Holiday Hours behavior', () => {
    // #TODO: Implement thing.test.js.
  it('should return 401 if not logged in', (done) => {
    agent.get('/api/holiday-hours/')
         .end((err, res) => {
           if (err) done(err);
           expect(res).to.have.status(401);
           // expect(res.text).to.equal('things work');
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
  it('should return 204 if empty', (done) => {
    agent.get('/api/holiday-hours/')
         .end((err, res) => {
           if (err) done(err);
           expect(res).to.have.status(204);
           // expect(res.text).to.equal('things work');
           done();
         });
  });
  it('should be able to post a fake hours', (done) => {
    agent.post('/api/holiday-hours/')
         .send(fakehours)
         .end((err, res) => {
           if (err) done(err);
           hourId = res.body._id;
           expect(res).to.have.status(201);
           done();
         });
  });
  it('should be able to get specific hours by ID', (done) => {
    agent.get(`/api/holiday-hours/${hourId}`)
         .end((err, res) => {
           if (err) done(err);
           expect(res).to.have.status(200);
           expect(res.body.open).to.equal(1200);
           expect(res.body.close).to.equal(1800);
           done();
         });
  });
  it('should be able to update fake hours', (done) => {
    agent.put(`/api/holiday-hours/${hourId}`)
         .send(fakehours2)
         .end((err, res) => {
           if (err) done(err);
           expect(res).to.have.status(200);
           expect(res.body.open).to.equal(900);
           expect(res.body.close).to.equal(2000);
           done();
         });
  });
  it('should be able to delete fake hours', (done) => {
    agent.delete(`/api/holiday-hours/${hourId}`)
         .end((err, res) => {
           if (err) done(err);
           expect(res).to.have.status(200);
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
