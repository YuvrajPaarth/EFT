// FilterBar.jsx
// Shows filter buttons: All, Pending, Completed

function FilterBar({ currentFilter, onFilterChange }) {
  const filters = ['All', 'Pending', 'Completed'];

  return (
    <div className="filter-bar">
      {filters.map(filter => (
        <button
          key={filter}
          className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
