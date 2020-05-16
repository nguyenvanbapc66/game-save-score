const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Schema = mongoose.Schema()

const app = express()
const port = 3001
const gameRouter = require('./controllers/game-router')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/gamesManager', {useNewUrlParser: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('DB connected')
})

app.use(express.static(__dirname + '/public'))
app.use('/public', express.static('public'))

// API show form create new game
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/create-game.html')
})

app.get('/games/:gameId', (req, res) => {
  res.sendFile(__dirname + '/views/save-score.html')
})

// Middleware
app.use('/api/games', gameRouter)

app.listen(port, () => console.log(`http://localhost:${port}`))