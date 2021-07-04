const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    id: { type: String },
    notes: {type: Array},
    todos: {type: Array},
    reminder: {type : Array},
    city: {type: String},
    lists: {type: Array},
    language: {type: String},
    temptype: {type: String}
}));
