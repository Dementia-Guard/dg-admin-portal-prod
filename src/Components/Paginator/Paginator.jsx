// import React from 'react'

// export default function Paginator() {
//     return (
//         <div className="border-top d-flex justify-content-between align-items-md-center px-6 py-6 flex-md-row flex-column gap-4">
//             <span>Showing 1 to 8 of 12 entries</span>
//             <nav>
//                 <ul className="pagination mb-0">
//                     <li className="page-item disabled"><a className="page-link" href="#!">Previous</a></li>
//                     <li className="page-item"><a className="page-link active" href="#!">1</a></li>
//                     <li className="page-item"><a className="page-link" href="#!">2</a></li>
//                     <li className="page-item"><a className="page-link" href="#!">3</a></li>
//                     <li className="page-item"><a className="page-link" href="#!">Next</a></li>
//                 </ul>
//             </nav>
//         </div>
//     )
// }

import React, { useState, useEffect } from "react";

export default function Paginator({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalItems / itemsPerPage)
  );

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  return (
    <div className="border-top d-flex justify-content-between align-items-md-center px-6 py-6 flex-md-row flex-column gap-4">
      <span>
        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
        entries
      </span>
      <nav>
        <ul className="pagination mb-0">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
