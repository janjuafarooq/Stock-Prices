const express = require('express');
const router = express.Router();
const stockHistoryControllers = require('../controllers/stockHistoryController.js');

router.get('/:symbol', function (req, res, next) {
    stockHistoryControllers(req.params.symbol)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ "message": "No info was found." });
        });

});

module.exports = router;
