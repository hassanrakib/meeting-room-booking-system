import express from 'express';
import { UserRoutes } from '../modules/user/user.route';

// a mini application to handle different routes
export const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
