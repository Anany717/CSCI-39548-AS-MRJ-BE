import express from 'express';
import { Employee, Task } from '../database/models/index.js';

//initialize router
const router = express.Router();

//define endpoints and route handlers

/***** GET ALL TASKS: *****/
router.get('/', async (req, res, next) => {
  try {
    let tasks = await Task.findAll({include: [Employee]});
    res.status(200).json(tasks);
  } catch(err) {
    next(err);
  }
});

/***** DELETE TASK: *****/
router.delete("/:id", function (req, res, next) {
  Task.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json("TASK DELETED"))
    .catch((err) => next(err));
});

/***** ADD TASK: *****/
router.post("/", function (req, res, next) {
  Task.create(req.body)
    .then((newTask) => res.status(200).json(newTask))
    .catch((err) => next(err));
});

/***** EDIT TASK: *****/
router.put("/:id", async (req, res, next) => {
  try {
    await Task.update(req.body, { where: { id: req.params.id } });
    let updatedTask = await Task.findByPk(req.params.id);
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
});

export {
    router as taskRouter,
};


