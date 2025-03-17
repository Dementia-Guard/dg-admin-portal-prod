import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../Firebase/config";
import BreadCrumb from "../../../../Components/BreadCrumb/BreadCrumb";
import Paginator from "../../../../Components/Paginator/Paginator";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const getPatients = async () => {
      const patientsCollection = collection(db, "patients_h");
      const patientsSnapshot = await getDocs(patientsCollection);
      const patientsList = patientsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(patientsList);
    };

    getPatients();
  }, []);

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.dementiaLevel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const displayedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="main-content-wrapper">
      <div className="container">
        <BreadCrumb page={"Patients"} icon={"fa-solid fa-people-group"} />
        <div className="row">
          <div className="col-xl-12 col-12 mb-5">
            <div className="card h-100 card">
              <div className="p-6">
                <div className="row justify-content-between">
                  <div className="col-md-4 col-12">
                    <form className="d-flex" role="search">
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Search Patients"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </form>
                  </div>
                  {/* <div className="col-md-2 col-12 text-end">
                    <button className="btn btn-dark">Add Patient</button>
                  </div> */}
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-centered table-hover table-borderless mb-0 table-with-checkbox text-nowrap">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        {/* <th>CaregiverEmail</th> */}
                        <th scope="col">Phone Number</th>
                        <th scope="col">Dementia Level</th>
                        <th scope="col">MRI Status</th>
                        <th scope="col">Next Appointment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedPatients.length > 0 ? (
                        displayedPatients.map((patient) => (
                          <tr key={patient.id}>
                            <td>{patient.firstName}</td>
                            <td>{patient.lastName}</td>
                            {/* <td>{patient.caregiverEmail || "-"}</td> */}
                            <td>{patient.phoneNumber}</td>
                            <td>{patient.dementiaLevel}</td>
                            <td>{patient.mriScanStatus}</td>
                            {/* <td>{new Date(patient.nextAppointmentDate).toLocaleString()}</td> */}
                            <td>
                              {new Date(
                                patient.nextAppointmentDate
                              ).toLocaleString("en-US", {
                                weekday: "short", // "Monday"
                                year: "numeric", // "2024"
                                month: "short", // "March"
                                day: "numeric", // "18"
                                hour: "2-digit", // "12"
                                minute: "2-digit", // "00"
                                hour12: true, // "AM/PM"
                              })}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No patients found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Paginator
                  totalItems={filteredPatients.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
