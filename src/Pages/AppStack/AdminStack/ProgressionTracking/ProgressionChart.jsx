import React, { useRef, useEffect, useState } from "react";

const ProgressionChart = ({ results }) => {
  if (!results || !results.predictions || results.predictions.length === 0) {
    return null;
  }

  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(600);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth(); // Initial width
    window.addEventListener("resize", updateWidth); // Update on resize

    return () => window.removeEventListener("resize", updateWidth); // Cleanup
  }, []);

  // Combine baseline and predictions
  const allData = [results.baseline, ...results.predictions];

  // Enhanced chart configuration
  const chartConfig = {
    height: 380,
    padding: { top: 40, right: 80, bottom: 80, left: 80 },
    colors: {
      mmse: "#4361ee",
      cdr: "#ef476f",
      grid: "#e9ecef",
      background: "#ffffff",
      text: "#495057",
      accent: "#f8f9fa",
    },
    maxValues: {
      mmse: 30,
      cdr: 3,
    },
  };

  const innerHeight =
    chartConfig.height - chartConfig.padding.top - chartConfig.padding.bottom;
  const innerWidth =
    chartWidth - chartConfig.padding.left - chartConfig.padding.right;
  const xStep = innerWidth / (allData.length - 1);

  // Get X position based on index
  const getXPosition = (index) => chartConfig.padding.left + index * xStep;

  // Get Y position for MMSE and CDR
  const getYPosition = (value, maxValue) => {
    const normalizedValue = value / maxValue;
    return (
      chartConfig.height -
      (normalizedValue * innerHeight + chartConfig.padding.bottom)
    );
  };

  return (
    <div
      ref={containerRef}
      className="card border-0 shadow-lg rounded-4 overflow-hidden"
    >
      {/* Modern Header */}
      <div className="card-header bg-gradient-info text-white border-0 p-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div>
              <h4 className="mb-1 fw-bold text-primary">
                Cognitive Progression Visualization
              </h4>
              <p className="mb-0 opacity-90 small text-muted">
                Interactive timeline of MMSE and CDR scores
              </p>
            </div>
          </div>

          {/* Modern Legend */}
          <div className="d-flex gap-4">
            <div className="d-flex align-items-center bg-white bg-opacity-20 rounded-pill px-3 py-2">
              <div
                className="rounded-circle me-2"
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: chartConfig.colors.mmse,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              ></div>
              <span className="small fw-medium text-dark">MMSE (0-30)</span>
            </div>
            <div className="d-flex align-items-center bg-white bg-opacity-20 rounded-pill px-3 py-2">
              <div
                className="rounded-circle me-2"
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: chartConfig.colors.cdr,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              ></div>
              <span className="small fw-medium text-dark">CDR (0-3)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body p-4">
        {/* Chart Container */}
        <div className="bg-light rounded-4 p-3 mb-4">
          <div
            style={{
              position: "relative",
              height: `${chartConfig.height}px`,
              width: "100%",
            }}
          >
            {/* Enhanced Chart Background */}
            <div
              style={{
                position: "absolute",
                width: "100%", // Full width of the SVG container
                top: `${chartConfig.padding.top}px`,
                bottom: `${chartConfig.padding.bottom}px`,
                backgroundColor: chartConfig.colors.background,
                borderRadius: "12px",
                border: `2px solid ${chartConfig.colors.grid}`,
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
              }}
            >
              {/* Enhanced Grid Lines */}
              {/* MMSE Grid Lines */}
              {[0, 10, 20, 30].map((value) => (
                <div
                  key={`grid-mmse-${value}`}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: `${
                      getYPosition(value, chartConfig.maxValues.mmse) -
                      chartConfig.padding.top
                    }px`,
                    borderTop: `1px dashed ${
                      value === 0 ? "transparent" : chartConfig.colors.grid
                    }`,
                    zIndex: 1,
                  }}
                />
              ))}

              {/* CDR Grid Lines */}
              {[0, 1, 2, 3].map((value) => (
                <div
                  key={`grid-cdr-${value}`}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: `${
                      getYPosition(value, chartConfig.maxValues.cdr) -
                      chartConfig.padding.top
                    }px`,
                    borderTop:
                      value === 0
                        ? "none"
                        : `1px dotted ${chartConfig.colors.grid}`,
                    zIndex: 1,
                  }}
                />
              ))}

              {/* Visit Markers */}
              {allData.map((_, index) => (
                <div
                  key={`visit-marker-${index}`}
                  style={{
                    position: "absolute",
                    left: `${getXPosition(index) - 1}px`,
                    top: 0,
                    bottom: 0,
                    width: "2px",
                    backgroundColor:
                      index === 0
                        ? chartConfig.colors.mmse
                        : chartConfig.colors.grid,
                    opacity: index === 0 ? 0.3 : 0.2,
                    zIndex: 1,
                  }}
                />
              ))}
            </div>

            {/* Enhanced SVG with Gradients */}
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <defs>
                {/* Gradient definitions */}
                <linearGradient
                  id="mmseGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor={chartConfig.colors.mmse}
                    stopOpacity="0.8"
                  />
                  <stop
                    offset="100%"
                    stopColor={chartConfig.colors.mmse}
                    stopOpacity="1"
                  />
                </linearGradient>
                <linearGradient
                  id="cdrGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor={chartConfig.colors.cdr}
                    stopOpacity="0.8"
                  />
                  <stop
                    offset="100%"
                    stopColor={chartConfig.colors.cdr}
                    stopOpacity="1"
                  />
                </linearGradient>

                {/* Drop shadow filter */}
                <filter
                  id="dropshadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="2"
                    stdDeviation="3"
                    floodColor="#000000"
                    floodOpacity="0.2"
                  />
                </filter>
              </defs>

              {/* MMSE trend line with enhanced styling */}
              <polyline
                points={allData
                  .map(
                    (item, index) =>
                      `${getXPosition(index)},${getYPosition(
                        item.mmse,
                        chartConfig.maxValues.mmse
                      )}`
                  )
                  .join(" ")}
                fill="none"
                stroke="url(#mmseGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#dropshadow)"
              />

              {/* CDR trend line with enhanced styling */}
              <polyline
                points={allData
                  .map(
                    (item, index) =>
                      `${getXPosition(index)},${getYPosition(
                        item.cdr,
                        chartConfig.maxValues.cdr
                      )}`
                  )
                  .join(" ")}
                fill="none"
                stroke="url(#cdrGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#dropshadow)"
              />

              {/* Enhanced MMSE data points */}
              {allData.map((item, index) => (
                <g key={`mmse-point-${index}`}>
                  <circle
                    cx={getXPosition(index)}
                    cy={getYPosition(item.mmse, chartConfig.maxValues.mmse)}
                    r="6"
                    fill="white"
                    stroke={chartConfig.colors.mmse}
                    strokeWidth="3"
                    filter="url(#dropshadow)"
                  />
                  {index === 0 && (
                    <circle
                      cx={getXPosition(index)}
                      cy={getYPosition(item.mmse, chartConfig.maxValues.mmse)}
                      r="3"
                      fill={chartConfig.colors.mmse}
                    />
                  )}
                </g>
              ))}

              {/* Enhanced CDR data points */}
              {allData.map((item, index) => (
                <g key={`cdr-point-${index}`}>
                  <circle
                    cx={getXPosition(index)}
                    cy={getYPosition(item.cdr, chartConfig.maxValues.cdr)}
                    r="6"
                    fill="white"
                    stroke={chartConfig.colors.cdr}
                    strokeWidth="3"
                    filter="url(#dropshadow)"
                  />
                  {index === 0 && (
                    <circle
                      cx={getXPosition(index)}
                      cy={getYPosition(item.cdr, chartConfig.maxValues.cdr)}
                      r="3"
                      fill={chartConfig.colors.cdr}
                    />
                  )}
                </g>
              ))}

              {/* Visit labels */}
              {allData.map((_, index) => (
                <text
                  key={`label-${index}`}
                  x={getXPosition(index)}
                  y={chartConfig.height - 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill={chartConfig.colors.text}
                  fontWeight="500"
                >
                  {index === 0 ? "Baseline" : `Visit ${index}`}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Enhanced Status Footer */}
        <div
          className={`alert ${
            results.progression_rate.rapid_progression
              ? "alert-danger"
              : "alert-success"
          } rounded-4 border-0 shadow-sm`}
        >
          <div className="d-flex align-items-center">
            <div
              className={`bg-${
                results.progression_rate.rapid_progression
                  ? "danger"
                  : "success"
              } bg-opacity-20 rounded-3 p-3 me-3`}
            >
              <i
                className={`fas ${
                  results.progression_rate.rapid_progression
                    ? "fa-solid fa-exclamation-triangle text-danger"
                    : "fa-solid fa-check-circle text-white"
                } fs-5`}
              ></i>
            </div>
            <div>
              <h6 className="mb-1 fw-bold">
                {results.progression_rate.rapid_progression
                  ? "Rapid Progression Alert"
                  : "Standard Progression Pattern"}
              </h6>
              <p className="mb-0 small">
                {results.progression_rate.rapid_progression
                  ? "The analysis indicates accelerated cognitive decline requiring immediate attention"
                  : "Cognitive changes are within expected parameters for the patient profile"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressionChart;
