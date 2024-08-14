import express from 'express';
import { Employee, Task } from '../database/models/index.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll({include: [Employee]});
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

export {
  router as taskRoutes,
};