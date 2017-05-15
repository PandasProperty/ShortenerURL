var mongoose = require('mongoose');

var linkSchema = mongoose.Schema({
    origin: String,
    shortenUrl: String,
    dateEntered: {
      type: Date,
      default: Date.now
    },
    createdBy: String
});

module.exports = mongoose.model('Link', linkSchema );
