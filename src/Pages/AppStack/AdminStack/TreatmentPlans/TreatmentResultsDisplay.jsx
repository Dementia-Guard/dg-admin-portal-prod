import React from "react";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../Firebase/config";
import Toaster from "../../../../Utils/Toaster/Toaster";
import PdfGenerator from "../../../../Utils/Pdfs/TreatmentPDFGenerator";

const TreatmentResultsDisplay = ({ treatmentPlan }) => {
  if (!treatmentPlan) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning py-4 shadow-sm">
          <i className="fas fa-exclamation-triangle me-2"></i>
          No treatment plan found. Please create a new plan.
        </div>
      </div>
    );
  }

  // Function to save data to Firebase
  const saveToFirebase = async () => {
    try {
      const treatmentDocRef = doc(db, "treatmentPlans", treatmentPlan.id);
      await setDoc(treatmentDocRef, treatmentPlan);
      Toaster.justToast("success", "Treatment Plan saved to Firebase!");
    } catch (error) {
      console.error("Error saving document: ", error);
      Toaster.justToast("error", "Failed to save treatment plan.");
    }
  };

  // Function to handle PDF generation
  const handleGeneratePdf = () => {
    console.log("Generating PDF...");
    PdfGenerator.generatePdf(treatmentPlan);
  };
  

  return (
    <div className="container mt-5">
      <div className="card shadow-lg rounded border-0 bg-light">
        <div className="card-header bg-light text-white py-3">
          <h4 className="mb-0 text-center text-primary">
            <i className="fas fa-clipboard-list me-2"></i>
            Treatment Plan
          </h4>
        </div>
        <div className="card-body bg-light p-4">
          <div className="row bg-light g-4">
            {/* Patient Information Section */}
            <div className="col-12 mb-3">
              <div className="card bg-light shadow-sm border-0 rounded-3">
                <div className="card-header bg-info bg-opacity-10 border-0">
                  <h5 className="text-white mb-0">
                    <i className="fas fa-user me-2"></i>
                    Patient Information
                  </h5>
                </div>
                <div className="card-body bg-light">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="icon-box me-2 bg-primary bg-opacity-10 p-2 rounded">
                          <i className="fa-solid fa-id-card-clip text-light"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">
                            First Name
                          </small>
                          <strong>{treatmentPlan.first_name}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="icon-box me-2 bg-primary bg-opacity-10 p-2 rounded">
                          <i className="fa-solid fa-id-card-clip text-light"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">
                            Last Name
                          </small>
                          <strong>{treatmentPlan.last_name}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Treatment Details Section */}
            <div className="col-md-6 mb-3">
              <div className="card h-100 bg-light shadow-sm border-0 rounded-3">
                <div className="card-header bg-success bg-opacity-10 border-0">
                  <h5 className="text-white mb-0">
                    <i className="fas fa-brain me-2"></i>
                    Diagnosis
                  </h5>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-box me-2 bg-success bg-opacity-10 p-2 rounded">
                      <i className="fa-solid fa-chart-line text-light"></i>
                    </div>
                    <div>
                      <small className="text-muted d-block">
                        Dementia Level
                      </small>
                      <span className="badge bg-success rounded-pill px-3 py-2">
                        {treatmentPlan.dementia_level}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="icon-box me-2 bg-success bg-opacity-10 p-2 rounded">
                      <i className="fa-solid fa-calendar-check text-light"></i>
                    </div>
                    <div>
                      <small className="text-muted d-block">
                        Visit Frequency
                      </small>
                      <span className="badge bg-info rounded-pill px-3 py-2">
                        {treatmentPlan.visit_frequency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card h-100 bg-light shadow-sm border-0 rounded-3">
                <div className="card-header bg-warning bg-opacity-10 border-0">
                  <h5 className="text-white mb-0">
                    <i className="fas fa-calendar-alt me-2"></i>
                    Schedule
                  </h5>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="icon-box me-2 bg-warning bg-opacity-10 p-2 rounded">
                      <i className="fa-solid fa-calendar-day text-light"></i>
                    </div>
                    <div>
                      <small className="text-muted d-block">
                        Next Appointment
                      </small>
                      <strong className="text-primary">
                        {treatmentPlan.next_appointment}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Treatment Recommendations Section */}
            <div className="col-12">
              <div className="card bg-light shadow-sm border-0 rounded-3">
                <div className="card-header bg-primary bg-opacity-10 border-0">
                  <h5 className="text-white mb-0">
                    <i className="fas fa-list-check me-2"></i>
                    Treatment Recommendations
                  </h5>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    {treatmentPlan.treatment_recommendation.map(
                      (recommendation, index) => (
                        <div
                          key={index}
                          className="list-group-item list-group-item-action border-0 mb-2 bg-light bg-opacity-50"
                        >
                          <div className="d-flex w-100 align-items-center">
                            <span className="badge bg-primary me-3">
                              {index + 1}
                            </span>
                            <p className="mb-0">{recommendation}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <Link to="/" className="btn btn-secondary text-white px-4 py-2">
              <i className="fas fa-arrow-left me-2"></i>
              Back to Dashboard
            </Link>
            <button
              className="btn btn-success text-white px-4 py-2"
              onClick={saveToFirebase}
            >
              <i className="fas fa-cloud-upload-alt me-2"></i>
              Save Plan
            </button>
            {/* Button to generate PDF */}
            <button
              className="btn btn-primary text-white px-4 py-2"
              onClick={handleGeneratePdf}
            >
              <i className="fas fa-file-pdf me-2"></i>
              Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentResultsDisplay;
