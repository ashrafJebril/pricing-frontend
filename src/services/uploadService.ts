import axiosInstance from "./axiosService";

export async function apiUploadExcel<T>(file: File): Promise<T> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post<T>("/upload/excel", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
