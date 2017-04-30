const express = require('express');
const router = express.Router();

router.use('/stockhistory', require('./stockHistory'));
router.use('/companyData', require('./companyData'));
router.use('/companylist', require('./companyList'));

router.get('/', function (req, res, next) {
    res.status(403).send();
});

router.get('*', function (req, res, next) {
    res.status(404).send();
});

module.exports = router;
