import express from 'express';
import { Employee, Task } from '../database/models/index.js';

const router = express.Router();

// Get all employees
router.get('/', async (req, res, next) => {
  try {
    const employees = await Employee.findAll({include: [Task]});
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
});

// Update an employee by ID
router.put('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      const updatedEmployee = await employee.update(req.body);
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (err) {
    next(err);
  }
});

// Get a specific employee by ID
router.get('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id, { include: [Task] });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (err) {
    next(err);
  }
});

// Create a new employee
router.post('/', async (req, res, next) => {
  try {
    const { firstname, lastname, department } = req.body;
    const newEmployee = await Employee.create({ firstname, lastname, department });
    res.status(201).json(newEmployee);
  } catch (err) {
    next(err);
  }
});

// Delete an employee by ID
router.delete("/:id", function (req, res, next) {
  Employee.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json("EMPLOYEE DELETED"))
    .catch((err) => next(err));
});

export {
  router as employeeRoutes,
};