const express = require('express');
const router = express.Router();
const companyDataModel = require('../models/companyDataModel.js');

router.get('/:name', function (req, res, next) {
    companyDataModel(req.params.name, parseInt(req.query.page), parseInt(req.query.pageSize))
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ "message": "No info was found.", error: error });
        });
});

module.exports = router;
