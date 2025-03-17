import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../Firebase/config";

export default function DashPendingMRI() {
  const [pendingMRI, setPendingMRI] = useState(0);
  const [pendingMRIData, setPendingMRIData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getPendingMRI = async () => {
      const pendingMRIQuery = query(
        collection(db, "patients_h"),
        where("mriScanStatus", "==", "Pending")
      );

      const pendingMRIQuerySnapshot = await getDocs(pendingMRIQuery);
      setPendingMRI(pendingMRIQuerySnapshot.size);

      // Get the actual data for the popup
      const pendingData = [];
      pendingMRIQuerySnapshot.forEach((doc) => {
        const patientData = doc.data();
        const priority =
          patientData.dementiaLevel === "Moderate" ||
          patientData.dementiaLevel === "Severe"
            ? "High"
            : "Normal";

        pendingData.push({
          id: doc.id,
          ...patientData,
          priority,
        });
      });
      setPendingMRIData(pendingData);
    };

    getPendingMRI();
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="col-lg-4 col-12 mb-6">
      {/* card */}
      <div className="card h-100">
        {/* card body */}
        <div className="card-body p-6">
          {/* heading */}
          <div className="d-flex justify-content-between align-items-center mb-6">
            <div>
              <h4 className="mb-0 fs-5">Pending Analyses</h4>
            </div>
            <div
              className="icon-shape icon-md bg-light-warning text-dark-warning rounded-circle"
              style={{ cursor: "pointer" }}
              onClick={togglePopup}
            >
              <i className="fa-solid fa-spinner fs-5" />
            </div>
          </div>
          {/* project number */}
          <div
            className="lh-1"
            style={{ cursor: "pointer" }}
            onClick={togglePopup}
          >
            <h1 className="mb-2 fw-bold fs-2">{pendingMRI.toLocaleString()}</h1>
            <span>Pending</span>
          </div>
        </div>
      </div>

      {/* Popup for pending MRI scans */}
      {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
            marginLeft: window.innerWidth >= 1200 ? '10%' : '0%',
          }}
        >
          <div
            className="bg-white rounded shadow p-4"
            style={{
              width: "90%",
              maxWidth: "800px",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="text-primary mb-0">Pending MRI Scans</h3>
              <button
                className="btn btn-close"
                onClick={togglePopup}
                aria-label="Close"
              ></button>
            </div>

            {pendingMRIData.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Patient ID</th>
                      <th>Dementia Level</th>
                      <th>Request Date</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingMRIData.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.firstName || "N/A"}</td>
                        <td>{patient.patientId || patient.id}</td>
                        <td>{patient.dementiaLevel || "N/A"}</td>
                        <td>
                          {patient.requestDate
                            ? new Date(
                                patient.requestDate.seconds * 1000
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          <span
                            className={`badge bg-${
                              patient.priority === "High"
                                ? "danger"
                                : patient.priority === "Medium"
                                ? "warning"
                                : "success"
                            }`}
                          >
                            {patient.priority || "Normal"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center my-4">No pending MRI scans found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
