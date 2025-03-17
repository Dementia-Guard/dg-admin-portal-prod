import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function BreadCrumb({ page, icon }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`/app/${user.Role.toLowerCase()}/dashboard`);
  };

  return (
    <div className="row mb-8">
      <div className="col-md-12">
        <div className="card p-4">
          <div className="d-md-flex justify-content-between align-items-center">
            <div>
              <h2>{page}</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a onClick={navToDashboard} className="text-inherit" style={{ cursor: "pointer" }}>
                      Dashboard
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {page}
                  </li>
                </ol>
              </nav>
            </div>
            <i className={`fa-solid ${icon} fs-3`} />
          </div>
        </div>
      </div>
    </div>
  );
}
