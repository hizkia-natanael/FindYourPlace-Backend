// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
      validate: {
        validator: (value) => [1, 2, 3, 4, 5].includes(value),
        message: 'Rating must be between 1 and 5',
      },
    },
    comment: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true, 
  }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
