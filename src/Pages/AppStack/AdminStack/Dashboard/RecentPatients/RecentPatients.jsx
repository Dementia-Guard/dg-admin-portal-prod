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

      // Convert lastMonthDate to string in 'YYYY-MM-DD' format
      const lastMonthString = lastMonthDate.toISOString().split("T")[0];

      const patientsCollection = collection(db, "patients_h");
      const recentPatientsQuery = query(
        patientsCollection,
        where("attendedDate", ">=", lastMonthString)
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
                    <th scope="col">First Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Dementia Level</th>
                    <th scope="col">MRI Scan Status</th>
                    <th scope="col">Next Appointment</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.length > 0 ? (
                    patients.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.firstName}</td>
                        <td>{patient.phoneNumber}</td>
                        <td>{patient.dementiaLevel}</td>
                        <td>{patient.mriScanStatus}</td>
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
                      <td colSpan="5" className="text-center">
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
