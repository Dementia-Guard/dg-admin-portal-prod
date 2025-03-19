import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../../../../Firebase/config";
import Toaster from "../../../../Utils/Toaster/Toaster";
import BreadCrumb from "../../../../Components/BreadCrumb/BreadCrumb";

export default function DoctorAvailability() {
  const [availability, setAvailability] = useState([]);
  const [doctorId, setDoctorId] = useState("doc123");
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slotDuration, setSlotDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  const [selectedViewDate, setSelectedViewDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async (specificDate = null) => {
    try {
      setLoading(true);
      let availabilityRef = collection(db, "doctor_availability");
      let availabilityQuery = availabilityRef;

      if (specificDate) {
        availabilityQuery = query(
          availabilityRef,
          where("date", "==", specificDate)
        );
      }

      const snapshot = await getDocs(availabilityQuery);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      data.sort((a, b) => new Date(a.date) - new Date(b.date));

      // Extract unique dates for the dropdown
      const dates = [...new Set(data.map((item) => item.date))].sort();
      setAvailableDates(dates);

      setAvailability(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching availability:", error);
      setLoading(false);
    }
  };

  const handleDateFilterChange = (e) => {
    const date = e.target.value;
    setSelectedViewDate(date);
    if (date) {
      fetchAvailability(date);
    } else {
      fetchAvailability();
    }
  };

  const generateTimeSlots = (start, end, duration) => {
    let slots = [];
    let current = new Date(`2025-03-18T${start}`);
    let endTime = new Date(`2025-03-18T${end}`);

    while (current < endTime) {
      let nextSlot = new Date(current.getTime() + duration * 60000);
      if (nextSlot <= endTime) {
        slots.push(
          `${current.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} - ${nextSlot.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        );
      }
      current = nextSlot;
    }
    return slots;
  };

  const handleAddAvailability = async (e) => {
    e.preventDefault();

    if (!date || !startTime || !endTime || slotDuration < 1) {
      Toaster.justToast("error", "Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const newTimeSlots = generateTimeSlots(startTime, endTime, slotDuration);
      const newAvailability = {
        doctorId,
        date,
        timeSlots: newTimeSlots,
      };

      const docRef = await addDoc(
        collection(db, "doctor_availability"),
        newAvailability
      );
      setAvailability([...availability, { id: docRef.id, ...newAvailability }]);
      setAvailableDates([...new Set([...availableDates, date])].sort());

      // Reset form
      setDate("");
      setStartTime("");
      setEndTime("");
      setSlotDuration(30);

      Toaster.justToast("success", "Availability record added successfully!");
    } catch (error) {
      console.error("Error adding availability:", error);
      Toaster.justToast(
        "error",
        "Failed to add availability. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-content-wrapper">
      <div className="container">
        <BreadCrumb
          page={"Doctor Availability"}
          icon={"fa-solid fa-calendar"}
        />

        {/* Toast container */}
        <div
          id="toast-container"
          className="position-fixed bottom-0 end-0 p-3"
        ></div>

        <div className="row">
          <div className="col-12">
            {/* Add Availability Form */}
            <div className="card shadow border-0 mb-4">
              <div className="card-header text-white">
                <h4 className="mb-0 fw-bold text-primary">
                  <i className="fa-solid fa-plus me-2"></i>
                  Add Available Dates
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleAddAvailability}>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold">
                        <i className="fa-solid fa-calendar-days me-2"></i>Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-md shadow-sm"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label fw-bold">
                        <i className="fa-solid fa-clock me-2"></i>Start Time
                      </label>
                      <input
                        type="time"
                        className="form-control form-control-md shadow-sm"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label fw-bold">
                        <i className="fa-solid fa-clock me-2"></i>End Time
                      </label>
                      <input
                        type="time"
                        className="form-control form-control-md shadow-sm"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2 mb-3">
                      <label className="form-label fw-bold">
                        <i className="fa-solid fa-hourglass me-2"></i>Duration
                      </label>
                      <select
                        className="form-select form-select-md shadow-sm"
                        value={slotDuration}
                        onChange={(e) =>
                          setSlotDuration(Number(e.target.value))
                        }
                      >
                        <option value="15">15 min</option>
                        <option value="30">30 min</option>
                        <option value="45">45 min</option>
                        <option value="60">60 min</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 ms-auto">
                      <button
                        type="submit"
                        className="btn btn-primary btn-md shadow w-100"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Adding...
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-plus me-2"></i>
                            Add Record
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Existing Availability */}
            <div className="card shadow border-0">
              <div className="card-header text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0 fw-bold text-primary">
                  <i className="fa-solid fa-list me-2"></i>
                  Existing Availability
                </h4>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      <i className="fa-solid fa-filter me-2"></i>Filter by Date
                    </label>
                    <select
                      className="form-select form-select-md shadow-sm"
                      value={selectedViewDate}
                      onChange={handleDateFilterChange}
                    >
                      <option value="">All Dates</option>
                      {availableDates.map((date) => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div
                  className="availability-container"
                  // style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  {loading ? (
                    <div className="text-center py-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-3">Loading availability data...</p>
                    </div>
                  ) : availability.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="fa-solid fa-calendar-xmark fa-3x text-muted mb-3"></i>
                      <p className="lead">
                        No availability found for the selected criteria.
                      </p>
                    </div>
                  ) : (
                    <div className="list-group shadow-sm">
                      {availability.map((item) => (
                        <div
                          key={item.id}
                          className="list-group-item list-group-item-action"
                        >
                          <div className="d-flex w-100 justify-content-between align-items-center mb-2">
                            <h6 className="mb-1">
                              <i className="fa-solid fa-calendar-day me-2 text-primary"></i>
                              {new Date(item.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </h6>
                            <span className="badge bg-primary rounded-pill">
                              {item.timeSlots.length} slots
                            </span>
                          </div>
                          <div className="row g-2">
                            {item.timeSlots.map((slot, index) => (
                              <div key={index} className="col-md-6 col-lg-6">
                                <div className="card shadow-sm bg-light">
                                  <div className="card-body p-2 text-center">
                                    <i className="fa-regular fa-clock me-2 text-primary"></i>
                                    {slot}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
