const express = require('express');
const router = express.Router();
const priceHistoryController = require('../controllers/priceHistory.js');
router.get('/:symbol', function (req, res, next) {
    priceHistoryController(req.params.symbol)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ "message": "No info was found." });
        });

});

module.exports = router;
