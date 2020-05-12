const mongoose = require('mongoose')

let users = new mongoose.Schema(
    [
        {playername1: String},
        {playername2: String},
        {playername3: String},
        {playername4: String}
    ]
)



module.exports = mongoose.model('Users', users)

