import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Header from "../Componant/Header";

export default function BlankReport() {
  const [rows, setRows] = useState([
    {
      details: "",
      drawing: "",
      method: "",
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
    },
  ]);
  const pdfRef = useRef();

  const addRow = () => {
    const newRow = {
      details: "",
      drawing: "",
      method: "",
    };
    for (let i = 0; i < 10; i++) newRow[`value${i}`] = "";
    setRows((prev) => [...prev, newRow]);
  };

  const handleKeyPress = (e, rowIndex, fieldName) => {
    const totalCols = 13;
    const fieldOrder = [
      "details",
      "drawing",
      "method",
      ...Array(10)
        .fill()
        .map((_, i) => `value${i}`),
    ];
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
      const newRows = [...rows];
      newRows.splice(rowIndex, 1);
      setRows(newRows);
    }
  };

  const downloadPDF = async () => {
    const content = pdfRef.current;
    const inputs = content.querySelectorAll("input, textarea");
    inputs.forEach((el) => {
      const span = document.createElement("span");
      span.textContent = el.value || el.placeholder || " ";
      el.replaceWith(span);
    });

    const canvas = await html2canvas(content, {
      scale: 4,
      useCORS: true,
      scrollY: -window.scrollY,
    });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF("l", "mm", "a4");
    pdf.addImage(imgData, "JPEG", 0, 0, 297, 210);
    pdf.save("Test-Result-Report.pdf");
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div className="p-4 max-w-[1600px] mx-auto">
        <div ref={pdfRef}>
          <div className="flex justify-between items-center pt-3">
            <h2 className="text-2xl font-bold">Test Result Report</h2>
            <label className="text-sm">
              <input type="checkbox" className="mr-2" /> Final Inspection Report
              VDA
            </label>
          </div>

          <div className="flex flex-wrap gap-4 py-3">
            <label>
              <input type="checkbox" className="mr-2" /> Dimension Report
            </label>
            <label>
              <input type="checkbox" className="mr-2" /> Haptics / Visual
              Inspection
            </label>
            <label>
              <input type="checkbox" className="mr-2" /> Material Report
            </label>
            <label>
              <input type="checkbox" className="mr-2" /> Materials in Bought
              Parts
            </label>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <table className="w-full border border-collapse text-sm">
                <tbody>
                  <tr className="border">
                    <th className="border px-2 py-1">Supplier</th>
                    <td className="border px-2 py-1">Supplier Number</td>
                    <td className="border px-2 py-1">
                      Patel Technomation PVT. LTD
                    </td>
                    <td className="border px-2 py-1">
                      Date: <input type="text" className="border ml-1 px-1" />
                    </td>
                  </tr>
                  {[
                    "Test Report No.",
                    "Part/Subject No.",
                    "Identification",
                    "Drawing No.",
                    "Level/date/index",
                  ].map((label) => (
                    <tr key={label}>
                      <td className="border px-2 py-1">{label}:</td>
                      <td colSpan={3} className="border px-2 py-1">
                        <input className="w-full border px-1" />
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
                    <td className="border px-2 py-1">Customer Number</td>
                  </tr>
                  {[
                    "Test Report No.",
                    "Part No. / Subject No.",
                    "Identification",
                    "Drawing No.",
                    "Level/Date/Index",
                  ].map((label) => (
                    <tr key={label}>
                      <td className="border px-2 py-1">{label}:</td>
                      <td className="border px-2 py-1">
                        <input className="w-full border px-1" />
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
                <th colSpan={3} className="border px-2 py-1 text-center">
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

                  {/* Details - 250px */}
                  <td className="border px-2 py-1 w-[250px]">
                    <input
                      id={`cell-${rIdx}-details`}
                      value={row.details}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[rIdx].details = e.target.value;
                        setRows(newRows);
                      }}
                      onKeyDown={(e) => handleKeyPress(e, rIdx, "details")}
                      className="w-full border px-1 py-0.5"
                    />
                  </td>

                  {/* Drawing Value - 180px */}
                  <td className="border px-2 py-1 w-[180px]">
                    <input
                      id={`cell-${rIdx}-drawing`}
                      value={row.drawing}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[rIdx].drawing = e.target.value;
                        setRows(newRows);
                      }}
                      onKeyDown={(e) => handleKeyPress(e, rIdx, "drawing")}
                      className="w-full border px-1 py-0.5"
                    />
                  </td>

                  {/* Test Method - 250px */}
                  <td className="px-2 py-1 w-[250px]">
                    <input
                      id={`cell-${rIdx}-method`}
                      value={row.method}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[rIdx].method = e.target.value;
                        setRows(newRows);
                      }}
                      onKeyDown={(e) => handleKeyPress(e, rIdx, "method")}
                      className="w-full border px-1 py-0.5"
                    />
                  </td>

                  {/* P1–P5 & 1–5 Inputs */}
                  {[...Array(10)].map((_, tIdx) => {
                    const field = `value${tIdx}`;
                    return (
                      <td key={tIdx} className="border px-2 py-1">
                        <input
                          id={`cell-${rIdx}-${field}`}
                          value={row[field] || ""}
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
            ></textarea>
          </div>
        </div>

        {/* Optional buttons (can enable later) */}
        {/* <div className="mt-4 flex gap-4 no-print">
          <button onClick={addRow} className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Row</button>
          <button onClick={downloadPDF} className="bg-green-600 text-white px-4 py-2 rounded">Download PDF</button>
        </div> */}
      </div>
    </>
  );
}
