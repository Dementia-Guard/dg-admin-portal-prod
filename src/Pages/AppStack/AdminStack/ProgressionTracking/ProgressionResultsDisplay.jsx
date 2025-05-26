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

  // Helper function for progression status
  const getProgressionStatus = (value, metric) => {
    if (metric === 'mmse') {
      if (value < -3) return { text: "Rapid Decline", icon: "fa-arrow-down" };
      if (value < -1) return { text: "Moderate Decline", icon: "fa-arrow-down" };
      return { text: "Stable/Improving", icon: "fa-arrow-up" };
    } else {
      if (value > 0.5) return { text: "Rapid Decline", icon: "fa-arrow-up" };
      if (value > 0.2) return { text: "Moderate Decline", icon: "fa-arrow-up" };
      return { text: "Stable/Improving", icon: "fa-arrow-down" };
    }
  };

  return (
    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
      {/* Modern Header */}
      <div className="card-header bg-gradient-success text-white border-0 p-4">
        <div className="d-flex align-items-center">
          <div>
            <h4 className="mb-1 fw-bold text-primary">Comprehensive Analysis Report</h4>
            <p className="mb-0 opacity-90 small text-muted">Detailed insights into cognitive progression patterns</p>
          </div>
        </div>
      </div>

      <div className="card-body p-4">
        {/* Key Metrics Overview */}
        <div className="row g-5 mb-5">
          <div className="col-lg-12">
            <div className="card border-0 bg-gradient-primary text-white rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-center mb-3 gap-5">
                  <h5 className="mb-0 fw-bold text-primary">Annual Change Rates</h5>
                  <i className="fas fa-bolt fs-4 opacity-75 text-dark"></i>
                </div>
                
                <div className="row g-3">
                  <div className="col-6">
                    <div className="bg-white bg-opacity-20 rounded-3 p-3 text-center">
                      <div className={`badge bg-${getProgressionBadge(progression_rate.mmse_annual_change, 'mmse')} rounded-pill fs-6 px-3 py-2 mb-2`}>
                        {progression_rate.mmse_annual_change.toFixed(1)}
                      </div>
                      <h6 className="mb-1 fw-bold">MMSE Change</h6>
                      <small className="opacity-90 text-dark">Points per year</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-white bg-opacity-20 rounded-3 p-3 text-center">
                      <div className={`badge bg-${getProgressionBadge(progression_rate.cdr_annual_change, 'cdr')} rounded-pill fs-6 px-3 py-2 mb-2`}>
                        {progression_rate.cdr_annual_change.toFixed(1)}
                      </div>
                      <h6 className="mb-1 fw-bold">CDR Change</h6>
                      <small className="opacity-90 text-dark">Points per year</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-lg-6">
            <div className="card border-0 bg-gradient-info text-white rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-center mb-3 gap-5">
                  <h5 className="mb-0 fw-bold text-primary">Progression Trajectory</h5>
                  <i className="fas fa-route fs-4 opacity-75 text-dark"></i>
                </div>
                
                <div className="row g-3">
                  <div className="col-6">
                    <div className="bg-white bg-opacity-20 rounded-3 p-3 text-center">
                      <p>{console.log(getProgressionStatus(progression_rate.mmse_annual_change, 'mmse'))}</p>
                      <i className={`fas ${getProgressionStatus(progression_rate.mmse_annual_change, 'mmse').icon} fs-4 mb-2`}></i>
                      <h6 className="mb-1 fw-bold">MMSE</h6>
                      <small className="opacity-90 text-dark">{getProgressionStatus(progression_rate.mmse_annual_change, 'mmse').text}</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-white bg-opacity-20 rounded-3 p-3 text-center">
                      <i className={`fas ${getProgressionStatus(progression_rate.cdr_annual_change, 'cdr').icon} fs-4 mb-2`}></i>
                      <h6 className="mb-1 fw-bold">CDR</h6>
                      <small className="opacity-90 text-dark">{getProgressionStatus(progression_rate.cdr_annual_change, 'cdr').text}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Clinical Alert */}
        <div className={`alert ${progression_rate.rapid_progression ? 'alert-danger' : 'alert-success'} border-0 rounded-4 shadow-sm mb-5`}>
          <div className="d-flex align-items-start">
            <div className="flex-grow-1">
              <h5 className="fw-bold mb-2">
                {progression_rate.rapid_progression ? 'Clinical Alert: Rapid Progression' : 'Standard Progression Assessment'}
              </h5>
              <p className="mb-3">
                {progression_rate.rapid_progression 
                  ? 'The patient demonstrates accelerated cognitive decline patterns that warrant immediate clinical attention. Consider adjusting monitoring frequency and intervention strategies.' 
                  : 'The patient\'s cognitive metrics are progressing within expected ranges for their demographic and clinical profile. Continue with standard monitoring protocols.'}
              </p>
              <div className="d-flex gap-2">
                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                  <i className="fas fa-user-md me-1"></i>
                  Clinical Review Recommended
                </span>
                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                  <i className="fas fa-calendar-check me-1"></i>
                  {progression_rate.rapid_progression ? 'Urgent Follow-up' : 'Routine Follow-up'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Predictions Table */}
        <div className="card border-2 border-light rounded-4 shadow-sm">
          <div className="card-header bg-light border-0 p-4">
            <div className="d-flex align-items-center">
              <div>
                <h5 className="mb-1 fw-bold text-primary">Detailed Prediction Timeline</h5>
                <p className="mb-0 text-muted small">Comprehensive visit-by-visit progression analysis</p>
              </div>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="fw-bold text-primary border-0">
                      Visit
                    </th>
                    <th scope="col" className="fw-bold text-primary border-0">
                      Age
                    </th>
                    <th scope="col" className="fw-bold text-primary border-0">
                      MMSE Score
                    </th>
                    <th scope="col" className="fw-bold text-primary border-0">
                      MMSE Change
                    </th>
                    <th scope="col" className="fw-bold text-primary border-0">
                      CDR Score
                    </th>
                    <th scope="col" className="fw-bold text-primary border-0">
                      CDR Change
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Baseline Row */}
                  <tr className="bg-white bg-opacity-10">
                    <td className="px-4 py-5">
                      <span className="badge bg-success rounded-pill px-3 py-3">
                        <i className="fas fa-star me-1"></i>Baseline
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="fw-bold fs-5">{baseline.age}</span>
                      <small className="text-muted d-block">years</small>
                    </td>
                    <td className="py-3">
                      <span className="fw-bold fs-5">{baseline.mmse}</span>
                      <small className="text-muted d-block">/30</small>
                    </td>
                    <td className="py-3">
                      <span className="fw-bold fs-5">
                        {baseline.mmse_change}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="fw-bold fs-5">{baseline.cdr}</span>
                      <small className="text-muted d-block">/3</small>
                    </td>
                    <td className="py-3">
                      <span className="fw-bold fs-5">
                        {baseline.cdr_change}
                      </span>
                    </td>
                  </tr>

                  {/* Prediction Rows */}
                  {predictions.map((prediction, index) => (
                    <tr key={index} className="border-bottom">
                      <td className="px-4 py-3">
                        <span className="badge bg-primary bg-opacity-20 text-primary rounded-pill px-3 py-2">
                          <i className="fas fa-calendar me-1"></i>Visit {prediction.visit_number}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="fw-bold fs-5">{Math.floor(prediction.age)}</span>
                        <small className="text-muted d-block">years</small>
                      </td>
                      <td className="py-3">
                        <span className="fw-bold fs-5">{prediction.mmse}</span>
                        <small className="text-muted d-block">/30</small>
                      </td>
                      <td className="py-3">
                        <span className={`fw-bold fs-6 text-dark ${prediction.mmse_change < 0 ? 'bg-danger' : prediction.mmse_change > 0 ? 'bg-success' : 'bg-secondary'}`}>
                          <i className={`fas ${prediction.mmse_change < 0 ? 'fa-arrow-down' : prediction.mmse_change > 0 ? 'fa-arrow-up' : 'fa-minus'} me-1`}></i>
                          {prediction.mmse_change > 0 ? '+' : ''}{prediction.mmse_change}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="fw-bold fs-5">{prediction.cdr}</span>
                        <small className="text-muted d-block">/3</small>
                      </td>
                      <td className="py-3">
                        <span className={`fw-bold fs-6 text-dark ${prediction.cdr_change > 0 ? 'bg-danger' : prediction.cdr_change < 0 ? 'bg-success' : 'bg-secondary'}`}>
                          <i className={`fas ${prediction.cdr_change > 0 ? 'fa-arrow-up' : prediction.cdr_change < 0 ? 'fa-arrow-down' : 'fa-minus'} me-1`}></i>
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

        {/* Clinical Notes */}
        <div className="mt-4 p-4 bg-light rounded-4">
          <h6 className="fw-bold text-primary mb-3">
            <i className="fas fa-notes-medical me-2"></i>Clinical Interpretation Notes
          </h6>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="small">
                <strong>MMSE Score Interpretation:</strong>
                <ul className="mt-2 mb-0">
                  <li>24-30: Normal cognitive function</li>
                  <li>18-23: Mild cognitive impairment</li>
                  <li>0-17: Severe cognitive impairment</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="small">
                <strong>CDR Score Interpretation:</strong>
                <ul className="mt-2 mb-0">
                  <li>0: No dementia</li>
                  <li>0.5: Very mild dementia</li>
                  <li>1-3: Increasing severity levels</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressionResults;