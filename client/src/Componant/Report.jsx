import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TestResultReport.css";

export default function Report() {
  const navigate = useNavigate();
  const inputRefs = useRef({});

  const saverow = (index) => {
    const updated = [...rows];
    updated[index].editing = false;
    updated[index].original = {};
    setRows(updated);

    // Save to localStorage
    const savedRows = updated.filter((row) => !row.editing); // only saved rows
    localStorage.setItem("userList", JSON.stringify(savedRows));
  };

  const [rows, setRows] = useState([
    {
      id: "",
      name: "",
      email: "",
      role: "",
      status: "",
      joined: "",
      editing: true,
      original: {},
    },
  ]);

  const handleChange = (e, rowIndex, field) => {
    if (!rows[rowIndex].editing) return;
    const updated = [...rows];
    updated[rowIndex][field] = e.target.value;
    setRows(updated);
  };

  const handleKeyDown = (e, rowIndex, field) => {
    const key = e.key;

    if (key === "Enter") {
      e.preventDefault();
      setRows([
        ...rows,
        {
          id: "",
          name: "",
          email: "",
          role: "",
          status: "",
          joined: "",
          editing: true,
          original: {},
        },
      ]);
      setTimeout(() => {
        const nextRef = inputRefs.current[`${rows.length}-${field}`];
        if (nextRef) nextRef.focus();
      }, 0);
    }

    if (key === "Backspace") {
      const currentRow = rows[rowIndex];
      const isEmptyRow = [
        "id",
        "name",
        "email",
        "role",
        "status",
        "joined",
      ].every((field) => currentRow[field] === "");
      if (isEmptyRow && rows.length > 1) {
        e.preventDefault();
        const updated = rows.filter((_, i) => i !== rowIndex);
        setRows(updated);
      }
    }

    if (key === "ArrowDown") {
      e.preventDefault();
      const nextRef = inputRefs.current[`${rowIndex + 1}-${field}`];
      if (nextRef) nextRef.focus();
    }

    if (key === "ArrowUp") {
      e.preventDefault();
      const prevRef = inputRefs.current[`${rowIndex - 1}-${field}`];
      if (prevRef) prevRef.focus();
    }
  };

  const toggleEdit = (index) => {
    const updated = [...rows];
    updated[index].original = { ...updated[index] };
    updated[index].editing = true;
    setRows(updated);
  };

  const saveRow = (index) => {
    const updated = [...rows];
    updated[index].editing = false;
    updated[index].original = {};
    setRows(updated);
  };

  const cancelEdit = (index) => {
    const updated = [...rows];
    updated[index] = {
      ...updated[index].original,
      editing: false,
      original: {},
    };
    setRows(updated);
  };

  const deleteRow = (index) => {
    if (rows.length > 1) {
      const updated = rows.filter((_, i) => i !== index);
      setRows(updated);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="row mt-4">
        <h2 className="text-lg font-semibold mb-2 col-10">User List</h2>

        <div className="flex justify-between items-center mb-4 col-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded btn btn-primary btn-sm"
            onClick={() => navigate("/blank-report")}
          >
            Generate Blank Report
          </button>
        </div>
      </div>

      <div className="bg-blue-100 p-2 rounded mb-4">{/* Info Message */}</div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mb-3">User Table</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr className="row_hight">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr className="row_hight" key={index}>
                      {["id", "name", "email", "role", "status", "joined"].map(
                        (field) => (
                          <td key={field}>
                            {row.editing ? (
                              <input
                                type={field === "joined" ? "date" : "text"}
                                className="form-control"
                                value={row[field]}
                                onChange={(e) => handleChange(e, index, field)}
                                onKeyDown={(e) =>
                                  handleKeyDown(e, index, field)
                                }
                                ref={(el) => {
                                  inputRefs.current[`${index}-${field}`] = el;
                                }}
                              />
                            ) : (
                              row[field] || "—"
                            )}
                          </td>
                        )
                      )}
                      <td>
                        {row.editing ? (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() => saveRow(index)}
                              title="Save"
                            >
                              {" "}
                              Save
                            </button>
                            {/* <button
                              className="btn btn-sm btn-secondary me-2"
                              onClick={() => cancelEdit(index)}
                              title="Cancel"
                            >
                            </button> */}
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => toggleEdit(index)}
                              title="Edit"
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteRow(index)}
                              disabled={rows.length === 1}
                              title="Delete"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
