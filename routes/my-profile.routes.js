import express from 'express';

import { getUserInfoByID, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/:id').get(getUserInfoByID);
router.route('/:id').patch(updateUser);

export default router;