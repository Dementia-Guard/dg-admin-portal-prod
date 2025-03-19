import React from "react";

const AppointmentDetailsModal = ({ appointment, onClose, onCancel }) => {
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

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1050,
        marginLeft: window.innerWidth >= 1200 ? "10%" : "0%",
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-primary bg-opacity-10 border-0">
            <h6 className="modal-title text-primary">
              <i className="fa-solid fa-calendar-check me-2"></i>
              Appointment Details
            </h6>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="row">
              <div className="col-md-6">
                <h5 className="text-muted mb-3">Patient Information</h5>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Name:</span>
                    <span className="fw-medium">{appointment.patientName}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Age:</span>
                    <span>{appointment.patientDetails?.age}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">CDR Score:</span>
                    <span>{appointment.patientDetails?.cdrScore}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">MMSE Score:</span>
                    <span>{appointment.patientDetails?.mmseScore}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Caregiver:</span>
                    <span>
                      {appointment.patientDetails?.caregiverAvailability}
                    </span>
                  </div>
                </div>

                <h5 className="text-muted mb-3">Appointment Status</h5>
                <div className="mb-3">
                  <span
                    className={`badge ${getStatusBadgeClass(
                      appointment.status
                    )} mb-2`}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </span>
                  <p className="small text-muted mb-0">
                    {appointment.status === "completed"
                      ? "This appointment has been completed."
                      : appointment.status === "upcoming"
                      ? "This appointment is scheduled within the next 24 hours."
                      : "This appointment is scheduled for a future date."}
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <h5 className="text-muted mb-3">Appointment Details</h5>
                <div className="card bg-light border-0 p-3 mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 rounded p-2 me-3">
                      <i className="fa-solid fa-calendar-day fs-5 text-white"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">Date</h6>
                      <p className="mb-0 fw-medium">
                        {formatDate(appointment.date)}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 rounded p-2 me-3">
                      <i className="fa-solid fa-clock fs-5 text-white"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">Time</h6>
                      <p className="mb-0 fw-medium">{appointment.timeSlot}</p>
                    </div>
                  </div>
                </div>

                <h5 className="text-muted mb-3">Additional Notes</h5>
                <div className="card bg-light border-0 p-3">
                  <p className="mb-0">
                    {appointment.patientDetails?.additionalNotes ||
                      "No additional notes provided."}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-0">
            {appointment.status !== "completed" && (
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  onCancel(appointment.id);
                  onClose();
                }}
              >
                <i className="fa-solid fa-times me-2"></i>
                Cancel Appointment
              </button>
            )}
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
