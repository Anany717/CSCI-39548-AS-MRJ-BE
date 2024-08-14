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


// Get All Incomplete Tasks
router.get('/incomplete', async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ where: { completed: false } });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});


// Get All Tasks with a Certain Priority
router.get('/priority/:level', async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ where: { priority: req.params.level } });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

// GET /api/tasks/count
router.get('/count', async (req, res, next) => {
  try {
    const count = await Task.count();
    res.status(200).json({ taskCount: count });
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


// Get a specific task by ID
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: [Employee] });
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    next(err);
  }
});

// Create a new task
router.post('/', async (req, res, next) => {
  try {
    const { content, priority, completed, employeeId } = req.body;
    const newTask = await Task.create({ content, priority, completed, employeeId });
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

// Delete a task by ID
router.delete("/:id", function (req, res, next) {
  Task.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(200).json("Deleted a task!"))
    .catch((err) => next(err));
});

export {
  router as taskRoutes,
};