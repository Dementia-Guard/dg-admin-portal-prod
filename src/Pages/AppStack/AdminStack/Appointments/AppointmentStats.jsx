import React from "react";

const AppointmentStats = ({ total, completed, upcoming, scheduled }) => {
  return (
    <div className="row g-4 mb-4">
      <div className="col-md-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body d-flex align-items-center">
            <div className="rounded bg-primary bg-opacity-10 p-3 me-3">
              <i className="fa-solid fa-list text-white fs-5"></i>
            </div>
            <div>
              <h6 className="mb-0 text-muted">Total</h6>
              <h3 className="mb-0 fw-bold">{total}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body d-flex align-items-center">
            <div className="rounded bg-success bg-opacity-10 p-3 me-3">
              <i className="fa-solid fa-check-circle text-white fs-5"></i>
            </div>
            <div>
              <h6 className="mb-0 text-muted">Completed</h6>
              <h3 className="mb-0 fw-bold">{completed}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body d-flex align-items-center">
            <div className="rounded bg-warning bg-opacity-10 p-3 me-3">
              <i className="fa-solid fa-clock text-white fs-5"></i>
            </div>
            <div>
              <h6 className="mb-0 text-muted">Upcoming</h6>
              <h3 className="mb-0 fw-bold">{upcoming}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body d-flex align-items-center">
            <div className="rounded bg-info bg-opacity-10 p-3 me-3">
              <i className="fa-solid fa-calendar text-white fs-5"></i>
            </div>
            <div>
              <h6 className="mb-0 text-muted">Scheduled</h6>
              <h3 className="mb-0 fw-bold">{scheduled}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStats;
