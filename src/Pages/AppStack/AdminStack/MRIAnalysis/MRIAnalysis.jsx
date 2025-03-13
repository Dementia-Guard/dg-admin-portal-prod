import React, { useState } from "react";
import BreadCrumb from "../../../../Components/BreadCrumb/BreadCrumb";
import MRIUploader from "./MRIUploader";

export default function MRIAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (file) => {
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  return (
    <main className="main-content-wrapper pb-6 px-0 px-md-4">
      <div className="container">
        <BreadCrumb page={"Analyze MRI Images"} icon={"fas fa-brain"} />

        <div className="row justify-content-center">
          <div className="col-xl-8 col-md-10 col-12">
            <div className="card h-100">
              <div className="px-6 py-6">
                <h4 className="mb-4 text-primary">Upload MRI Scans</h4>
                <MRIUploader
                  onFileChange={handleFileChange}
                  filePreview={filePreview}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
