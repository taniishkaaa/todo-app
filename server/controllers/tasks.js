const { validationResult } = require('express-validator');

const Task = require('../models/task');

exports.fetchAll = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      console.error("fetchAll error: Missing userId in request");
      return res.status(400).json({ message: "User ID is required" });
    }
    const [allTasks] = await Task.fetchAll(userId);
    res.status(200).json(allTasks);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postTask = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const title = req.body.title;
  const body = req.body.body;
  const user = req.body.user;

  try {
    const task = {
      title: title,
      body: body,
      user: user,
    };
    const result = await Task.save(task);
    res.status(201).json({ message: 'Added!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const deleteResponse = await Task.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const editTask = await Task.fetchTask(taskId);
    res.status(200).json(editTask);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return;

  const taskId = req.params.id;
  const { title, body } = req.body;

  try {
    const task = {
      title: title,
      body: body,
    };
    const result = await Task.update(taskId, task);
    res.status(200).json({ message: "Updated!" });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
