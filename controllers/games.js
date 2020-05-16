const gameModel = require('../models/games')

const game = {}

game.createGame = function(req, res) {
    gameModel.createGame(req.body, function(err, data) {
        if(err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
                message: 'Created game successfully',
                data: data
            })
        }
    })
}

game.getGameById = function(req, res) {
    gameModel.getGameById({_id: req.params.gameId}, function(err, data) {
        if(err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
                message: 'Game is found',
                data: data
            })
        }
    })
}

game.updateRound = function(req, res) {
    gameModel.updateRound({_id: req.params.gameId}, [0, 0, 0, 0], function(err, data) {
        if(err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
                message: 'Added round',
                data: data
            })
        }
    })
}

module.exports = game