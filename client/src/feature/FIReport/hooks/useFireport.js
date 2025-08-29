"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchReportById,
  updateReport,
  createReport,
} from "../../../store/FIReportSlice";

export const useFIReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEditMode = Boolean(id);
  const pdfRef = useRef();

  // Redux state
  const { currentReport, loading } = useSelector((state) => state.fiReports);
  const updateLoading = loading?.update;
  const createLoading = loading?.create;
  const fetchLoading = loading?.fetchById;

  const [dataLoaded, setDataLoaded] = useState(false);
  const [formReady, setFormReady] = useState(false);
  const [rows, setRows] = useState([
    {
      details: "",
      drawing: "",
      method: "",
      actualValue: "",
      tolerancePlus: "",
      toleranceMinus: "",
      actualValueManuallyEdited: false,
      tolerancePlusManuallyEdited: false,
      toleranceMinusManuallyEdited: false,
      ...Array.from({ length: 10 }).reduce((acc, _, i) => {
        acc[`value${i}`] = "";
        return acc;
      }, {}),
    },
  ]);

  // Wait for DOM to be ready before populating
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch report data when in edit mode
  useEffect(() => {
    if (isEditMode && id && !dataLoaded) {
      dispatch(fetchReportById(id))
        .then(() => {
          console.log("Report data fetched successfully");
        })
        .catch((error) => {
          console.error("Error fetching report:", error);
        });
    }
  }, [id, isEditMode, dispatch, dataLoaded]);

  // Populate form when data is available and DOM is ready
  useEffect(() => {
    if (isEditMode && currentReport && formReady && !dataLoaded) {
      setTimeout(() => {
        try {
          const cleanedReport = convertNullsToEmptyStrings(currentReport);
          populateFormData(cleanedReport);
          setDataLoaded(true);
          console.log("FI Report saved successfully!");
        } catch (error) {
          console.error("Error populating form:", error);
        }
      }, 200);
    }
  }, [currentReport, isEditMode, dataLoaded, formReady]);

  // Reset data loaded state when switching between reports
  useEffect(() => {
    if (isEditMode && id) {
      setDataLoaded(false);
    }
  }, [id, isEditMode]);

  // ------------------------- UTILITY FUNCTIONS -------------------------

  /**
   * Automatically generates a report name based on form data
   */
  const generateReportName = () => {
    const drawingNo =
      getCleanInputValue("supplier-drawing-no") ||
      getCleanInputValue("customer-drawing-no");
    const partSubjectNo =
      getCleanInputValue("supplier-part-subject-no") ||
      getCleanInputValue("customer-part-subject-no");
    const testReportNo =
      getCleanInputValue("supplier-test-report-no") ||
      getCleanInputValue("customer-test-report-no");
    const supplierName = getCleanInputValue("supplier-name");
    const customerName = getCleanInputValue("customer-name");

    if (drawingNo && drawingNo.trim()) {
      return `${drawingNo.trim()}`;
    }

    if (partSubjectNo && partSubjectNo.trim()) {
      return `FI-${partSubjectNo.trim()}`;
    }

    if (testReportNo && testReportNo.trim()) {
      return `FI-${testReportNo.trim()}`;
    }

    if (supplierName && supplierName.trim()) {
      return `FI-${supplierName.trim()}-${Date.now().toString().slice(-6)}`;
    }

    if (customerName && customerName.trim()) {
      return `FI-${customerName.trim()}-${Date.now().toString().slice(-6)}`;
    }

    const timestamp = new Date();
    const dateStr = timestamp.toISOString().split("T")[0].replace(/-/g, "");
    const timeStr = timestamp.getTime().toString().slice(-6);
    return `FI-Report-${dateStr}-${timeStr}`;
  };

  /**
   * Recursively converts all null values to empty strings
   */
  const convertNullsToEmptyStrings = (obj) => {
    if (obj === null || obj === undefined) {
      return "";
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => convertNullsToEmptyStrings(item));
    }

    if (typeof obj === "object" && obj !== null) {
      const converted = {};
      for (const key in obj) {
        if (Object.hasOwn(obj, key)) {
          converted[key] = convertNullsToEmptyStrings(obj[key]);
        }
      }
      return converted;
    }

    return obj;
  };

  // ------------------------- DOM HELPERS -------------------------
  const setInputValue = (id, value) => {
    const el = document.getElementById(id);
    if (el) {
      el.value = value || "";
    }
  };

  const setCheckboxValue = (id, checked) => {
    const el = document.getElementById(id);
    if (el) {
      el.checked = Boolean(checked);
    }
  };

  // Updated helper functions to properly handle null values

  const getCleanInputValue = (id) => {
    const el = document.getElementById(id);
    if (!el) return undefined;
    return el.value.trim();
  };

  const getCleanNumberValue = (id) => {
    const value = getCleanInputValue(id);
    if (value === undefined) return undefined; // Element not found
    if (value === null) return null; // Empty field becomes null
    const parsed = Number.parseInt(value);
    return isNaN(parsed) ? null : parsed;
  };

  const getCleanDateValue = (id) => {
    const value = getCleanInputValue(id);
    if (value === undefined) return undefined; // Element not found
    if (value === null) return null; // Empty field becomes null
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  };

  // For checkboxes, use undefined when unchecked to exclude from update
  const getCheckboxValue = (id) => {
    const el = document.getElementById(id);
    if (!el) return undefined;
    return el.checked ? true : undefined; // Only send true values, exclude false
  }; // ------------------------- POPULATE FORM -------------------------
  const populateFormData = (report) => {
    console.log("Report data:", report);

    try {
      // Parse JSON fields safely
      let blankReportData = {};
      let supplierFiledData = {};
      let customerFiledData = {};

      // Parse blankReportData
      if (report.blankReportData) {
        if (typeof report.blankReportData === "string") {
          try {
            blankReportData = JSON.parse(report.blankReportData);
          } catch (e) {
            console.warn("Error parsing blankReportData:", e);
          }
        } else {
          blankReportData = report.blankReportData;
        }
      }

      // Parse supplierFiledData
      if (report.supplierFiledData) {
        if (typeof report.supplierFiledData === "string") {
          try {
            supplierFiledData = JSON.parse(report.supplierFiledData);
          } catch (e) {
            console.warn("Error parsing supplierFiledData:", e);
          }
        } else {
          supplierFiledData = report.supplierFiledData;
        }
      }

      // Parse customerFiledData
      if (report.customerFiledData) {
        if (typeof report.customerFiledData === "string") {
          try {
            customerFiledData = JSON.parse(report.customerFiledData);
          } catch (e) {
            console.warn("Error parsing customerFiledData:", e);
          }
        } else {
          customerFiledData = report.customerFiledData;
        }
      }

      // console.log("Parsed datasets:", {
      //   blankReportData,
      //   supplierFiledData,
      //   customerFiledData,
      // });

      // Helper function to get the best value from multiple sources
      // const getBestValue = (...sources) => {
      //   for (const source of sources) {
      //     if (source !== null && source !== undefined && source !== "") {
      //       return source;
      //     }
      //   }
      //   return "";
      // };

      // Populate basic form fields from base report data
      setInputValue("supplier-number", report.supplierNumber);
      setInputValue("supplier-name", report.supplierName);

      // Handle date field
      if (report.date) {
        try {
          const formattedDate = new Date(report.date)
            .toISOString()
            .split("T")[0];
          setInputValue("supplier-date", formattedDate);
        } catch {
          console.warn("Invalid date value:", report.date);
          setInputValue("supplier-date", report.date);
        }
      }

      setInputValue("supplier-test-report-no", report.testRepNo);
      setInputValue("supplier-part-subject-no", report.partSubNoCavity);
      setInputValue("supplier-identification", report.identification);
      setInputValue("supplier-drawing-no", report.drawingNo);
      setInputValue("supplier-level-date-index", report.levelDateIndex);

      // Populate customer fields
      setInputValue("customer-name", report.clientName);
      setInputValue("customer-test-report-no", report.customerTestReNo);
      setInputValue("customer-part-subject-no", report.customerPartSubNoCavity);
      setInputValue("customer-identification", report.customerIdentification);
      setInputValue("customer-drawing-no", report.customerDrawingNo);
      setInputValue("customer-level-date-index", report.customerLevelDateIndex);

      // Populate checkboxes
      setCheckboxValue("final-inspection-vda", report.finalINSReportVDA);
      setCheckboxValue("dimension-report", report.dimensionReport);
      setCheckboxValue("material-report", report.materialReport);
      setCheckboxValue("haptics-visual", report.hapticsVI);
      setCheckboxValue("materials-bought-parts", report.materialsBoughtParts);

      // Populate remarks
      setInputValue(
        "remarks-supplier",
        report.remarkSupplier || report.remarks
      );

      // Reconstruct measurement rows from the three datasets
      const reconstructedRows = reconstructRowsFromDatasets(
        blankReportData,
        supplierFiledData,
        customerFiledData
      );

      if (reconstructedRows.length > 0) {
        // console.log("Reconstructed rows:", reconstructedRows);
        setRows(reconstructedRows);
      }

      // console.log("Form population completed successfully");
    } catch (error) {
      console.error(" Error in populateFormData:", error);
    }
  };

  // Reconstruct rows from the three datasets
  const reconstructRowsFromDatasets = (
    blankData,
    supplierData,
    customerData
  ) => {
    const blankMeasurements = blankData.measurements || [];
    const supplierMeasurements = supplierData.measurements || [];
    const customerMeasurements = customerData.measurements || [];

    // console.log("Reconstructing from measurements:", {
    //   blank: blankMeasurements,
    //   supplier: supplierMeasurements,
    //   customer: customerMeasurements,
    // });

    // Find the maximum number of rows across all datasets
    const maxRows = Math.max(
      blankMeasurements.length,
      supplierMeasurements.length,
      customerMeasurements.length,
      1
    );

    const reconstructedRows = [];

    for (let i = 0; i < maxRows; i++) {
      const blankRow = blankMeasurements[i] || {};
      const supplierRow = supplierMeasurements[i] || {};
      const customerRow = customerMeasurements[i] || {};

      const row = {
        // From blankReportData: Details, Drawing Value, Test Method, Actual Value, Actual Tolerances (+), Actual Tolerances (−)
        details: blankRow.details || "",
        drawing: blankRow.drawing || "",
        method: blankRow.method || "",
        actualValue: blankRow.actualValue || "",
        tolerancePlus: blankRow.tolerancePlus || "",
        toleranceMinus: blankRow.toleranceMinus || "",

        // From supplierFiledData: P1, P2, P3, P4, P5 (mapped to value0-value4)
        value0: supplierRow.P1 || "",
        value1: supplierRow.P2 || "",
        value2: supplierRow.P3 || "",
        value3: supplierRow.P4 || "",
        value4: supplierRow.P5 || "",

        // From customerFiledData: C1, C2, C3, C4, C5 (mapped to value5-value9)
        value5: customerRow.C1 || "",
        value6: customerRow.C2 || "",
        value7: customerRow.C3 || "",
        value8: customerRow.C4 || "",
        value9: customerRow.C5 || "",

        // Manual edit flags
        actualValueManuallyEdited: true,
        tolerancePlusManuallyEdited: true,
        toleranceMinusManuallyEdited: true,
      };

      reconstructedRows.push(row);
    }

    // console.log("Final reconstructed rows:", reconstructedRows);
    return reconstructedRows;
  };

  // ------------------------- ROW MANAGEMENT -------------------------
  const addRow = () => {
    const newRow = {
      details: "",
      drawing: "",
      method: "",
      actualValue: "",
      tolerancePlus: "",
      toleranceMinus: "",
      actualValueManuallyEdited: false,
      tolerancePlusManuallyEdited: false,
      toleranceMinusManuallyEdited: false,
      ...Array.from({ length: 10 }).reduce((acc, _, i) => {
        acc[`value${i}`] = "";
        return acc;
      }, {}),
    };
    setRows((prev) => [...prev, newRow]);
  };

  const handleKeyPress = (e, rowIndex, fieldName) => {
    const fieldOrder = [
      "details",
      "drawing",
      "method",
      "actualValue",
      "tolerancePlus",
      "toleranceMinus",
      ...Array.from({ length: 10 }).map((_, i) => `value${i}`),
    ];
    const totalCols = fieldOrder.length;
    const colIndex = fieldOrder.indexOf(fieldName);

    if (e.shiftKey && e.key === "ArrowRight") {
      e.preventDefault();
      const nextCol = (colIndex + 1) % totalCols;
      document
        .querySelector(`#cell-${rowIndex}-${fieldOrder[nextCol]}`)
        ?.focus();
    }

    if (e.shiftKey && e.key === "ArrowLeft") {
      e.preventDefault();
      const prevCol = (colIndex - 1 + totalCols) % totalCols;
      document
        .querySelector(`#cell-${rowIndex}-${fieldOrder[prevCol]}`)
        ?.focus();
    }
    if (e.key === "ArrowDown" || e.key === "Enter") {
      e.preventDefault();
      const nextRow = rowIndex + 1;
      if (nextRow >= rows.length) {
        addRow();
        setTimeout(() => {
          document.querySelector(`#cell-${nextRow}-${fieldName}`)?.focus();
        }, 100);
      } else {
        document.querySelector(`#cell-${nextRow}-${fieldName}`)?.focus();
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevRow = rowIndex - 1;
      if (prevRow >= 0) {
        document.querySelector(`#cell-${prevRow}-${fieldName}`)?.focus();
      }
    }

    if (e.key === "Backspace" && !e.target.value && rows.length > 1) {
      e.preventDefault();
      setRows((prev) => prev.filter((_, i) => i !== rowIndex));
    }
  };

  // ------------------------- UTILITY FUNCTIONS FOR CLEAN DATA -------------------------

  // Updated removeEmptyValues function - preserves null but removes undefined
  // Updated removeEmptyValues function that preserves null in arrays
  const removeEmptyValues = (obj) => {
    const cleaned = {};

    for (const [key, value] of Object.entries(obj)) {
      // Skip undefined values (don't include in cleaned object)
      if (value === undefined) {
        continue;
      }

      // Preserve null values (include them in cleaned object)
      if (value === null) {
        cleaned[key] = null;
        continue;
      }

      // Handle empty strings - convert to null for database
      if (value === "") {
        cleaned[key] = null;
        continue;
      }

      if (Array.isArray(value)) {
        // For arrays, preserve structure and null values
        const cleanedArray = value.map((item) => {
          if (item === undefined) {
            return null; // Convert undefined to null in arrays
          }
          if (item === null) {
            return null; // Keep null as null
          }
          if (item === "") {
            return null; // Convert empty string to null
          }
          if (typeof item === "object" && item !== null) {
            return removeEmptyValues(item);
          }
          return item;
        });

        // Always include the array, even if it contains nulls
        // This preserves array structure for measurements
        cleaned[key] = cleanedArray;
      } else if (typeof value === "object" && value !== null) {
        const cleanedObj = removeEmptyValues(value);
        // Always include objects, even if they only contain nulls
        cleaned[key] = cleanedObj;
      } else {
        cleaned[key] = value;
      }
    }

    return cleaned;
  }; // Extract measurements for each dataset - ONLY the required fields
  // Fixed extractMeasurements function that preserves null values
  const extractMeasurements = (rows) => {
    // Always process all rows, even if they contain null values
    const hasAnyData = rows.some((row) => {
      return Object.keys(row).some((key) => {
        const value = row[key];
        // Consider null as valid data (explicit clearing)
        return value !== undefined && value !== "";
      });
    });

    if (!hasAnyData) {
      return {
        blankMeasurements: [],
        supplierMeasurements: [],
        customerMeasurements: [],
      };
    }

    const blankMeasurements = [];
    const supplierMeasurements = [];
    const customerMeasurements = [];

    rows.forEach((row, index) => {
      // Helper function to clean individual field values
      const cleanFieldValue = (value) => {
        if (value === undefined) return undefined; // Don't include
        if (value === "") return null; // Empty string becomes null
        return value; // Keep everything else including null
      };

      // Extract blank measurement fields - preserve null values
      const blankMeasurement = {};
      let hasBlankData = false;

      [
        "details",
        "drawing",
        "method",
        "actualValue",
        "tolerancePlus",
        "toleranceMinus",
      ].forEach((field) => {
        const cleanValue = cleanFieldValue(row[field]);
        if (cleanValue !== undefined) {
          blankMeasurement[field] = cleanValue;
          hasBlankData = true;
        }
      });

      // Always include the measurement object if we're in edit mode or have any data
      if (hasBlankData || index < rows.length) {
        blankMeasurements.push(blankMeasurement);
      }

      // Extract supplier measurement fields (P1-P5) - preserve null values
      const supplierMeasurement = {};
      let hasSupplierData = false;

      ["value0", "value1", "value2", "value3", "value4"].forEach(
        (field, idx) => {
          const cleanValue = cleanFieldValue(row[field]);
          if (cleanValue !== undefined) {
            supplierMeasurement[`P${idx + 1}`] = cleanValue;
            hasSupplierData = true;
          }
        }
      );

      if (hasSupplierData || index < rows.length) {
        supplierMeasurements.push(supplierMeasurement);
      }

      // Extract customer measurement fields (C1-C5) - preserve null values
      const customerMeasurement = {};
      let hasCustomerData = false;

      ["value5", "value6", "value7", "value8", "value9"].forEach(
        (field, idx) => {
          const cleanValue = cleanFieldValue(row[field]);
          if (cleanValue !== undefined) {
            customerMeasurement[`C${idx + 1}`] = cleanValue;
            hasCustomerData = true;
          }
        }
      );

      if (hasCustomerData || index < rows.length) {
        customerMeasurements.push(customerMeasurement);
      }
    });

    console.log("EXTRACTED MEASUREMENTS (with null preservation):");
    console.log(
      "Blank measurements:",
      JSON.stringify(blankMeasurements, null, 2)
    );
    console.log(
      "Supplier measurements:",
      JSON.stringify(supplierMeasurements, null, 2)
    );
    console.log(
      "Customer measurements:",
      JSON.stringify(customerMeasurements, null, 2)
    );

    return {
      blankMeasurements,
      supplierMeasurements,
      customerMeasurements,
    };
  };
  // ------------------------- SAVE FUNCTIONALITY -------------------------
  // ------------------------- SAVE FUNCTIONALITY -------------------------
  const handleSave = async () => {
    try {
      const autoGeneratedReportName = generateReportName();

      // Extract measurements for each dataset - ONLY required fields
      const { blankMeasurements, supplierMeasurements, customerMeasurements } =
        extractMeasurements(rows);

      const baseData = {
        reportName: autoGeneratedReportName,
        clientName: getCleanInputValue("customer-name"),
        supplierNumber: getCleanNumberValue("supplier-number"),
        supplierName: getCleanInputValue("supplier-name"),
        date: getCleanDateValue("supplier-date"),
        testRepNo: getCleanInputValue("supplier-test-report-no"),
        partSubNoCavity: getCleanInputValue("supplier-part-subject-no"),
        identification: getCleanInputValue("supplier-identification"),
        drawingNo: getCleanInputValue("supplier-drawing-no"),
        levelDateIndex: getCleanInputValue("supplier-level-date-index"),
        customerTestReNo: getCleanInputValue("customer-test-report-no"),
        customerPartSubNoCavity: getCleanInputValue("customer-part-subject-no"),
        customerIdentification: getCleanInputValue("customer-identification"),
        customerDrawingNo: getCleanInputValue("customer-drawing-no"),
        customerLevelDateIndex: getCleanInputValue("customer-level-date-index"),
        finalINSReportVDA:
          getCheckboxValue("final-inspection-vda") || undefined,
        dimensionReport: getCheckboxValue("dimension-report") || undefined,
        materialReport: getCheckboxValue("material-report") || undefined,
        hapticsVI: getCheckboxValue("haptics-visual") || undefined,
        materialsBoughtParts:
          getCheckboxValue("materials-bought-parts") || undefined,
        remarkSupplier: getCleanInputValue("remarks-supplier"),
        remarks: getCleanInputValue("remarks-supplier"),
      };

      // helper to check if all objects in array are fully null
      const isAllNull = (arr) =>
        !arr || arr.length === 0
          ? true
          : arr.every((obj) => {
              if (!obj || Object.keys(obj).length === 0) return true; // empty object
              return Object.values(obj).every(
                (val) => val === null || val === undefined
              );
            });
      const blankReportData = isAllNull(blankMeasurements)
        ? null
        : { measurements: blankMeasurements };

      const supplierFiledData = isAllNull(supplierMeasurements)
        ? null
        : { measurements: supplierMeasurements };

      const customerFiledData = isAllNull(customerMeasurements)
        ? null
        : { measurements: customerMeasurements };

      const finalReportData = {
        ...baseData,
        ...(blankReportData !== null && {
          blankReportData: removeEmptyValues(blankReportData),
        }),
        ...(supplierFiledData !== null && {
          supplierFiledData: removeEmptyValues(supplierFiledData),
        }),
        ...(customerFiledData !== null && {
          customerFiledData: removeEmptyValues(customerFiledData),
        }),
      };

      if (isEditMode) {
        await dispatch(
          updateReport({ id, reportData: finalReportData })
        ).unwrap();
        alert(`Report updated successfully! Name: ${autoGeneratedReportName}`);
      } else {
        await dispatch(createReport(finalReportData)).unwrap();
        alert(`Report saved successfully! Name: ${autoGeneratedReportName}`);
      }
    } catch (error) {
      console.error("Error saving report:", error);
      alert(`Error ${isEditMode ? "updating" : "saving"} report.`);
    }
  };
  // ------------------------- CLEAR FUNCTIONALITY -------------------------
  const clearCharacteristicsOnly = () => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        details: "",
        drawing: "",
        method: "",
        actualValue: "",
        tolerancePlus: "",
        toleranceMinus: "",
        // Clear P1-P5 (value0-value4) and 1-5 (value5-value9)
        value0: "",
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
        value8: "",
        value9: "",
        // Reset manual edit flags
        actualValueManuallyEdited: false,
        tolerancePlusManuallyEdited: false,
        toleranceMinusManuallyEdited: false,
      }))
    );
  };

  const clearActualMeasurementsOnly = () => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        value0: null,
        value1: null,
        value2: null,
        value3: null,
        value4: null,
        value5: null,
        value6: null,
        value7: null,
        value8: null,
        value9: null,
      }))
    );
  };

  const clearAllData = () => {
    // Reset all form fields to blank
    setInputValue("supplier-number", "");
    setInputValue("supplier-name", "");
    setInputValue("supplier-date", "");
    setInputValue("supplier-test-report-no", "");
    setInputValue("supplier-part-subject-no", "");
    setInputValue("supplier-identification", "");
    setInputValue("supplier-drawing-no", "");
    setInputValue("supplier-level-date-index", "");
    setInputValue("customer-name", "");
    setInputValue("customer-test-report-no", "");
    setInputValue("customer-part-subject-no", "");
    setInputValue("customer-identification", "");
    setInputValue("customer-drawing-no", "");
    setInputValue("customer-level-date-index", "");
    setInputValue("remarks-supplier", "");

    // Reset all checkboxes
    setCheckboxValue("final-inspection-vda", false);
    setCheckboxValue("dimension-report", false);
    setCheckboxValue("material-report", false);
    setCheckboxValue("haptics-visual", false);
    setCheckboxValue("materials-bought-parts", false);

    // Reset rows to single blank row
    setRows([
      {
        details: "",
        drawing: "",
        method: "",
        actualValue: "",
        tolerancePlus: "",
        toleranceMinus: "",
        actualValueManuallyEdited: false,
        tolerancePlusManuallyEdited: false,
        toleranceMinusManuallyEdited: false,
        ...Array.from({ length: 10 }).reduce((acc, _, i) => {
          acc[`value${i}`] = "";
          return acc;
        }, {}),
      },
    ]);
  };

  // ------------------------- OTHER HANDLERS -------------------------
  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? Any unsaved changes will be lost."
      )
    ) {
      navigate("/dashboard");
    }
  };

  const handleDownload = () =>
    alert("Download functionality will be implemented");

  return {
    rows,
    setRows,
    pdfRef,
    loading: fetchLoading,
    updateLoading,
    createLoading,
    handleKeyPress,
    handleSave,
    handleCancel,
    handleDownload,
    addRow,
    isEditMode,
    generateReportName,
    dataLoaded,
    clearCharacteristicsOnly,
    clearActualMeasurementsOnly,
    clearAllData,
  };
};
