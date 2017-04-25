const db = require('../db/db.js');

const CompanySchema = db.Schema(
	{
		Symbol: String,
		Name: String,
		Sector: String,
		industry: String,
	},
	{ collection: 'companies' }
);

const Company = db.model('Company', CompanySchema);

module.exports = Company;