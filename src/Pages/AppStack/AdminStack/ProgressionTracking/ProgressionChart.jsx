import React, { useRef, useEffect, useState } from "react";

const ProgressionChart = ({ results }) => {
  if (!results || !results.predictions || results.predictions.length === 0) {
    return null;
  }

  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(600);

  useEffect(() => {
    if (containerRef.current) {
      setChartWidth(containerRef.current.clientWidth);
    }
  }, []);

  // Combine baseline and predictions
  const allData = [results.baseline, ...results.predictions];

  // Chart configuration
  const chartConfig = {
    height: 320,
    padding: { top: 30, right: 60, bottom: 60, left: 60 },
    colors: {
      mmse: "#4361ee",
      cdr: "#ef476f",
      grid: "#e9ecef",
      background: "#ffffff",
      text: "#495057",
    },
    maxValues: {
      mmse: 30,
      cdr: 3,
    },
  };

  const innerHeight = chartConfig.height - chartConfig.padding.top - chartConfig.padding.bottom;
  const innerWidth = chartWidth - chartConfig.padding.left - chartConfig.padding.right;
  const xStep = innerWidth / (allData.length - 1);

  // Get X position based on index
  const getXPosition = (index) => chartConfig.padding.left + index * xStep;

  // Get Y position for MMSE and CDR
  const getYPosition = (value, maxValue) => {
    const normalizedValue = value / maxValue;
    return chartConfig.height - (normalizedValue * innerHeight + chartConfig.padding.bottom);
  };

  return (
    <div ref={containerRef} className="card shadow-sm border-0 mb-4 overflow-hidden">
      <div className="card-header bg-white py-3 border-0">
        <h4 className="mb-0 text-primary fw-bold">Progression Visualization</h4>
      </div>
      <div className="card-body pt-0 pb-4">
        <div className="d-flex justify-content-end mb-2">
          <div className="d-flex align-items-center me-4">
            <div style={{ width: 8, height: 8, backgroundColor: chartConfig.colors.mmse, borderRadius: "50%", marginRight: 8 }}></div>
            <span className="small text-secondary">MMSE Score (0-30)</span>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ width: 8, height: 8, backgroundColor: chartConfig.colors.cdr, borderRadius: "50%", marginRight: 8 }}></div>
            <span className="small text-secondary">CDR Score (0-3)</span>
          </div>
        </div>

        <div style={{ position: "relative", height: `${chartConfig.height}px`, width: "100%", marginBottom: "10px" }}>
          {/* Chart container */}
          <div
            style={{
              position: "absolute",
              left: `${chartConfig.padding.left}px`,
              right: `${chartConfig.padding.right}px`,
              top: `${chartConfig.padding.top}px`,
              bottom: `${chartConfig.padding.bottom}px`,
              backgroundColor: chartConfig.colors.background,
              borderLeft: `1px solid ${chartConfig.colors.grid}`,
              borderBottom: `1px solid ${chartConfig.colors.grid}`,
            }}
          >
            {/* Horizontal grid lines */}
            {[0, 10, 20, 30].map((value) => (
              <div
                key={`grid-mmse-${value}`}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: `${getYPosition(value, chartConfig.maxValues.mmse) - chartConfig.padding.top}px`,
                  borderTop: `1px dashed ${chartConfig.colors.grid}`,
                  zIndex: 1,
                }}
              />
            ))}

            {[0, 1, 2, 3].map((value) => (
              <div
                key={`grid-cdr-${value}`}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: `${getYPosition(value, chartConfig.maxValues.cdr) - chartConfig.padding.top}px`,
                  borderTop: value === 0 ? "none" : `1px dotted ${chartConfig.colors.grid}`,
                  zIndex: 1,
                }}
              />
            ))}

            {/* Vertical visit lines */}
            {allData.map((_, index) => (
              <div
                key={`visit-line-${index}`}
                style={{
                  position: "absolute",
                  left: `${getXPosition(index)}px`,
                  top: 0,
                  bottom: 0,
                  width: "1px",
                  backgroundColor: index === 0 ? "transparent" : chartConfig.colors.grid,
                  zIndex: 1,
                }}
              />
            ))}
          </div>

          {/* SVG for trend lines and data points */}
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            {/* MMSE trend line */}
            <polyline
              points={allData.map((item, index) => `${getXPosition(index)},${getYPosition(item.mmse, chartConfig.maxValues.mmse)}`).join(" ")}
              fill="none"
              stroke={chartConfig.colors.mmse}
              strokeWidth="2"
              strokeOpacity="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* CDR trend line */}
            <polyline
              points={allData.map((item, index) => `${getXPosition(index)},${getYPosition(item.cdr, chartConfig.maxValues.cdr)}`).join(" ")}
              fill="none"
              stroke={chartConfig.colors.cdr}
              strokeWidth="2"
              strokeOpacity="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* MMSE data points */}
            {allData.map((item, index) => (
              <circle key={`mmse-${index}`} cx={getXPosition(index)} cy={getYPosition(item.mmse, chartConfig.maxValues.mmse)} r="4" fill={chartConfig.colors.mmse} />
            ))}

            {/* CDR data points */}
            {allData.map((item, index) => (
              <circle key={`cdr-${index}`} cx={getXPosition(index)} cy={getYPosition(item.cdr, chartConfig.maxValues.cdr)} r="4" fill={chartConfig.colors.cdr} />
            ))}
          </svg>
        </div>

        {/* Chart footer */}
        <div className={`mt-2 small text-center ${results.progression_rate.rapid_progression ? "text-danger" : "text-success"}`}>
          {results.progression_rate.rapid_progression ? (
            <span>
              <i className="fas fa-exclamation-triangle me-1"></i> Showing rapid cognitive decline pattern
            </span>
          ) : (
            <span>
              <i className="fas fa-check-circle me-1"></i> Progression within expected parameters
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressionChart;
