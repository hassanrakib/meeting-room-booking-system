import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validate-request';
import { UserValidations } from './user.validation';

// a mini application to handle different routes
// a router iteself is a middleware or route handler
const router = express.Router();

router.post(
    '/signup',
    validateRequest(UserValidations.createUserSchema),
    UserControllers.signUp
);

router.post(
    '/login',
    validateRequest(UserValidations.loginCredentialsSchema),
    UserControllers.logIn
);

export const UserRoutes = router;
