// controllers/reviewController.js
import Review from '../models/reviewsModel.js';

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { placeId, userId, rating, comment } = req.body;

    // Prevent duplicate reviews
    const existingReview = await Review.findOne({ placeId, userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this place.' });
    }

    const review = new Review({ placeId, userId, rating, comment });
    await review.save();
    res.status(201).json({ message: 'Review created successfully', data: review });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
};

//Get all Reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name email') // Populate user details
      .populate('placeId', 'name location'); // Populate place details
    res.status(200).json({ data: reviews });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all reviews', error: error.message });
  }
};

// Get all reviews for a specific place
export const getReviewsByPlaceId = async (req, res) => {
  try {
    const { placeId } = req.params;
    const reviews = await Review.find({ placeId }).populate('userId', 'name email');
    res.status(200).json({ data: reviews });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully', data: review });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review', error: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review', error: error.message });
  }
};
