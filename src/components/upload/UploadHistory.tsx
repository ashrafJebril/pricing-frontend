import React from "react";
import { FileUpload } from "../../types"; // Adjust the path to where FileUpload is defined

interface UploadHistoryProps {
  uploads: FileUpload[]; // Expect an array of FileUpload objects
}

const UploadHistory: React.FC<UploadHistoryProps> = ({ uploads }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Upload History</h2>
      <ul className="list-disc list-inside">
        {uploads.map((upload) => (
          <li key={upload.id} className="text-gray-700">
            <div>Filename: {upload.filename}</div>
            <div>Status: {upload.status}</div>
            <div>Records Processed: {upload.records_processed}</div>
            <div>Created At: {upload.created_at}</div>
            <div>Created By: {upload.created_by}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadHistory;
