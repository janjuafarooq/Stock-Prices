const express = require('express');
const router = express.Router();
const stockHistoryModel = require('../models/stockHistoryModel.js');

router.get('/:symbol', function (req, res, next) {
    stockHistoryModel(req.params.symbol)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ "message": "No info was found.", error: error });
        });

});

module.exports = router;
