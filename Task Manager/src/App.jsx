// App.jsx
// Root component — manages all state and passes data/functions to child components

import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import TaskCount from './components/TaskCount';
import './App.css';

// Sample tasks shown on first load (before any user data is stored)
const SAMPLE_TASKS = [
  { id: 1, title: 'Complete React Assignment', priority: 'High', completed: false },
  { id: 2, title: 'Prepare Project Documentation', priority: 'Medium', completed: false },
  { id: 3, title: 'Review JavaScript Concepts', priority: 'Low', completed: false },
];

// Helper: read tasks from Local Storage, fall back to sample data
function loadTasksFromStorage() {
  try {
    const stored = localStorage.getItem('taskManagerTasks');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error('Failed to load tasks from storage:', err);
  }
  return SAMPLE_TASKS;
}

function App() {
  // Main task list state — initialised from Local Storage
  const [tasks, setTasks] = useState(loadTasksFromStorage);

  // The task currently being edited (null means we are in "add" mode)
  const [editTask, setEditTask] = useState(null);

  // Active filter: 'All' | 'Pending' | 'Completed'
  const [filter, setFilter] = useState('All');

  // Persist tasks to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem('taskManagerTasks', JSON.stringify(tasks));
  }, [tasks]);

  // ---- Task Operations ----

  // Add a new task
  function handleAddTask(title, priority) {
    const newTask = {
      id: Date.now(),          // unique id based on timestamp
      title,
      priority,
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
  }

  // Toggle completed status
  function handleToggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Begin editing a task — populate the form
  function handleEditTask(task) {
    setEditTask(task);
    // Scroll to top so the form is visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Save the updated task
  function handleUpdateTask(updatedTask) {
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditTask(null);
  }

  // Cancel edit — return to add mode
  function handleCancelEdit() {
    setEditTask(null);
  }

  // Delete a task by id
  function handleDeleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
    // If the deleted task was being edited, clear the form
    if (editTask && editTask.id === id) {
      setEditTask(null);
    }
  }

  // ---- Filtering ----

  function getFilteredTasks() {
    if (filter === 'Completed') return tasks.filter(t => t.completed);
    if (filter === 'Pending') return tasks.filter(t => !t.completed);
    return tasks; // 'All'
  }

  const filteredTasks = getFilteredTasks();

  return (
    <div className="app-wrapper">
      <div className="app-container">

        {/* Header */}
        <header className="app-header">
          <h1>Task Manager</h1>
          <p>Organise and track your tasks efficiently</p>
        </header>

        <main className="app-body">

          {/* Task Form — Add or Edit */}
          <TaskForm
            onAdd={handleAddTask}
            editTask={editTask}
            onUpdate={handleUpdateTask}
            onCancelEdit={handleCancelEdit}
          />

          {/* Statistics */}
          <TaskCount tasks={tasks} />

          {/* Filter Buttons */}
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />

        </main>
      </div>
    </div>
  );
}

export default App;
