const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
