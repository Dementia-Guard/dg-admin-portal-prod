import { React, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../../Firebase/config";

export default function DashEarnings() {
    const [completedMRI, setCompletedMRI] = useState(0);
    
    useEffect(() => {
        const getCompletedMRI = async () => {
            const completedMRIQuery = query(
                collection(db, 'patients'),
                where('mriStatus', '==', 'completed')
            );

            const completedMRIQuerySnapshot = await getDocs(completedMRIQuery);
            setCompletedMRI(completedMRIQuerySnapshot.size);
        };

        getCompletedMRI();
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
              <h4 className="mb-0 fs-5">Completed Analyses</h4>
            </div>
            <div className="icon-shape icon-md bg-success text-light-danger rounded-circle">
              <i className="fa-regular fa-circle-check fs-5" />
            </div>
          </div>
          {/* project number */}
          <div className="lh-1">
            <h1 className="mb-2 fw-bold fs-2">{completedMRI.toLocaleString()}</h1>
            <span>Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
