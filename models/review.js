const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Movie'
    },

    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Define the Review model
  const Review = mongoose.model('Review', reviewSchema);
  
  // Export the Review model
  module.exports = Review;