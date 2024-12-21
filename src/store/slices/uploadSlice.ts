import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiUploadExcel } from "../../services/uploadService"; // Import the API service
import { FileUpload } from "../../types/upload"; // Adjust the path to where FileUpload is defined

interface UploadState {
  uploads: FileUpload[]; // Array of FileUpload objects
  uploading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: UploadState = {
  uploads: [], // Start with an empty array
  uploading: false,
  success: false,
  error: null,
};

// Thunk for uploading an Excel file
export const uploadExcelFile = createAsyncThunk<
  FileUpload, // The type of the return value
  File, // The type of the argument passed to the thunk
  { rejectValue: string } // The type of the rejection value
>("upload/uploadExcelFile", async (file, { rejectWithValue }) => {
  try {
    // Call the API service to upload the file
    const response = await apiUploadExcel<FileUpload>(file);

    return response; // Return the FileUpload object on success
  } catch (error: any) {
    console.error("Error uploading Excel file:", error);
    return rejectWithValue(error.message || "Failed to upload file");
  }
});

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.uploads = [];
      state.uploading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle thunk pending state
      .addCase(uploadExcelFile.pending, (state) => {
        state.uploading = true;
        state.success = false;
        state.error = null;
      })
      // Handle thunk fulfilled state
      .addCase(
        uploadExcelFile.fulfilled,
        (state, action: PayloadAction<FileUpload>) => {
          state.uploading = false;
          state.success = true;
          state.uploads.push(action.payload); // Add uploaded file info to uploads
        }
      )
      // Handle thunk rejected state
      .addCase(uploadExcelFile.rejected, (state, action) => {
        state.uploading = false;
        state.success = false;
        state.error = action.payload || "Upload failed";
      });
  },
});

export const { resetUploadState } = uploadSlice.actions;
export default uploadSlice.reducer;
