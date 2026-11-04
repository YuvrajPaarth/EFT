// TaskItem.jsx
// Renders a single task row with checkbox, title, priority badge, edit and delete buttons

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  // Map priority value to CSS class
  const priorityClass = {
    High: 'priority-high',
    Medium: 'priority-medium',
    Low: 'priority-low',
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {/* Checkbox to mark task complete/incomplete */}
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />

      {/* Task title */}
      <div className="task-info">
        <span className={`task-title ${task.completed ? 'done' : ''}`}>
          {task.title}
        </span>
      </div>

      {/* Priority badge */}
      <span className={`priority-badge ${priorityClass[task.priority]}`}>
        {task.priority}
      </span>

      {/* Edit and Delete buttons */}
      <div className="task-actions">
        <button
          className="btn-icon btn-edit"
          onClick={() => onEdit(task)}
          disabled={task.completed}
          title="Edit task"
        >
          Edit
        </button>
        <button
          className="btn-icon btn-delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
