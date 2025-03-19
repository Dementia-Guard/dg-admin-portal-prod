import React from "react";

const AppointmentTable = ({
  appointments,
  loading,
  searchTerm,
  filterStatus,
  onViewDetails,
  onCancelAppointment,
}) => {
  // Format date helper function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge class helper function
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-success";
      case "upcoming":
        return "bg-warning text-white";
      case "scheduled":
        return "bg-primary text-white";
      default:
        return "bg-secondary";
    }
  };

  // Empty state render
  if (!loading && appointments.length === 0) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="text-center py-5">
            <i className="fa-solid fa-calendar-xmark text-muted fs-1 mb-3"></i>
            <h5 className="text-muted">No appointments found</h5>
            <p className="text-muted">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No appointments have been scheduled yet"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state render
  if (loading) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading appointments...</p>
          </div>
        </div>
      </div>
    );
  }

  // Appointments table render
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="bg-light">
              <tr>
                <th scope="col">Patient</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Scores</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-initial rounded bg-primary text-white me-3 p-3">
                        {appointment.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h6 className="mb-0">{appointment.patientName}</h6>
                        <small className="text-muted">
                          Age: {appointment.patientDetails?.age}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="fw-medium">
                        {formatDate(appointment.date)}
                      </div>
                      <small className="text-muted">
                        <i className="fa-regular fa-clock me-1"></i>
                        {appointment.timeSlot}
                      </small>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <span className="badge bg-secondary bg-opacity-10 text-white">
                        CDR: {appointment.patientDetails?.cdrScore}
                      </span>
                      <span className="badge bg-secondary bg-opacity-10 text-white">
                        MMSE: {appointment.patientDetails?.mmseScore}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${getStatusBadgeClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onViewDetails(appointment)}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      {appointment.status !== "completed" && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onCancelAppointment(appointment.id)}
                        >
                          <i className="fa-solid fa-times"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTable;
