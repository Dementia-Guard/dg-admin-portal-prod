import React, { useState } from "react";

const ProgressionForm = ({ onSubmit, isLoading, onReset }) => {
  const initialState = {
    visits: [{ }],
    numFutureVisits: '',
    intervalMonths: ''
  };

  const [visits, setVisits] = useState(initialState.visits);
  const [numFutureVisits, setNumFutureVisits] = useState(initialState.numFutureVisits);
  const [intervalMonths, setIntervalMonths] = useState(initialState.intervalMonths);

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
    const data = {
      visits: visits.map(visit => ({
        mmse: parseInt(visit.mmse),
        cdr: parseFloat(visit.cdr),
        age: parseInt(visit.age)
      })),
      num_future_visits: parseInt(numFutureVisits),
      interval_months: parseInt(intervalMonths)
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
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white py-3 border-0">
        <h4 className="mb-0 fw-bold text-primary">Progression Prediction</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <label className="form-label fw-medium mb-0">Patient Visits</label>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary px-3"
                onClick={handleAddVisit}
              >
                <i className="fas fa-plus me-1"></i> Add Visit
              </button>
            </div>
            
            {visits.map((visit, index) => (
              <div key={index} className="card border mb-3">
                <div className="card-body py-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0 text-primary fw-medium">
                      {index === 0 ? "Baseline Visit" : `Visit ${index}`}
                    </h6>
                    {visits.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveVisit(index)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label small">MMSE Score (0-30)</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={visit.mmse}
                        onChange={(e) => handleVisitChange(index, "mmse", e.target.value)}
                        min="0"
                        max="30"
                        required
                      />
                      <small className="text-muted">Higher is better</small>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small">CDR Score (0-3)</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={visit.cdr}
                        onChange={(e) => handleVisitChange(index, "cdr", e.target.value)}
                        min="0"
                        max="3"
                        step="0.5"
                        required
                      />
                      <small className="text-muted">Lower is better</small>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small">Patient Age</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={visit.age}
                        onChange={(e) => handleVisitChange(index, "age", e.target.value)}
                        min="0"
                        required
                      />
                      <small className="text-muted">Years</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card border mb-4">
            <div className="card-body py-3">
              <h6 className="mb-3 text-primary fw-medium">Prediction Settings</h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small">Number of Future Visits</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={numFutureVisits}
                    onChange={(e) => setNumFutureVisits(e.target.value)}
                    min="1"
                    max="10"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small">Interval Between Visits (months)</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={intervalMonths}
                    onChange={(e) => setIntervalMonths(e.target.value)}
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={handleReset}
              disabled={isLoading}
            >
              <i className="fas fa-undo me-1"></i> Reset
            </button>
            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-chart-line me-1"></i> Predict
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