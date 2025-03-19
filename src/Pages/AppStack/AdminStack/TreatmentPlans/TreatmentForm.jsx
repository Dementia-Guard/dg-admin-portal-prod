// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Toaster from "../../../../Utils/Toaster/Toaster";

// const TreatmentForm = ({ onSubmit, loading }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     age: "",
//     cdrScore: "",
//     mmseScore: "",
//     additionalNotes: "",
//     caregiverAvailability: "",
//   });

//   const [availableDate, setAvailableDate] = useState(new Date());
//   const [currentStep, setCurrentStep] = useState(1);
//   const [canProceed, setCanProceed] = useState(false);
//   const totalSteps = 4;

//   // Check if current step's required fields are filled
//   useEffect(() => {
//     validateCurrentStep();
//   }, [formData, currentStep]);

//   const validateCurrentStep = () => {
//     switch (currentStep) {
//       case 1:
//         setCanProceed(
//           !!formData.firstName && !!formData.lastName && !!formData.age
//         );
//         break;
//       case 2:
//         setCanProceed(!!formData.cdrScore && !!formData.mmseScore);
//         break;
//       case 3:
//         setCanProceed(!!formData.caregiverAvailability);
//         break;
//       case 4:
//         setCanProceed(true); // Date is pre-populated
//         break;
//       default:
//         setCanProceed(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFormSubmit = () => {
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.age ||
//       !formData.cdrScore ||
//       !formData.mmseScore ||
//       !formData.caregiverAvailability
//     ) {
//       Toaster.justToast("error", "Please fill in all required fields.");
//       return;
//     }
//     onSubmit(formData, availableDate);
//   };

//   const nextStep = () => {
//     if (canProceed) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       highlightMissingFields();
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   // Highlight missing fields with a gentle animation
//   const highlightMissingFields = () => {
//     Toaster.justToast(
//       "error",
//       "Please complete all required fields to continue."
//     );

//     // Add a class to required fields
//     document.querySelectorAll(".required-field").forEach((field) => {
//       if (!field.value) {
//         field.classList.add("highlight-missing");
//         setTimeout(() => {
//           field.classList.remove("highlight-missing");
//         }, 1500);
//       }
//     });
//   };

//   // Field groups by step
//   const stepFields = [
//     ["firstName", "lastName", "age"],
//     ["cdrScore", "mmseScore"],
//     ["additionalNotes", "caregiverAvailability"],
//     ["availableDate"],
//   ];

//   // Field labels with improved descriptions
//   const fieldLabels = {
//     firstName: "First Name",
//     lastName: "Last Name",
//     age: "Age",
//     cdrScore: "CDR Score",
//     mmseScore: "MMSE Score",
//     additionalNotes: "Additional Notes",
//     caregiverAvailability: "Caregiver Availability",
//     availableDate: "Preferred Appointment Date",
//   };

//   // Field descriptions for tooltip/helper text
//   const fieldDescriptions = {
//     cdrScore: "Clinical Dementia Rating scale (0-3)",
//     mmseScore: "Mini-Mental State Examination score (0-30)",
//     caregiverAvailability: "Indicates if patient has regular caregiver support",
//   };

//   // Step titles
//   const stepTitles = [
//     "Personal Information",
//     "Clinical Assessment",
//     "Support Details",
//     "Schedule Appointment",
//   ];

//   // Step icons
//   const stepIcons = [
//     "fa-user",
//     "fa-house-chimney-medical",
//     "fa-people-arrows",
//     "fa-calendar-days",
//   ];

//   // Get field class based on validation status
//   const getFieldClass = (field) => {
//     const isRequired = [
//       "firstName",
//       "lastName",
//       "age",
//       "cdrScore",
//       "mmseScore",
//       "caregiverAvailability",
//     ].includes(field);
//     return `form-control border-0 bg-light shadow-sm ${
//       isRequired ? "required-field" : ""
//     }`;
//   };

