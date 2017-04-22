const Company = require('../models/company.js');

module.exports = (symbol) => {
    return new Promise(
        (resolve, reject) => {
            Company.find({
                $or: [
                    { Name: { '$regex': symbol, '$options': 'i' } },
                    { Symbol: { '$regex': symbol, '$options': 'i' } }
                ]
            }).then(item => {
                resolve(item);
            })
        }
    )
};