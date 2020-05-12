const express = require('express')
const mongoose = require('mongoose')
// const Games = require('../models/games')
const Users = require('../models/users')

const router = express.Router()

router.route('/')
    .post((req, res) => {
        // let newGame = new Games(req.body)
        let newUser = new Users(req.body)
        console.log(req)

        newUser.save((err, data) => {
            checkErrorAndResponseData(res, err, data)
        })
    })

function checkErrorAndResponseData(res, err, data) {
    if(err) return res.json({message: err})
    return res.json({data: data})
}

module.exports = router
    