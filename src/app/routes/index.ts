import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { RoomRoutes } from '../modules/room/rooom.route';
import { SlotRoutes } from '../modules/slot/slot.route';

// a mini application to handle different routes
export const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRoutes,
    },
    {
        path: '/rooms',
        route: RoomRoutes,
    },
    {
        path: '/slots',
        route: SlotRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
