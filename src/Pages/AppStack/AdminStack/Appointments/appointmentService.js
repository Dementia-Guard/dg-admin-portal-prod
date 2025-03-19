// appointmentService.js
import {
    collection,
    query,
    getDocs,
    doc,
    deleteDoc,
    where,
  } from "firebase/firestore";
  import { db } from "../../../../Firebase/config";
  
  // Helper function to determine appointment status
  const determineStatus = (dateString, timeString) => {
    const now = new Date();
    const [hours, minutes] = timeString.split(":").map(Number);
    const appointmentDate = new Date(dateString);
    appointmentDate.setHours(hours, minutes, 0, 0);
  
    if (appointmentDate < now) {
      return "completed";
    } else if (
      appointmentDate.getTime() - now.getTime() <
      24 * 60 * 60 * 1000
    ) {
      return "upcoming";
    } else {
      return "scheduled";
    }
  };
  
  // Fetch all appointments for a specific doctor
  export const fetchDoctorAppointments = async (doctorId) => {
    const appointmentsRef = collection(db, "booked");
    const q = query(appointmentsRef, where("doctorId", "==", doctorId));
    const querySnapshot = await getDocs(q);
  
    const appointments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      status: determineStatus(doc.data().date, doc.data().timeSlot),
    }));
  
    return appointments;
  };
  
  // Cancel an appointment
  export const cancelAppointment = async (appointmentId) => {
    return await deleteDoc(doc(db, "booked", appointmentId));
  };
  