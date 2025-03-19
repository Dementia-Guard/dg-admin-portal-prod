import React from "react";

const ProgressionResults = ({ results }) => {
  if (!results) return null;

  const { baseline, predictions, progression_rate } = results;

  // Helper function for determining status badge color
  const getProgressionBadge = (value, metric) => {
    if (metric === 'mmse') {
      if (value < -3) return "danger";
      if (value < -1) return "warning";
      return "success";
    } else { // cdr
      if (value > 0.5) return "danger";
      if (value > 0.2) return "warning";
      return "success";
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white py-3 border-0">
        <h4 className="mb-0 text-primary fw-bold">Detailed Progression Analysis</h4>
      </div>
      <div className="card-body">
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card border-0 bg-light h-100">
              <div className="card-body">
                <h6 className="card-title fw-bold mb-3">Annual Change Rate</h6>
                <div className="d-flex align-items-center mb-3">
                  <div className="flex-shrink-0 me-3">
                    <span className={`badge rounded-pill bg-${getProgressionBadge(progression_rate.mmse_annual_change, 'mmse')} p-2`}>
                      {progression_rate.mmse_annual_change.toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-medium">MMSE Annual Change</h6>
                    <small className="text-muted">Points per year</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <span className={`badge rounded-pill bg-${getProgressionBadge(progression_rate.cdr_annual_change, 'cdr')} p-2`}>
                      {progression_rate.cdr_annual_change.toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-medium">CDR Annual Change</h6>
                    <small className="text-muted">Points per year</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-3 mt-md-0">
            <div className="card border-0 bg-light h-100">
              <div className="card-body">
                <h6 className="card-title fw-bold mb-3">Progression Trajectory</h6>
                <div className="d-flex align-items-center mb-3">
                  <div className="flex-shrink-0 me-3">
                    <i className={`fas fa-arrow-${progression_rate.mmse_trajectory.includes('Stable') ? 'right text-success' : 'down text-danger'} fa-lg`}></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-medium">MMSE Trajectory</h6>
                    <small>{progression_rate.mmse_trajectory}</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <i className={`fas fa-arrow-${progression_rate.cdr_trajectory.includes('Stable') ? 'right text-success' : 'up text-danger'} fa-lg`}></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-medium">CDR Trajectory</h6>
                    <small>{progression_rate.cdr_trajectory}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="alert alert-light border mb-4">
          <div className="d-flex">
            <div className="flex-shrink-0 me-3">
              <i className={`fas fa-${progression_rate.rapid_progression ? 'exclamation-triangle text-danger' : 'check-circle text-success'} fa-lg`}></i>
            </div>
            <div>
              <h6 className="mb-1 fw-bold">
                {progression_rate.rapid_progression ? 'Rapid Progression Detected' : 'Standard Progression Pattern'}
              </h6>
              <p className="mb-0 small">
                {progression_rate.rapid_progression 
                  ? 'The patient shows signs of accelerated cognitive decline that may require more frequent monitoring and intervention adjustments.' 
                  : 'The patient\'s cognitive metrics are changing at a rate consistent with standard progression patterns.'}
              </p>
            </div>
          </div>
        </div>

        <h4 className="fw-bold text-primary mb-3">Detailed Predictions</h4>
        <div className="table-responsive">
          <table className="table table-hover border">
            <thead className="bg-light">
              <tr>
                <th scope="col" className="fw-medium">Visit</th>
                <th scope="col" className="fw-medium">Age</th>
                <th scope="col" className="fw-medium">MMSE</th>
                <th scope="col" className="fw-medium">MMSE Change</th>
                <th scope="col" className="fw-medium">CDR</th>
                <th scope="col" className="fw-medium">CDR Change</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-light">
                <td><span className="badge bg-primary">Baseline</span></td>
                <td>{baseline.age}</td>
                <td>{baseline.mmse}</td>
                <td>{baseline.mmse_change}</td>
                <td>{baseline.cdr}</td>
                <td>{baseline.cdr_change}</td>
              </tr>
              {predictions.map((prediction, index) => (
                <tr key={index}>
                  <td>Visit {prediction.visit_number}</td>
                  <td>{Math.floor(prediction.age)}</td>
                  <td>{prediction.mmse}</td>
                  <td>
                    <span className={prediction.mmse_change < 0 ? 'text-danger' : 'text-success'}>
                      {prediction.mmse_change > 0 ? '+' : ''}{prediction.mmse_change}
                    </span>
                  </td>
                  <td>{prediction.cdr}</td>
                  <td>
                    <span className={prediction.cdr_change > 0 ? 'text-danger' : 'text-success'}>
                      {prediction.cdr_change > 0 ? '+' : ''}{prediction.cdr_change}
                    </span>
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

export default ProgressionResults;