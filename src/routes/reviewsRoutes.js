// routes/reviewRoutes.js
import express from 'express';
import {
  createReview,
  getAllReviews,
  getReviewsByPlaceId,
  updateReview,
  deleteReview,
} from '../controllers/reviewsController.js';

const router = express.Router();

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Review]
 *     description: Allow users to add a review for a specific place.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placeId:
 *                 type: string
 *               userId:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully.
 */
router.post('/reviews', createReview);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Review]
 *     description: Retrieve all reviews submitted by all users. Admin access only.
 *     responses:
 *       200:
 *         description: Successfully fetched all reviews.
 */
router.get('/reviews', getAllReviews);

/**
 * @swagger
 * /reviews/{placeId}:
 *   get:
 *     summary: Get reviews by placeId
 *     tags: [Review]
 *     description: Retrieve all reviews for a specific place by its ID.
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the place to get reviews for.
 *     responses:
 *       200:
 *         description: Successfully fetched reviews.
 */
router.get('/reviews/:placeId', getReviewsByPlaceId);

/**
 * @swagger
 * /reviews/{reviewId}:
 *   patch:
 *     summary: Update a review
 *     tags: [Review]
 *     description: Allow users to update their review.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the review to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated review.
 */
router.patch('/reviews/:reviewId', updateReview);

/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Review]
 *     description: Allow users to delete their review.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the review to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted review.
 */
router.delete('/reviews/:reviewId', deleteReview);

export default router;
