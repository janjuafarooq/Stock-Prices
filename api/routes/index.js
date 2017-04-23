const express = require('express');
const router = express.Router();

router.use('/stockhistory', require('./stockHistory'));
router.use('/symbolsearch', require('./symbolSearch'));
router.use('/companylist', require('./companyList'));

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Stock Price Api' });
});

module.exports = router;
