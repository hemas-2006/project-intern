import React, { useState } from 'react';
import './TaskForm.css';

const CATEGORIES = ['Design', 'Development', 'Marketing', 'Research', 'Writing', 'Other'];
const PRIORITIES  = ['Low', 'Medium', 'High'];

const EMPTY = {
  title: '',
  description: '',
  assignee: '',
  priority: 'Medium',
  category: 'Development',
  deadline: '',
  tags: '',
};

export default function TaskForm({ onAdd }) {
  const [form, setForm]     = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  /* ── Validation ── */
  function validate() {
    const e = {};
    if (!form.title.trim())       e.title     = 'Task title is required.';
    else if (form.title.trim().length < 3)
                                  e.title     = 'Title must be at least 3 characters.';
    if (!form.assignee.trim())    e.assignee  = 'Assignee name is required.';
    if (!form.deadline)           e.deadline  = 'Deadline is required.';
    else {
      const today = new Date(); today.setHours(0,0,0,0);
      if (new Date(form.deadline) < today) e.deadline = 'Deadline cannot be in the past.';
    }
    if (form.description.trim().length > 0 && form.description.trim().length < 10)
                                  e.description = 'Description must be at least 10 characters.';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const tagsArr = form.tags
      ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    onAdd({
      id: Date.now(),
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      assignee: form.assignee.trim(),
      tags: tagsArr,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    setForm(EMPTY);
    setErrors({});
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  }

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Add New Task</h2>
        <p>Fill in the details to create a task for your project</p>
      </div>

      {success && (
        <div className="success-banner" role="alert">
          ✅ Task added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Title */}
        <div className={`form-group ${errors.title ? 'has-error' : ''}`}>
          <label htmlFor="title">Task Title <span className="required">*</span></label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Design landing page mockup"
            maxLength={80}
          />
          {errors.title && <span className="error-msg">{errors.title}</span>}
          <span className="char-count">{form.title.length}/80</span>
        </div>

        {/* Description */}
        <div className={`form-group ${errors.description ? 'has-error' : ''}`}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the task in detail... (optional, min 10 chars)"
            rows={3}
            maxLength={400}
          />
          {errors.description && <span className="error-msg">{errors.description}</span>}
          <span className="char-count">{form.description.length}/400</span>
        </div>

        {/* Row: Assignee + Priority */}
        <div className="form-row">
          <div className={`form-group ${errors.assignee ? 'has-error' : ''}`}>
            <label htmlFor="assignee">Assignee <span className="required">*</span></label>
            <input
              id="assignee"
              name="assignee"
              value={form.assignee}
              onChange={handleChange}
              placeholder="Freelancer or team member"
            />
            {errors.assignee && <span className="error-msg">{errors.assignee}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
              {PRIORITIES.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Row: Category + Deadline */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className={`form-group ${errors.deadline ? 'has-error' : ''}`}>
            <label htmlFor="deadline">Deadline <span className="required">*</span></label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
            />
            {errors.deadline && <span className="error-msg">{errors.deadline}</span>}
          </div>
        </div>

        {/* Tags */}
        <div className="form-group">
          <label htmlFor="tags">Tags <span className="hint">(comma separated)</span></label>
          <input
            id="tags"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="e.g. ui, react, urgent"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-reset" onClick={() => { setForm(EMPTY); setErrors({}); }}>
            Clear
          </button>
          <button type="submit" className="btn-submit">
            ＋ Add Task
          </button>
        </div>
      </form>
    </div>
  );
}