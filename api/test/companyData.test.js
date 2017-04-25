const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);
chai.use(require('chai-sorted'));

describe('Get Company Data', () => {
    it('it should get companies and be a sorted array', (done) => {
        chai.request(server)
            .get('/companyData/apple')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.an('array');
                res.body.data.should.be.ascendingBy('Name');
                res.body.data[0].should.all.have.property('Symbol');
                res.body.data[0].should.all.have.property('Name');
                res.body.data[0].should.all.have.property('Sector');
                res.body.data[0].should.all.have.property('industry');
                nameCheck = res.body.data.filter((company) => { return company.Name === 'Apple Inc.' });
                symbolCheck = res.body.data.filter((company) => { return company.Name === 'AAPL' });
                nameCheck.concat(symbolCheck).should.have.length.of.at.most(20);
                done();
            });
    });

    it('it should include either Apple Inc or AAPL (checking name or symbol in search)', (done) => {
        chai.request(server)
            .get('/companyData/apple')
            .end((err, res) => {
                res.should.have.status(200);
                nameCheck = res.body.data.filter((company) => { return company.Name === 'Apple Inc.' });
                symbolCheck = res.body.data.filter((company) => { return company.Name === 'AAPL' });
                nameCheck.concat(symbolCheck).should.have.length.of.at.least(1);
                done();
            });
    });

    it('it should get companies with page size 20', (done) => {
        chai.request(server)
            .get('/companyData/a?page=1&pageSize=20')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.an('array');
                res.body.data.should.be.ascendingBy('Name');
                res.body.data.should.have.length.of.at.most(20);
                done();
            });
    });
});