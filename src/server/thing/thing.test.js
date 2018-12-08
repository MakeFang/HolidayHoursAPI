const mongoose = require('mongoose');
const chai = require('chai');
const app = require('../../index.js');
const chaiHttp = require('chai-http'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;

chai.config.includeStack = true;
chai.use(chaiHttp);

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

describe('## Thing APIs', () => {
    // #TODO: Implement thing.test.js.
  it('should return index of holiday hours', (done) => {
    chai.request(app)
        .get('/holiday-hours/')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res.text).to.equal('things work');
          done();
        });
  });
});
