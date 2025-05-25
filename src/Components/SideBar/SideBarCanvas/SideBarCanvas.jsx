import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBarCanvas({ logout }) {
  return (
    <nav
      className="navbar-vertical-nav offcanvas offcanvas-start navbar-offcanvac"
      tabIndex={-1}
      id="offcanvasExample"
    >
      <div className="navbar-vertical">
        <div className="px-4 py-5 d-flex justify-content-between align-items-center">
          <NavLink end={true} to={"dashboard"} className="navbar-brand">
            <img
              className="img-fluid"
              src="/assets/images/logo/dg-logo.png"
              alt
            />
          </NavLink>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="navbar-vertical-content flex-grow-1" data-simplebar>
          <ul className="navbar-nav flex-column">
            <li className="nav-item">
              <NavLink
                end={true}
                to={"/app/admin/dashboard"}
                className="nav-link "
              >
                <div className="d-flex align-items-center">
                  <span className="nav-link-icon">
                    <i className="fa-solid fa-dashboard" />
                  </span>
                  <span className="nav-link-text">Dashboard</span>
                </div>
              </NavLink>
            </li>
            <hr className="bordered" />
            <li className="nav-item">
              <NavLink to={`/app/admin/patients`} className="nav-link">
                <div className="d-flex align-items-center">
                  <span className="nav-link-icon">
                    <i className="fa-solid fa-people-group" />
                  </span>
                  <span className="nav-link-text">Patients</span>
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/app/admin/mriAnalysis`} className="nav-link">
                <div className="d-flex align-items-center">
                  <span className="nav-link-icon">
                    <i className="fa-solid fa-brain" />
                  </span>
                  <span className="nav-link-text">MRI-Analysis</span>
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/app/admin/progressionTracking`}
                className="nav-link"
              >
                <div className="d-flex align-items-center">
                  <span className="nav-link-icon">
                    <i className="fa-solid fa-percent" />
                  </span>
                  <span className="nav-link-text">Progression Tracking</span>
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/app/admin/treatmentPlans`} className="nav-link">
                <div className="d-flex align-items-center">
                  <span className="nav-link-icon">
                    <i className="fa-solid fa-file-contract" />
                  </span>
                  <span className="nav-link-text">Treatment Plans</span>
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/app/admin/addAvailability`} className="nav-link">
                <div className="d-flex align-items-center">
                  <span className="nav-link-icon">
                    <i className="fa-solid fa-plus" />
                  </span>
                  <span className="nav-link-text">Availability</span>
                </div>
              </NavLink>
            </li>{" "}
            <li className="nav-item">
              <NavLink to={`/app/admin/booked`} className="nav-link">
                <div className="d-flex align-items-center">
                  <span className="nav-link-icon">
                    <i className="fa fa-calendar-check" />
                  </span>
                  <span className="nav-link-text">Appointments</span>
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <button onClick={() => logout()} className="nav-link">
                <div className="d-flex align-items-center">
                  <span className="nav-link-icon">
                    <i className="fa-solid fa-lock" />
                  </span>
                  <span className="nav-link-text">Logout</span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
