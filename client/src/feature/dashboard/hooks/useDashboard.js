// src/hooks/useEnhancedDashboard.js
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllReports as fetchFIReports,
  deleteReport as deleteFIReport,
  createReport as createFIReport,
  clearError as clearFIError,
} from "../../../store/FIReportSlice";
import {
  fetchAllReports as fetchISReports,
  deleteReport as deleteISReport,
  createReport as createISReport,
  clearError as clearISError,
} from "../../../store/ISReportSlice";

export const useEnhancedDashboard = () => {
  const dispatch = useDispatch();

  // Redux state
  const fiReports = useSelector((state) => state.fiReports.reports);
  const isReports = useSelector((state) => state.isReports.reports);
  const fiLoading = useSelector((state) => state.fiReports.loading.fetchAll);
  const isLoading = useSelector((state) => state.isReports.loading.fetchAll);
  const fiError = useSelector((state) => state.fiReports.error);
  const isError = useSelector((state) => state.isReports.error);

  // Local state
  const [mergedReports, setMergedReports] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("View All");
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    reportType: "",
    clientNumber: "",
    date: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({});

  // Dropdown states
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [reportTypeMenuOpen, setReportTypeMenuOpen] = useState(false);
  const [clientMenuOpen, setClientMenuOpen] = useState(false);

  // Refs
  const dropdownRef = useRef(null);
  const filterRef = useRef(null);

  const filterTabs = ["View All", "Blank Report", "Fill Report"];

  // Fetch reports on mount
  useEffect(() => {
    dispatch(fetchFIReports());
    dispatch(fetchISReports());
  }, [dispatch]);

  // Helper: Check if FI report fields are filled
  const isFIReportComplete = (report) => {
    console.log("Checking FI Report completion:", report);

    // Check basic fields - prioritize Drawing No. as the primary identifier
    const hasDrawingNo = !!(
      report.drawingNo || getDrawingNumberFromReport(report, "FI")
    );

    const hasBasicFields = !!(hasDrawingNo && report.clientName);

    // Check if measurement rows have data
    let hasValidRows = false;
    console.log(report);

    // Check supplierFiledData for measurement rows
    if (report.supplierFiledData) {
      let supplierData = report.supplierFiledData;
      console.log(supplierData);

      if (typeof supplierData === "string") {
        try {
          supplierData = JSON.parse(supplierData);
          console.log(supplierData);
        } catch (e) {
          console.error("Error parsing supplierFiledData:", e);
        }
      }

      if (
        supplierData &&
        supplierData.measurements &&
        Array.isArray(supplierData.measurements)
      ) {
        console.log(supplierData.measurements);

        const allFilled = supplierData.measurements.every((row) => row.P1);

        hasValidRows = allFilled;
      }
    }

    return hasBasicFields && hasValidRows;
  };

  // Enhanced helper function to extract Drawing No. from report data
  const getDrawingNumberFromReport = (report, reportType) => {
    console.log(`Getting drawing number for ${reportType} report:`, report);

    if (reportType === "FI") {
      // Priority order for FI Reports:
      // 1. Direct drawingNo field (highest priority)
      if (report.drawingNo && report.drawingNo.trim()) {
        console.log("Found drawingNo in direct field:", report.drawingNo);
        return report.drawingNo.trim();
      }

      // 2. Check supplierFiledData JSON (most likely to have user input)
      if (report.supplierFiledData) {
        let supplierData = report.supplierFiledData;
        if (typeof supplierData === "string") {
          try {
            supplierData = JSON.parse(supplierData);
          } catch (e) {
            console.error("Error parsing supplierFiledData:", e);
          }
        }
        if (
          supplierData &&
          supplierData.drawingNo &&
          supplierData.drawingNo.trim()
        ) {
          console.log(
            "Found drawingNo in supplierFiledData:",
            supplierData.drawingNo
          );
          return supplierData.drawingNo.trim();
        }
      }

      // 3. Check customerFiledData JSON
      if (report.customerFiledData) {
        let customerData = report.customerFiledData;
        if (typeof customerData === "string") {
          try {
            customerData = JSON.parse(customerData);
          } catch (e) {
            console.error("Error parsing customerFiledData:", e);
          }
        }
        if (
          customerData &&
          customerData.customerDrawingNo &&
          customerData.customerDrawingNo.trim()
        ) {
          console.log(
            "Found drawingNo in customerFiledData:",
            customerData.customerDrawingNo
          );
          return customerData.customerDrawingNo.trim();
        }
      }

      // 4. Check blankReportData JSON (fallback)
      if (report.blankReportData) {
        let blankData = report.blankReportData;
        if (typeof blankData === "string") {
          try {
            blankData = JSON.parse(blankData);
          } catch (e) {
            console.error("Error parsing blankReportData:", e);
          }
        }
        if (blankData && blankData.drawingNo && blankData.drawingNo.trim()) {
          console.log(
            "Found drawingNo in blankReportData:",
            blankData.drawingNo
          );
          return blankData.drawingNo.trim();
        }
      }

      // 5. Check customerDrawingNo field
      if (report.customerDrawingNo && report.customerDrawingNo.trim()) {
        console.log("Found customerDrawingNo:", report.customerDrawingNo);
        return report.customerDrawingNo.trim();
      }
    } else if (reportType === "IS") {
      // For IS Reports - maintain existing logic
      if (report.drawingNo && report.drawingNo.trim()) {
        return report.drawingNo.trim();
      }

      if (report.customerDrawingNo && report.customerDrawingNo.trim()) {
        return report.customerDrawingNo.trim();
      }

      if (report.blankReportData) {
        let blankData = report.blankReportData;
        if (typeof blankData === "string") {
          try {
            blankData = JSON.parse(blankData);
          } catch (e) {
            console.error("Error parsing IS blankReportData:", e);
          }
        }

        if (
          blankData?.supplierInfo?.drawingNo &&
          blankData.supplierInfo.drawingNo.trim()
        ) {
          return blankData.supplierInfo.drawingNo.trim();
        }

        if (
          blankData?.customerInfo?.drawingNo &&
          blankData.customerInfo.drawingNo.trim()
        ) {
          return blankData.customerInfo.drawingNo.trim();
        }
      }

      if (report.identification && report.identification.trim()) {
        return report.identification.trim();
      }

      if (
        report.customerIdentification &&
        report.customerIdentification.trim()
      ) {
        return report.customerIdentification.trim();
      }
    }

    console.log("No drawing number found for report");
    return null;
  };

  // Transform and merge reports with Drawing No. as Report Name
  useEffect(() => {
    const transformReports = (reports, type) => {
      return reports.map((report) => {
        let reportName, clientName, deadline, status, clientNumber;

        // Get Drawing No. as the primary Report Name
        const drawingNo = getDrawingNumberFromReport(report, type);

        if (type === "FI") {
          // FOR FI REPORTS: Drawing No. is the PRIMARY report name
          reportName =
            drawingNo ||
            report.identification ||
            report.partSubNoCavity ||
            report.testRepNo ||
            report.reportName ||
            `FI Report #${report.id?.toString().slice(-6) || "Unknown"}`;

          // Client information
          clientName =
            report.clientName || // ✅ testRepNo (DB માંથી આવેલું)
            report.supplierName ||
            report.client?.name ||
            "Unknown Supplier";

          clientNumber =
            report.supplierNumber?.toString() ||
            report.client?.clientNumber?.toString() ||
            report.clientNumber?.toString() ||
            "N/A";

          deadline = report.date || report.deadline || new Date();
          status = isFIReportComplete(report) ? "Completed" : "Pending";
        } else if (type === "IS") {
          // For IS Reports, maintain existing logic
          reportName =
            drawingNo ||
            report.partNo ||
            report.customerPartNo ||
            report.identification ||
            report.customerIdentification ||
            report.reportName ||
            `IS Report #${report.id?.toString().slice(-6) || "Unknown"}`;

          clientName =
            report.receiverCustomer || report.customerName || "Unknown Client";

          clientNumber =
            report.customerNumber?.toString() ||
            report.supplierNumber?.toString() ||
            "N/A";

          deadline = report.supplierDate || report.createdAt || new Date();
          status = "Completed";
        }

        console.log(`${type} Report Transform:`, {
          id: report.id,
          drawingNo: drawingNo,
          finalReportName: reportName,
          originalReportName: report.reportName,
        });

        return {
          id: report.id,
          name: reportName, // This will now show Drawing No. as the primary name
          clientNumber: clientNumber,
          clientName: clientName,
          deadline: deadline,
          status: status,
          isComplete: status === "Completed",
          reportType: type === "FI" ? "FI Report" : "IS Report",
          originalData: report,
          dataSource: type,
          drawingNumber: drawingNo, // Keep separate reference
          originalReportName: report.reportName, // Keep original name for reference
        };
      });
    };

    const merged = [
      ...transformReports(fiReports, "FI"),
      ...transformReports(isReports, "IS"),
    ].sort((a, b) => new Date(b.deadline) - new Date(a.deadline));

    console.log("Merged reports with Drawing No. as names:", merged);
    setMergedReports(merged);
  }, [fiReports, isReports]);

  // Filter & search logic (updated to include drawing number search)
  useEffect(() => {
    let result = [...mergedReports];

    if (filterStatus === "Blank Report") {
      result = result.filter((item) => item.status === "Pending");
    } else if (filterStatus === "Fill Report") {
      result = result.filter((item) => item.status === "Completed");
    }

    if (searchText.trim() !== "") {
      const search = searchText.trim().toLowerCase();
      result = result.filter((item) => {
        const name = item.name?.toLowerCase() || "";
        const clientNumber = item.clientNumber?.toLowerCase() || "";
        const clientName = item.clientName?.toLowerCase() || "";
        const deadline = formatDate(item.deadline) || "";
        const status = item.status?.toLowerCase() || "";
        const reportType = item.reportType?.toLowerCase() || "";
        const drawingNumber = item.drawingNumber?.toLowerCase() || "";
        const originalReportName = item.originalReportName?.toLowerCase() || "";

        return (
          name.includes(search) ||
          clientNumber.includes(search) ||
          clientName.includes(search) ||
          deadline.includes(search) ||
          status.includes(search) ||
          reportType.includes(search) ||
          drawingNumber.includes(search) ||
          originalReportName.includes(search)
        );
      });
    }

    if (appliedFilters.reportType) {
      const reportType = appliedFilters.reportType.toLowerCase();
      result = result.filter((item) =>
        item.reportType?.toLowerCase().includes(reportType)
      );
    }

    if (appliedFilters.clientNumber) {
      const client = appliedFilters.clientNumber.toLowerCase();
      result = result.filter(
        (item) =>
          item.clientNumber?.toLowerCase().includes(client) ||
          item.clientName?.toLowerCase().includes(client)
      );
    }

    if (appliedFilters.date) {
      result = result.filter(
        (item) => formatDate(item.deadline) === appliedFilters.date
      );
    }

    setFilteredData(result);
  }, [mergedReports, filterStatus, searchText, appliedFilters]);

  // Stats
  const stats = {
    totalItems: mergedReports.length,
    completedItems: mergedReports.filter((item) => item.status === "Completed")
      .length,
    pendingItems: mergedReports.filter((item) => item.status === "Pending")
      .length,
    fiReports: mergedReports.filter((item) => item.dataSource === "FI").length,
    isReports: mergedReports.filter((item) => item.dataSource === "IS").length,
  };

  // Client options
  const clientOptions = [
    ...new Set(
      [
        ...mergedReports.map((item) => item.clientNumber),
        ...mergedReports.map((item) => item.clientName),
      ].filter(Boolean)
    ),
  ];

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Utility functions
  const formatDate = (date) => {
    if (!(date instanceof Date)) date = new Date(date);
    if (isNaN(date.getTime())) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Toggle handlers
  const toggleShowDropdown = () => setShowDropdown(!showDropdown);
  const toggleFilterMenu = () => setFilterMenuOpen(!filterMenuOpen);
  const toggleReportTypeMenu = () => setReportTypeMenuOpen(!reportTypeMenuOpen);
  const toggleClientMenu = () => setClientMenuOpen(!clientMenuOpen);

  // Filter handlers
  const handleReportTypeChange = (type) => {
    setFilters((prev) => ({ ...prev, reportType: type }));
    setReportTypeMenuOpen(false);
  };

  const selectClientNumber = (client) => {
    setFilters((prev) => ({ ...prev, clientNumber: client }));
    setClientMenuOpen(false);
  };

  const clearClientSelection = () => {
    setFilters((prev) => ({ ...prev, clientNumber: "" }));
    setClientMenuOpen(false);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setFilterMenuOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({ reportType: "", clientNumber: "", date: "" });
    setAppliedFilters({});
  };

  // CRUD operation handlers
  const handleEditItem = (item) => {
    if (item.dataSource === "FI") {
      window.location.href = `/fi-report/${item.id}?mode=edit`;
    } else {
      window.location.href = `/is-report/${item.id}?mode=edit`;
    }
  };

  const handleDeleteItem = async (item) => {
    if (
      window.confirm(`Are you sure you want to delete this ${item.reportType}?`)
    ) {
      try {
        if (item.dataSource === "FI") {
          await dispatch(deleteFIReport(item.id)).unwrap();
        } else if (item.dataSource === "IS") {
          await dispatch(deleteISReport(item.id)).unwrap();
        }
        dispatch(fetchFIReports());
        dispatch(fetchISReports());
      } catch (error) {
        console.error("Failed to delete report:", error);
        alert(`Failed to delete ${item.reportType}: ${error}`);
      }
    }
  };

  // Enhanced Copy Item function
  // Enhanced handleCopyItem function that preserves ALL report data
  const handleCopyItem = async (item, copyType = "filled") => {
    try {
      console.log(`Creating ${copyType} copy of ${item.reportType}:`, item);

      const originalData = item.originalData;

      // Helper function to deep-clone and preserve ALL filled data
      // FIXED: returns object instead of string
      const preserveAllFilledData = (data) => {
        if (!data) return null;
        try {
          const parsed =
            typeof data === "string"
              ? JSON.parse(data)
              : JSON.parse(JSON.stringify(data));
          return parsed; // ✅ return as object, not string
        } catch (error) {
          console.error("Error preserving filled data:", error);
          return data;
        }
      };

      // Helper function to create blank structure while preserving form layout
      const createBlankStructure = (data, reportType) => {
        if (!data) return null;
        try {
          let structure =
            typeof data === "string"
              ? JSON.parse(data)
              : JSON.parse(JSON.stringify(data));

          // For FI Reports - clear measurement values but keep structure
          if (reportType === "FI" && structure.measurements) {
            structure.measurements = structure.measurements.map((row) => ({
              ...row,
              P1: "",
              P2: "",
              P3: "",
              P4: "",
              P5: "",
              actualValue: "",
              actualTolerancePlus: "",
              actualToleranceMinus: "",
            }));
          }

          // Clear supplier info but keep structure
          if (structure.supplierInfo) {
            Object.keys(structure.supplierInfo).forEach((key) => {
              if (!["supplierName", "supplierNumber"].includes(key)) {
                structure.supplierInfo[key] = "";
              }
            });
          }

          // Clear customer info but keep structure
          if (structure.customerInfo) {
            Object.keys(structure.customerInfo).forEach((key) => {
              structure.customerInfo[key] = "";
            });
          }

          // Clear signatures and dates
          if (structure.signatures) {
            structure.signatures = {
              supplier: "",
              customer: "",
              date: "",
            };
          }

          return JSON.stringify(structure);
        } catch (error) {
          console.error("Error creating blank structure:", error);
          return null;
        }
      };

      // Create comprehensive base data that includes ALL original fields
      const baseReportData = {};

      Object.keys(originalData).forEach((key) => {
        if (!["id", "_id", "createdAt", "updatedAt"].includes(key)) {
          baseReportData[key] = originalData[key];
        }
      });

      // Set new timestamps
      baseReportData.createdAt = new Date().toISOString();
      baseReportData.updatedAt = new Date().toISOString();

      let copiedReportData;

      if (copyType === "blank") {
        // Blank Copy
        console.log("Creating blank copy - clearing filled data...");
        copiedReportData = {
          ...baseReportData,
          supplierFiledData: createBlankStructure(
            originalData.supplierFiledData || originalData.blankReportData,
            item.dataSource
          ),
          customerFiledData: null,
          measurementData: createBlankStructure(
            originalData.measurementData,
            item.dataSource
          ),
          inspectionResults: null,
          testResults: null,
          qualityData: null,

          reportName: `${
            originalData.reportName || `${item.dataSource} Report`
          } (Blank Copy)`,
          drawingNo: originalData.drawingNo
            ? `${originalData.drawingNo} (Blank)`
            : null,
          customerDrawingNo: originalData.customerDrawingNo
            ? `${originalData.customerDrawingNo} (Blank)`
            : null,
          identification: originalData.identification
            ? `${originalData.identification} (Blank)`
            : null,
          customerIdentification: originalData.customerIdentification
            ? `${originalData.customerIdentification} (Blank)`
            : null,
          testRepNo: originalData.testRepNo
            ? `${originalData.testRepNo} (Blank)`
            : null,
          partSubNoCavity: originalData.partSubNoCavity
            ? `${originalData.partSubNoCavity} (Blank)`
            : null,
        };
      } else {
        // Filled Copy
        console.log("Creating filled copy - preserving all data...");
        copiedReportData = {
          ...baseReportData,
          supplierFiledData: preserveAllFilledData(
            originalData.supplierFiledData
          ),
          customerFiledData: preserveAllFilledData(
            originalData.customerFiledData
          ),
          blankReportData: preserveAllFilledData(originalData.blankReportData),

          measurementData: preserveAllFilledData(originalData.measurementData),
          inspectionResults: preserveAllFilledData(
            originalData.inspectionResults
          ),
          testResults: preserveAllFilledData(originalData.testResults),
          qualityData: preserveAllFilledData(originalData.qualityData),

          reportSettings: preserveAllFilledData(originalData.reportSettings),
          checkboxStates: preserveAllFilledData(originalData.checkboxStates),
          formData: preserveAllFilledData(originalData.formData),

          reportName: `${
            originalData.reportName || `${item.dataSource} Report`
          } (Copy)`,
          drawingNo: originalData.drawingNo
            ? `${originalData.drawingNo} (Copy)`
            : null,
          customerDrawingNo: originalData.customerDrawingNo
            ? `${originalData.customerDrawingNo} (Copy)`
            : null,
          identification: originalData.identification
            ? `${originalData.identification} (Copy)`
            : null,
          customerIdentification: originalData.customerIdentification
            ? `${originalData.customerIdentification} (Copy)`
            : null,
          testRepNo: originalData.testRepNo
            ? `${originalData.testRepNo} (Copy)`
            : null,
          partSubNoCavity: originalData.partSubNoCavity
            ? `${originalData.partSubNoCavity} (Copy)`
            : null,
        };
      }

      console.log("Complete copied report data:", {
        copyType,
        originalDataKeys: Object.keys(originalData),
        copiedDataKeys: Object.keys(copiedReportData),
        supplierDataSize: copiedReportData.supplierFiledData?.length || 0,
      });

      // Dispatch to backend
      let result;
      if (item.dataSource === "FI") {
        result = await dispatch(createFIReport(copiedReportData)).unwrap();
      } else if (item.dataSource === "IS") {
        result = await dispatch(createISReport(copiedReportData)).unwrap();
      }

      // Success feedback
      const copyTypeText =
        copyType === "blank" ? "Blank Template" : "Complete Filled Report";
      const detailsText =
        copyType === "filled"
          ? " (including all measurements and data)"
          : " (structure only, no data)";

      alert(`${copyTypeText} copied successfully!${detailsText}`);

      // Refresh lists
      dispatch(fetchFIReports());
      dispatch(fetchISReports());

      // Navigate to edit page if user confirms
      if (result && result.id) {
        const confirmEdit = window.confirm(
          `${copyTypeText} created successfully! Would you like to open it for editing?`
        );
        if (confirmEdit) {
          if (item.dataSource === "FI") {
            window.location.href = `/fi-report/${result.id}?mode=edit`;
          } else {
            window.location.href = `/is-report/${result.id}?mode=edit`;
          }
        }
      }
    } catch (error) {
      console.error("Failed to copy report:", error);

      const errorDetails = {
        message: error.message || "Unknown error",
        originalDataKeys: Object.keys(item.originalData || {}),
        copyType,
        reportType: item.reportType,
      };

      console.error("Copy error details:", errorDetails);
      alert(
        `Failed to copy ${item.reportType}: ${
          error.message || "Unknown error occurred"
        }`
      );
    }
  };
  const handleViewItem = (item) => {
    if (item.dataSource === "FI") {
      window.location.href = `/fi-report/${item.id}`;
    } else {
      window.location.href = `/is-report/${item.id}`;
    }
  };

  const clearErrors = () => {
    dispatch(clearFIError());
    dispatch(clearISError());
  };

  const hasActiveFilters = Object.values(appliedFilters).some(Boolean);

  return {
    // Data
    filteredData,
    mergedReports,
    stats,
    clientOptions,

    // State
    filterStatus,
    searchText,
    filters,
    appliedFilters,
    showDropdown,
    filterMenuOpen,
    reportTypeMenuOpen,
    clientMenuOpen,
    hasActiveFilters,
    loading: fiLoading || isLoading,
    error: fiError || isError,

    // Refs
    dropdownRef,
    filterRef,
    filterTabs,

    // Setters
    setFilterStatus,
    setSearchText,
    setFilters,

    // Toggle handlers
    toggleShowDropdown,
    toggleFilterMenu,
    toggleReportTypeMenu,
    toggleClientMenu,

    // Filter handlers
    handleReportTypeChange,
    selectClientNumber,
    clearClientSelection,
    handleApplyFilters,
    handleClearFilters,

    // CRUD handlers
    handleEditItem,
    handleDeleteItem,
    handleCopyItem,
    handleViewItem,

    // Utilities
    formatDate,
    clearErrors,
  };
};
