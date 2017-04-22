const express = require('express');
const router = express.Router();
const symbolSearchController = require('../controllers/symbolSearch.js');

router.get('/', function (req, res, next) {
    symbolSearchController(req.params.symbol)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ "message": "No info was found." });
        });

});

module.exports = router;
