const express = require('express');
const router = express.Router();
const symbolSearchController = require('../controllers/symbolSearchController.js');

router.get('/:name', function (req, res, next) {
    symbolSearchController(req.params.name, parseInt(req.query.page), parseInt(req.query.pageSize))
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
            // TODO: Explain what went wrong in 400's 500 is just for exceptions on server side
            res.status(500).json({ "message": "No info was found." });
        });
});

module.exports = router;
