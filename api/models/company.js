const db = require('../db/db.js');

const CompanySchema = db.Schema(
	{ name: String },
	{ collection: 'Company' }
);

const Company = db.model('Company', CompanySchema);

module.exports = Company;