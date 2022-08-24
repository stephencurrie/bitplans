const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const citySchema = new Schema({
  cityText: {
    type: String,
    required: 'You need to add a city!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  cityAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const City = model('City', citySchema);

module.exports = City;
