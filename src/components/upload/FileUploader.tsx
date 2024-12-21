import React, { useRef, useState } from 'react';
import { Upload, File } from 'lucide-react';

interface FileUploaderProps {
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
}

const FileUploader = ({ onUpload, isUploading }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      await onUpload(file);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onUpload(file);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".xlsx"
        onChange={handleChange}
        disabled={isUploading}
      />

      <div className="space-y-4">
        <div className="flex justify-center">
          {isUploading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          ) : (
            <Upload className="h-12 w-12 text-gray-400" />
          )}
        </div>
        
        <div>
          <p className="text-lg font-medium text-gray-900">
            {isUploading ? 'Uploading...' : 'Upload Excel File'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Drag and drop your Excel file here, or click to select
          </p>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <File className="h-5 w-5 mr-2 text-gray-400" />
          Select File
        </button>
      </div>
    </div>
  );
}

export default FileUploader;