//   return (
//     <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
//       {/* Custom CSS for validation animation */}
//       <style>
//         {`
//           @keyframes pulse-border {
//             0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); }
//             70% { box-shadow: 0 0 0 6px rgba(220, 53, 69, 0); }
//             100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
//           }
//           .highlight-missing {
//             animation: pulse-border 1.5s ease-out;
//             border: 1px solid #dc3545 !important;
//           }
//         `}
//       </style>

//       {/* Progress Bar */}
//       <div className="px-4 pt-4">
//         <div className="d-flex justify-content-between mb-1">
//           {[...Array(totalSteps)].map((_, index) => (
//             <div
//               key={index}
//               className="d-flex flex-column align-items-center"
//               style={{ width: `${100 / totalSteps}%` }}
//             >
//               <div
//                 className={`rounded-circle d-flex align-items-center justify-content-center mb-1 ${
//                   currentStep > index
//                     ? "bg-success"
//                     : currentStep === index + 1
//                     ? "bg-primary"
//                     : "bg-light"
//                 }`}
//                 style={{
//                   width: "2.5rem",
//                   height: "2.5rem",
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 <i
//                   className={`fa-solid ${stepIcons[index]} ${
//                     currentStep > index || currentStep === index + 1
//                       ? "text-white"
//                       : "text-secondary"
//                   }`}
//                 ></i>
//               </div>
//               <span
//                 className={`small text-center ${
//                   currentStep === index + 1
//                     ? "text-primary fw-bold"
//                     : "text-muted"
//                 }`}
//               >
//                 {stepTitles[index]}
//               </span>
//             </div>
//           ))}
//         </div>
//         <div className="progress mb-4" style={{ height: "8px" }}>
//           <div
//             className="progress-bar bg-primary"
//             role="progressbar"
//             style={{
//               width: `${(currentStep / totalSteps) * 100}%`,
//               transition: "width 0.5s ease-in-out",
//             }}
//             aria-valuenow={(currentStep / totalSteps) * 100}
//             aria-valuemin="0"
//             aria-valuemax="100"
//           ></div>
//         </div>
//       </div>

//       <div className="card-body p-4">
//         <h4 className="text-primary mb-1 fw-bold">Patient Assessment Form</h4>
//         <p className="text-muted mb-4">
//           Step {currentStep}: {stepTitles[currentStep - 1]}
//         </p>

//         <div className="row g-4">
//           {currentStep === 1 && (
//             <>
//               {stepFields[0].map((field) => (
//                 <div className="col-md-4" key={field}>
//                   <div className="form-floating">
//                     <input
//                       type={field === "age" ? "number" : "text"}
//                       name={field}
//                       id={field}
//                       className={getFieldClass(field)}
//                       value={formData[field]}
//                       onChange={handleChange}
//                       placeholder={fieldLabels[field]}
//                     />
//                     <label htmlFor={field} className="text-secondary">
//                       {fieldLabels[field]}
//                       {["firstName", "lastName", "age"].includes(field) && (
//                         <span className="ms-1 text-danger">*</span>
//                       )}
//                     </label>
//                   </div>
//                 </div>
//               ))}
//               <div className="col-12">
//                 <div className="card bg-light border-0 p-3 mt-2">
//                   <div className="d-flex">
//                     <div className="text-primary me-3">
//                       <i className="fa fa-info-circle fs-4"></i>
//                     </div>
//                     <div>
//                       <h6 className="mb-1">Personal Information</h6>
//                       <p className="text-muted small mb-0">
//                         This information helps ti identify the patient and
//                         determine appropriate treatment approaches.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           {currentStep === 2 && (
//             <>
//               {stepFields[1].map((field) => (
//                 <div className="col-md-6" key={field}>
//                   <div className="form-floating mb-1">
//                     <input
//                       type="text"
//                       name={field}
//                       id={field}
//                       className={getFieldClass(field)}
//                       value={formData[field]}
//                       onChange={handleChange}
//                       placeholder={fieldLabels[field]}
//                     />
//                     <label htmlFor={field} className="text-secondary">
//                       {fieldLabels[field]}
//                       <span className="ms-1 text-danger">*</span>
//                     </label>
//                   </div>
//                   <div className="text-muted small mt-3">
//                     <i className="fa fa-info-circle me-1"></i>
//                     {fieldDescriptions[field]}
//                   </div>
//                 </div>
//               ))}
//               <div className="col-12">
//                 <div className="card bg-light border-0 p-3 mt-2">
//                   <div className="d-flex">
//                     <div className="text-primary me-3">
//                       <i className="fa-solid fa-lightbulb fs-5"></i>
//                     </div>
//                     <div>
//                       <h6 className="mb-1">Assessment Guidelines</h6>
//                       <p className="text-muted small mb-0">
//                         CDR measures cognitive and functional performance, while
//                         MMSE assesses cognitive abilities. Higher MMSE scores
//                         (closer to 30) and lower CDR scores indicate better
//                         cognitive function.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           {currentStep === 3 && (
//             <>
//               <div className="col-md-6">
//                 <label className="form-label text-secondary mb-2">
//                   Additional Notes
//                 </label>
//                 <textarea
//                   name="additionalNotes"
//                   className="form-control border-0 bg-light shadow-sm"
//                   value={formData.additionalNotes}
//                   onChange={handleChange}
//                   rows="5"
//                   placeholder="Enter any additional information that may be relevant"
//                   style={{ resize: "none" }}
//                 ></textarea>

