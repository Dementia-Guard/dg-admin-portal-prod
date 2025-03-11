import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../Firebase/config";
import BreadCrumb from "../../../../Components/BreadCrumb/BreadCrumb";
import Paginator from "../../../../Components/Paginator/Paginator";

export default function Customers() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const getPatients = async () => {
      const patientsCollection = collection(db, "patients");
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
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.telephone.toLowerCase().includes(searchQuery.toLowerCase())
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
        <BreadCrumb page={"Customers"} icon={"fa-user"} />
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
                  <div className="col-md-2 col-12 text-end">
                    <button className="btn btn-dark">Add Patient</button>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-centered table-hover table-borderless mb-0 table-with-checkbox text-nowrap">
                    <thead className="bg-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Caregiver Email</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {displayedPatients.length > 0 ? (
                        displayedPatients.map((patient) => (
                          <tr key={patient.id}>
                            <td>{patient.name}</td>
                            <td>{patient.email}</td>
                            <td>{patient.telephone || "-"}</td>
                            <td>{patient.caregiverEmail || "-"}</td>
                            <td>
                              <div className="dropdown">
                                <a
                                  href="#"
                                  className="text-reset"
                                  data-bs-toggle="dropdown"
                                >
                                  <i className="feather-icon icon-more-vertical fs-5" />
                                </a>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Edit
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
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
