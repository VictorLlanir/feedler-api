import express from 'express';
import { addFeed, deleteFeed, getFeedById, getFeeds, getPostsByFeedId, updateFeed } from '../controllers/feedController';
const router = express.Router();

router.get('/', getFeeds);
router.get('/:id', getFeedById);
router.get('/:id/posts', getPostsByFeedId);
router.post('/add', addFeed);
router.put('/update', updateFeed);
router.delete('/:id', deleteFeed);

export default router;