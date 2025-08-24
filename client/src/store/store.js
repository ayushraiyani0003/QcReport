import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserListSlice";
import fiReportReducer from "../store/FIReportSlice";
import isReportReducer from "../store/ISReportSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    fiReports: fiReportReducer,
    isReports: isReportReducer,
  },
  devTools: import.meta.env.MODE !== "production", // Vite compatible
});

export default store;
