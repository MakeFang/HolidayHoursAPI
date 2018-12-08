// const mongoose = require('mongoose');
const chai = require('chai');
// const app = require('../../index.js');
const chaiHttp = require('chai-http'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;

chai.config.includeStack = true;
// const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('## Auth APIs', () => {
    // # TODO: Implement Authentication Tests.
  it('Should test 3!=2', (done) => {
    expect(3).to.be.not.equal(2);
    done();
  });
});

describe('Testing Authenticated Routes', () => {

});

describe('Testing Authorized Routes', () => {

});

describe('Testing Unauthenticated Routes', () => {

});

describe('Testing Unauthorized Routes', () => {

});
