const Company = require('../models/company.js');

module.exports = (symbol) => {
    return new Promise(
        (resolve, reject) => {
            Company.find({Name: 'AAON, Inc.'}).then(item => {
                resolve(item);
            })
        }
    )
};