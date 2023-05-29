import express from 'express';

import { getAllReviews, createNewReview } from '../controllers/review.controller.js';

const router = express.Router();

router.route('/').get(getAllReviews);
router.route('/').post(createNewReview);

export default router;