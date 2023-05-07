import express from 'express';
import * as logInController from '../controllers/logIn.controller.js';

const router = express.Router();

router.post('/login', logInController.postLogIn);

export default router;
