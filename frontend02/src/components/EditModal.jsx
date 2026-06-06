import React, { useState, useEffect } from 'react';
import './EditModal.css';

const CATEGORIES = ['Design', 'Development', 'Marketing', 'Research', 'Writing', 'Other'];
const PRIORITIES  = ['Low', 'Medium', 'High'];

export default function EditModal({ task, onSave, onClose }) {
  const [form, setForm]     = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setForm({ ...task, tags: task.tags ? task.tags.join(', ') : '' });
      setErrors({});
    }
  }, [task]);

  if (!task) return null;

  function validate() {
    const e = {};
    if (!form.title?.trim())    e.title    = 'Title is required.';
    if (!form.assignee?.trim()) e.assignee = 'Assignee is required.';
    if (!form.deadline)         e.deadline = 'Deadline is required.';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  }

  function handleSave() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const tagsArr = form.tags
      ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];
    onSave({ ...form, tags: tagsArr });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className={`form-group ${errors.title ? 'has-error' : ''}`}>
            <label>Task Title *</label>
            <input name="title" value={form.title || ''} onChange={handleChange} />
            {errors.title && <span className="error-msg">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description || ''} onChange={handleChange} rows={3} />
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.assignee ? 'has-error' : ''}`}>
              <label>Assignee *</label>
              <input name="assignee" value={form.assignee || ''} onChange={handleChange} />
              {errors.assignee && <span className="error-msg">{errors.assignee}</span>}
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={form.priority || 'Medium'} onChange={handleChange}>
                {PRIORITIES.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category || 'Development'} onChange={handleChange}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className={`form-group ${errors.deadline ? 'has-error' : ''}`}>
              <label>Deadline *</label>
              <input type="date" name="deadline" value={form.deadline || ''} onChange={handleChange} />
              {errors.deadline && <span className="error-msg">{errors.deadline}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input name="tags" value={form.tags || ''} onChange={handleChange} placeholder="e.g. ui, urgent" />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}