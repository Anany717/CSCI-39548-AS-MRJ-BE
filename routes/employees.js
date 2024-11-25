import express from 'express';
import { Employee, Task } from '../database/models/index.js';

//initialize router
const router = express.Router();

//define routes

/** GET ALL EMPLOYEES: */
router.get('/', async (req, res, next) => {
  try {
    let employees = await Employee.findAll({include: [Task]});
    res.status(200).json(employees);
  } catch(err) {
    next(err);
  }
});

/***** DELETE EMPLOYEE: *****/
router.delete("/:id", function (req, res, next) {
  Employee.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json("EMPLOYEE DELETED"))
    .catch((err) => next(err));
});

/***** ADD EMPLOYEE: *****/
router.post("/", function (req, res, next) {
  Employee.create(req.body)
    .then((newEmployee) => res.status(200).json(newEmployee))
    .catch((err) => next(err));
});

/***** EDIT EMPLOYEE: *****/
router.put("/:id", async (req, res, next) => {
  try {
    await Employee.update(req.body, { where: { id: req.params.id } });
    let updatedEmployee = await Employee.findByPk(req.params.id);
    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
});

export {
    router as employeeRouter,
};