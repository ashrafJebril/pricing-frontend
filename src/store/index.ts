import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uploadReducer from "./slices/uploadSlice";
import products from "./slices/productsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    upload: uploadReducer,
    products,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
