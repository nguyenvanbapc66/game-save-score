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

let users = new mongoose.Schema(
    [
        {playername1: Object},
        {playername2: String},
        {playername3: String},
        {playername4: String}
    ]
)

const Users = mongoose.model('Users', users)

let games = new mongoose.Schema({
    users: new Users(req.body),
    rounds: []
})

module.exports = mongoose.model('Games', games)