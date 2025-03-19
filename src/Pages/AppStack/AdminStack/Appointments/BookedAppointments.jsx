import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../../Components/BreadCrumb/BreadCrumb";
import AppointmentStats from "./AppointmentStats";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentTable from "./AppointmentTable";
import AppointmentDetailsModal from "./AppointmentDetailsModal";
import {
  fetchDoctorAppointments,
  cancelAppointment,
} from "./appointmentService";
import Toaster from "../../../../Utils/Toaster/Toaster";

export default function BookedAppointments({ doctorId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    loadAppointments();
  }, [doctorId]);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const fetchedAppointments = await fetchDoctorAppointments(
        doctorId || "doc123"
      );
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      Toaster.justToast("error", "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await cancelAppointment(appointmentId);
        Toaster.justToast("success", "Appointment cancelled successfully");
        loadAppointments(); // Refresh the list
      } catch (error) {
        console.error("Error cancelling appointment:", error);
        Toaster.justToast("error", "Failed to cancel appointment");
      }
    }
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeDetails = () => {
    setSelectedAppointment(null);
  };

  // Filter and sort appointments
  const getFilteredAndSortedAppointments = () => {
    // Filter appointments
    const filtered = appointments.filter((appointment) => {
      const matchesStatus =
        filterStatus === "all" || appointment.status === filterStatus;
      const matchesSearch =
        appointment.patientName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (appointment.patientDetails?.additionalNotes || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });

    // Sort appointments
    return [...filtered].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "date") {
        const dateA = new Date(a.date + " " + a.timeSlot);
        const dateB = new Date(b.date + " " + b.timeSlot);
        comparison = dateA - dateB;
      } else if (sortBy === "name") {
        comparison = a.patientName.localeCompare(b.patientName);
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  // Calculate stats
  const getStats = () => {
    return appointments.reduce((acc, appointment) => {
      acc[appointment.status] = (acc[appointment.status] || 0) + 1;
      return acc;
    }, {});
  };

  const sortedAndFilteredAppointments = getFilteredAndSortedAppointments();
  const stats = getStats();

  return (
    <main className="main-content-wrapper pb-6 px-0 px-md-4">
      <div className="container-fluid">
        <BreadCrumb
          page={"Appointments"}
          icon={"fas fa-calendar-check"}
        />

        <div className="px-4 py-4">
          <h4 className="mb-4 fw-bold text-primary">Booked Appointments</h4>

          <AppointmentStats
            total={appointments.length}
            completed={stats.completed || 0}
            upcoming={stats.upcoming || 0}
            scheduled={stats.scheduled || 0}
          />

          <AppointmentFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            sortBy={sortBy}
            sortOrder={sortOrder}
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            onRefresh={loadAppointments}
          />

          <AppointmentTable
            appointments={sortedAndFilteredAppointments}
            loading={loading}
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            onViewDetails={handleViewDetails}
            onCancelAppointment={handleCancelAppointment}
          />

          {selectedAppointment && (
            <AppointmentDetailsModal
              appointment={selectedAppointment}
              onClose={closeDetails}
              onCancel={handleCancelAppointment}
            />
          )}
        </div>
      </div>
    </main>
  );
}
