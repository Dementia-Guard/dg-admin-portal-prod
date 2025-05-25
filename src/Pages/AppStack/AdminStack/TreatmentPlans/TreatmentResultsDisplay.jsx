import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../Firebase/config";
import Toaster from "../../../../Utils/Toaster/Toaster";
import PdfGenerator from "../../../../Utils/Pdfs/TreatmentPDFGenerator";

const TreatmentResultsDisplay = ({ treatmentPlan, formData }) => {
  const [savedStatus, setSavedStatus] = useState("idle");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  if (!treatmentPlan) {
    return (
      <div
        className="container-fluid vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "white",
        }}
      >
        <div
          className="card border-0 shadow-lg"
          style={{
            maxWidth: "400px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="card-body text-center p-5">
            <div className="mb-4">
              <i
                className="fas fa-exclamation-triangle text-warning"
                style={{ fontSize: "3rem" }}
              ></i>
            </div>
            <h4 className="card-title text-dark mb-3">
              No Treatment Plan Found
            </h4>
            <p className="card-text text-muted">
              Please create a new treatment plan to continue.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const saveToFirebase = async () => {
    setSavedStatus("saving");
    try {
      const treatmentDocRef = doc(db, "treatmentPlans", treatmentPlan.id);
      await setDoc(treatmentDocRef, treatmentPlan);
      setSavedStatus("success");
      Toaster.justToast("success", "Treatment Plan saved to Firebase!");
      setTimeout(() => setSavedStatus("idle"), 2000);
    } catch (error) {
      console.error("Error saving document: ", error);
      setSavedStatus("error");
      Toaster.justToast("error", "Failed to save treatment plan.");
      setTimeout(() => setSavedStatus("idle"), 2000);
    }
  };

  const handleGeneratePdf = () => {
    console.log("Generating PDF...");
    PdfGenerator.generatePdf(treatmentPlan);
  };

  const getSaveButtonContent = () => {
    switch (savedStatus) {
      case "saving":
        return (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            ></span>
            Saving...
          </>
        );
      case "success":
        return (
          <>
            <i className="fas fa-check-circle me-2"></i>
            Saved!
          </>
        );
      case "error":
        return (
          <>
            <i className="fas fa-exclamation-circle me-2"></i>
            Failed
          </>
        );
      default:
        return (
          <>
            <i className="fas fa-cloud-upload-alt me-2"></i>
            Save Plan
          </>
        );
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 py-4"
      style={{
        background: "white",
      }}
    >
      <style jsx>{`
        .modern-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        .modern-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
        }
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease forwards;
        }
        .fade-in-delay-1 {
          animation-delay: 0.1s;
        }
        .fade-in-delay-2 {
          animation-delay: 0.2s;
        }
        .fade-in-delay-3 {
          animation-delay: 0.3s;
        }
        .fade-in-delay-4 {
          animation-delay: 0.4s;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .recommendation-item {
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
        }
        .recommendation-item:hover {
          border-left-color: #28a745;
          background: rgba(40, 167, 69, 0.05) !important;
        }

        .btn-modern {
          border-radius: 12px;
          padding: 12px 24px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .btn-modern:hover {
          transform: translateY(-1px);
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className={`row mb-4 ${isLoaded ? "fade-in" : ""}`}>
          <div className="col-12">
            <div className="card modern-card border-0 shadow-lg">
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div
                      className="icon-wrapper me-3"
                      style={{
                        background: "linear-gradient(45deg, #28a745, #20c997)",
                      }}
                    >
                      <i className="fas fa-clipboard-list text-white fs-5"></i>
                    </div>
                    <div>
                      <h4 className="mb-1  text-primary">Treatment Plan</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div
          className={`row mb-4 ${isLoaded ? "fade-in fade-in-delay-1" : ""}`}
        >
          <div className="col-12">
            <div className="card modern-card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0">
                <div className="d-flex align-items-center">
                  <div
                    className="icon-wrapper me-3"
                    style={{ background: "rgba(0, 123, 255, 0.1)" }}
                  >
                    <i className="fas fa-user text-primary"></i>
                  </div>
                  <h4 className="mb-0 text-dark">Patient Information</h4>
                </div>
              </div>
              <div className="card-body pt-3">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div
                      className="p-3 rounded-3"
                      style={{
                        background: "rgba(0, 123, 255, 0.05)",
                        border: "1px solid rgba(0, 123, 255, 0.1)",
                      }}
                    >
                      <small className="text-muted d-block mb-1">
                        First Name
                      </small>
                      <h6 className="mb-0 text-dark fw-semibold">
                        {treatmentPlan.first_name}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="p-3 rounded-3"
                      style={{
                        background: "rgba(0, 123, 255, 0.05)",
                        border: "1px solid rgba(0, 123, 255, 0.1)",
                      }}
                    >
                      <small className="text-muted d-block mb-1">
                        Last Name
                      </small>
                      <h6 className="mb-0 text-dark fw-semibold">
                        {treatmentPlan.last_name}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis and Schedule */}
        <div className="row mb-4 g-4">
          {/* Diagnosis */}
          <div
            className={`col-lg-6 ${isLoaded ? "fade-in fade-in-delay-2" : ""}`}
          >
            <div className="card modern-card border-0 shadow h-100">
              <div className="card-header border-0 bg-transparent pb-0">
                <div className="d-flex align-items-center">
                  <div
                    className="icon-wrapper me-3"
                    style={{ background: "rgba(40, 167, 69, 0.1)" }}
                  >
                    <i className="fas fa-brain text-success"></i>
                  </div>
                  <h4 className="mb-0 text-dark">Diagnosis</h4>
                </div>
              </div>
              <div className="card-body pt-3">
                <div className="mb-3">
                  <div
                    className="p-3 rounded-3"
                    style={{
                      background: "rgba(40, 167, 69, 0.05)",
                      border: "1px solid rgba(40, 167, 69, 0.1)",
                    }}
                  >
                    <small className="text-muted d-block mb-2">
                      Dementia Level
                    </small>
                    <span className="text-dark px-3 py-2">
                      <i className="fas fa-chart-line text-primary me-2"></i>
                      {treatmentPlan.dementia_level}
                    </span>
                  </div>
                </div>
                <div
                  className="p-3 rounded-3"
                  style={{
                    background: "rgba(0, 123, 255, 0.05)",
                    border: "1px solid rgba(0, 123, 255, 0.1)",
                  }}
                >
                  <small className="text-muted d-block mb-2">
                    Visit Frequency
                  </small>
                  <span className="text-dark px-3 py-2">
                    <i className="fas fa-calendar-check text-primary me-2"></i>
                    {treatmentPlan.visit_frequency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div
            className={`col-lg-6 ${isLoaded ? "fade-in fade-in-delay-2" : ""}`}
          >
            <div className="card modern-card border-0 shadow h-100">
              <div className="card-header border-0 bg-transparent pb-0">
                <div className="d-flex align-items-center">
                  <div
                    className="icon-wrapper me-3"
                    style={{ background: "rgba(255, 193, 7, 0.1)" }}
                  >
                    <i className="fas fa-calendar-alt text-warning"></i>
                  </div>
                  <h4 className="mb-0 text-dark">Schedule</h4>
                </div>
              </div>
              <div className="card-body pt-3">
                <div className="mb-3">
                  <div
                    className="p-3 rounded-3"
                    style={{
                      background: "rgba(255, 193, 7, 0.05)",
                      border: "1px solid rgba(255, 193, 7, 0.1)",
                    }}
                  >
                    <div className="d-flex align-items-center mb-2">
                      <small className="text-muted">Appointment Date</small>
                    </div>
                  <span className="text-dark px-3 py-2">
                    <i className="fas fa-calendar-day text-warning me-2"></i>
                    {treatmentPlan.appointmentDate}
                  </span>
                  </div>
                </div>
                <div
                  className="p-3 rounded-3"
                  style={{
                    background: "rgba(255, 193, 7, 0.05)",
                    border: "1px solid rgba(255, 193, 7, 0.1)",
                  }}
                >
                  <div className="d-flex align-items-center mb-2">
                    <small className="text-muted">Appointment Time</small>
                  </div>
                  <span className="text-dark px-3 py-2">
                    <i className="fas fa-clock text-warning me-2"></i>
                    {treatmentPlan.timeSlot}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Recommendations */}
        <div
          className={`row mb-4 ${isLoaded ? "fade-in fade-in-delay-3" : ""}`}
        >
          <div className="col-12">
            <div className="card modern-card border-0 shadow">
              <div className="card-header border-0 bg-transparent pb-0">
                <div className="d-flex align-items-center">
                  <div
                    className="icon-wrapper me-3"
                    style={{ background: "rgba(40, 167, 69, 0.1)" }}
                  >
                    <i className="fas fa-list-check text-success"></i>
                  </div>
                  <h4 className="mb-0 text-dark">Treatment Recommendations</h4>
                </div>
              </div>
              <div className="card-body pt-3">
                <div className="list-group list-group-flush">
                  {treatmentPlan.treatment_recommendation.map(
                    (recommendation, index) => {
                      // Remove the numbering (e.g., "1. ") from the recommendation text
                      const cleanedRecommendation = recommendation.replace(/^\d+\.\s*/, '');
                      return (
                        <div
                          key={index}
                          className="list-group-item recommendation-item border-0 bg-transparent p-3 mb-2 rounded-3"
                          style={{
                            background: "rgba(248, 249, 250, 0.5) !important",
                            border: "1px solid rgba(0,0,0,0.05) !important",
                          }}
                        >
                          <div className="d-flex align-items-start">
                            <div className="flex-shrink-0 me-3">
                              <span
                                className="badge rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  background:
                                    "linear-gradient(45deg, #28a745, #20c997)",
                                  color: "white",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              >
                                {index + 1}
                              </span>
                            </div>
                            <p className="mb-0 text-dark lh-base">
                              {cleanedRecommendation}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`row ${isLoaded ? "fade-in fade-in-delay-4" : ""}`}>
          <div className="col-12">
            <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
              <Link
                to="/"
                className="btn btn-outline-light btn-modern text-primary"
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Dashboard
              </Link>

              <div className="d-flex gap-3 flex-wrap">
                <button
                  className={`btn btn-modern ${
                    savedStatus === "success"
                      ? "btn-success"
                      : savedStatus === "error"
                      ? "btn-danger"
                      : "btn-success"
                  }`}
                  onClick={saveToFirebase}
                  disabled={savedStatus === "saving"}
                >
                  {getSaveButtonContent()}
                </button>

                <button
                  className="btn btn-primary btn-modern"
                  onClick={handleGeneratePdf}
                >
                  <i className="fas fa-file-pdf me-2"></i>
                  Generate PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentResultsDisplay;