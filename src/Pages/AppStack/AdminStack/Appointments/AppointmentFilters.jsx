import React from "react";

const AppointmentFilters = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
  onRefresh,
}) => {
  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split("-");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="fa-solid fa-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-0 bg-light"
                placeholder="Search patient name or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select border-0 bg-light"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming (24h)</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select border-0 bg-light"
              value={`${sortBy}-${sortOrder}`}
              onChange={handleSortChange}
            >
              <option value="date-asc">Date (Oldest first)</option>
              <option value="date-desc">Date (Newest first)</option>
              <option value="name-asc">Patient Name (A-Z)</option>
              <option value="name-desc">Patient Name (Z-A)</option>
              <option value="status-asc">Status (A-Z)</option>
              <option value="status-desc">Status (Z-A)</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-outline-primary w-100"
              onClick={onRefresh}
            >
              <i className="fa-solid fa-refresh me-2"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentFilters;
