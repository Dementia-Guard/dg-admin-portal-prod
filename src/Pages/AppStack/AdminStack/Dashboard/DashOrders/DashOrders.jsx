import { React, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../../Firebase/config";

export default function DashOrders() {
  const [pendingMRI, setPendingMRI] = useState(0);

  useEffect(() => {
    const getPendingMRI = async () => {
      const pendingMRIQuery = query(
        collection(db, "patients"),
        where("mriStatus", "==", "pending")
      );

      const pendingMRIQuerySnapshot = await getDocs(pendingMRIQuery);
      setPendingMRI(pendingMRIQuerySnapshot.size);
    };

    getPendingMRI();
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
              <h4 className="mb-0 fs-5">Pending Analyses</h4>
            </div>
            <div className="icon-shape icon-md bg-light-warning text-dark-warning rounded-circle">
              <i className="fa-solid fa-spinner fs-5" />
            </div>
          </div>
          {/* project number */}
          <div className="lh-1">
            <h1 className="mb-2 fw-bold fs-2">{pendingMRI.toLocaleString()}</h1>
            <span>Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}
