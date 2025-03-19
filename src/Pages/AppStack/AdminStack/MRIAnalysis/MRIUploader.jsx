import React, { useState, useRef } from "react";
import axios from "axios";
import ResultsDisplay from "./ResultsDisplay";
import Toaster from "../../../../Utils/Toaster/Toaster";

const API_URL =
  "https://api-gateway-341015716129.asia-southeast1.run.app/api/v1/mri-service/predict/";

const MRIUploader = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
      setResults(null);
      setError(null);
    }
  };

  // Upload file and get results
  const handleUpload = async () => {
    if (!file) {
      setError("Please select an MRI image.");
      Toaster.justToast("error", "Please select an MRI image.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;
      setResults({
        dementia_level: data.predicted_class,
        confidence: data.confidence_scores[data.predicted_class],
      });
    } catch (err) {
      console.error("Upload error:", err);
      setError("Prediction failed. Please try again.");
      Toaster.justToast("error", "Prediction failed. Please try again.");
    }

    setLoading(false);
  };

  // Handle drag-and-drop
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  // Reset form for new analysis
  const handleReset = () => {
    setFile(null);
    setFilePreview(null);
    setResults(null);
    setError(null);
    setPatientId("");
    setPatientName("");
  };

  return (
    <div className="container mt-4">
      {!results ? (
        <>
          {/* Patient Id Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Patient ID:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
          </div>

          {/* Patient Name Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Patient Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>

          {/* File Upload Box */}
          <div
            className={`border border-2 border-dashed rounded p-4 text-center ${
              filePreview ? "border-primary" : "border-secondary"
            }`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ minHeight: "200px", cursor: "pointer" }}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="d-none"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />

            {filePreview ? (
              <div>
                <img
                  src={filePreview}
                  alt="MRI Preview"
                  className="img-fluid mb-2"
                  style={{ maxHeight: "150px" }}
                />
                <p className="small text-muted">Click to replace</p>
              </div>
            ) : (
              <div>
                <i className="bi bi-cloud-upload h2 text-muted"></i>
                <p className="mt-2">Click to upload or drag & drop</p>
                <p className="small text-muted">
                  MRI images only (PNG, JPG, DICOM)
                </p>
              </div>
            )}
          </div>

          {error && <p className="text-danger mt-2">{error}</p>}

          {/* Upload Button */}
          <button
            className="btn btn-primary mt-3 w-100"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze MRI"}
          </button>
        </>
      ) : (
        <ResultsDisplay
          results={results}
          patientId={patientId}
          patientName={patientName}
          imagePreview={filePreview}
          file={file}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default MRIUploader;
