import express from 'express';
import {employeeRoutes} from './employeesRoutes.js';
import {taskRoutes} from './tasksRoutes.js';

const router = express.Router();

router.use('/employees', employeeRoutes);
router.use('/tasks', taskRoutes);

export {
    router as routerHub,
};