//                 <div className="card bg-light border-0 p-3 mt-4">
//                   <div className="d-flex">
//                     <div className="text-primary me-3">
//                       <i className="fa-solid fa-pencil fs-5"></i>
//                     </div>
//                     <div>
//                       <h6 className="mb-1">Additional Context</h6>
//                       <p className="text-muted small mb-0">
//                         Notes about sleep patterns, behavioral changes, or
//                         medication effects can be especially helpful for
//                         treatment planning.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className="col-md-6">
//                   <label className="form-label text-secondary mb-2">
//                     Caregiver Availability
//                     <span className="ms-1 text-danger">*</span>
//                   </label>
//                   <div className="d-flex gap-4 mb-3">
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="caregiverAvailability"
//                         id="caregiverAvailable"
//                         value="Available"
//                         checked={formData.caregiverAvailability === "Available"}
//                         onChange={handleChange}
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="caregiverAvailable"
//                       >
//                         Available
//                       </label>
//                     </div>
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="caregiverAvailability"
//                         id="caregiverUnavailable"
//                         value="None"
//                         checked={formData.caregiverAvailability === "None"}
//                         onChange={handleChange}
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="caregiverUnavailable"
//                       >
//                         Not Available
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card bg-light border-0 p-3 mt-4">
//                   <div className="d-flex">
//                     <div className="text-primary me-3">
//                       <i className="fa-solid fa-person fs-5"></i>
//                     </div>
//                     <div>
//                       <h6 className="mb-1">Why This Matters</h6>
//                       <p className="text-muted small mb-0">
//                         Caregiver support is crucial for treatment adherence and
//                         home care. This information helps to the expert system
//                         to tailor the treatment plan to include appropriate
//                         support resources.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           {currentStep === 4 && (
//             <>
//               <div className="col-md-6 mx-auto text-center">
//                 <label className="form-label text-secondary mb-3">
//                   Select Your Preferred Date
//                 </label>
//                 <div className="position-relative">
//                   <DatePicker
//                     selected={availableDate}
//                     onChange={(date) => setAvailableDate(date)}
//                     className="form-control border-0 bg-light shadow-sm py-3 text-center"
//                     minDate={new Date()}
//                     dateFormat="MMMM d, yyyy"
//                     showPopperArrow={false}
//                   />
//                 </div>
//                 <div className="mt-4 card bg-light border-0 p-3">
//                   <div className="d-flex justify-content-center">
//                     <div className="text-primary me-3">
//                       <i className="fa-solid fa-calendar-check fs-5"></i>
//                     </div>
//                     <div className="text-start">
//                       <h6 className="mb-1">Your Treatment Plan</h6>
//                       <p className="text-muted small mb-0">
//                         Based on your assessment, we'll create a personalized
//                         treatment plan to help improve quality of life and
//                         manage symptoms effectively.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6 mx-auto text-center">
//                 <div className="h-100 d-flex flex-column justify-content-center">
//                   <div className="card bg-light bg-opacity-5 border-0 p-4 mb-3">
//                     {" "}
//                     {/* Lighter opacity */}
//                     <h5 className="text-primary mb-3">
//                       Treatment Plan Summary
//                     </h5>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span className="text-muted">Patient:</span>
//                       <span className="fw-bold text-muted">
//                         {" "}
//                         {/* Make text a bit lighter */}
//                         {formData.firstName} {formData.lastName}
//                       </span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span className="text-muted">Age:</span>
//                       <span className="fw-bold text-muted">
//                         {formData.age}
//                       </span>{" "}
//                       {/* Lighter color */}
//                     </div>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span className="text-muted">CDR Score:</span>
//                       <span className="fw-bold text-muted">
//                         {formData.cdrScore}
//                       </span>{" "}
//                       {/* Lighter color */}
//                     </div>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span className="text-muted">MMSE Score:</span>
//                       <span className="fw-bold text-muted">
//                         {formData.mmseScore}
//                       </span>{" "}
//                       {/* Lighter color */}
//                     </div>
//                     <div className="d-flex justify-content-between">
//                       <span className="text-muted">Caregiver:</span>
//                       <span className="fw-bold text-muted">
//                         {formData.caregiverAvailability}
//                       </span>{" "}
//                       {/* Lighter color */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="card-footer bg-white border-0 p-4">
//         <div className="row">
//           <div className="col-6">
//             {currentStep > 1 ? (
//               <button
//                 className="btn btn-outline-secondary w-100 py-3"
//                 onClick={prevStep}
//               >
//                 <i className="fa-solid fa-arrow-left me-2"></i> Previous
//               </button>
//             ) : (
//               <button
//                 className="btn btn-outline-secondary w-100 py-3"
//                 disabled
//                 style={{ visibility: "hidden" }}
//               >
//                 <i className="fa-solid fa-arrow-left me-2"></i> Previous
//               </button>
//             )}
//           </div>
//           <div className="col-6">
//             {currentStep < totalSteps ? (
//               <button
//                 className={`btn w-100 py-3 shadow-sm ${
//                   canProceed ? "btn-primary" : "btn-secondary"
//                 }`}
//                 onClick={nextStep}
//               >
//                 Next <i className="bi bi-arrow-right ms-2"></i>
//               </button>
//             ) : (
//               <button
//                 className="btn btn-success w-100 py-3 shadow-sm"
//                 onClick={handleFormSubmit}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm me-2"
//                       role="status"
//                       aria-hidden="true"
//                     ></span>
//                     Generating...
//                   </>
//                 ) : (
//                   <>
//                     Generate Treatment Plan{" "}
//                     <i className="fa-solid fa-file ms-2"></i>
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TreatmentForm;

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Toaster from "../../../../Utils/Toaster/Toaster";
import { collection, getDocs, query, where, doc, updateDoc, arrayRemove, setDoc } from "firebase/firestore";
import { db } from "../../../../Firebase/config";

