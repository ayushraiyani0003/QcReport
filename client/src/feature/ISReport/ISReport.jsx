import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Componant/CustomButton";
import useISReport from "../../feature/ISReport/hooks/useIsreport";

export default function ISReport() {
  const navigate = useNavigate();
  const {
    formData,
    loading,
    error,
    isEditing,
    isDataLoaded,
    handleInputChange,
    handleNestedInputChange,
    handleDecisionChange,
    handleSave,
  } = useISReport();

  const handleCancel = () => navigate("/dashboard");
  const handleDownload = () =>
    alert("Download functionality will be implemented");

  // Show loading spinner while fetching data for edit mode
  if (
    loading.create ||
    loading.update ||
    loading.fetchById ||
    (isEditing && !isDataLoaded)
  ) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-gray-600">
            {isEditing
              ? "Loading report data..."
              : loading.create
              ? "Creating report..."
              : loading.update
              ? "Updating report..."
              : "Processing..."}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 text-center mb-4">
          <div className="text-lg font-semibold">Error loading report</div>
          <div className="text-sm">{error}</div>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-end mb-1 mr-[140px]">
        <div className="flex gap-2 col-span-2">
          <CustomButton
            onClick={handleSave}
            variant="success"
            size="medium"
            disabled={loading.create || loading.update}
          >
            {loading.create || loading.update
              ? "SAVING..."
              : isEditing
              ? "UPDATE"
              : "SAVE"}
          </CustomButton>
          <CustomButton
            onClick={handleDownload}
            variant="primary"
            size="medium"
          >
            DOWNLOAD
          </CustomButton>
          <CustomButton onClick={handleCancel} variant="danger" size="medium">
            CANCEL
          </CustomButton>
        </div>
      </div>

      {/* Display edit mode indicator */}
      {isEditing && isDataLoaded && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 mr-[140px]">
          <div className="flex items-center">
            <div className="text-blue-800 font-medium">
              ✏️ Editing Mode: Report data loaded successfully
            </div>
          </div>
        </div>
      )}

      <div className="font-sans text-xs mt-6">
        <div className="max-w-[1600px] mx-auto border border-black">
          <div className="grid grid-cols-2">
            {/* Left Column */}
            <div className="border-r-2 border-black p-1">
              <div className="font-bold mb-1 mt-4">Sender/supplier:</div>
              <textarea
                className="border border-black w-full h-[120px] p-1"
                value={formData.senderSupplier}
                onChange={(e) =>
                  handleInputChange("senderSupplier", e.target.value)
                }
              ></textarea>

              <div>
                <div className="font-bold mb-1">
                  Receiver/customer ( Name/ Code ):
                </div>
                <textarea
                  className="border border-black w-full h-[120px] p-1"
                  value={formData.receiverCustomer}
                  onChange={(e) =>
                    handleInputChange("receiverCustomer", e.target.value)
                  }
                ></textarea>

                {/* Supplier Information Grid */}
                <div>
                  <div className="grid grid-cols-2">
                    <div className="border-r border-black font-bold p-1 flex items-center">
                      Supplier
                    </div>
                    <div className="border-r border-black p-1 grid grid-cols-2">
                      <label className="block font-medium pt-2">
                        Supplier number:
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 p-1 mt-1"
                        placeholder="Enter supplier no"
                        value={formData.supplierNumber}
                        onChange={(e) =>
                          handleInputChange("supplierNumber", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Supplier Info Fields */}
                  {Object.entries({
                    "Test report-no.": "testReportNo",
                    "part no./ subject no.": "partNo",
                    identification: "identification",
                    "drawing no.": "drawingNo",
                    "level/date/index": "levelDateIndex",
                    "ordering call no. / date": "orderingCallNoDate",
                    "delivery note no./ date": "deliveryNoteNoDate",
                    "supplied quantity": "suppliedQuantity",
                    "batch number": "batchNumber",
                    "weight of samples": "weightOfSamples",
                  }).map(([label, field]) => (
                    <div
                      key={field}
                      className="grid grid-cols-2 border-t border-black"
                    >
                      <div className="border border-black p-1">{label}:</div>
                      <div className="border border-black p-1">
                        <input
                          type="text"
                          className="w-full bg-transparent outline-none"
                          value={formData.supplierInfo[field]}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "supplierInfo",
                              field,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkboxes and Additional Sections */}
              <div className="p-2 space-y-2">
                <div>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.documentationDuty}
                    onChange={(e) =>
                      handleInputChange("documentationDuty", e.target.checked)
                    }
                  />
                  documentation duty (d-part, DmBA (special archives))
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.fmeaCarriedOut}
                    onChange={(e) =>
                      handleInputChange("fmeaCarriedOut", e.target.checked)
                    }
                  />
                  FMEA carried out
                </div>

                <div className="font-bold mt-2">
                  reason of sample inspection:
                </div>
                <div className="pl-4 space-y-1">
                  {Object.entries({
                    "new parts": "newParts",
                    "change of product": "changeOfProduct",
                    "transfer of production": "transferOfProduction",
                    "changed production method": "changedProductionMethod",
                    "longer interruption of production": "longerInterruption",
                    "change of the sub-supplier": "changeOfSubSupplier",
                    "new tools/ production facilities":
                      "newToolsProductionFacilities",
                    "remedying of a deviation": "remedyingDeviation",
                    "other materials": "otherMaterials",
                  }).map(([label, field]) => (
                    <label key={field}>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={formData.reasonForInspection[field]}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "reasonForInspection",
                            field,
                            e.target.checked
                          )
                        }
                      />
                      {label}
                      <br />
                    </label>
                  ))}
                </div>

                <div className="font-bold mt-2">
                  Presentation step / acceptance step
                </div>
                <div className="pl-4 space-y-1">
                  {Object.entries({
                    "1 presentation cover sheet (self certifying supplier)":
                      "presentationCoverSheet",
                    "2 complete acceptance at the customer":
                      "completeAcceptanceCustomer",
                    "3 complete acceptance at the supplier":
                      "completeAcceptanceSupplier",
                  }).map(([label, field]) => (
                    <label key={field}>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={formData.presentationStep[field]}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "presentationStep",
                            field,
                            e.target.checked
                          )
                        }
                      />
                      {label}
                      <br />
                    </label>
                  ))}
                </div>

                <div className="mt-3 font-bold">notes:</div>
                <textarea
                  className="border border-black w-full h-20 p-1"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                ></textarea>

                <div className="mt-3 font-bold">Confirmation of supplier:</div>
                <p>You hereby confirm that the sampling corresponding to</p>
                <div className="pl-4">
                  <label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={formData.supplierConfirmation.vdaBd2Ziff4}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "supplierConfirmation",
                          "vdaBd2Ziff4",
                          e.target.checked
                        )
                      }
                    />
                    VDA Bd. 2 Ziff. 4
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={formData.supplierConfirmation.qs9000PPAP}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "supplierConfirmation",
                          "qs9000PPAP",
                          e.target.checked
                        )
                      }
                    />
                    QS-9000 PPAP
                  </label>
                </div>

                {/* Supplier Details */}
                <div className="mt-2 mb-2">
                  {Object.entries({
                    Name: "name",
                    Department: "department",
                    "Phone/fax/e-mail": "phoneFaxEmail",
                    Date: "date",
                  }).map(([label, field]) => (
                    <div key={field} className="grid grid-cols-2">
                      <div className="font-bold">{label}:</div>
                      <input
                        type={field === "date" ? "date" : "text"}
                        className="border border-black w-full h-6 p-1 mb-1"
                        value={formData.supplierDetails[field]}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "supplierDetails",
                            field,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <div className="font-bold mt-1 mb-1">Signature:</div>
                    <textarea
                      className="border border-black w-full h-20 p-1"
                      value={formData.supplierDetails.signature}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "supplierDetails",
                          "signature",
                          e.target.value
                        )
                      }
                    ></textarea>
                  </div>
                </div>

                <div className="font-bold mt-2">distributor:</div>
                <input
                  type="text"
                  className="border border-black w-full p-1"
                  value={formData.distributor}
                  onChange={(e) =>
                    handleInputChange("distributor", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="p-1">
              {/* Report Type Selection */}
              <div className="flex-1 px-4">
                <label className="block mb-1">
                  <input
                    type="checkbox"
                    checked={formData.initialSampleReport}
                    onChange={(e) =>
                      handleInputChange("initialSampleReport", e.target.checked)
                    }
                  />
                  Initial Sample Report VDA
                </label>
                <label className="block ml-5 mb-1">
                  <input
                    type="checkbox"
                    checked={formData.firstSample}
                    onChange={(e) =>
                      handleInputChange("firstSample", e.target.checked)
                    }
                  />
                  First Sample
                </label>
                <label className="block ml-5 mb-1">
                  <input
                    type="checkbox"
                    checked={formData.followingSample}
                    onChange={(e) =>
                      handleInputChange("followingSample", e.target.checked)
                    }
                  />
                  Following sample report
                </label>
                <label className="block mb-4">
                  <input
                    type="checkbox"
                    checked={formData.testReportOtherSamples}
                    onChange={(e) =>
                      handleInputChange(
                        "testReportOtherSamples",
                        e.target.checked
                      )
                    }
                  />
                  <strong> Test report of other samples</strong>
                </label>
              </div>

              {/* Enclosures */}
              <div className="gap-4 mb-4">
                <div>
                  <div className="font-bold mb-1">Enclosures:</div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    {Object.entries({
                      "1) function report": "functionReport",
                      "2) dimension report": "dimensionReport",
                      "3) material report": "materialReport",
                      "4) reliability test": "reliabilityTest",
                      "5) Process capability certificate":
                        "processCapabilityCertificate",
                      "6) flow chart": "flowChart",
                      "7) testing device capability": "testingDeviceCapability",
                      "8) measuring methods": "measuringMethods",
                      "9) security data sheets": "securityDataSheets",
                      "10) haptics / visual inspection":
                        "hapticsVisualInspection",
                      "11) acoustics": "acoustics",
                      "12) odour": "odour",
                      "13) list used compon./part record": "listUsedComponents",
                      "14) certificates": "certificates",
                      "15) release of construction": "releaseOfConstruction",
                      "16) materials in bought parts": "materialsInBoughtParts",
                      "17) others": "others",
                      "18) deviation report": "deviationReport",
                    }).map(([label, field]) => (
                      <label key={field}>
                        <input
                          type="checkbox"
                          checked={formData.enclosures[field]}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "enclosures",
                              field,
                              e.target.checked
                            )
                          }
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Customer Information Grid */}
                <div className="pt-1">
                  <div className="grid grid-cols-2">
                    <div className="border-r border-black font-bold p-1 flex items-center">
                      Customer:
                    </div>
                    <div className="p-1 grid grid-cols-2">
                      <label className="block font-medium pt-2">
                        Customer number:
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-1 mt-1"
                        placeholder="Enter customer no"
                        value={formData.customerNumber}
                        onChange={(e) =>
                          handleInputChange("customerNumber", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Customer Info Fields */}
                  {Object.entries({
                    "Test report-no.": "testReportNo",
                    "part no. / subject no.": "partNo",
                    identification: "identification",
                    "drawing no.": "drawingNo",
                    "level/date/index": "levelDateIndex",
                    "unloading area": "unloadingArea",
                    "weight of samples": "weightOfSamples",
                    "kind of material": "kindOfMaterial",
                    "receipt of goods-no./date": "receiptOfGoodsNoDate",
                  }).map(([label, field]) => (
                    <div
                      key={field}
                      className="grid grid-cols-2 border-t border-black"
                    >
                      <div className="border border-black p-1">{label}:</div>
                      <div className="border border-black p-1">
                        <input
                          type="text"
                          className="w-full bg-transparent outline-none"
                          value={formData.customerInfo[field]}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "customerInfo",
                              field,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision Table */}
              <div className="overflow-x-auto pt-5">
                <div className="border border-black w-full text-xs">
                  {/* Table Header */}
                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1 font-bold text-left align-top">
                      Decision of customer:
                    </div>
                    <div className="border-r border-black px-2 py-1 font-bold text-center align-top">
                      released
                    </div>
                    <div className="border-r border-black px-2 py-1 font-bold text-center align-top">
                      free under conditions
                    </div>
                    <div className="px-2 py-1 font-bold text-center align-top">
                      refused
                    </div>
                  </div>

                  {/* Decision Rows */}
                  {Object.entries({
                    "1) function report": "functionReport",
                    "2) dimension report": "dimensionReport",
                    "3) material report": "materialReport",
                    "4) reliability test": "reliabilityTest",
                    "5) flow chart": "flowChart",
                    "6) testing device capability": "testingDeviceCapability",
                    "7) process capability": "processCapability",
                    "8) measuring methods": "measuringMethods",
                    "9) security data sheets": "securityDataSheets",
                    "10) haptics / visual inspection":
                      "hapticsVisualInspection",
                    "11) acoustics": "acoustics",
                    "12) odour": "odour",
                    "13) list used compon./part record": "listUsedComponents",
                    "14) certificates": "certificates",
                    "15) release of construction": "releaseOfConstruction",
                    "16) materials in bought parts": "materialsInBoughtParts",
                    "17) deviation report": "deviationReport",
                  }).map(([label, field]) => (
                    <div
                      key={field}
                      className="grid grid-cols-4 border-b border-black"
                    >
                      <div className="border-r border-black px-2 py-1">
                        {label}
                      </div>
                      <div className="border-r border-black text-center">
                        <input
                          type="text"
                          className="w-full px-1 py-0.5 outline-none"
                          value={formData.decisions[field]?.released || ""}
                          onChange={(e) =>
                            handleDecisionChange(
                              field,
                              "released",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="border-r border-black text-center">
                        <input
                          type="text"
                          className="w-full px-1 py-0.5 outline-none"
                          value={
                            formData.decisions[field]?.freeUnderConditions || ""
                          }
                          onChange={(e) =>
                            handleDecisionChange(
                              field,
                              "freeUnderConditions",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="text-center">
                        <input
                          type="text"
                          className="w-full px-1 py-0.5 outline-none"
                          value={formData.decisions[field]?.refused || ""}
                          onChange={(e) =>
                            handleDecisionChange(
                              field,
                              "refused",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}

                  {/* Complete Decision Row */}
                  <div className="grid grid-cols-4">
                    <div className="border-r border-black px-2 py-1">
                      <strong>complete decision</strong>
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                        value={
                          formData.decisions.completeDecision?.released || ""
                        }
                        onChange={(e) =>
                          handleDecisionChange(
                            "completeDecision",
                            "released",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                        value={
                          formData.decisions.completeDecision
                            ?.freeUnderConditions || ""
                        }
                        onChange={(e) =>
                          handleDecisionChange(
                            "completeDecision",
                            "freeUnderConditions",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                        value={
                          formData.decisions.completeDecision?.refused || ""
                        }
                        onChange={(e) =>
                          handleDecisionChange(
                            "completeDecision",
                            "refused",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-2 mt-2">
                <div className="mt-1">deviation approval no.:</div>
                <input
                  type="text"
                  className="border border-black w-[240px] h-6 p-1"
                  value={formData.deviationApprovalNo}
                  onChange={(e) =>
                    handleInputChange("deviationApprovalNo", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-2 mt-2 mb-2">
                <div className="mt-1">
                  If return shipment: delivery note no./date:
                </div>
                <input
                  type="text"
                  className="border border-black w-[240px] h-6 p-1"
                  value={formData.returnShipmentDeliveryNote}
                  onChange={(e) =>
                    handleInputChange(
                      "returnShipmentDeliveryNote",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="mt-1 font-bold">notes:</div>
              <textarea
                className="border border-black w-full h-20 p-1 mt-1"
                value={formData.processConditions}
                onChange={(e) =>
                  handleInputChange("processConditions", e.target.value)
                }
              ></textarea>

              {/* Customer Details */}
              <div className=" mt-2 mb-2">
                {Object.entries({
                  Name: "name",
                  Department: "department",
                  "Phone/fax/e-mail": "phoneFaxEmail",
                  Date: "date",
                }).map(([label, field]) => (
                  <div key={field} className="grid grid-cols-2">
                    <div className="font-bold grid grid-cols-2">{label}:</div>
                    <input
                      type={field === "date" ? "date" : "text"}
                      className="border border-black w-full h-6 p-1 mb-1"
                      value={formData.customerDetails[field]}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "customerDetails",
                          field,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <div className="font-bold mt-1 mb-2">Signature:</div>
                  <textarea
                    className="border border-black w-full h-20 p-1"
                    value={formData.customerDetails.signature}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "customerDetails",
                        "signature",
                        e.target.value
                      )
                    }
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
