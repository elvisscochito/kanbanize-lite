import express from 'express';
import * as boardController from '../controllers/board.controller.js';

const router = express.Router();

router.get('/board', boardController.getBoards);
router.get('/usersByBoard/:boardId', boardController.getUsersByBoard);
router.get('/board/:boardId', boardController.getBoard);
router.get('/board/:boardId/columns', boardController.getColumns);
router.get('/board/:boardId/cards', boardController.getCards);
router.post('/board/:boardId/card', boardController.postCard);

export default router;
