/**
 * @fileoverview Redux store configuration for FI Report management
 * @version 1.0.0
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FIReportService from "../service/FIReportsService";

// Initialize service
const fiReportService = new FIReportService();

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
  "fiReports/create",
  async (reportData, { rejectWithValue }) => {
    try {
      const response = await fiReportService.createReport(reportData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllReports = createAsyncThunk(
  "fiReports/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fiReportService.getAllReports();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReportById = createAsyncThunk(
  "fiReports/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fiReportService.getReportById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateReport = createAsyncThunk(
  "fiReports/update",
  async ({ id, reportData }, { rejectWithValue }) => {
    try {
      const response = await fiReportService.updateReport(id, reportData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReport = createAsyncThunk(
  "fiReports/delete",
  async (id, { rejectWithValue }) => {
    try {
      await fiReportService.deleteReport(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const fiReportSlice = createSlice({
  name: "fiReports",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentReport: (state) => {
      state.currentReport = null;
    },
    resetFIReportState: () => initialState,
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
  resetFIReportState,
  setCurrentReport,
} = fiReportSlice.actions;

// Selectors
export const selectFIReports = (state) => state.fiReports.reports;
export const selectCurrentFIReport = (state) => state.fiReports.currentReport;
export const selectFILoading = (state) => state.fiReports.loading;
export const selectFIError = (state) => state.fiReports.error;
export const selectFILastAction = (state) => state.fiReports.lastAction;
export const selectFIIsLoading = (state) =>
  Object.values(state.fiReports.loading).some((loading) => loading);
export const selectFIReportById = (id) => (state) =>
  state.fiReports.reports.find((r) => r.id === id);

export default fiReportSlice.reducer;
