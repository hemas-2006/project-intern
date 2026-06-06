const mongoose = require('mongoose');

// ── Task Schema ──────────────────────────────────────────────────────────────
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [80, 'Title cannot exceed 80 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: [400, 'Description cannot exceed 400 characters'],
      validate: {
        validator: function (v) {
          // If provided, must be at least 10 chars
          return !v || v.trim().length === 0 || v.trim().length >= 10;
        },
        message: 'Description must be at least 10 characters if provided',
      },
    },
    assignee: {
      type: String,
      required: [true, 'Assignee name is required'],
      trim: true,
      maxlength: [60, 'Assignee name cannot exceed 60 characters'],
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: 'Priority must be Low, Medium, or High',
      },
      default: 'Medium',
    },
    category: {
      type: String,
      enum: {
        values: ['Design', 'Development', 'Marketing', 'Research', 'Writing', 'Other'],
        message: 'Invalid category',
      },
      default: 'Development',
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 10;
        },
        message: 'Cannot have more than 10 tags',
      },
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Indexes ──────────────────────────────────────────────────────────────────
taskSchema.index({ priority: 1 });
taskSchema.index({ completed: 1 });
taskSchema.index({ assignee: 1 });
taskSchema.index({ createdAt: -1 });

// ── Virtual: isOverdue ────────────────────────────────────────────────────────
taskSchema.virtual('isOverdue').get(function () {
  if (!this.deadline || this.completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(this.deadline) < today;
});

// ── Virtual: daysLeft ─────────────────────────────────────────────────────────
taskSchema.virtual('daysLeft').get(function () {
  if (!this.deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((new Date(this.deadline) - today) / 86400000);
  return diff;
});

// ── Pre-save hook: sanitize tags ─────────────────────────────────────────────
taskSchema.pre('save', function (next) {
  if (this.tags && this.tags.length > 0) {
    this.tags = this.tags
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);
  }
  next();
});

// ── Static method: get stats ──────────────────────────────────────────────────
taskSchema.statics.getStats = async function () {
  const total     = await this.countDocuments();
  const completed = await this.countDocuments({ completed: true });
  const today     = new Date(); today.setHours(0, 0, 0, 0);
  const overdue   = await this.countDocuments({
    completed: false,
    deadline: { $lt: today },
  });
  const byPriority = await this.aggregate([
    { $group: { _id: '$priority', count: { $sum: 1 } } },
  ]);
  return { total, completed, pending: total - completed, overdue, byPriority };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;