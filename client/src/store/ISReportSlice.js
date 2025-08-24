/**
 * @fileoverview Redux store configuration for IS Report management
 * @version 1.0.0
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ISReportService from "../service/ISReportService";

// Initialize service
const isReportService = new ISReportService();

// Initial state
const initialState = {
  reports: [],
  currentReport: null,
  loading: {
    fetchAll: false,
    fetchById: false,
    create: false,
    update: false,
    delete: false,
  },
  error: null,
  lastAction: null,
};

// Async Thunks
export const createReport = createAsyncThunk(
  "isReports/create",
  async (reportData, { rejectWithValue }) => {
    try {
      const response = await isReportService.createReport(reportData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllReports = createAsyncThunk(
  "isReports/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await isReportService.getAllReports();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReportById = createAsyncThunk(
  "isReports/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await isReportService.getReportById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateReport = createAsyncThunk(
  "isReports/update",
  async ({ id, reportData }, { rejectWithValue }) => {
    try {
      const response = await isReportService.updateReport(id, reportData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReport = createAsyncThunk(
  "isReports/delete",
  async (id, { rejectWithValue }) => {
    try {
      await isReportService.deleteReport(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const isReportSlice = createSlice({
  name: "isReports",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentReport: (state) => {
      state.currentReport = null;
    },
    resetISReportState: () => initialState,
    setCurrentReport: (state, action) => {
      state.currentReport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReport.pending, (state) => {
        state.loading.create = true;
        state.error = null;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.loading.create = false;
        state.reports.unshift(action.payload);
        state.lastAction = "create";
      })
      .addCase(createReport.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
        state.lastAction = "create";
      })

      .addCase(fetchAllReports.pending, (state) => {
        state.loading.fetchAll = true;
        state.error = null;
      })
      .addCase(fetchAllReports.fulfilled, (state, action) => {
        state.loading.fetchAll = false;
        state.reports = action.payload;
        state.lastAction = "fetchAll";
      })
      .addCase(fetchAllReports.rejected, (state, action) => {
        state.loading.fetchAll = false;
        state.error = action.payload;
        state.lastAction = "fetchAll";
      })

      .addCase(fetchReportById.pending, (state) => {
        state.loading.fetchById = true;
        state.error = null;
      })
      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.loading.fetchById = false;
        state.currentReport = action.payload;
        state.lastAction = "fetchById";
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.loading.fetchById = false;
        state.error = action.payload;
        state.lastAction = "fetchById";
      })

      .addCase(updateReport.pending, (state) => {
        state.loading.update = true;
        state.error = null;
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        state.loading.update = false;
        const updatedReport = action.payload;
        const index = state.reports.findIndex((r) => r.id === updatedReport.id);
        if (index !== -1) {
          state.reports[index] = updatedReport;
        }
        if (
          state.currentReport &&
          state.currentReport.id === updatedReport.id
        ) {
          state.currentReport = updatedReport;
        }
        state.lastAction = "update";
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
        state.lastAction = "update";
      })

      .addCase(deleteReport.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.loading.delete = false;
        const deletedId = action.payload;
        state.reports = state.reports.filter((r) => r.id !== deletedId);
        if (state.currentReport && state.currentReport.id === deletedId) {
          state.currentReport = null;
        }
        state.lastAction = "delete";
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
        state.lastAction = "delete";
      });
  },
});

// Export actions
export const {
  clearError,
  clearCurrentReport,
  resetISReportState,
  setCurrentReport,
} = isReportSlice.actions;

// Selectors
export const selectISReports = (state) => state.isReports.reports;
export const selectCurrentISReport = (state) => state.isReports.currentReport;
export const selectISLoading = (state) => state.isReports.loading;
export const selectISError = (state) => state.isReports.error;
export const selectISLastAction = (state) => state.isReports.lastAction;
export const selectISIsLoading = (state) =>
  Object.values(state.isReports.loading).some((loading) => loading);
export const selectISReportById = (id) => (state) =>
  state.isReports.reports.find((r) => r.id === id);

export default isReportSlice.reducer;
