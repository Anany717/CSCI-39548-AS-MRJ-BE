import express from 'express';
import { Employee, Task } from '../database/models/index.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ include: [Employee] });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

// Update a task by ID
router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      const updatedTask = await task.update(req.body);
      res.status(200).json(updatedTask);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    next(err);
  }
});

export {
  router as taskRoutes,
};