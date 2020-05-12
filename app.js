const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Schema = mongoose.Schema()

const path = require('path')

const app = express()
const port = 8080
const gameRouter = require('./controllers/game-router')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/gamesManager', {useNewUrlParser: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('DB connected')
})

app.use(express.static('./views'))

// API show form create new game
app.get('/', (req, res) => {
    let options = {
        root: path.join(__dirname, 'views')
    }
    res.sendFile('./create-game.html', options)
})

// API save users's name and return id of the game created
app.use('/', gameRouter)

app.listen(port, () => console.log(`http://localhost:${port}`))