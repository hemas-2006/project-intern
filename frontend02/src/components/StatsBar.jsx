import React from 'react';
import './StatsBar.css';

export default function StatsBar({ tasks }) {
  const total     = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending   = total - completed;
  const overdue   = tasks.filter(t => {
    if (!t.deadline || t.completed) return false;
    const today = new Date(); today.setHours(0,0,0,0);
    return new Date(t.deadline) < today;
  }).length;

  const percent = total ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: 'Total Tasks',  value: total,     color: '#4f46e5', icon: '📋' },
    { label: 'Completed',    value: completed, color: '#10b981', icon: '✅' },
    { label: 'Pending',      value: pending,   color: '#f59e0b', icon: '⏳' },
    { label: 'Overdue',      value: overdue,   color: '#ef4444', icon: '🔴' },
  ];

  return (
    <div className="stats-bar">
      {stats.map(s => (
        <div className="stat-card" key={s.label}>
          <span className="stat-icon">{s.icon}</span>
          <div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        </div>
      ))}

      {total > 0 && (
        <div className="stat-progress">
          <div className="progress-label">
            <span>Progress</span>
            <span>{percent}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}