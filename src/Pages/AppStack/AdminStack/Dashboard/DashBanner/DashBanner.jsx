import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../Context/AuthContext";

export default function DashBanner() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || !user.FirstName || !user.Role) {
    return <div>Loading dashboard...</div>; // or a spinner
  }

  const navToPatients = () => {
    navigate(`/app/${user.Role.toLowerCase()}/patients`);
  };

  return (
    <div className="row mb-8">
      <div className="col-md-12">
        {/* card */}
        <div
          className="card-lg bg-light p-8 border-0 rounded-4"
          style={{
            backgroundImage: "url(/assets/images/banner/dg-doc-banner.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "",
          }}
        >
          <div className="card-body">
            <h1 className="text-capitalize text-dark text-sm-primary">
              Hi Doctor {user.FirstName} 👋
            </h1>
            <p className="text-capitalize fs-5 d-md-block d-none">
              Work awaits your DementiaGuard service
            </p>
            <button
              onClick={navToPatients}
              className="btn btn-primary"
            >
              See All Patients
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}