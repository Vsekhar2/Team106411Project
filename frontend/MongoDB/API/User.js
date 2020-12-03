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

route.post('/query', async (req, res) => {

    var userIdInput = req.body['userId'];
    User.findOne({userId: userIdInput}, {_id: 0, steamIds: 0, _v: 0, userId: 0})
    .then(profiles => {

        res.json({

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
