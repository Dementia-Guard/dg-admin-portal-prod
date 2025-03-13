import React from "react";
import { db } from "../../../../Firebase/config";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import Toaster from "../../../../Utils/Toaster/Toaster";

const ResultsDisplay = ({
  results,
  patientId,
  patientName,
  imagePreview,
  onReset,
}) => {
  const getDementiaLevelClass = (level) => {
    switch (level) {
      case "NonDemented":
        return "badge bg-success";
      case "VeryMildDemented":
        return "badge bg-warning text-dark";
      case "MildDemented":
        return "badge bg-orange text-dark";
      case "ModerateDemented":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  const formatDementiaLevel = (level) => {
    return level.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getConfidenceIndicator = (confidence) => {
    const percentage = parseFloat(confidence) * 100;
    return (
      <div className="mt-2">
        <label className="form-label fw-semibold">
          Confidence: {percentage.toFixed(1)}%
        </label>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    );
  };

  const saveResultsToFirebase = async () => {
    try {
      // Check if patientId is provided
      if (!patientId || patientId.trim() === "") {
        Toaster.justToast("error", "Patient ID is required to save results.");
        return; // Exit the function if no patientId is provided
      }

      // Get the reference to the patient document using the patientId
      const patientDocRef = doc(db, "patients", patientId);

      // Get the document snapshot
      const patientDocSnap = await getDoc(patientDocRef);

      if (patientDocSnap.exists()) {
        // Check if the dementiaLevel attribute already exists
        if (patientDocSnap.data().dementiaLevel) {
          // If dementiaLevel exists, update it
          await updateDoc(patientDocRef, {
            dementiaLevel: results.dementia_level,
            timestamp: new Date(),
          });
          Toaster.justToast("success", "Dementia level updated successfully!");
        } else {
          // If dementiaLevel doesn't exist, add it
          await updateDoc(patientDocRef, {
            dementiaLevel: results.dementia_level,
            timestamp: new Date(),
          });
          Toaster.justToast("success", "Dementia level saved successfully!");
        }
      } else {
        // If no patient with this ID exists, show an error
        Toaster.justToast(
          "error",
          "Patient ID not found in the records. Unable to save results."
        );
      }
    } catch (error) {
      console.error("Error saving results to Firebase:", error);
      Toaster.justToast("error", "Failed to save results. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* MRI Image Preview */}
            <div className="col-md-4 text-center">
              <div className="border p-2 bg-light rounded">
                <img
                  src={imagePreview}
                  alt="MRI Scan"
                  className="img-fluid"
                  style={{ maxHeight: "250px" }}
                />
              </div>
            </div>

            {/* Analysis Results */}
            <div className="col-md-8">
              <h4 className="fw-bold text-primary">Analysis Results</h4>
              <p className="text-muted">Patient ID: {patientId}</p>
              <p className="text-muted">Patient Name: {patientName}</p>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Dementia Level:
                </label>
                <span
                  className={`ms-2 ${getDementiaLevelClass(
                    results.dementia_level
                  )}`}
                >
                  {formatDementiaLevel(results.dementia_level)}
                </span>
                {getConfidenceIndicator(results.confidence)}
              </div>

              {/* Affected Brain Regions */}
              {/* {results.regions_affected && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Affected Brain Regions:
                  </label>
                  <ul className="list-group list-group-flush">
                    {results.regions_affected.map((region, index) => (
                      <li key={index} className="list-group-item">
                        {region}
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}

              {/* Recommendations */}
              {/* {results.recommendations && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Recommendations:
                  </label>
                  <p className="text-muted">{results.recommendations}</p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex flex-column flex-md-row justify-content-between mt-3">
        {/* <button
          className="btn btn-outline-secondary mb-2 mb-md-0"
          onClick={() => window.print()}
        >
          <i class="fa-solid fa-print"></i> Print Results
        </button> */}
        <button className="btn btn-primary mb-2 mb-md-0" onClick={onReset}>
          <i className="fa fa-arrow-rotate-right"></i> Analyze Another MRI
        </button>
        <button className="btn btn-success" onClick={saveResultsToFirebase}>
          <i class="fa-solid fa-cloud-arrow-up"></i> Save Scanning Results
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
