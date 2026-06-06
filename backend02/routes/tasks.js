const express = require('express');
const router  = express.Router();
const Task    = require('../models/Task');

// Helper: wrap async route handlers to catch errors
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ── GET /api/tasks ── Read All (with filtering & sorting) ────────────────────
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { search, status, priority, category, sort } = req.query;

    // Build query
    const query = {};

    if (search) {
      query.$or = [
        { title:       { $regex: search, $options: 'i' } },
        { assignee:    { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags:        { $regex: search, $options: 'i' } },
      ];
    }

    if (priority && priority !== 'All') query.priority = priority;
    if (category && category !== 'All') query.category = category;

    if (status === 'Completed') {
      query.completed = true;
    } else if (status === 'Pending') {
      query.completed = false;
    } else if (status === 'Overdue') {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      query.completed = false;
      query.deadline  = { $lt: today };
    }

    // Sort options
    const SORT_MAP = {
      newest:   { createdAt: -1 },
      oldest:   { createdAt:  1 },
      deadline: { deadline:   1 },
      priority: { priority:   1 },
      alpha:    { title:      1 },
    };
    const sortObj = SORT_MAP[sort] || SORT_MAP.newest;

    const tasks = await Task.find(query).sort(sortObj).lean({ virtuals: true });

    res.status(200).json({
      success: true,
      count:   tasks.length,
      data:    tasks,
    });
  })
);

// ── GET /api/tasks/stats ── Aggregate stats ───────────────────────────────────
router.get(
  '/stats',
  asyncHandler(async (req, res) => {
    const stats = await Task.getStats();
    res.status(200).json({ success: true, data: stats });
  })
);

// ── GET /api/tasks/:id ── Read One ────────────────────────────────────────────
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id).lean({ virtuals: true });

    if (!task) {
      const err = new Error(`Task not found with id: ${req.params.id}`);
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({ success: true, data: task });
  })
);

// ── POST /api/tasks ── Create ─────────────────────────────────────────────────
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, description, assignee, priority, category, deadline, tags, completed } = req.body;

    // Manual presence checks (schema handles further validation)
    if (!title || !assignee || !deadline) {
      const err = new Error('title, assignee, and deadline are required fields');
      err.statusCode = 400;
      throw err;
    }

    const task = await Task.create({
      title,
      description,
      assignee,
      priority,
      category,
      deadline: new Date(deadline),
      tags: Array.isArray(tags) ? tags : [],
      completed: completed || false,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data:    task,
    });
  })
);

// ── PUT /api/tasks/:id ── Full Update ─────────────────────────────────────────
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { title, description, assignee, priority, category, deadline, tags, completed } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      const err = new Error(`Task not found with id: ${req.params.id}`);
      err.statusCode = 404;
      throw err;
    }

    // Update fields
    task.title       = title       ?? task.title;
    task.description = description ?? task.description;
    task.assignee    = assignee    ?? task.assignee;
    task.priority    = priority    ?? task.priority;
    task.category    = category    ?? task.category;
    task.deadline    = deadline    ? new Date(deadline) : task.deadline;
    task.tags        = Array.isArray(tags) ? tags : task.tags;
    task.completed   = completed   !== undefined ? completed : task.completed;

    const updatedTask = await task.save(); // triggers validation + pre-save hooks

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data:    updatedTask,
    });
  })
);

// ── PATCH /api/tasks/:id/toggle ── Toggle completed status ────────────────────
router.patch(
  '/:id/toggle',
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      const err = new Error(`Task not found with id: ${req.params.id}`);
      err.statusCode = 404;
      throw err;
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({
      success: true,
      message: `Task marked as ${task.completed ? 'completed' : 'pending'}`,
      data:    task,
    });
  })
);

// ── DELETE /api/tasks/:id ── Delete One ────────────────────────────────────────
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      const err = new Error(`Task not found with id: ${req.params.id}`);
      err.statusCode = 404;
      throw err;
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data:    { id: req.params.id },
    });
  })
);

// ── DELETE /api/tasks ── Delete all completed tasks ────────────────────────────
router.delete(
  '/',
  asyncHandler(async (req, res) => {
    if (req.query.completed !== 'true') {
      const err = new Error('Use ?completed=true to confirm bulk deletion of completed tasks');
      err.statusCode = 400;
      throw err;
    }

    const result = await Task.deleteMany({ completed: true });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} completed task(s) deleted`,
      data:    { deletedCount: result.deletedCount },
    });
  })
);

module.exports = router;