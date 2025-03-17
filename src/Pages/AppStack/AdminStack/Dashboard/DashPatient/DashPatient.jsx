import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../../Firebase/config";

export default function DashPatient() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [newPatientsLastWeek, setNewPatientsLastWeek] = useState(0);

  useEffect(() => {
    const getPatients = async () => {
      // Get the total number of patients
      const patientsSnapshot = await getDocs(collection(db, "patients_h"));
      setTotalPatients(patientsSnapshot.size);

      // Get the patients added in the last week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const oneWeekAgoTimestamp = Timestamp.fromDate(oneWeekAgo);

      const recentPatientsQuery = query(
        collection(db, "patients"),
        where("createdAt", ">=", oneWeekAgoTimestamp)
      );

      const recentPatientsSnapshot = await getDocs(recentPatientsQuery);
      setNewPatientsLastWeek(recentPatientsSnapshot.size);
    };

    getPatients();
  }, []);

  return (
    <div className="col-lg-4 col-12 mb-6">
      {/* card */}
      <div className="card h-100 ">
        {/* card body */}
        <div className="card-body p-6">
          {/* heading */}
          <div className="d-flex justify-content-between align-items-center mb-6">
            <div>
              <h4 className="mb-0 fs-5">Patients</h4>
            </div>
            <div className="icon-shape icon-md bg-light-info text-dark-info rounded-circle">
              <i className="fa-solid fa-people-group fs-5" />
            </div>
          </div>
          {/* project number */}
          <div className="lh-1">
            <h1 className="mb-2 fw-bold fs-2">
              {totalPatients.toLocaleString()}
            </h1>
            <span>
              <span className="text-dark me-1">{newPatientsLastWeek}</span>
              new in 1 week
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