const TreatmentForm = ({ onSubmit, loading, doctorId }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    cdrScore: "",
    mmseScore: "",
    additionalNotes: "",
    caregiverAvailability: "",
    selectedTimeSlot: "",
  });

  const [availableDate, setAvailableDate] = useState(new Date());
  const [currentStep, setCurrentStep] = useState(1);
  const [canProceed, setCanProceed] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const totalSteps = 4;

  // Check if current step's required fields are filled
  useEffect(() => {
    validateCurrentStep();
  }, [formData, currentStep]);

  // Fetch available slots when date changes in step 4
  useEffect(() => {
    if (currentStep === 4) {
      fetchAvailableSlots();
    }
  }, [availableDate, currentStep]);

  const fetchAvailableSlots = async () => {
    setLoadingSlots(true);
    try {
      // Format date to match the format in Firebase (YYYY-MM-DD)
      const formattedDate = availableDate.toISOString().split('T')[0];
      
      // Query the doctor_availability collection for the selected date
      const doctorId = "doc123";
      const availabilityRef = collection(db, "doctor_availability");
      const q = query(
        availabilityRef, 
        where("date", "==", formattedDate),
        where("doctorId", "==", doctorId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Get the first document that matches
        const docData = querySnapshot.docs[0].data();
        setAvailableSlots(docData.timeSlots || []);
        console.log(availableSlots)
      } else {
        setAvailableSlots([]);
        console.log("No availability for selected date");
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
      Toaster.justToast("error", "Error loading available time slots");
    } finally {
      setLoadingSlots(false);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        setCanProceed(
          !!formData.firstName && !!formData.lastName && !!formData.age
        );
        break;
      case 2:
        setCanProceed(!!formData.cdrScore && !!formData.mmseScore);
        break;
      case 3:
        setCanProceed(!!formData.caregiverAvailability);
        break;
      case 4:
        setCanProceed(!!formData.selectedTimeSlot);
        break;
      default:
        setCanProceed(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSlotSelect = (slot) => {
    setFormData({ ...formData, selectedTimeSlot: slot });
  };

  const handleFormSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.age ||
      !formData.cdrScore ||
      !formData.mmseScore ||
      !formData.caregiverAvailability ||
      !formData.additionalNotes ||
      !formData.selectedTimeSlot
    ) {
      Toaster.justToast("error", "Please fill in all required fields.");
      return;
    }

    try {
      // Format date for Firebase
      const formattedDate = availableDate.toISOString().split('T')[0];

      doctorId = "doc123";
      // 1. Remove the selected slot from doctor_availability
      const availabilityRef = collection(db, "doctor_availability");
      const q = query(
        availabilityRef,
        where("date", "==", formattedDate),
        where("doctorId", "==", doctorId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          timeSlots: arrayRemove(formData.selectedTimeSlot)
        });
      }

      // 2. Add the booking to the booked collection
      const appointmentId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await setDoc(doc(db, "booked", appointmentId), {
        doctorId,
        patientId: formData.firstName + formData.lastName + formData.age, // You might want to use a real patient ID
        patientName: `${formData.firstName} ${formData.lastName}`,
        date: formattedDate,
        timeSlot: formData.selectedTimeSlot,
        patientDetails: {
          age: formData.age,
          cdrScore: formData.cdrScore,
          mmseScore: formData.mmseScore,
          caregiverAvailability: formData.caregiverAvailability,
          additionalNotes: formData.additionalNotes
        },
        createdAt: new Date().toISOString()
      });

      // 3. Submit the form data to parent component
      onSubmit({
        ...formData,
        appointmentDate: formattedDate,
        appointmentTime: formData.selectedTimeSlot,
        appointmentId
      });

    } catch (error) {
      console.error("Error booking appointment:", error);
      Toaster.justToast("error", "Error booking appointment");
    }
  };

  const nextStep = () => {
    if (canProceed) {
      setCurrentStep(currentStep + 1);
    } else {
      highlightMissingFields();
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Highlight missing fields with a gentle animation
  const highlightMissingFields = () => {
    Toaster.justToast(
      "error",
      "Please complete all required fields to continue."
    );

    // Add a class to required fields
    document.querySelectorAll(".required-field").forEach((field) => {
      if (!field.value) {
        field.classList.add("highlight-missing");
        setTimeout(() => {
          field.classList.remove("highlight-missing");
        }, 1500);
      }
    });
  };

  // Format time for display
  const formatTimeForDisplay = (timeSlot) => {
    return timeSlot;
  };

  // Field groups by step
  const stepFields = [
    ["firstName", "lastName", "age"],
    ["cdrScore", "mmseScore"],
    ["additionalNotes", "caregiverAvailability"],
    ["availableDate", "selectedTimeSlot"],
  ];

  // Field labels with improved descriptions
  const fieldLabels = {
    firstName: "First Name",
    lastName: "Last Name",
    age: "Age",
    cdrScore: "CDR Score",
    mmseScore: "MMSE Score",
    additionalNotes: "Additional Notes",
    caregiverAvailability: "Caregiver Availability",
    availableDate: "Preferred Appointment Date",
    selectedTimeSlot: "Appointment Time"
  };

  // Field descriptions for tooltip/helper text
  const fieldDescriptions = {
    cdrScore: "Clinical Dementia Rating scale (0-3)",
    mmseScore: "Mini-Mental State Examination score (0-30)",
    caregiverAvailability: "Indicates if patient has regular caregiver support",
  };

  // Step titles
  const stepTitles = [
    "Personal Information",
    "Clinical Assessment",
    "Support Details",
    "Schedule Appointment",
  ];

  // Step icons
  const stepIcons = [
    "fa-user",
    "fa-house-chimney-medical",
    "fa-people-arrows",
    "fa-calendar-days",
  ];

  // Get field class based on validation status
  const getFieldClass = (field) => {
    const isRequired = [
      "firstName",
      "lastName",
      "age",
      "cdrScore",
      "mmseScore",
      "caregiverAvailability",
      "selectedTimeSlot"
    ].includes(field);
    return `form-control border-0 bg-light shadow-sm ${
      isRequired ? "required-field" : ""
    }`;
  };

  return (
    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
      {/* Custom CSS for validation animation */}
      <style>
        {`
          @keyframes pulse-border {
            0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); }
            70% { box-shadow: 0 0 0 6px rgba(220, 53, 69, 0); }
            100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
          }
          .highlight-missing {
            animation: pulse-border 1.5s ease-out;
            border: 1px solid #dc3545 !important;
          }
          .time-slot {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .time-slot:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .time-slot.selected {
            border: 2px solid #0d6efd !important;
            background-color: rgba(13, 110, 253, 0.1) !important;
          }
        `}
      </style>

      {/* Progress Bar */}
      <div className="px-4 pt-4">
        <div className="d-flex justify-content-between mb-1">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className="d-flex flex-column align-items-center"
              style={{ width: `${100 / totalSteps}%` }}
            >
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center mb-1 ${
                  currentStep > index
                    ? "bg-success"
                    : currentStep === index + 1
                    ? "bg-primary"
                    : "bg-light"
                }`}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  transition: "all 0.3s ease",
                }}
              >
                <i
                  className={`fa-solid ${stepIcons[index]} ${
                    currentStep > index || currentStep === index + 1
                      ? "text-white"
                      : "text-secondary"
                  }`}
                ></i>
              </div>
              <span
                className={`small text-center ${
                  currentStep === index + 1
                    ? "text-primary fw-bold"
                    : "text-muted"
                }`}
              >
                {stepTitles[index]}
              </span>
            </div>
          ))}
        </div>
        <div className="progress mb-4" style={{ height: "8px" }}>
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{
              width: `${(currentStep / totalSteps) * 100}%`,
              transition: "width 0.5s ease-in-out",
            }}
            aria-valuenow={(currentStep / totalSteps) * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>

      <div className="card-body p-4">
        <h4 className="text-primary mb-1 fw-bold">Patient Assessment Form</h4>
        <p className="text-muted mb-4">
          Step {currentStep}: {stepTitles[currentStep - 1]}
        </p>

        <div className="row g-4">
          {currentStep === 1 && (
            <>
              {stepFields[0].map((field) => (
                <div className="col-md-4" key={field}>
                  <div className="form-floating">
                    <input
                      type={field === "age" ? "number" : "text"}
                      name={field}
                      id={field}
                      className={getFieldClass(field)}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={fieldLabels[field]}
                    />
                    <label htmlFor={field} className="text-secondary">
                      {fieldLabels[field]}
                      {["firstName", "lastName", "age"].includes(field) && (
                        <span className="ms-1 text-danger">*</span>
                      )}
                    </label>
                  </div>
                </div>
              ))}
              <div className="col-12">
                <div className="card bg-light border-0 p-3 mt-2">
                  <div className="d-flex">
                    <div className="text-primary me-3">
                      <i className="fa fa-info-circle fs-4"></i>
                    </div>
                    <div>
                      <h6 className="mb-1">Personal Information</h6>
                      <p className="text-muted small mb-0">
                        This information helps to identify the patient and
                        determine appropriate treatment approaches.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              {stepFields[1].map((field) => (
                <div className="col-md-6" key={field}>
                  <div className="form-floating mb-1">
                    <input
                      type="text"
                      name={field}
                      id={field}
                      className={getFieldClass(field)}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={fieldLabels[field]}
                    />
                    <label htmlFor={field} className="text-secondary">
                      {fieldLabels[field]}
                      <span className="ms-1 text-danger">*</span>
                    </label>
                  </div>
                  <div className="text-muted small mt-3">
                    <i className="fa fa-info-circle me-1"></i>
                    {fieldDescriptions[field]}
                  </div>
                </div>
              ))}
              <div className="col-12">
                <div className="card bg-light border-0 p-3 mt-2">
                  <div className="d-flex">
                    <div className="text-primary me-3">
                      <i className="fa-solid fa-lightbulb fs-5"></i>
                    </div>
                    <div>
                      <h6 className="mb-1">Assessment Guidelines</h6>
                      <p className="text-muted small mb-0">
                        CDR measures cognitive and functional performance, while
                        MMSE assesses cognitive abilities. Higher MMSE scores
                        (closer to 30) and lower CDR scores indicate better
                        cognitive function.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="col-md-6">
                <label className="form-label text-secondary mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  className="form-control border-0 bg-light shadow-sm"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Enter any additional information that may be relevant"
                  style={{ resize: "none" }}
                ></textarea>

                <div className="card bg-light border-0 p-3 mt-4">
                  <div className="d-flex">
                    <div className="text-primary me-3">
                      <i className="fa-solid fa-pencil fs-5"></i>
                    </div>
                    <div>
                      <h6 className="mb-1">Additional Context</h6>
                      <p className="text-muted small mb-0">
                        Notes about sleep patterns, behavioral changes, or
                        medication effects can be especially helpful for
                        treatment planning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="col-md-6">
                  <label className="form-label text-secondary mb-2">
                    Caregiver Availability
                    <span className="ms-1 text-danger">*</span>
                  </label>
                  <div className="d-flex gap-4 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="caregiverAvailability"
                        id="caregiverAvailable"
                        value="Available"
                        checked={formData.caregiverAvailability === "Available"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="caregiverAvailable"
                      >
                        Available
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="caregiverAvailability"
                        id="caregiverUnavailable"
                        value="None"
                        checked={formData.caregiverAvailability === "None"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="caregiverUnavailable"
                      >
                        Not Available
                      </label>
                    </div>
                  </div>
                </div>
                <div className="card bg-light border-0 p-3 mt-4">
                  <div className="d-flex">
                    <div className="text-primary me-3">
                      <i className="fa-solid fa-person fs-5"></i>
                    </div>
                    <div>
                      <h6 className="mb-1">Why This Matters</h6>
                      <p className="text-muted small mb-0">
                        Caregiver support is crucial for treatment adherence and
                        home care. This information helps the expert system
                        to tailor the treatment plan to include appropriate
                        support resources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <div className="col-md-6">
                <label className="form-label text-secondary mb-3">
                  Select Your Preferred Date
                </label>
                <div className="position-relative">
                  <DatePicker
                    selected={availableDate}
                    onChange={(date) => setAvailableDate(date)}
                    className="form-control border-0 bg-light shadow-sm py-3 text-center"
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    showPopperArrow={false}
                  />
                </div>
                
                <div className="mt-4">
                  <label className="form-label text-secondary mb-3">
                    Select Available Time Slot
                    <span className="ms-1 text-danger">*</span>
                  </label>
                  
                  {loadingSlots ? (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-2 text-muted">Loading available slots...</p>
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="row g-3">
                      {availableSlots.map((slot, index) => (
                        <div className="col-md-6" key={index}>
                          <div 
                            className={`card border-0 shadow-sm p-3 text-center time-slot ${
                              formData.selectedTimeSlot === slot ? 'selected' : ''
                            }`}
                            onClick={() => handleSlotSelect(slot)}
                          >
                            <div className="d-flex align-items-center justify-content-center">
                              <i className="fa-regular fa-clock me-2 text-primary"></i>
                              <span>{formatTimeForDisplay(slot)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="alert alert-warning text-center" role="alert">
                      <i className="fa-solid fa-calendar-xmark me-2"></i>
                      No time slots available for this date. Please select another date.
                    </div>
                  )}
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="h-100 d-flex flex-column justify-content-between">
                  <div className="card bg-light bg-opacity-5 border-0 p-4 mb-3">
                    <h5 className="text-primary mb-3">
                      Treatment Plan Summary
                    </h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Patient:</span>
                      <span className="fw-bold text-muted">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Age:</span>
                      <span className="fw-bold text-muted">
                        {formData.age}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">CDR Score:</span>
                      <span className="fw-bold text-muted">
                        {formData.cdrScore}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">MMSE Score:</span>
                      <span className="fw-bold text-muted">
                        {formData.mmseScore}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Additional Notes:</span>
                      <span className="fw-bold text-muted">
                        {formData.additionalNotes}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Caregiver:</span>
                      <span className="fw-bold text-muted">
                        {formData.caregiverAvailability}
                      </span>
                    </div>
                  </div>
                  
                  {formData.selectedTimeSlot && (
                    <div className="card border-0 bg-light bg-opacity-10 p-4">
                      <h5 className="text-primary mb-3">
                        <i className="fa-solid fa-calendar-check me-2"></i>
                        Selected Appointment
                      </h5>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Date:</span>
                        <span className="fw-bold">
                          {availableDate.toLocaleDateString('en-US', {
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Time:</span>
                        <span className="fw-bold">
                          {formData.selectedTimeSlot}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card-footer bg-white border-0 p-4">
        <div className="row">
          <div className="col-6">
            {currentStep > 1 ? (
              <button
                className="btn btn-outline-secondary w-100 py-3"
                onClick={prevStep}
              >
                <i className="fa-solid fa-arrow-left me-2"></i> Previous
              </button>
            ) : (
              <button
                className="btn btn-outline-secondary w-100 py-3"
                disabled
                style={{ visibility: "hidden" }}
              >
                <i className="fa-solid fa-arrow-left me-2"></i> Previous
              </button>
            )}
          </div>
          <div className="col-6">
            {currentStep < totalSteps ? (
              <button
                className={`btn w-100 py-3 shadow-sm ${
                  canProceed ? "btn-primary" : "btn-secondary"
                }`}
                onClick={nextStep}
              >
                Next <i className="fa-solid fa-arrow-right ms-2"></i>
              </button>
            ) : (
              <button
                className="btn btn-success w-100 py-3 shadow-sm"
                onClick={handleFormSubmit}
                disabled={loading || !formData.selectedTimeSlot}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Treatment Plan{" "}
                    <i className="fa-solid fa-file ms-2"></i>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentForm;