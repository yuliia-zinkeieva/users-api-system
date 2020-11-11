const express = require('express');
const {isAuthorized} = require("../app/services/passport/isAuthorized");
const router = express.Router();
const {Customer} = require('../app/models');
const customerSchema = require('../app/services/joi/customerSchema');
const validate = require('../app/services/joi/validate-middleware');

router.post('/', isAuthorized, validate(customerSchema, 'body'), (req, res, next) => {
    const {firstname, email} = req.body;
    console.log(req.body)
    Customer.create({firstname, email})
        .then((customer) => {
            res.sendStatus(200);
        })
        .catch((e) => res.status(422).send({status: 422, message: e.errors[0].message}))
});

router.delete('/:id', isAuthorized, (req, res, next) => {
    const id = req.params.id;
    Customer.destroy({
        where: {id: id}
    })
        .then((numberFound) => res.sendStatus(200))
        .catch((e) => {
            console.log(e);
            res.sendStatus(401);
        })
});

router.get('/list', (req, res, next) => {
    Customer.findAll()
        .then((customers) => {
            res.send(customers);
        })
        .catch((e) => console.log(e));
});

//todo: change customer
router.post('/:id', isAuthorized, validate(customerSchema, 'body'), (req, res, next) => {
    const id = req.params.id;
    const {firstname, email} = req.body;
    //console.log(id, req.body)
    Customer.update(
  { email: email, firstname:firstname },
  {where: {id: id}}
)
  .then(() =>
    res.sendStatus(200)
  )
  .catch(e =>
      res.status(422).send({status: 422, message: e.errors[0].message})
     //res.sendStatus(401).send(err)
  )
    // findOne({where: {id: id}})
    //     .then((customer) => {
    //         customer.email = email;
    //         customer.firstname = firstname;
    //         customer.isNewRecord = true;
    //         //customer.reload();
    //         console.log(customer);
    //         res.sendStatus(200);
    //     })
    //
    //     .catch((e) => {
    //         console.log(e);
    //         res.sendStatus(401);
    //     })
});

module.exports = router;