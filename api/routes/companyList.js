const express = require('express');
const router = express.Router();
const companyListModel = require('../models/companyListModel.js');

router.get('/', function (req, res, next) {
    companyListModel()
        .then(response => {
            if (response.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({ message: 'No results found' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: error });
        });
});

module.exports = router;
