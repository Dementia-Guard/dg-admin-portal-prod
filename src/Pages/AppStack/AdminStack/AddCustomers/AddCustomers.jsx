import React from "react";
import BreadCrumb from "../../../../Components/BreadCrumb/BreadCrumb";
import { db } from "../../../../Firebase/config";
import { collection, addDoc } from "firebase/firestore";
import dummyPatients from "./data.json"; // Import the JSON file

export default function AddCustomers() {
  // Function to upload dummy data to Firebase
  const uploadData = async () => {
    try {
      const batchPromises = dummyPatients.map((patient) =>
        addDoc(collection(db, "patients_h"), patient) // Changed collection to "patients"
      );
      await Promise.all(batchPromises);
      alert("Dummy data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Error uploading data.");
    }
  };

  return (
    <main className="main-content-wrapper pb-6 px-0 px-md-4 pt-14">
      <div className="container">
        <BreadCrumb page={"Add Customer"} icon={"fa-user"} />
        <div className="row">
          <div className="col-md-8 col-12 mb-5">
            <div className="card p-5">
              <form>
                <div className="row row-gap-4">
                  <div className="col-12 text-end">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={uploadData}
                    >
                      Upload Dummy Data
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="card p-3 d-flex justify-content-center align-items-center">
              <h5>Image Preview</h5>
              <img
                src="/assets/images/avatar/avatar-4.jpg"
                className="rounded img-fluid"
                alt="banner"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
