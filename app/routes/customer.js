const express = require('express')
const router = express.Router();
const db = require('../models')
const {isAuthorized, authenticate} = require('../config/passport/isAuthorized')



router.post('/', authenticate, isAuthorized, (req, res, next) => {
        console.log(' customer server1');
        const {firstName, lastName, age, email} = req.body
        let a = db.customer.create({firstName, lastName, age, email})
            .then(result => {
                res.send(result);
            })
            .catch(next)

        //console.log(a);
        //console.log(' customer server');

    }
);

module.exports = router;