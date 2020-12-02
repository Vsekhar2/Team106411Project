const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

route.post('/', async (req, res) => {

    const { firstName, lastName, tags } = req.body;
    let user = {};
    user.firstName = firstName;
    user.lastName = lastName;
    user.tags = tags;

    let userModel = new User(user);
    await userModel.save();
    res.json(userModel);



});

route.get('/', async (req, res) => {


    User.find()
    .then(profiles => {

        res.json({

          confimation: 'success',
          data: profiles

        })

    })
    .catch(err => {

        res.json({

            confimation: 'fail',
            message: err.message


        })

    })






})

module.exports = route;
