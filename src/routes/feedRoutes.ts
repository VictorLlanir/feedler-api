import express from 'express';
import { addFeed, deleteFeed, getFeedById, getFeeds, updateFeed } from '../controllers/feedController';
const router = express.Router();

router.get('/', getFeeds);
router.get('/:id', getFeedById);
router.post('/add', addFeed);
router.put('/update', updateFeed);
router.delete('/:id', deleteFeed);

export default router;