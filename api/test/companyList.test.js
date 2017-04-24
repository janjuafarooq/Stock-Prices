const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);
chai.use(require("chai-sorted"));

describe('Get All Company Data', () => {
    it('it should get all companies and be a sorted array', (done) => {
        chai.request(server)
            .get('/companylist')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body.should.be.ascendingBy("Name");
                res.body[0].should.all.have.property('Symbol');
                res.body[0].should.all.have.property('Name');
                done();
            });
    });
});