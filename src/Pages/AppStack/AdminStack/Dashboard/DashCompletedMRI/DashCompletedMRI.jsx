import { React, useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../Firebase/config";

export default function DashCompletedMRI() {
  const [completedMRI, setCompletedMRI] = useState(0);
  const [completedMRIData, setCompletedMRIData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getCompletedMRI = async () => {
      const completedMRIQuery = query(
        collection(db, "patients_h"),
        where("mriScanStatus", "==", "Completed")
      );

      const completedMRIQuerySnapshot = await getDocs(completedMRIQuery);
      setCompletedMRI(completedMRIQuerySnapshot.size);

      // Get the actual data for the popup
      const completedData = [];
      completedMRIQuerySnapshot.forEach((doc) => {
        const patientData = doc.data();
        const scanTimestamps = Array.isArray(patientData.mriScanTimestamp)
          ? patientData.mriScanTimestamp
          : [];
        // Convert ISO string timestamps to Date objects
        const validDates = scanTimestamps.map((ts) => {
          if (typeof ts === "string") {
            return new Date(ts); // Handle ISO string timestamps
          } else if (ts && ts.toDate) {
            return ts.toDate(); // Handle Firestore Timestamp
          }
          return null;
        }).filter((date) => date instanceof Date && !isNaN(date));

        // Get latest scan date
        const latestScan =
          validDates.length > 0 ? validDates.sort((a, b) => b - a)[0] : null;

        console.log(latestScan);
        completedData.push({
          id: doc.id,
          ...patientData,
          latestScan: latestScan
            ? latestScan.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "N/A",
          scanCount: scanTimestamps.length,
        });
      });
      setCompletedMRIData(completedData);
    };

    getCompletedMRI();
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="col-lg-4 col-12 mb-6">
      {/* card */}
      <div className="card h-100 ">
        {/* card body */}
        <div className="card-body p-6">
          {/* heading */}
          <div className="d-flex justify-content-between align-items-center mb-6">
            <div>
              <h4 className="mb-0 fs-5">Completed Analyses</h4>
            </div>
            <div
              className="icon-shape icon-md bg-success text-light-danger rounded-circle"
              style={{ cursor: "pointer" }}
              onClick={togglePopup}
            >
              <i className="fa-regular fa-circle-check fs-5" />
            </div>
          </div>
          {/* project number */}
          <div
            className="lh-1"
            style={{ cursor: "pointer" }}
            onClick={togglePopup}
          >
            <h1 className="mb-2 fw-bold fs-2">
              {completedMRI.toLocaleString()}
            </h1>
            <span>Completed</span>
          </div>
        </div>
      </div>

      {/* Popup for completed MRI scans */}
      {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
            marginLeft: window.innerWidth >= 1200 ? "10%" : "0%",
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
              <h3 className="text-primary mb-0">Completed MRI Scans</h3>
              <button
                className="btn btn-close"
                onClick={togglePopup}
                aria-label="Close"
              ></button>
            </div>

            {completedMRIData.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Patient ID</th>
                      <th>Dementia Level</th>
                      <th>Last Scan Date</th>
                      <th>Total Scans</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedMRIData.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.firstName || "N/A"}</td>
                        <td>{patient.patientId || patient.id}</td>
                        <td>{patient.dementiaLevel || "N/A"}</td>
                        <td>{patient.latestScan}</td>
                        <td>{patient.scanCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center my-4">No completed MRI scans found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
