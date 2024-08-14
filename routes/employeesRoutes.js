import express from 'express';
import { Employee, Task } from '../database/models/index.js';

const router = express.Router();

// Get all employees
router.get('/', async (req, res, next) => {
  try {
    const employees = await Employee.findAll({include: [Task]});
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

export {
  router as employeeRoutes,
};