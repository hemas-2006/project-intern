import React from 'react';
import './TaskFilters.css';

export default function TaskFilters({ filters, setFilters, taskCount }) {
  function handle(key, val) {
    setFilters(f => ({ ...f, [key]: val }));
  }

  return (
    <div className="filters-bar">
      <div className="filter-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search tasks, assignees, tags…"
          value={filters.search}
          onChange={e => handle('search', e.target.value)}
        />
        {filters.search && (
          <button className="clear-search" onClick={() => handle('search', '')}>✕</button>
        )}
      </div>

      <div className="filter-pills">
        {['All', 'Pending', 'Completed', 'Overdue'].map(s => (
          <button
            key={s}
            className={`pill ${filters.status === s ? 'active' : ''}`}
            onClick={() => handle('status', s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="filter-selects">
        <select value={filters.priority} onChange={e => handle('priority', e.target.value)}>
          <option value="All">All Priorities</option>
          <option>High</option><option>Medium</option><option>Low</option>
        </select>

        <select value={filters.category} onChange={e => handle('category', e.target.value)}>
          <option value="All">All Categories</option>
          {['Design','Development','Marketing','Research','Writing','Other'].map(c =>
            <option key={c}>{c}</option>
          )}
        </select>

        <select value={filters.sort} onChange={e => handle('sort', e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="deadline">By Deadline</option>
          <option value="priority">By Priority</option>
          <option value="alpha">A → Z</option>
        </select>
      </div>

      <div className="filter-count">
        {taskCount} task{taskCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}