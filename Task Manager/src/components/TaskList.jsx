// TaskList.jsx
// Renders the filtered list of tasks or an empty state message

import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  // Show empty state when no tasks match the current filter
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        No tasks to show. Add a new task above.
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
