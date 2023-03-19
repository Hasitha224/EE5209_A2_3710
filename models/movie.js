const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },

  year: { type: Number, required: true },

  actors: { type: [String], required: true },

  director: { type: String, required: true },

  plot: { type: String, required: true },

  imdbRating: { type: Number },

  imdbID: { type: String, required: true, unique: true },

  poster: { type: String },

  createdAt: { type: Date, default: Date.now }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;