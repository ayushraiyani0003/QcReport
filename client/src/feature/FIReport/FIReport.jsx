import { useState, useEffect, useRef } from "react";
import CustomButton from "../../Componant/CustomButton";
import { useFIReport } from "../../feature/FIReport/hooks/useFireport";

export default function FIReport() {
  const {
    rows,
    setRows,
    pdfRef,
    loading,
    updateLoading,
    createLoading,
    handleKeyPress,
    handleDownload,
    handleCancel,
    handleSave,
    isEditMode,
  } = useFIReport();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleDownloadFilled = () => {
    console.log("Downloading filled report...");
    handleDownload();
    setShowDropdown(false);
  };

  const handleDownloadBlank = () => {
    console.log("Downloading blank report...");
    alert("Blank report download functionality will be implemented");
    setShowDropdown(false);
  };

  if (isEditMode && loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading report...</div>
      </div>
    );
  }

  return (
    <>
      {/* Header with buttons */}
      <div className="flex items-center justify-end mb-1 mr-[160px]">
        <div className="flex gap-2 col-span-2">
          <CustomButton
            onClick={handleSave}
            variant="success"
            size="medium"
            disabled={updateLoading || createLoading}
          >
            {isEditMode ? "UPDATE" : "SAVE"}
          </CustomButton>

          {/* Download Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <CustomButton
              onClick={() => setShowDropdown(!showDropdown)}
              variant="primary"
              size="medium"
              className="flex items-center gap-2"
            >
              DOWNLOAD
              <svg
                className={`w-4 h-4 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </CustomButton>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <button
                  onClick={handleDownloadFilled}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-200"
                >
                  Download Filled Report
                </button>
                <button
                  onClick={handleDownloadBlank}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Download Blank Report
                </button>
              </div>
            )}
          </div>

          <CustomButton onClick={handleCancel} variant="danger" size="medium">
            CANCEL
          </CustomButton>
        </div>
      </div>
      <div className="p-4 max-w-[1600px] mx-auto">
        <div ref={pdfRef}>
          <div className="flex justify-between items-center pt-3">
            <h2 className="text-2xl font-bold">
              {isEditMode ? "Edit Test Result Report" : "Test Result Report"}
            </h2>
            <label className="text-sm">
              <input
                type="checkbox"
                className="mr-2"
                id="final-inspection-vda"
              />
              Final Inspection Report VDA
            </label>
          </div>

          {/* Removed Report Name input section */}

          <div className="flex justify-between items-center pt-3 pb-2">
            <div className="flex justify-between items-center pt-3 pb-2">
              <div className="px-3">
                <label>
                  <span className="me-2">2)</span>
                  <input
                    type="checkbox"
                    className="mr-2"
                    id="dimension-report"
                  />
                  Dimension Report
                </label>
                <br />
                <label>
                  <span className="me-2">3)</span>
                  <input
                    type="checkbox"
                    className="mr-2"
                    id="material-report"
                  />
                  Material Report
                </label>
              </div>
              <div>
                <label>
                  <span className="me-2">10)</span>
                  <input type="checkbox" className="mr-2" id="haptics-visual" />
                  Haptics / Visual Inspection
                </label>
                <br />
                <label>
                  <span className="me-2">11)</span>
                  <input type="checkbox" id="materials-bought-parts" />
                  Materials in Bought Parts
                </label>
              </div>
            </div>
            <div>
              <label className="block mb-1">
                <input type="checkbox" defaultChecked id="initial-sample-vda" />
                Initial Sample Report VDA
              </label>
              <label className="block ml-5 mb-1">
                <input type="checkbox" defaultChecked id="first-sample" />
                First Sample
              </label>
              <label className="block ml-5 mb-1">
                <input type="checkbox" id="following-sample" />
                Following sample report
              </label>
              <label className="block mb-1">
                <input type="checkbox" id="test-report-other" />
                <strong> Test report of other samples</strong>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <table className="w-full border border-collapse text-sm">
                <tbody>
                  <tr className="border">
                    <th className="border px-2 py-1">Supplier</th>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        className="w-full border px-1"
                        placeholder="Supplier Number"
                        id="supplier-number"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        className="w-full border px-1"
                        placeholder="Supplier Name"
                        id="supplier-name"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      Date:{" "}
                      <input
                        type="date"
                        className="border ml-1 px-1"
                        id="supplier-date"
                      />
                    </td>
                  </tr>
                  {[
                    {
                      label: "Test Report No.",
                      id: "supplier-test-report-no",
                    },
                    {
                      label: "Part/Subject No.",
                      id: "supplier-part-subject-no",
                    },
                    {
                      label: "Identification",
                      id: "supplier-identification",
                    },
                    {
                      label: "Drawing No.",
                      id: "supplier-drawing-no",
                    },
                    {
                      label: "Level/date/index",
                      id: "supplier-level-date-index",
                    },
                  ].map(({ label, id }) => (
                    <tr key={label}>
                      <td className="border px-2 py-1">{label}:</td>
                      <td colSpan={3} className="border px-2 py-1">
                        <input className="w-full border px-1" id={id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-[30%]">
              <table className="w-full border border-collapse text-sm">
                <tbody>
                  <tr>
                    <th className="border px-2 py-1">Customer</th>
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        className="w-full border px-1"
                        placeholder="Customer Name"
                        id="customer-name"
                      />
                    </td>
                  </tr>
                  {[
                    {
                      label: "Test Report No.",
                      id: "customer-test-report-no",
                    },
                    {
                      label: "Part No. / Subject No.",
                      id: "customer-part-subject-no",
                    },
                    {
                      label: "Identification",
                      id: "customer-identification",
                    },
                    {
                      label: "Drawing No.",
                      id: "customer-drawing-no",
                    },
                    {
                      label: "Level/Date/Index",
                      id: "customer-level-date-index",
                    },
                  ].map(({ label, id }) => (
                    <tr key={label}>
                      <td className="border px-2 py-1">{label}:</td>
                      <td className="border px-2 py-1">
                        <input className="w-full border px-1" id={id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <table className="w-full mt-4 border text-sm border-collapse">
            <thead>
              <tr>
                <th rowSpan={2} className="border px-2 py-1">
                  No.
                </th>
                <th colSpan={6} className="border px-2 py-1 text-center">
                  Characteristic / Nominal Value / Tolerance / Unit / Test
                  Method
                </th>
                <th colSpan={5} className="border px-2 py-1 text-center">
                  Actual / Observed value [ in mm or Degree ] Supplier
                </th>
                <th colSpan={5} className="border px-2 py-1 text-center">
                  Actual value Customer
                </th>
              </tr>
              <tr>
                <th className="border px-2 py-1">Details</th>
                <th className="border px-2 py-1">Drawing Value</th>
                <th className="border px-2 py-1">Test Method</th>
                <th className="border px-2 py-1">Actual Value</th>
                <th className="border px-2 py-1">Actual Tolerance (+)</th>
                <th className="border px-2 py-1">Actual Tolerance (−)</th>
                {[...Array(10)].map((_, i) => (
                  <th key={i} className="border px-2 py-1">
                    {i < 5 ? `P${i + 1}` : `${i - 4}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  <td className="border px-2 py-1 text-center">{rIdx + 1}</td>

                  <td className="border px-2 py-1 w-[200px]">
                    <input
                      id={`cell-${rIdx}-details`}
                      value={row.details ?? ""}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[rIdx].details = e.target.value;
                        setRows(newRows);
                      }}
                      onKeyDown={(e) => handleKeyPress(e, rIdx, "details")}
                      className="w-full border px-1 py-0.5"
                    />
                  </td>

                  <td className="border px-2 py-1 w-[180px]">
                    <input
                      id={`cell-${rIdx}-drawing`}
                      value={row.drawing ?? ""}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[rIdx].drawing = e.target.value;

                        function parseDrawingValue(value) {
                          const match = value.match(
                            /^([\d.]+)\s*±\s*([\d.]+)$/
                          );

                          if (match) {
                            const actualValue = Number.parseFloat(match[1]);
                            const tolerance = Number.parseFloat(match[2]);

                            return {
                              actualValue,
                              tolerancePlus: actualValue + tolerance,
                              toleranceMinus: actualValue - tolerance,
                            };
                          }
                          return {
                            actualValue: value,
                            tolerancePlus: null,
                            toleranceMinus: null,
                          };
                        }

                        const parsed = parseDrawingValue(e.target.value);

                        if (!newRows[rIdx].actualValueManuallyEdited) {
                          newRows[rIdx].actualValue = parsed.actualValue;
                        }
                        if (!newRows[rIdx].tolerancePlusManuallyEdited) {
                          newRows[rIdx].tolerancePlus = parsed.tolerancePlus;
                        }
                        if (!newRows[rIdx].toleranceMinusManuallyEdited) {
                          newRows[rIdx].toleranceMinus = parsed.toleranceMinus;
                        }
                        setRows(newRows);
                      }}
                      onKeyDown={(e) => handleKeyPress(e, rIdx, "drawing")}
                      className="w-full border px-1 py-0.5"
                    />
                  </td>

                  <td className="border px-2 py-1 w-[200px]">
                    <input
                      id={`cell-${rIdx}-method`}
                      value={row.method ?? ""}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[rIdx].method = e.target.value;
                        setRows(newRows);
                      }}
                      onKeyDown={(e) => handleKeyPress(e, rIdx, "method")}
                      className="w-full border px-1 py-0.5"
                    />
                  </td>

                  <td className="border px-2 py-1 w-[120px]">
                    <input
                      id={`cell-${rIdx}-actualValue`}
                      value={row.actualValue ?? ""}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[rIdx].actualValue = e.target.value;
                        newRows[rIdx].actualValueManuallyEdited = true;
                        setRows(newRows);
                      }}
                      onKeyDown={(e) => handleKeyPress(e, rIdx, "actualValue")}
                      className="w-full border px-1 py-0.5"
                    />
                  </td>

                  <td className="border px-2 py-1 w-[100px]">
                    <input
                      id={`cell-${rIdx}-tolerancePlus`}
                      value={row.tolerancePlus ?? ""}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[rIdx].tolerancePlus = e.target.value;
                        newRows[rIdx].tolerancePlusManuallyEdited = true;
                        setRows(newRows);
                      }}
                      onKeyDown={(e) =>
                        handleKeyPress(e, rIdx, "tolerancePlus")
                      }
                      className="w-full border px-1 py-0.5"
                    />
                  </td>

                  <td className="border px-2 py-1 w-[100px]">
                    <input
                      id={`cell-${rIdx}-toleranceMinus`}
                      value={row.toleranceMinus ?? ""}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[rIdx].toleranceMinus = e.target.value;
                        newRows[rIdx].toleranceMinusManuallyEdited = true;
                        setRows(newRows);
                      }}
                      onKeyDown={(e) =>
                        handleKeyPress(e, rIdx, "toleranceMinus")
                      }
                      className="w-full border px-1 py-0.5"
                    />
                  </td>

                  {[...Array(10)].map((_, tIdx) => {
                    const field = `value${tIdx}`;
                    return (
                      <td key={tIdx} className="border px-2 py-1">
                        <input
                          id={`cell-${rIdx}-${field}`}
                          value={row[field] ?? ""}
                          onChange={(e) => {
                            const newRows = [...rows];
                            newRows[rIdx][field] = e.target.value;
                            setRows(newRows);
                          }}
                          onKeyDown={(e) => handleKeyPress(e, rIdx, field)}
                          className="w-full border px-1 py-0.5"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <strong>Remarks (Supplier):</strong>
            <br />
            <textarea
              rows="3"
              className="w-full border px-2 py-1 mt-1"
              id="remarks-supplier"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}
