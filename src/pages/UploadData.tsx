import React from "react";
import FileUploader from "../components/upload/FileUploader";
import UploadHistory from "../components/upload/UploadHistory";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { resetUploadState, uploadExcelFile } from "../store/slices/uploadSlice"; // Updated import

const UploadData = () => {
  const dispatch = useDispatch();
  const { uploads, uploading, success, error } = useSelector(
    (state: RootState) => state.upload
  );

  const handleUpload = (file: File) => {
    // Dispatch the thunk for file upload
    dispatch(uploadExcelFile(file));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Upload Data</h1>

      <FileUploader onUpload={handleUpload} isUploading={uploading} />

      {success && <p className="text-green-600">File uploaded successfully!</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <button
        onClick={() => dispatch(resetUploadState())}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Reset
      </button>

      <UploadHistory uploads={uploads} />
    </div>
  );
};

export default UploadData;
