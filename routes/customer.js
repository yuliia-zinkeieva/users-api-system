const express = require('express');
const {isAuthorized} = require("../app/services/passport/isAuthorized");
const router = express.Router();
const {Customer} = require('../app/models');

router.post('/', isAuthorized, (req, res, next) => {
    const {firstname, email} = req.body;
    Customer.create({firstname, email})
        .then((customer) => {
            res.sendStatus(200);
        })
        .catch((e) => console.log(e))
});

router.post('/delete', isAuthorized, (req, res, next) => {
    const email = req.body.email;
    Customer.findByPk(email)
        .then((customer) => {
            customer.destroy();
            res.sendStatus(200);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(401);
        })

});

router.get('/list', (req, res, next) => {
    const list = [];
     Customer.findAll()
         .then((customers) => {
             for (let i=0; i< customers.length; i++){
                 list.push([customers[i].email, customers[i].firstname]);
             }
             res.send(list);
         })
         .catch((e) => console.log(e));
});

//todo: change customer


module.exports = router;