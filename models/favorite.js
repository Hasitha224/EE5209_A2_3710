const mongoose = require('mongoose');
const favoriteSchema = new mongoose.Schema({
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Movie'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
 
  const Favorite = mongoose.model('Favorite', favoriteSchema);
  
  module.exports = Favorite;