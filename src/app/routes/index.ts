import express from 'express';

// a mini application to handle different routes
export const router = express.Router();

const moduleRoutes = [
    {
        path: '',
        route: express.Router(),
    }
]


moduleRoutes.forEach(route => router.use(route.path, route.route));