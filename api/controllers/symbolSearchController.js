const Company = require('../models/companyModel.js');
const paginate = require('mongoose-pagination');
module.exports = (symbol, page, pageSize) => {
    // Defaulting pagesize to 10 if none is passed and page to 1
    pageSize = pageSize ? pageSize : 10;
    page = page ? page : 1;
    return new Promise(
        (resolve, reject) => {
            Company
                .find({
                    $or: [
                        { Name: { '$regex': symbol, '$options': 'i' } },
                        { Symbol: { '$regex': symbol, '$options': 'i' } }
                    ]
                })
                .sort({ Name: 1 })
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