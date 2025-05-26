import React, { useState } from "react";
import Toaster from "../../../../Utils/Toaster/Toaster";

const ProgressionForm = ({ onSubmit, isLoading, onReset }) => {
  const initialState = {
    visits: [{}],
    numFutureVisits: "",
    intervalMonths: "",
  };

  const [visits, setVisits] = useState(initialState.visits);
  const [numFutureVisits, setNumFutureVisits] = useState(
    initialState.numFutureVisits
  );
  const [intervalMonths, setIntervalMonths] = useState(
    initialState.intervalMonths
  );

  const handleAddVisit = () => {
    setVisits([...visits, { mmse: "", cdr: "", age: "" }]);
  };

  const handleRemoveVisit = (index) => {
    const updatedVisits = [...visits];
    updatedVisits.splice(index, 1);
    setVisits(updatedVisits);
  };

  const handleVisitChange = (index, field, value) => {
    const updatedVisits = [...visits];
    updatedVisits[index][field] = value;
    setVisits(updatedVisits);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!numFutureVisits || !intervalMonths) {
      Toaster.justToast("error", "Please fill in all required fields.");
      return;
    }

    // Validate each visit data
    for (let visit of visits) {
      if (!visit.mmse || !visit.cdr || !visit.age) {
        Toaster.justToast("error", "Please fill in all required visit fields.");
        return;
      }
    }

    const data = {
      visits: visits.map((visit) => ({
        mmse: parseInt(visit.mmse),
        cdr: parseFloat(visit.cdr),
        age: parseInt(visit.age),
      })),
      num_future_visits: parseInt(numFutureVisits),
      interval_months: parseInt(intervalMonths),
    };
    onSubmit(data);
  };

  const handleReset = () => {
    setVisits(initialState.visits);
    setNumFutureVisits(initialState.numFutureVisits);
    setIntervalMonths(initialState.intervalMonths);
    if (onReset) onReset();
  };

  return (
    <div className="card rounded-4 overflow-hidden">
      {/* Modern Header with Gradient */}
      <div className="card-header bg-gradient-primary text-white border-0 p-4">
        <div className="d-flex align-items-center">
          <div>
            <h4 className="mb-1 fw-bold text-primary">
              Patient Assessment Form
            </h4>
          </div>
        </div>
      </div>

      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          {/* Patient Visits Section */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <div>
                  <h5 className="mb-1 fw-bold text-primary">Patient Visits</h5>
                  <p className="mb-0 text-muted small">
                    Add multiple visits for comprehensive analysis
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary px-4 py-2 shadow-sm"
                onClick={handleAddVisit}
                disabled={isLoading}
              >
                <i className="fas fa-plus me-2"></i>
                Add Visit
              </button>
            </div>

            <div className="row g-3">
              {visits.map((visit, index) => (
                <div key={index} className="col-12">
                  <div className="card border-2 border-light rounded-4 shadow-sm hover-shadow transition-all">
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                          <div
                            className={`badge ${
                              index === 0 ? "bg-primary" : "bg-primary"
                            } rounded-pill px-3 py-2 me-3`}
                          >
                            <i
                              className={`fas ${
                                index === 0 ? "fa-star" : "fa-calendar-alt"
                              } me-1`}
                            ></i>
                            {index === 0 ? "Baseline Visit" : `Visit ${index}`}
                          </div>
                        </div>
                        {visits.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm rounded-pill px-3"
                            onClick={() => handleRemoveVisit(index)}
                            disabled={isLoading}
                          >
                            <i className="fas fa-trash-alt me-1"></i>
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="row g-4">
                        <div className="col-md-4">
                          <div className="form-floating">
                            <input
                              type="number"
                              className="form-control rounded-3 border-2"
                              id={`mmse-${index}`}
                              value={visit.mmse}
                              onChange={(e) =>
                                handleVisitChange(index, "mmse", e.target.value)
                              }
                              min="0"
                              max="30"
                              placeholder="MMSE Score"
                              required
                              disabled={isLoading}
                            />
                            <label
                              htmlFor={`mmse-${index}`}
                              className="text-muted"
                            >
                              MMSE Score (0-30)
                            </label>
                          </div>
                          <div className="mt-2 px-3">
                            <small className="text-primary">
                              <i className="fas fa-info-circle me-1"></i>
                              Higher scores indicate better cognitive function
                            </small>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-floating">
                            <input
                              type="number"
                              className="form-control rounded-3 border-2"
                              id={`cdr-${index}`}
                              value={visit.cdr}
                              onChange={(e) =>
                                handleVisitChange(index, "cdr", e.target.value)
                              }
                              min="0"
                              max="3"
                              step="0.5"
                              placeholder="CDR Score"
                              required
                              disabled={isLoading}
                            />
                            <label
                              htmlFor={`cdr-${index}`}
                              className="text-muted"
                            >
                              CDR Score (0-3)
                            </label>
                          </div>
                          <div className="mt-2 px-3">
                            <small className="text-primary">
                              <i className="fas fa-info-circle me-1"></i>
                              Lower scores indicate better function
                            </small>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-floating">
                            <input
                              type="number"
                              className="form-control rounded-3 border-2"
                              id={`age-${index}`}
                              value={visit.age}
                              onChange={(e) =>
                                handleVisitChange(index, "age", e.target.value)
                              }
                              min="0"
                              placeholder="Patient Age"
                              required
                              disabled={isLoading}
                            />
                            <label
                              htmlFor={`age-${index}`}
                              className="text-muted"
                            >
                              Patient Age
                            </label>
                          </div>
                          <div className="mt-2 px-3">
                            <small className="text-primary">
                              <i className="fas fa-info-circle me-1"></i>
                              Age in years at time of visit
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prediction Settings Section */}
          <div className="card border-2 border-light rounded-4 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                <div>
                  <h5 className="mb-1 fw-bold text-primary">
                    Prediction Parameters
                  </h5>
                  <p className="mb-0 text-muted small">
                    Configure future visit predictions
                  </p>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control rounded-3 border-2"
                      id="numFutureVisits"
                      value={numFutureVisits}
                      onChange={(e) => setNumFutureVisits(e.target.value)}
                      min="1"
                      max="10"
                      placeholder="Number of Future Visits"
                      required
                      disabled={isLoading}
                    />
                    <label htmlFor="numFutureVisits" className="text-muted">
                      Future Visits to Predict
                    </label>
                  </div>
                  <div className="mt-2 px-3">
                    <small className="text-primary">
                      <i className="fas fa-lightbulb me-1"></i>
                      Recommend 1-3 visits for optimal analysis
                    </small>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control rounded-3 border-2"
                      id="intervalMonths"
                      value={intervalMonths}
                      onChange={(e) => setIntervalMonths(e.target.value)}
                      min="1"
                      placeholder="Interval in Months"
                      required
                      disabled={isLoading}
                    />
                    <label htmlFor="intervalMonths" className="text-muted">
                      Visit Interval (Months)
                    </label>
                  </div>
                  <div className="mt-2 px-3">
                    <small className="text-primary">
                      <i className="fas fa-lightbulb me-1"></i>
                      Standard intervals: 3, 6, or 12 months
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end gap-3">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 py-2"
              onClick={handleReset}
              disabled={isLoading}
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="btn btn-primary px-5 py-2 shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Analyzing...
                </>
              ) : (
                <>
                  Predict
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgressionForm;
