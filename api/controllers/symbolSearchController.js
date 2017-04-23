const Company = require('../models/companyModel.js');

module.exports = (symbol) => {
    return new Promise(
        (resolve, reject) => {
            Company
                .find({
                    $or: [
                        { Name: { '$regex': symbol, '$options': 'i' } },
                        { Symbol: { '$regex': symbol, '$options': 'i' } }
                    ]
                }).then(data => {
                    resolve(data);
                })
        }
    )
};