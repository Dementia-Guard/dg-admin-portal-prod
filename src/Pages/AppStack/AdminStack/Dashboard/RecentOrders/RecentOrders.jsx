import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../Firebase/config";

export default function RecentPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchRecentPatients = async () => {
      const currentDate = new Date();
      const lastMonthDate = new Date(
        currentDate.setMonth(currentDate.getMonth() - 1)
      );

      const patientsCollection = collection(db, "patients");
      const recentPatientsQuery = query(
        patientsCollection,
        where("createdAt", ">=", lastMonthDate) // Assuming `createdAt` is a timestamp field in Firestore
      );

      const patientsSnapshot = await getDocs(recentPatientsQuery);
      const patientsList = patientsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(patientsList);
    };

    fetchRecentPatients();
  }, []);

  return (
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-6">
        <div className="card h-100 card">
          {/* heading */}
          <div className="p-6">
            <h3 className="mb-0 fs-5">Recent Patients (Last Month)</h3>
          </div>
          <div className="card-body p-0">
            {/* table */}
            <div className="table-responsive">
              <table className="table table-centered table-borderless text-nowrap table-hover">
                <thead className="bg-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Telephone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Caregiver Email</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.length > 0 ? (
                    patients.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.name}</td>
                        <td>{patient.telephone}</td>
                        <td>{patient.email}</td>
                        <td>{patient.caregiverEmail}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No patients found from the last month.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
