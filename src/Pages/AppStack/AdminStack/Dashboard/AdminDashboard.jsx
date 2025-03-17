import React from "react";
import DashBanner from "./DashBanner/DashBanner";
import DashCompletedMRI from "./DashCompletedMRI/DashCompletedMRI";
import DashPendingMRI from "./DashPendingMRI/DashPendingMRI";
import DashPatient from "./DashPatient/DashPatient";
import RecentPatients from "./RecentPatients/RecentPatients";
import NotiBanner from "./NotificationBanner/NotiBanner";

export default function AdminDashboard() {
  return (
    <main className="main-content-wrapper pb-6 px-0 px-md-4">
      <section className="container">
        <DashBanner />
        <div className="table-responsive-xl mb-6 mb-lg-0">
          <div className="row flex-nowrap pb-3 pb-lg-0">
            <DashPatient />
            <DashCompletedMRI />
            <DashPendingMRI />
          </div>
        </div>
        <RecentPatients />
      </section>
    </main>
  );
}
