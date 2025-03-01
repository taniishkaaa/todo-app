const express = require('express');

const { body } = require('express-validator');

const tasksController = require('../controllers/tasks');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, tasksController.fetchAll);

router.post(
  '/',
  [
    auth,
    body('title').trim().isLength({ min: 1 }).not().isEmpty(),
    body('body').trim().isLength({ min: 1 }).not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  tasksController.postTask
);

router.delete('/:id', auth, tasksController.deleteTask);

router.get('/:id', auth, tasksController.fetchTask)

router.put('/:id', auth, tasksController.editTask);

module.exports = router;
