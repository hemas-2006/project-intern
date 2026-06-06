import React, { useState, useEffect, useCallback } from 'react';
import TaskForm    from './TaskForm.jsx';
import TaskCard    from './TaskCard.jsx';
import TaskFilters from './TaskFilters.jsx';
import StatsBar    from './StatsBar.jsx';
import EditModal   from './EditModal.jsx';
import taskService from '../services/taskService.jsx';
import './TaskManager.css';

export default function TaskManager() {
  const [tasks,        setTasks]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [apiError,     setApiError]     = useState('');
  const [notification, setNotif]        = useState('');
  const [editTask,     setEditTask]     = useState(null);
  const [showForm,     setShowForm]     = useState(true);

  const [filters, setFilters] = useState({
    search: '', status: 'All', priority: 'All', category: 'All', sort: 'newest',
  });

  // ── Toast ────────────────────────────────────────────────────────────────────
  function notify(msg) {
    setNotif(msg);
    setTimeout(() => setNotif(''), 2800);
  }

  // ── Fetch tasks from API ──────────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setApiError('');
    try {
      const res = await taskService.getAll();
      setTasks(res);
    } catch (err) {
      setApiError(err.message || 'Failed to load tasks. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // ── Create ────────────────────────────────────────────────────────────────────
  async function handleAdd(taskData) {
    try {
      const res = await taskService.create(taskData);
      setTasks(prev => [res, ...prev]);
      notify('✅ Task added!');
    } catch (err) {
      notify('❌ ' + (err.message || 'Failed to create task'));
    }
  }

  // ── Delete ────────────────────────────────────────────────────────────────────
  async function handleDelete(id) {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(t => t._id !== id));
      notify('🗑 Task deleted.');
    } catch (err) {
      notify('❌ ' + (err.message || 'Failed to delete task'));
    }
  }

  // ── Toggle complete ───────────────────────────────────────────────────────────
  async function handleToggle(id) {
    try {
      const res = await taskService.toggle(id);
      setTasks(prev => prev.map(t => t._id === id ? res : t));
    } catch (err) {
      notify('❌ ' + (err.message || 'Failed to update task'));
    }
  }

  // ── Open edit modal ───────────────────────────────────────────────────────────
  function handleEdit(task) { setEditTask(task); }

  // ── Save edit ─────────────────────────────────────────────────────────────────
  async function handleSaveEdit(updated) {
    try {
      const res = await taskService.update(updated._id, updated);
      setTasks(prev => prev.map(t => t._id === updated._id ? res : t));
      setEditTask(null);
      notify('✏ Task updated!');
    } catch (err) {
      notify('❌ ' + (err.message || 'Failed to update task'));
    }
  }

  // ── Clear completed ───────────────────────────────────────────────────────────
  async function handleClearCompleted() {
    try {
      const res = await taskService.clearCompleted();
      setTasks(prev => prev.filter(t => !t.completed));
      notify('🧹 ' + res.message);
    } catch (err) {
      notify('❌ ' + (err.message || 'Failed to clear tasks'));
    }
  }

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="task-manager">
      {/* Toast */}
      {notification && <div className="toast" role="status">{notification}</div>}

      <div className="tm-header">
        <div>
          <h1 className="tm-title">Task Manager</h1>
          <p className="tm-subtitle">Manage freelancer tasks — powered by MongoDB</p>
        </div>
        <div className="tm-header-actions">
          {completedCount > 0 && (
            <button className="btn-clear-completed" onClick={handleClearCompleted}>
              🧹 Clear {completedCount} done
            </button>
          )}
          <button className="btn-toggle-form" onClick={() => setShowForm(v => !v)}>
            {showForm ? '▲ Hide Form' : '＋ Add Task'}
          </button>
        </div>
      </div>

      <StatsBar tasks={tasks} />

      {showForm && (
        <div className="tm-section">
          <TaskForm onAdd={handleAdd} />
        </div>
      )}

      <div className="tm-section">
        <TaskFilters filters={filters} setFilters={setFilters} taskCount={tasks.length} />
      </div>

      <div className="tm-section">
        {loading ? (
          <div className="empty-state">
            <span className="empty-icon">⏳</span>
            <h3>Loading tasks…</h3>
            <p>Connecting to MongoDB backend</p>
          </div>
        ) : apiError ? (
          <div className="empty-state">
            <span className="empty-icon">⚠️</span>
            <h3>Connection Error</h3>
            <p>{apiError}</p>
            <button className="btn-submit" style={{marginTop:'1rem'}} onClick={fetchTasks}>
              Retry
            </button>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <h3>No tasks found</h3>
            <p>Add your first task using the form above!</p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map(task => (
              <TaskCard
                key={task._id}
                task={{ ...task, id: task._id }}
                onDelete={() => handleDelete(task._id)}
                onToggle={() => handleToggle(task._id)}
                onEdit={() => handleEdit(task)}
              />
            ))}
          </div>
        )}
      </div>

      {editTask && (
        <EditModal
          task={editTask}
          onSave={handleSaveEdit}
          onClose={() => setEditTask(null)}
        />
      )}
    </div>
  );
}