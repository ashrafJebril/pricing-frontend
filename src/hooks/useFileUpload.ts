import { useState, useEffect } from 'react';
import { read, utils } from 'xlsx';
import { api } from '../lib/api/base';
import { FileUpload } from '../types/upload';

export const useFileUpload = () => {
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [isLoading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    const data = await api.get('/uploads');
    setUploads(data);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      const buffer = await file.arrayBuffer();
      const workbook = read(buffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = utils.sheet_to_json(worksheet);

      await api.post('/uploads', {
        filename: file.name,
        data
      });

      await fetchUploads();
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, uploads, isLoading };
};