const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

route.post('/', async (req, res) => {

    const { userId, gameNames, steamIds } = req.body;
    let user = {};
    user.userId = userId;
    user.gameNames = gameNames;
    user.steamIds = steamIds;

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
