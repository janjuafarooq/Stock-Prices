const express = require('express');
const router = express.Router();
const stockHistoryModel = require('../models/stockHistoryModel.js');

router.get('/:symbol', function (req, res, next) {
    stockHistoryModel(req.params.symbol)
        .then(response => {
            if (response.length > 0) {
                res.status(200).json(response);
            } else {
                // Bad request
                res.status(400).send('Symbol does not exist');
            }
        })
        .catch(error => {
            res.status(500).json({ error: error });
        });
});

module.exports = router;
