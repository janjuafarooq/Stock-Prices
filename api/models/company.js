const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema(
	{
		"_id": "ObjectId",
		"Symbol": String,
		"Name": String,
		"LastSale": Number,
		"MarketCap": String,
		"IPOyear": String,
		"Sector": String,
		"industry": String,
		"Summary Quote": String,
		"": String
	},
	{ collection: 'Company' }
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;