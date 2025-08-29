// src/pages/EnhancedDashboard.jsx
import React from "react";
import { useEnhancedDashboard } from "../hooks/useDashboard";
import EnhancedTableComponent from "../components/table";
import AddEditDashboardModal from "../components/models/AddEditDashboardModal";
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  Calendar,
  FileText,
  X,
  Shield,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EnhancedDashboard() {
  const navigate = useNavigate();
  const {
    filteredData,
    filterStatus,
    searchText,
    filters,
    appliedFilters,
    // isModalOpen,
    // currentItem,
    showDropdown,
    filterMenuOpen,
    reportTypeMenuOpen,
    clientMenuOpen,
    stats,
    clientOptions,
    hasActiveFilters,
    loading,
    error,
    dropdownRef,
    filterRef,
    filterTabs,
    setFilterStatus,
    setSearchText,
    setFilters,
    toggleShowDropdown,
    toggleFilterMenu,
    toggleReportTypeMenu,
    toggleClientMenu,
    handleReportTypeChange,
    selectClientNumber,
    clearClientSelection,
    handleApplyFilters,
    handleClearFilters,
    handleEditItem,
    // openEditModal,
    // closeModal,
    handleDeleteItem,
    handleCopyItem,
    handleViewItem,
    formatDate,
    clearErrors,
  } = useEnhancedDashboard();

  return (
    <div className="overflow-hidden">
      <div className="mx-6 px-6 py-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              QC Report Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage FI and IS reports in one centralized location
            </p>
          </div>
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              onClick={toggleShowDropdown}
            >
              <Plus className="w-5 h-5" />
              Generate Report
              <ChevronDown className="w-4 h-4" />
            </button>

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden"
              >
                <div className="py-2">
                  <button
                    onClick={() => {
                      toggleShowDropdown();
                      navigate("/fi-report");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900">FI Report</div>
                      <div className="text-sm text-gray-500">
                        Final Inspection Report
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      toggleShowDropdown();
                      navigate("/is-report");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
                  >
                    <Shield className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">IS Report</div>
                      <div className="text-sm text-gray-500">
                        Initial Sample Report
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading reports
                </h3>
                <div className="mt-1 text-sm text-red-700">{error}</div>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="bg-red-50 rounded-md p-1.5 text-red-400 hover:bg-red-100 focus:outline-none"
                  onClick={clearErrors}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Total Reports</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {stats.totalItems}
            </p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <FileText className="w-3 h-3 mr-1" />
              {stats.fiReports} FI • {stats.isReports} IS
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">FI Reports</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.fiReports}
            </p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <FileText className="w-3 h-3 mr-1" />
              Final Inspection
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">IS Reports</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.isReports}
            </p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <Shield className="w-3 h-3 mr-1" />
              Initial Sample
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.completedItems}
            </p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <RefreshCw className="w-3 h-3 mr-1" />
              Ready for review
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {stats.pendingItems}
            </p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <RefreshCw className="w-3 h-3 mr-1" />
              In progress
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white overflow-hidden ">
          <div className="bg-white p-2 mb-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Status Filter Tabs */}
              <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      filterStatus === tab
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setFilterStatus(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search and Filter */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search reports, clients, or IDs..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-72"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={toggleFilterMenu}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-200 ${
                      hasActiveFilters
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-gray-400 text-gray-700"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {hasActiveFilters && (
                      <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {Object.values(appliedFilters).filter(Boolean).length}
                      </span>
                    )}
                  </button>

                  {filterMenuOpen && (
                    <div
                      ref={filterRef}
                      className="absolute right-0 top-12 bg-white shadow-xl rounded-xl border border-gray-200 p-6 z-20 w-80"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">
                            Advanced Filters
                          </h3>
                          <button
                            onClick={toggleFilterMenu}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Report Type Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Report Type
                          </label>
                          <div className="relative">
                            <button
                              onClick={toggleReportTypeMenu}
                              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-colors duration-150"
                            >
                              <span className="text-gray-900">
                                {filters.reportType || "Select Report Type"}
                              </span>
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>
                            {reportTypeMenuOpen && (
                              <div className="absolute top-12 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <button
                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-2"
                                  onClick={() =>
                                    handleReportTypeChange("FI Report")
                                  }
                                >
                                  <FileText className="w-4 h-4 text-blue-600" />
                                  FI Report
                                </button>
                                <button
                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-2"
                                  onClick={() =>
                                    handleReportTypeChange("IS Report")
                                  }
                                >
                                  <Shield className="w-4 h-4 text-green-600" />
                                  IS Report
                                </button>
                                <button
                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors duration-150 text-red-600"
                                  onClick={() => handleReportTypeChange("")}
                                >
                                  Clear Selection
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Client Number Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Client
                          </label>
                          <div className="relative">
                            <button
                              onClick={toggleClientMenu}
                              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-colors duration-150"
                            >
                              <span className="text-gray-900 truncate">
                                {filters.clientNumber || "Select Client"}
                              </span>
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>
                            {clientMenuOpen && (
                              <div className="absolute top-12 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                                {clientOptions.map((client) => (
                                  <button
                                    key={client}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors duration-150 truncate"
                                    onClick={() => selectClientNumber(client)}
                                  >
                                    {client}
                                  </button>
                                ))}
                                <button
                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors duration-150 text-red-600 border-t border-gray-200"
                                  onClick={clearClientSelection}
                                >
                                  Clear Selection
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Date Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date (dd-mm-yyyy)
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="e.g. 02-08-2025"
                              value={filters.date}
                              onChange={(e) =>
                                setFilters((f) => ({
                                  ...f,
                                  date: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        {/* Filter Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                          <button
                            onClick={handleClearFilters}
                            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150"
                          >
                            Clear All
                          </button>
                          <button
                            onClick={handleApplyFilters}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-150"
                          >
                            Apply Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <EnhancedTableComponent
            reportData={filteredData}
            // onEdit={openEditModal}
            formatDate={formatDate}
            loading={loading}
            data={filteredData}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            onView={handleViewItem}
            onCopy={handleCopyItem}
          />
        </div>
      </div>
    </div>
  );
}
