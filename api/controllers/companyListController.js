const Company = require('../models/companyModel.js');

module.exports = () => {
    return new Promise(
        (resolve, reject) => {
            Company
                .find({})
                .then(data => {
                    data = data.map((item) => {
                        return {
                            Name: item.Name,
                            Symbol: item.Symbol
                        }
                    });
                    resolve(data);
                });
        }
    );
};