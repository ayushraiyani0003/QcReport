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

  const getInputValue = (id) => {
    const el = document.getElementById(id);
    const value = el ? el.value.trim() : "";
    return value || null;
  };

  const getCheckboxValue = (id) => {
    const el = document.getElementById(id);
    return el ? el.checked : false;
  };

  const getCleanInputValue = (id) => {
    const el = document.getElementById(id);
    if (!el) return null;
    const value = el.value.trim();
    return value === "" ? null : value;
  };

  const getCleanNumberValue = (id) => {
    const value = getCleanInputValue(id);
    if (!value) return null;
    const parsed = Number.parseInt(value);
    return isNaN(parsed) ? null : parsed;
  };

  const getCleanDateValue = (id) => {
    const value = getCleanInputValue(id);
    if (!value) return null;
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  };

  // ------------------------- POPULATE FORM -------------------------
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
      const getBestValue = (...sources) => {
        for (const source of sources) {
          if (source !== null && source !== undefined && source !== "") {
            return source;
          }
        }
        return "";
      };

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
        } catch (error) {
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
      // console.error(" Error in populateFormData:", error);
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
        // From blankReportData: Details, Drawing Value, Test Method, Actual Value, Actual Tolerance (+), Actual Tolerance (−)
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

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextCol = (colIndex + 1) % totalCols;
      document
        .querySelector(`#cell-${rowIndex}-${fieldOrder[nextCol]}`)
        ?.focus();
    }

    if (e.key === "ArrowLeft") {
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

  const removeEmptyValues = (obj) => {
    const cleaned = {};

    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined && value !== "") {
        if (Array.isArray(value)) {
          const cleanedArray = value.filter((item) => {
            if (typeof item === "object" && item !== null) {
              const cleanedItem = removeEmptyValues(item);
              return Object.keys(cleanedItem).length > 0;
            }
            return item !== null && item !== undefined && item !== "";
          });
          if (cleanedArray.length > 0) {
            cleaned[key] = cleanedArray;
          }
        } else if (typeof value === "object" && value !== null) {
          const cleanedObj = removeEmptyValues(value);
          if (Object.keys(cleanedObj).length > 0) {
            cleaned[key] = cleanedObj;
          }
        } else {
          cleaned[key] = value;
        }
      }
    }

    return cleaned;
  };

  // Extract measurements for each dataset - ONLY the required fields
  const extractMeasurements = (rows) => {
    // Check if there are any rows with data
    const hasData = rows.some((row) => {
      return (
        row.details?.trim() ||
        row.drawing?.trim() ||
        row.method?.trim() ||
        row.actualValue?.trim() ||
        row.tolerancePlus?.trim() ||
        row.toleranceMinus?.trim() ||
        Object.keys(row).some(
          (key) => key.startsWith("value") && row[key]?.trim()
        )
      );
    });

    if (!hasData) {
      return {
        blankMeasurements: [],
        supplierMeasurements: [],
        customerMeasurements: [],
      };
    }

    // Process each row and extract only the required fields for each dataset
    const blankMeasurements = [];
    const supplierMeasurements = [];
    const customerMeasurements = [];

    rows.forEach((row) => {
      // Extract ONLY the required fields for blankReportData
      const blankMeasurement = {};
      if (row.details?.trim()) blankMeasurement.details = row.details.trim();
      if (row.drawing?.trim()) blankMeasurement.drawing = row.drawing.trim();
      if (row.method?.trim()) blankMeasurement.method = row.method.trim();
      if (row.actualValue?.trim())
        blankMeasurement.actualValue = row.actualValue.trim();
      if (row.tolerancePlus?.trim())
        blankMeasurement.tolerancePlus = row.tolerancePlus.trim();
      if (row.toleranceMinus?.trim())
        blankMeasurement.toleranceMinus = row.toleranceMinus.trim();

      // Only add if there's at least one field with data
      if (Object.keys(blankMeasurement).length > 0) {
        blankMeasurements.push(blankMeasurement);
      }

      // Extract ONLY P1-P5 for supplierFiledData
      const supplierMeasurement = {};
      if (row.value0?.trim()) supplierMeasurement.P1 = row.value0.trim();
      if (row.value1?.trim()) supplierMeasurement.P2 = row.value1.trim();
      if (row.value2?.trim()) supplierMeasurement.P3 = row.value2.trim();
      if (row.value3?.trim()) supplierMeasurement.P4 = row.value3.trim();
      if (row.value4?.trim()) supplierMeasurement.P5 = row.value4.trim();

      // Only add if there's at least one field with data
      if (Object.keys(supplierMeasurement).length > 0) {
        supplierMeasurements.push(supplierMeasurement);
      }

      // Extract ONLY C1-C5 for customerFiledData
      const customerMeasurement = {};
      if (row.value5?.trim()) customerMeasurement.C1 = row.value5.trim();
      if (row.value6?.trim()) customerMeasurement.C2 = row.value6.trim();
      if (row.value7?.trim()) customerMeasurement.C3 = row.value7.trim();
      if (row.value8?.trim()) customerMeasurement.C4 = row.value8.trim();
      if (row.value9?.trim()) customerMeasurement.C5 = row.value9.trim();

      // Only add if there's at least one field with data
      if (Object.keys(customerMeasurement).length > 0) {
        customerMeasurements.push(customerMeasurement);
      }
    });

    // console.log("EXTRACTED MEASUREMENTS:");
    // console.log("Blank measurements:", blankMeasurements);
    // console.log("Supplier measurements:", supplierMeasurements);
    // console.log("Customer measurements:", customerMeasurements);

    return {
      blankMeasurements,
      supplierMeasurements,
      customerMeasurements,
    };
  };

  // ------------------------- SAVE FUNCTIONALITY -------------------------
  const handleSave = async () => {
    try {
      const autoGeneratedReportName = generateReportName();

      // Extract measurements for each dataset - ONLY required fields
      const { blankMeasurements, supplierMeasurements, customerMeasurements } =
        extractMeasurements(rows);

      const baseData = {
        reportName: autoGeneratedReportName,
        clientName:
          getCleanInputValue("customer-name") ||
          getCleanInputValue("supplier-name"),
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

      // Create datasets with ONLY the required fields - NO OTHER DATA
      const blankReportData =
        blankMeasurements.length > 0
          ? {
              measurements: blankMeasurements,
            }
          : {};

      const supplierFiledData =
        supplierMeasurements.length > 0
          ? {
              measurements: supplierMeasurements,
            }
          : {};

      const customerFiledData =
        customerMeasurements.length > 0
          ? {
              measurements: customerMeasurements,
            }
          : {};

      // Clean the data to remove any undefined/null values
      const cleanBlankData = removeEmptyValues(blankReportData);
      const cleanSupplierData = removeEmptyValues(supplierFiledData);
      const cleanCustomerData = removeEmptyValues(customerFiledData);

      const finalReportData = removeEmptyValues({
        ...baseData,
        // Only add these fields if they contain data
        ...(Object.keys(cleanBlankData).length > 0 && {
          blankReportData: cleanBlankData,
        }),
        ...(Object.keys(cleanSupplierData).length > 0 && {
          supplierFiledData: cleanSupplierData,
        }),
        ...(Object.keys(cleanCustomerData).length > 0 && {
          customerFiledData: cleanCustomerData,
        }),
      });

      // console.log("FINAL DATA TO SAVE:");
      // console.log(" Base Report Data:", JSON.stringify(baseData, null, 2));
      // console.log(
      //   "Blank Report Data:",
      //   JSON.stringify(cleanBlankData, null, 2)
      // );
      // console.log(
      //   " Supplier Filed Data:",
      //   JSON.stringify(cleanSupplierData, null, 2)
      // );
      // console.log(
      //   "Customer Filed Data:",
      //   JSON.stringify(cleanCustomerData, null, 2)
      // );
      // console.log(
      //   "Complete Final Report:",
      //   JSON.stringify(finalReportData, null, 2)
      // );

      // console.log("Measurement Counts:", {
      //   "Blank (Details, Drawing, Method, Actual Value, Tolerances)":
      //     blankMeasurements.length,
      //   "Supplier (P1-P5)": supplierMeasurements.length,
      //   "Customer (C1-C5)": customerMeasurements.length,
      // });

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
      // console.error("Error saving report:", error);
      alert(`Error ${isEditMode ? "updating" : "saving"} report.`);
    }
  };

  // ------------------------- OTHER HANDLERS -------------------------
  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? Any unsaved changes will be lost."
      )
    ) {
      // navigate("/dashboard");
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
  };
};
