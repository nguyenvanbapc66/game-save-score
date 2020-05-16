/*
games: {
    users: [],
    rounds: []
}

task1: 
    1. render from create game
    2. create game
    3. redirect from save score
    Task2:
        1. render save score
        2. update users's score: form and api: (update rounds, update scores)
        rounds = [[1, 2, 3, 4], [0, 0, 0, 0]]
*/
const mongoose = require('mongoose')

let gameSchema = new mongoose.Schema({
    players: {
        type: [String],
        required: true,
        validate: {
            validator: function(array) {
                console.log(array)
                return array && array.length == 4 && !array.map(function(value) {return value && value.length > 0}).includes(false)
            }
        }
    },
    rounds: [[Number]]
})

const Game = mongoose.model('Game', gameSchema)

let game = {}

game.createGame = function(newGameData, cb) {
    let newGame = new Game(newGameData)
    newGame.save(cb)
}

game.getGameById = async function(gameId, cb) {
    Game.find(gameId, cb)
}

game.updateRound = function(gameId, newRound, cb) {
    Game.update(
        gameId,
        {$push: {rounds: newRound}},
        cb
    )
}

module.exports = game