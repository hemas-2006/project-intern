import React, { useState } from 'react';
import './TaskCard.css';

const PRIORITY_META = {
  High:   { color: '#ef4444', bg: '#fef2f2', label: '🔴 High' },
  Medium: { color: '#f59e0b', bg: '#fffbeb', label: '🟡 Medium' },
  Low:    { color: '#10b981', bg: '#ecfdf5', label: '🟢 Low' },
};

function daysLeft(deadline) {
  const today = new Date(); today.setHours(0,0,0,0);
  const d     = new Date(deadline);
  const diff  = Math.ceil((d - today) / 86400000);
  if (diff < 0)  return { text: `${Math.abs(diff)}d overdue`, overdue: true };
  if (diff === 0) return { text: 'Due today', today: true };
  return { text: `${diff}d left`, overdue: false };
}

export default function TaskCard({ task, onDelete, onToggle, onEdit }) {
  const [confirm, setConfirm] = useState(false);
  const p     = PRIORITY_META[task.priority] || PRIORITY_META.Medium;
  const dl    = task.deadline ? daysLeft(task.deadline) : null;

  function handleDelete() {
    if (confirm) { onDelete(task.id); }
    else { setConfirm(true); setTimeout(() => setConfirm(false), 2500); }
  }

  const formattedDate = task.deadline
    ? new Date(task.deadline).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
    : '—';

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      {/* Left accent bar by priority */}
      <div className="card-accent" style={{ background: p.color }} />

      <div className="card-body">
        {/* Top row */}
        <div className="card-top">
          <button
            className={`check-btn ${task.completed ? 'checked' : ''}`}
            onClick={() => onToggle(task.id)}
            aria-label="Toggle complete"
            title="Mark complete"
          >
            {task.completed ? '✓' : ''}
          </button>

          <div className="card-title-wrap">
            <h3 className="card-title">{task.title}</h3>
            {task.description && (
              <p className="card-desc">{task.description}</p>
            )}
          </div>

          <div className="card-actions">
            <button className="action-btn edit" onClick={() => onEdit(task)} title="Edit task">✏</button>
            <button
              className={`action-btn delete ${confirm ? 'confirm' : ''}`}
              onClick={handleDelete}
              title={confirm ? 'Click again to confirm' : 'Delete task'}
            >
              {confirm ? '?' : '✕'}
            </button>
          </div>
        </div>

        {/* Meta row */}
        <div className="card-meta">
          <span className="badge priority-badge" style={{ color: p.color, background: p.bg }}>
            {p.label}
          </span>
          <span className="badge category-badge">{task.category}</span>
          <span className="badge assignee-badge">👤 {task.assignee}</span>
          {dl && (
            <span className={`badge deadline-badge ${dl.overdue ? 'overdue' : dl.today ? 'today' : ''}`}>
              📅 {formattedDate} · {dl.text}
            </span>
          )}
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="card-tags">
            {task.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}

        {/* Completed stamp */}
        {task.completed && (
          <div className="completed-stamp">✔ Done</div>
        )}
      </div>
    </div>
  );
}