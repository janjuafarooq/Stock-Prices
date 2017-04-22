const express = require('express');
const router = express.Router();
const stockHistoryController = require('../controllers/stockHistory.js');

router.get('/:symbol', function (req, res, next) {
    stockHistoryController(req.params.symbol)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ "message": "No info was found." });
        });

});

module.exports = router;
