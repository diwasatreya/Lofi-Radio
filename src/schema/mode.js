const { Schema, model} = require('mongoose');

let mode = new Schema({
    Guild : String,
    mode : String, 
    oldmode: String,
})

module.exports = model('mode', mode);