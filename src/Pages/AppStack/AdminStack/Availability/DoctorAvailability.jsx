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

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const filterFutureDates = (dates) => {
    const today = getTodayDate();
    return dates.filter(date => date >= today);
  };

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

      // Filter out past dates
      const today = getTodayDate();
      const futureData = data.filter(item => item.date >= today);

      futureData.sort((a, b) => new Date(a.date) - new Date(b.date));

      // Extract unique dates for the dropdown (only future dates)
      const dates = [...new Set(futureData.map((item) => item.date))].sort();
      setAvailableDates(dates);

      setAvailability(futureData);
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

    // Check if selected date is in the past
    if (date < getTodayDate()) {
      Toaster.justToast("error", "Cannot add availability for past dates.");
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
      
      // Only add future dates to available dates
      const futureDates = filterFutureDates([...availableDates, date]);
      setAvailableDates([...new Set(futureDates)].sort());

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
          style={{ zIndex: 1050 }}
        ></div>

        <div className="row">
          <div className="col-12">
            {/* Add Availability Form */}
            <div className="card border-1 rounded-4 mb-4 overflow-hidden">
              {/* Modern Header with Gradient */}
              <div className="position-relative">
                <div className="card-header border-0 p-4 bg-transparent">
                  <div className="d-flex align-items-center gap-3">
                      <i className="fa-solid fa-plus text-primary fs-4"></i>
                    <div>
                      <h4 className="mb-1 fw-bold text-primary">Add Available Dates</h4>
                      <p className="mb-0 text-dark-50 small">Schedule your availability for upcoming dates</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleAddAvailability}>
                  <div className="row g-4">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold text-dark mb-2">
                        <i className="fa-solid fa-calendar-days me-2 text-primary"></i>Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-md border-0 rounded-3 bg-light"
                        style={{ 
                          transition: 'all 0.2s ease',
                          border: '2px solid transparent'
                        }}
                        value={date}
                        min={getTodayDate()}
                        onChange={(e) => setDate(e.target.value)}
                        onFocus={(e) => e.target.style.borderColor = '#0d6efd'}
                        onBlur={(e) => e.target.style.borderColor = 'transparent'}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold text-dark mb-2">
                        <i className="fa-solid fa-clock me-2 text-primary"></i>Start Time
                      </label>
                      <input
                        type="time"
                        className="form-control form-control-md border-0 shadow-sm rounded-3 bg-light"
                        style={{ 
                          transition: 'all 0.2s ease',
                          border: '2px solid transparent'
                        }}
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        onFocus={(e) => e.target.style.borderColor = '#198754'}
                        onBlur={(e) => e.target.style.borderColor = 'transparent'}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold text-dark mb-2">
                        <i className="fa-solid fa-clock me-2 text-warning"></i>End Time
                      </label>
                      <input
                        type="time"
                        className="form-control form-control-md border-0 shadow-sm rounded-3 bg-light"
                        style={{ 
                          transition: 'all 0.2s ease',
                          border: '2px solid transparent'
                        }}
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        onFocus={(e) => e.target.style.borderColor = '#ffc107'}
                        onBlur={(e) => e.target.style.borderColor = 'transparent'}
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label fw-semibold text-dark mb-2">
                        <i className="fa-solid fa-hourglass me-2 text-primary"></i>Duration
                      </label>
                      <select
                        className="form-select form-control-md border-0 shadow-sm rounded-3 bg-light"
                        style={{ 
                          transition: 'all 0.2s ease',
                          border: '2px solid transparent'
                        }}
                        value={slotDuration}
                        onChange={(e) => setSlotDuration(Number(e.target.value))}
                        onFocus={(e) => e.target.style.borderColor = '#0dcaf0'}
                        onBlur={(e) => e.target.style.borderColor = 'transparent'}
                      >
                        <option value="15">15 min</option>
                        <option value="30">30 min</option>
                        <option value="45">45 min</option>
                        <option value="60">60 min</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-end mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-md px-5 shadow-sm"
                      disabled={loading}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                      onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
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
                          Add Availability
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Existing Availability */}
            <div className="card border-1 rounded-4 overflow-hidden">
              {/* Modern Header */}
              <div className="position-relative">
                <div className="card-header border-0 p-4 bg-transparent">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                        <i className="fa-solid fa-list text-primary fs-4"></i>
                      <div>
                        <h4 className="mb-1 fw-bold text-primary">Existing Availability</h4>
                        <p className="mb-0 text-dark-50 small">Manage your scheduled availability</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body p-4">
                {/* Filter Section */}
                <div className="row mb-4">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold text-dark mb-2">
                      <i className="fa-solid fa-filter me-2 text-primary"></i>Filter by Date
                    </label>
                    <select
                      className="form-select form-select-md border-0 rounded-3 bg-light"
                      style={{ 
                        transition: 'all 0.2s ease',
                        border: '2px solid transparent'
                      }}
                      value={selectedViewDate}
                      onChange={handleDateFilterChange}
                      onFocus={(e) => e.target.style.borderColor = '#0d6efd'}
                      onBlur={(e) => e.target.style.borderColor = 'transparent'}
                    >
                      <option value="">All Upcoming Dates</option>
                      {availableDates.map((date) => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Availability List */}
                <div className="availability-container">
                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="lead text-muted">Loading availability data...</p>
                    </div>
                  ) : availability.length === 0 ? (
                    <div className="text-center py-5">
                      <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                        <i className="fa-solid fa-calendar-xmark fa-2x text-muted"></i>
                      </div>
                      <h5 className="text-muted mb-2">No Upcoming Availability</h5>
                      <p className="text-muted">Add your first availability slot to get started.</p>
                    </div>
                  ) : (
                    <div className="row g-4">
                      {availability.map((item) => (
                        <div key={item.id} className="col-12">
                          <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100" style={{
                            transition: 'all 0.2s ease',
                            border: '1px solid #e9ecef'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                          }}>
                            {/* Date Header */}
                            <div className="card-header border-0 bg-gradient-primary text-white p-3" style={{
                              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                            }}>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <i className="fa-solid fa-calendar-day text-primary fs-4"></i>
                                  <div>
                                    <h6 className="mb-0 fw-bold text-dark">
                                      {new Date(item.date).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </h6>
                                    <small className="text-muted">Available time slots</small>
                                  </div>
                                </div>
                                <span className="badge bg-primary px-3 py-2 fs-7">
                                  {item.timeSlots.length} slots
                                </span>
                              </div>
                            </div>

                            {/* Time Slots */}
                            <div className="card-body p-3">
                              <div className="row g-3">
                                {item.timeSlots.map((slot, index) => (
                                  <div key={index} className="col-md-6 col-xl-6">
                                    <div className="card border-0 bg-light rounded-3 h-100" style={{
                                      transition: 'all 0.2s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = '#e7f3ff';
                                      e.currentTarget.style.transform = 'scale(1.02)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                                      e.currentTarget.style.transform = 'scale(1)';
                                    }}>
                                      <div className="card-body p-3 text-center">
                                        <i className="fa-regular fa-clock me-2 text-primary"></i>
                                        <span className="fw-medium text-dark">{slot}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
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