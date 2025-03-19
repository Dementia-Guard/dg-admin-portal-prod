import React from "react";
import { db, storage } from "../../../../Firebase/config";
import {
  getDocs,
  updateDoc,
  collection,
  query,
  where,
  arrayUnion
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Toaster from "../../../../Utils/Toaster/Toaster";

const ResultsDisplay = ({
  results,
  patientId,
  patientName,
  imagePreview,
  file,
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

  const saveImageToFirebase = async () => {
    try {
      if (!file) {
        Toaster.justToast("error", "No MRI image to upload.");
        return null; // Return null if no image
      }

      const storageRef = ref(
        storage,
        `MRI_Images/${patientId}_${new Date().toISOString()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Wait for the upload task to complete
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Error uploading image:", error);
            Toaster.justToast("error", "Failed to upload MRI image.");
            reject(error); // Reject on error
          },
          resolve // Resolve once completed
        );
      });

      // Once the task is completed, get the download URL
      const snapshot = uploadTask.snapshot;
      const imageUrl = await getDownloadURL(snapshot.ref); // Access ref from snapshot
      return imageUrl; // Return the URL
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
      Toaster.justToast(
        "error",
        "Failed to upload MRI image. Please try again."
      );
      return null; // Return null on error
    }
  };

  const saveResultsToFirebase = async () => {
    try {
      // Check if patientId is provided
      if (!patientId || patientId.trim() === "") {
        Toaster.justToast("error", "Patient ID is required to save results.");
        return; // Exit the function if no patientId is provided
      }

      // Create a reference to the "patients" collection
      const patientsCollectionRef = collection(db, "patients_h");

      // Create a query to find the document where the 'patientId' field matches the given patientId
      const q = query(
        patientsCollectionRef,
        where("patientId", "==", patientId)
      );

      // Fetch the documents that match the query
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const patientDocRef = querySnapshot.docs[0].ref;
        const imageUrl = await saveImageToFirebase();

        if (imageUrl) {
          await updateDoc(patientDocRef, {
            dementiaLevel: results.dementia_level,
            mriImage: imageUrl,
            mriScanStatus: "Completed",
            mriScanTimestamp: arrayUnion(new Date()),
          });
          Toaster.justToast(
            "success",
            "MRI Image uploaded and Dementia Level updated successfully!"
          );
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
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex flex-column flex-md-row justify-content-between mt-3">
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
