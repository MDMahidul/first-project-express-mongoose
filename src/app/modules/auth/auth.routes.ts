import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthVlidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/login',validateRequest(AuthVlidation.loginValidationSchema),AuthControllers.loginUser);

router.post('/change-password',auth('admin','faculty','student'),validateRequest(AuthVlidation.changePasswordValidationSchema),AuthControllers.changePassword);

router.post(
  '/refresh-token',
  validateRequest(AuthVlidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
