const express = require('express')
const gameControllers = require('./games')

const router = express.Router()

router.route('/').post(gameControllers.createGame)

router.route('/:gameId')
    .get(gameControllers.getGameById)
    .put(gameControllers.updateRound)

module.exports = router