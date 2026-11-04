// TaskCount.jsx
// Displays task statistics: Total, Completed, and Pending counts

function TaskCount({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="task-count">
      <div className="count-card">
        <div className="count-number">{total}</div>
        <div className="count-label">Total Tasks</div>
      </div>
      <div className="count-card">
        <div className="count-number">{completed}</div>
        <div className="count-label">Completed</div>
      </div>
      <div className="count-card">
        <div className="count-number">{pending}</div>
        <div className="count-label">Pending</div>
      </div>
    </div>
  );
}

export default TaskCount;
