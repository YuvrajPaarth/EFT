// TaskForm.jsx
// Handles both adding a new task and editing an existing task

import { useState, useEffect } from 'react';

function TaskForm({ onAdd, editTask, onUpdate, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  // When editTask changes, populate the form with existing values
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setPriority(editTask.priority);
      setError('');
    } else {
      setTitle('');
      setPriority('Medium');
      setError('');
    }
  }, [editTask]);

  // Handle form submission for both Add and Update
  function handleSubmit(e) {
    e.preventDefault();

    const trimmedTitle = title.trim();

    // Validate: task title must not be empty
    if (!trimmedTitle) {
      setError('Task title cannot be empty.');
      return;
    }

    if (editTask) {
      // Update existing task
      onUpdate({ ...editTask, title: trimmedTitle, priority });
    } else {
      // Add new task
      onAdd(trimmedTitle, priority);
    }

    // Reset form
    setTitle('');
    setPriority('Medium');
    setError('');
  }

  function handleCancel() {
    setTitle('');
    setPriority('Medium');
    setError('');
    onCancelEdit();
  }

  return (
    <div className="task-form">
      <h2>{editTask ? 'Edit Task' : 'Add New Task'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {/* Task Title Input */}
          <div className="form-group title-group">
            <label htmlFor="task-title">Task Title</label>
            <input
              id="task-title"
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              className={error ? 'input-error' : ''}
            />
          </div>

          {/* Priority Dropdown */}
          <div className="form-group priority-group">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="error-msg">{error}</p>}

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editTask ? 'Update Task' : 'Add Task'}
          </button>

          {/* Show Cancel only when editing */}
          {editTask && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
