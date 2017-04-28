const Company = require('../schemas/companySchema.js');
const paginate = require('mongoose-pagination');
module.exports = (symbol, page, pageSize) => {
    // Defaulting pagesize to 10 and page to 1 if they are not passed
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
                    data = data.map((item) => {
                        return {
                            Name: item.Name,
                            Symbol: item.Symbol.replace(/\./g, '-'),
                            Sector: item.Sector,
                            industry: item.industry
                        }
                    });
                    resolve({
                        data: data,
                        pages: Math.ceil(total / pageSize),
                        count: total
                    });
                });
        }
    )
};