import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthVlidation } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post('/login',validateRequest(AuthVlidation.loginValidationSchema),AuthControllers.loginUser);

export const AuthRoutes = router;
