const express = require('express');
const router = express.Router();
const companyListController = require('../controllers/companyListController.js');

router.get('/', function (req, res, next) {
    companyListController()
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ "message": "No info was found.", error: error });
        });
});

module.exports = router;
