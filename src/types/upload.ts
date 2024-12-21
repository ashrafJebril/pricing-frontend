export interface FileUpload {
  id: string;
  filename: string;
  status: 'processing' | 'completed' | 'failed';
  records_processed: number;
  created_at: string;
  created_by: string;
}