// src/Compnant/Report.jsx

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Componant/Header';

export default function Report() {
  const navigate = useNavigate();
  const inputRefs = useRef({});
  const [rows, setRows] = useState([
    {
      id: '',
      name: '',
      email: '',
      role: '',
      status: '',
      joined: '',
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

    if (key === 'Enter') {
      e.preventDefault();
      setRows([
        ...rows,
        {
          id: '',
          name: '',
          email: '',
          role: '',
          status: '',
          joined: '',
          editing: true,
          original: {},
        },
      ]);
      setTimeout(() => {
        const nextRef = inputRefs.current[`${rows.length}-${field}`];
        if (nextRef) nextRef.focus();
      }, 0);
    }

    if (key === 'Backspace') {
      const currentRow = rows[rowIndex];
      const isEmptyRow = ['id', 'name', 'email', 'role', 'status', 'joined'].every(
        (field) => currentRow[field] === ''
      );
      if (isEmptyRow && rows.length > 1) {
        e.preventDefault();
        const updated = rows.filter((_, i) => i !== rowIndex);
        setRows(updated);
      }
    }

    if (key === 'ArrowDown') {
      e.preventDefault();
      const nextRef = inputRefs.current[`${rowIndex + 1}-${field}`];
      if (nextRef) nextRef.focus();
    }

    if (key === 'ArrowUp') {
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

    const savedRows = updated
      .filter(row => !row.editing)
      .map(({ id, name, email, role, status, joined }) => ({
        id, name, email, role, status, joined
      }));
    localStorage.setItem('userList', JSON.stringify(savedRows));
  };

  const deleteRow = (index) => {
    if (rows.length > 1) {
      const updated = rows.filter((_, i) => i !== index);
      setRows(updated);
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">User Table</h2>
          <button
            onClick={() => navigate('/users')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Go to User List
          </button>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full border border-gray-300 bg-white rounded-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                {['ID', 'Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map((heading) => (
                  <th key={heading} className="px-4 py-2 border border-gray-300 text-left text-sm font-medium">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {['id', 'name', 'email', 'role', 'status', 'joined'].map((field) => (
                    <td key={field} className="border border-gray-300 px-3 py-2 text-sm">
                      {row.editing ? (
                        <input
                          type={field === 'joined' ? 'date' : 'text'}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={row[field]}
                          onChange={(e) => handleChange(e, index, field)}
                          onKeyDown={(e) => handleKeyDown(e, index, field)}
                          ref={(el) => {
                            inputRefs.current[`${index}-${field}`] = el;
                          }}
                        />
                      ) : (
                        row[field] || '—'
                      )}
                    </td>
                  ))}
                  <td className="border border-gray-300 px-3 py-2">
                    {row.editing ? (
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        onClick={() => saveRow(index)}
                      >
                        Save
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                          onClick={() => toggleEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          onClick={() => deleteRow(index)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
