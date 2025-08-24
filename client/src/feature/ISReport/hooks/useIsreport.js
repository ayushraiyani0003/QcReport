// src/hooks/useISReport.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import {
  createReport,
  updateReport,
  fetchReportById,
} from "../../../store/ISReportSlice";

export default function useISReport() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // Get mode from URL params
  const isEditing = Boolean(id) && mode === "edit";
  // Redux state
  const { loading, error, reports } = useSelector((state) => state.isReports);

  // Get current report from Redux store if available
  const currentReport = reports?.find((report) => report.id === id);

  // Form state with initial values
  const getInitialFormData = () => ({
    senderSupplier: "",
    receiverCustomer: "",
    supplierNumber: "",
    customerNumber: "",
    supplierDate: new Date().toISOString().split("T")[0],

    initialSampleReport: true,
    firstSample: true,
    followingSample: false,
    testReportOtherSamples: false,

    supplierInfo: {
      testReportNo: "",
      partNo: "",
      identification: "",
      drawingNo: "",
      levelDateIndex: "",
      orderingCallNoDate: "",
      deliveryNoteNoDate: "",
      suppliedQuantity: "",
      batchNumber: "",
      weightOfSamples: "",
    },

    customerInfo: {
      testReportNo: "",
      partNo: "",
      identification: "",
      drawingNo: "",
      levelDateIndex: "",
      unloadingArea: "",
      weightOfSamples: "",
      kindOfMaterial: "",
      receiptOfGoodsNoDate: "",
    },

    documentationDuty: false,
    fmeaCarriedOut: false,

    reasonForInspection: {
      newParts: true,
      changeOfProduct: false,
      transferOfProduction: false,
      changedProductionMethod: false,
      longerInterruption: false,
      changeOfSubSupplier: false,
      newToolsProductionFacilities: false,
      remedyingDeviation: false,
      otherMaterials: false,
    },

    presentationStep: {
      presentationCoverSheet: false,
      completeAcceptanceCustomer: false,
      completeAcceptanceSupplier: false,
    },

    enclosures: {
      functionReport: false,
      dimensionReport: true,
      materialReport: true,
      reliabilityTest: false,
      processCapabilityCertificate: false,
      flowChart: false,
      testingDeviceCapability: false,
      measuringMethods: false,
      securityDataSheets: false,
      hapticsVisualInspection: false,
      acoustics: false,
      odour: false,
      listUsedComponents: false,
      certificates: false,
      releaseOfConstruction: false,
      materialsInBoughtParts: false,
      others: false,
      deviationReport: false,
    },

    decisions: {
      functionReport: { released: "", freeUnderConditions: "", refused: "" },
      dimensionReport: { released: "", freeUnderConditions: "", refused: "" },
      materialReport: { released: "", freeUnderConditions: "", refused: "" },
      reliabilityTest: { released: "", freeUnderConditions: "", refused: "" },
      flowChart: { released: "", freeUnderConditions: "", refused: "" },
      testingDeviceCapability: {
        released: "",
        freeUnderConditions: "",
        refused: "",
      },
      processCapability: { released: "", freeUnderConditions: "", refused: "" },
      measuringMethods: { released: "", freeUnderConditions: "", refused: "" },
      securityDataSheets: {
        released: "",
        freeUnderConditions: "",
        refused: "",
      },
      hapticsVisualInspection: {
        released: "",
        freeUnderConditions: "",
        refused: "",
      },
      acoustics: { released: "", freeUnderConditions: "", refused: "" },
      odour: { released: "", freeUnderConditions: "", refused: "" },
      listUsedComponents: {
        released: "",
        freeUnderConditions: "",
        refused: "",
      },
      certificates: { released: "", freeUnderConditions: "", refused: "" },
      releaseOfConstruction: {
        released: "",
        freeUnderConditions: "",
        refused: "",
      },
      materialsInBoughtParts: {
        released: "",
        freeUnderConditions: "",
        refused: "",
      },
      deviationReport: { released: "", freeUnderConditions: "", refused: "" },
      completeDecision: { released: "", freeUnderConditions: "", refused: "" },
    },

    notes: "",
    supplierConfirmation: { vdaBd2Ziff4: true, qs9000PPAP: false },
    supplierDetails: {
      name: "",
      department: "",
      phoneFaxEmail: "",
      date: "",
      signature: "",
    },
    customerDetails: {
      name: "",
      department: "",
      phoneFaxEmail: "",
      date: "",
      signature: "",
    },
    distributor: "",
    deviationApprovalNo: "",
    returnShipmentDeliveryNote: "",
    processConditions:
      "Process, machine, production site, material, supplier, measuring devices are not allowed to be modified after release of this PPAP. All conditions must be fulfilled before a ...",
    customerNotes: "",
  });

  const [formData, setFormData] = useState(getInitialFormData);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Helper function to safely get nested values
  // const safeGet = (obj, path, defaultValue = "") => {
  //   try {
  //     return path.split(".").reduce((o, p) => o?.[p], obj) ?? defaultValue;
  //   } catch {
  //     return defaultValue;
  //   }
  // };

  // Helper function to format date for input
  const formatDateForInput = (date) => {
    if (!date) return "";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "";
      return d.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  // Function to transform backend data to form structure
  const transformReportToFormData = (report) => {
    // console.log("Transforming report data:", report);

    // If blankReportData exists and has the complete form structure, use it
    if (report.blankReportData && typeof report.blankReportData === "object") {
      // console.log("Using blankReportData:", report.blankReportData);
      return {
        ...getInitialFormData(),
        ...report.blankReportData,
        // Ensure dates are properly formatted
        supplierDate: formatDateForInput(
          report.blankReportData.supplierDate || report.supplierDate
        ),
        supplierDetails: {
          ...getInitialFormData().supplierDetails,
          ...report.blankReportData.supplierDetails,
          date: formatDateForInput(
            report.blankReportData.supplierDetails?.date || report.supplierDate
          ),
        },
        customerDetails: {
          ...getInitialFormData().customerDetails,
          ...report.blankReportData.customerDetails,
          date: formatDateForInput(
            report.blankReportData.customerDetails?.date ||
              report.returnDeliveryDate
          ),
        },
      };
    }

    // Otherwise, map from flat structure to form structure
    // console.log("Mapping from flat structure to form data");

    return {
      senderSupplier: report.senderSupplier || "",
      receiverCustomer: report.receiverCustomer || "",
      supplierNumber: report.supplierNumber || "",
      customerNumber: report.customerNumber || "",
      supplierDate: formatDateForInput(report.supplierDate),

      initialSampleReport:
        report.initialSampleReport !== undefined
          ? !!report.initialSampleReport
          : true,
      firstSample:
        report.firstSample !== undefined ? !!report.firstSample : true,
      followingSample:
        report.followingSample !== undefined ? !!report.followingSample : false,
      testReportOtherSamples:
        report.testReportOfOtherSamples !== undefined
          ? !!report.testReportOfOtherSamples
          : false,

      supplierInfo: {
        testReportNo: report.testReportNo || "",
        partNo: report.partNo || "",
        identification: report.identification || "",
        drawingNo: report.drawingNo || "",
        levelDateIndex: report.levelIndex || "",
        orderingCallNoDate: report.odderingCallNo || "",
        deliveryNoteNoDate: report.deliveryNoteNo || "",
        suppliedQuantity: report.suppliedQty?.toString() || "",
        batchNumber: report.batchNumber?.toString() || "",
        weightOfSamples: report.weightOfSamples?.toString() || "",
      },

      customerInfo: {
        testReportNo: report.customerTestReportNo || "",
        partNo: report.customerPartNo || "",
        identification: report.customerIdentification || "",
        drawingNo: report.customerDrawingNo || "",
        levelDateIndex: report.customerLevelIndex || "",
        unloadingArea: report.customerUnloadingArea || "",
        weightOfSamples: report.customerWeightOfSamples?.toString() || "",
        kindOfMaterial: report.customerMaterial?.toString() || "",
        receiptOfGoodsNoDate: report.customerGoodsNo || "",
      },

      documentationDuty: !!report.documentationDuty,
      fmeaCarriedOut: !!report.carriedOut,

      reasonForInspection: {
        newParts: !!report.newParts,
        changeOfProduct: !!report.changeOfProduct,
        transferOfProduction: !!report.transferToProduction,
        changedProductionMethod: false, // Not mapped in backend
        longerInterruption: !!report.longerInterruption,
        changeOfSubSupplier: !!report.theSubSupplier,
        newToolsProductionFacilities: !!report.newTools,
        remedyingDeviation: !!report.remedyingOfDeviation,
        otherMaterials: !!report.otherMaterials,
      },

      presentationStep: {
        presentationCoverSheet: !!report.presentationCover,
        completeAcceptanceCustomer: !!report.acceptanceAtTheCustomer,
        completeAcceptanceSupplier: !!report.acceptanceAtTheSupplier,
      },

      enclosures: {
        functionReport: !!report.functionReport,
        dimensionReport: !!report.dimensionReport,
        materialReport: !!report.materialReport,
        reliabilityTest: !!report.reliabilityTest,
        processCapabilityCertificate: !!report.processCapability,
        flowChart: !!report.flowChart,
        testingDeviceCapability: !!report.testingDeviceCapability,
        measuringMethods: !!report.measuringMethods,
        securityDataSheets: !!report.securityDataSheets,
        hapticsVisualInspection: !!report.haptics,
        acoustics: !!report.acoustics,
        odour: !!report.odour,
        listUsedComponents: !!report.listUsedCompon,
        certificates: !!report.certificates,
        releaseOfConstruction: !!report.releaseOfConstruction,
        materialsInBoughtParts: !!report.materialsParts,
        others: !!report.otherReport,
        deviationReport: !!report.deviationReport,
      },

      decisions:
        report.decisionOfCustomer &&
        typeof report.decisionOfCustomer === "object"
          ? { ...getInitialFormData().decisions, ...report.decisionOfCustomer }
          : getInitialFormData().decisions,

      notes: report.supplierNotes || "",

      supplierConfirmation: {
        vdaBd2Ziff4: !!report.vdaBd,
        qs9000PPAP: !!report.ppapGuideline,
      },

      supplierDetails: {
        name: report.supplierName2 || "",
        department: report.supplierDepartment || "",
        phoneFaxEmail: report.supplierPhone || "",
        date: formatDateForInput(report.supplierDate),
        signature: report.supplierSignature || "",
      },

      customerDetails: {
        name: report.customerName || "",
        department: report.customerDepartment || "",
        phoneFaxEmail: report.customerPhone || "",
        date: formatDateForInput(report.returnDeliveryDate),
        signature: report.customerSignature || "",
      },

      distributor: "", // Not mapped in current backend
      deviationApprovalNo: report.deviationApprovalNo || "",
      returnShipmentDeliveryNote: "", // Not mapped in current backend
      processConditions:
        report.customerNotes ||
        "Process, machine, production site, material, supplier, measuring devices are not allowed to be modified after release of this PPAP. All conditions must be fulfilled before a ...",
      customerNotes: report.customerNotes || "",
    };
  };

  // Fetch existing report when editing
  useEffect(() => {
    const loadReportData = async () => {
      if (!isEditing || !id) {
        // console.log("Not editing mode or no ID, using blank form");
        setIsDataLoaded(true);
        return;
      }

      try {
        // console.log(`Loading report for edit mode. ID: ${id}`);

        // First check if we already have the report in Redux store
        if (currentReport) {
          // console.log("Found report in Redux store:", currentReport);
          const transformedData = transformReportToFormData(currentReport);
          setFormData(transformedData);
          setIsDataLoaded(true);
          return;
        }

        // If not in store, fetch from API
        // console.log("Fetching report from API...");
        const result = await dispatch(fetchReportById(id)).unwrap();
        // console.log("Fetched report from API:", result);

        if (result) {
          const transformedData = transformReportToFormData(result);
          // console.log("Transformed form data:", transformedData);
          setFormData(transformedData);
        } else {
          // console.warn("No report data received");
          alert("Report not found or failed to load");
        }

        setIsDataLoaded(true);
      } catch (error) {
        console.error("Failed to fetch IS Report for editing:", error);
        alert("Failed to load report data. Please try again.");
        setIsDataLoaded(true);
      }
    };

    loadReportData();
  }, [dispatch, id, isEditing, currentReport?.id]); // Add currentReport?.id to deps

  // Input handlers
  const handleInputChange = (field, value) => {
    // console.log(`Updating field: ${field} with value:`, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (section, field, value) => {
    // console.log(
    //   `Updating nested field: ${section}.${field} with value:`,
    //   value
    // );
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleDecisionChange = (item, decision, value) => {
    // console.log(`Updating decision: ${item}.${decision} with value:`, value);
    setFormData((prev) => ({
      ...prev,
      decisions: {
        ...prev.decisions,
        [item]: { ...prev.decisions[item], [decision]: value },
      },
    }));
  };

  const handleSave = async () => {
    try {
      // console.log("Saving report with form data:", formData);

      const cleanValue = (v) => (v === undefined || v === null ? "" : v);

      // Helper function to get the best report name (Drawing No.)
      const getReportName = () => {
        // Priority order for report name (Drawing No.)
        return (
          cleanValue(formData.supplierInfo?.drawingNo) ||
          cleanValue(formData.customerInfo?.drawingNo) ||
          cleanValue(formData.supplierInfo?.partNo) ||
          cleanValue(formData.customerInfo?.partNo) ||
          cleanValue(formData.supplierInfo?.identification) ||
          cleanValue(formData.customerInfo?.identification) ||
          `IS Report - ${new Date().toISOString().split("T")[0]}`
        );
      };

      const reportName = getReportName();

      const reportData = {
        // Use the actual drawing number or best available identifier as report name
        reportName: reportName,
        clientName: cleanValue(formData.receiverCustomer),

        // Store the complete form data structure for future edits
        blankReportData: formData,

        // Map to flat structure for backend compatibility
        senderSupplier: cleanValue(formData.senderSupplier),
        receiverCustomer: cleanValue(formData.receiverCustomer),
        reportType: cleanValue(formData.reportType),
        firstSample: !!formData.firstSample,
        followingSample: !!formData.followingSample,
        testReportOfOtherSamples: !!formData.testReportOtherSamples,
        functionReport: !!formData.enclosures?.functionReport,
        dimensionReport: !!formData.enclosures?.dimensionReport,
        materialReport: !!formData.enclosures?.materialReport,
        reliabilityTest: !!formData.enclosures?.reliabilityTest,
        processCapability: !!formData.enclosures?.processCapabilityCertificate,
        flowChart: !!formData.enclosures?.flowChart,
        testingDeviceCapability: !!formData.enclosures?.testingDeviceCapability,
        measuringMethods: !!formData.enclosures?.measuringMethods,
        securityDataSheets: !!formData.enclosures?.securityDataSheets,
        haptics: !!formData.enclosures?.hapticsVisualInspection,
        acoustics: !!formData.enclosures?.acoustics,
        odour: !!formData.enclosures?.odour,
        listUsedCompon: !!formData.enclosures?.listUsedComponents,
        certificates: !!formData.enclosures?.certificates,
        releaseOfConstruction: !!formData.enclosures?.releaseOfConstruction,
        materialsParts: !!formData.enclosures?.materialsInBoughtParts,
        otherReport: !!formData.enclosures?.others,
        deviationReport: !!formData.enclosures?.deviationReport,

        supplierNumber: cleanValue(formData.supplierNumber),
        testReportNo: cleanValue(formData.supplierInfo?.testReportNo),
        partNo: cleanValue(formData.supplierInfo?.partNo),
        identification: cleanValue(formData.supplierInfo?.identification),

        // Make sure to save drawing numbers in the main fields
        drawingNo: cleanValue(formData.supplierInfo?.drawingNo),
        levelIndex: cleanValue(formData.supplierInfo?.levelDateIndex),
        odderingCallNo: cleanValue(formData.supplierInfo?.orderingCallNoDate),
        deliveryNoteNo: cleanValue(formData.supplierInfo?.deliveryNoteNoDate),
        suppliedQty: formData.supplierInfo?.suppliedQuantity
          ? Number(formData.supplierInfo.suppliedQuantity)
          : null,
        batchNumber: formData.supplierInfo?.batchNumber
          ? Number(formData.supplierInfo.batchNumber)
          : null,
        weightOfSamples: formData.supplierInfo?.weightOfSamples
          ? Number(formData.supplierInfo.weightOfSamples)
          : null,

        customerName: cleanValue(formData.receiverCustomer),
        customerNumber: cleanValue(formData.customerNumber),
        customerTestReportNo: cleanValue(formData.customerInfo?.testReportNo),
        customerOrderNo: cleanValue(formData.customerOrderNo),
        customerPartNo: cleanValue(formData.customerInfo?.partNo),
        customerIdentification: cleanValue(
          formData.customerInfo?.identification
        ),

        // Make sure to save customer drawing number
        customerDrawingNo: cleanValue(formData.customerInfo?.drawingNo),
        customerLevelIndex: cleanValue(formData.customerInfo?.levelDateIndex),
        customerUnloadingArea: cleanValue(formData.customerInfo?.unloadingArea),
        customerWeightOfSamples: formData.customerInfo?.weightOfSamples
          ? new Date(formData.customerInfo.weightOfSamples)
          : null,
        customerMaterial: formData.customerInfo?.kindOfMaterial
          ? Number(formData.customerInfo.kindOfMaterial)
          : null,
        customerGoodsNo: cleanValue(
          formData.customerInfo?.receiptOfGoodsNoDate
        ),

        documentationDuty: !!formData.documentationDuty,
        carriedOut: !!formData.fmeaCarriedOut,
        newParts: !!formData.reasonForInspection?.newParts,
        changeOfProduct: !!formData.reasonForInspection?.changeOfProduct,
        transferToProduction:
          !!formData.reasonForInspection?.transferOfProduction,
        longerInterruption: !!formData.reasonForInspection?.longerInterruption,
        theSubSupplier: !!formData.reasonForInspection?.changeOfSubSupplier,
        newTools: !!formData.reasonForInspection?.newToolsProductionFacilities,
        remedyingOfDeviation:
          !!formData.reasonForInspection?.remedyingDeviation,
        otherMaterials: !!formData.reasonForInspection?.otherMaterials,

        presentationCover: !!formData.presentationStep?.presentationCoverSheet,
        acceptanceAtTheCustomer:
          !!formData.presentationStep?.completeAcceptanceCustomer,
        acceptanceAtTheSupplier:
          !!formData.presentationStep?.completeAcceptanceSupplier,
        supplierNotes: cleanValue(formData.notes),

        vdaBd: !!formData.supplierConfirmation?.vdaBd2Ziff4,
        ppapGuideline: !!formData.supplierConfirmation?.qs9000PPAP,

        supplierName2: cleanValue(formData.supplierDetails?.name),
        supplierDepartment: cleanValue(formData.supplierDetails?.department),
        supplierPhone: cleanValue(formData.supplierDetails?.phoneFaxEmail),
        supplierDate: formData.supplierDetails?.date
          ? new Date(formData.supplierDetails.date)
          : null,
        supplierSignature: cleanValue(formData.supplierDetails?.signature),

        decisionOfCustomer: formData.decisions || {},

        deviationApprovalNo: cleanValue(formData.deviationApprovalNo),
        returnDeliveryDate: formData.customerDetails?.date
          ? new Date(formData.customerDetails.date)
          : null,
        customerNotes: cleanValue(formData.processConditions),

        customerDepartment: cleanValue(formData.customerDetails?.department),
        customerPhone: cleanValue(formData.customerDetails?.phoneFaxEmail),
        customerSignature: cleanValue(formData.customerDetails?.signature),
      };

      console.log("📄 Report Data:\n", JSON.stringify(reportData, null, 2));
      console.log("🎯 Report Name being saved:", reportName);

      let result;
      if (isEditing) {
        result = await dispatch(updateReport({ id, reportData })).unwrap();
        alert("IS Report updated successfully!");
      } else {
        result = await dispatch(createReport(reportData)).unwrap();
        alert("IS Report saved successfully!");
      }

      return result;
    } catch (error) {
      // console.error("Failed to save IS Report:", error);
      alert("Error saving IS Report. Please try again.");
      throw error;
    }
  }; // Show loading state while data is being fetched
  const isLoadingData = isEditing && !isDataLoaded;

  return {
    formData,
    loading: { ...loading, fetchById: isLoadingData },
    error,
    isEditing,
    isDataLoaded,
    handleInputChange,
    handleNestedInputChange,
    handleDecisionChange,
    handleSave,
  };
}
