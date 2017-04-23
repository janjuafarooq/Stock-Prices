const Company = require('../models/companyModel.js');
const paginate = require('mongoose-pagination');
module.exports = (symbol, page, pageSize) => {
    return new Promise(
        (resolve, reject) => {
            Company
                .find({
                    $or: [
                        { Name: { '$regex': symbol, '$options': 'i' } },
                        { Symbol: { '$regex': symbol, '$options': 'i' } }
                    ]
                })
                .paginate(page, pageSize, function (err, data, total) {
                    resolve({
                        data: data,
                        pages: Math.ceil(total / pageSize),
                        count: total
                    });
                });
        }
    )
};