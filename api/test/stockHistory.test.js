const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);
chai.use(require("chai-sorted"));

describe('Get Stock History', () => {
    it('it should get stock history for aapl', (done) => {
        chai.request(server)
            .get('/stockhistory/aapl')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body[0].should.all.have.property('date');
                res.body[0].should.all.have.property('open');
                res.body[0].should.all.have.property('high');
                res.body[0].should.all.have.property('low');
                res.body[0].should.all.have.property('close');
                res.body[res.body.length - 1].date.should.be.at.most((new Date()).toISOString().split('T')[0]);
                res.body[0].date.should.be.at.least((new Date(new Date().setDate(new Date().getDate() - 30))).toISOString().split('T')[0]);
                done();
            });
    });

    it('it should should only be within the past 30 days ascending', (done) => {
        chai.request(server)
            .get('/stockhistory/aapl')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                res.body.should.be.ascendingBy("date");
                res.body[res.body.length - 1].date.should.be.at.most((new Date()).toISOString().split('T')[0]);
                res.body[0].date.should.be.at.least((new Date(new Date().setDate(new Date().getDate() - 30))).toISOString().split('T')[0]);
                done();
            });
    });
});