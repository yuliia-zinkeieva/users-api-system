const express = require('express');
const {isAuthorized} = require("../app/services/passport/isAuthorized");
const router = express.Router();
const {Customer} = require('../app/models');
const uploadAsync = require('../app/services/multer')
const ValidationError = require('../app/services/errors/ValidationError')

//validate(customerSchema, 'body'),
//todo: validate
//todo: delete an image when customer is deleted???
//todo: firstly file valid - if ok - store - check other data - if not ok - delete file??
//todo: fs. remove file
//todo: first validate data after upload file

router.post('/', isAuthorized, (req, res, next) => {
    uploadAsync(req, res).then((result) => {
        if (result.file == null) {
            next(new ValidationError('Validation fault', {field: 'file, please attach a one'}))
        }
        const cust = result.data;
        console.log(cust)
        cust.image_id = result.file[0].filename;
        Customer.create(cust)
            .then((customer) => {
                res.sendStatus(200);
            })
            .catch((e) => res.status(422).send({status: 422, message: e.errors[0].message}))
    })
        .catch((e) => {
                console.log(e)
                next(e)
            }
        );
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
//file send via link http://localhost:4000/uploads/ex.png


//todo: delete prev image store new one
router.post('/:id', isAuthorized, (req, res, next) => {
    const id = req.params.id;
    console.log('edit', id);
    uploadAsync(req, res).then((result) => {
        const cust = result.data;
        console.log(cust)
        if (result.file == null) {
            Customer.update(
                {email: cust.email, firstname: cust.firstname},
                {where: {id: id}}
            )
                .then(() =>
                    res.sendStatus(200)
                )
                .catch(e =>
                    res.status(422).send({status: 422, message: e.errors[0].message})
                )
        } else {
            cust.image_id = result.file[0].filename;
            Customer.update(
                {email: cust.email, firstname: cust.firstname, image_id: cust.image_id},
                {where: {id: id}}
            )
                .then(() =>
                    res.sendStatus(200)
                )
                .catch(e =>
                    res.status(422).send({status: 422, message: e.errors[0].message})
                )
        }

    })
        .catch(e => {
            console.log('here errror', e);
            next(e)
        })
});

router.get('/:id', isAuthorized, (req, res, next) => {
    const id = req.params.id;

    Customer.findOne({where: {id: id}})
        .then((customer) => {
            // const image = require(`../uploads/${customer.image_id}`)
            // console.log(image);
            const cust = {email: customer.email, firstname: customer.firstname, imageLink: customer.image_id};
            console.log(customer, cust);
            res.send(cust);
        })

        .catch(e =>
                res.status(422).send({status: 422, message: e.errors[0].message})
            //res.sendStatus(401).send(err)
        )
});

module.exports = router;