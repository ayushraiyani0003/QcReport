import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import TableComponent from "./table";

export default function Report() {
  const navigate = useNavigate();
  const inputRefs = useRef({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterStatus, setFilterStatus] = useState("View All"); // 🔹 Filter State
  const [searchText, setSearchText] = useState(""); // 🔹 Search Text State
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen relative">
        {/* ✅ Report Title + Generate Report */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Report Table</h2>
          <div className="relative">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Generate Report
            </button>

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-10"
              >
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/blank-report");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Blank Report-1
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/blankreport2");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Blank Report-2
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ✅ Filter Bar BELOW the title and button */}
        <div className="flex justify-between items-center bg-white p-3 rounded-lg mb-6">
          {/* Tabs */}
          <div className="flex space-x-2 bg-white p-1 border rounded-full shadow-inner">
            {["View All", "Blank Report", "Fill Report"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-1 text-sm rounded-full font-medium ${
                  filterStatus === tab
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setFilterStatus(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search + Filter */}
          <div className="flex items-center space-x-2 border bg-white p-1 rounded-full shadow-inner">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)} // 🔹 update search
              className="px-4 py-1 text-sm border-none focus:outline-none bg-transparent"
            />
            <button className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-200 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ✅ Table Inside White Section */}
        <TableComponent filterStatus={filterStatus} searchText={searchText} />
      </div>
    </>
  );
}
