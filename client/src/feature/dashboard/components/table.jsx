import React, { useState } from "react";
import {
  Edit2,
  Trash2,
  Copy,
  Eye,
  FileText,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";

const EnhancedTableComponent = ({
  reportData,
  onEdit,
  onDelete,
  // onView,
  onCopy,
  formatDate,
  loading = false,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track dropdown row

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading reports...</span>
      </div>
    );
  }

  if (!reportData || reportData.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No reports found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  const getReportTypeIcon = (reportType) => {
    if (reportType === "FI Report") {
      return <FileText className="w-4 h-4 text-blue-600" />;
    }
    return <Shield className="w-4 h-4 text-green-600" />;
  };

  const getStatusBadge = (item) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

    if (item.isComplete) {
      return (
        <span className={`${baseClasses} bg-green-100 text-green-800`}>
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed
        </span>
      );
    }

    return (
      <span className={`${baseClasses} bg-orange-100 text-orange-800`}>
        <Clock className="w-3 h-3 mr-1" />
        Pending
      </span>
    );
  };

  const getReportTypeBadge = (reportType) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

    if (reportType === "FI Report") {
      return (
        <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
          <FileText className="w-3 h-3 mr-1" />
          FI Report
        </span>
      );
    }

    return (
      <span className={`${baseClasses} bg-green-100 text-green-800`}>
        <Shield className="w-3 h-3 mr-1" />
        IS Report
      </span>
    );
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reportData.map((item, index) => (
              <tr
                key={`${item.dataSource}-${item.id}`}
                className={`hover:bg-gray-50 transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {getReportTypeIcon(item.reportType)}
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {item.id.substring(0, 8)}...
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{item.clientName}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(item.deadline)}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {getReportTypeBadge(item.reportType)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                  <div className="flex items-center justify-end space-x-2">
                    {/* <button
                      onClick={() => onView(item)}
                      className="text-indigo-600 hover:text-indigo-900 p-2 hover:bg-indigo-50 rounded-lg transition-colors duration-150"
                      title="View Report"
                    >
                      {" "}
                      <Eye className="w-4 h-4" />{" "}
                    </button> */}

                    {/* Edit */}
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                      title="Edit Report"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Copy with enhanced dropdown */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.id ? null : item.id
                          )
                        }
                        className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors duration-150"
                        title="Copy Report"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      {openDropdown === item.id && (
                        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                onCopy(item, "filled");
                                setOpenDropdown(null);
                              }}
                              className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-150"
                            >
                              <FileText className="w-4 h-4 mr-3 text-blue-500" />
                              <div>
                                <div className="font-medium text-gray-900">
                                  Copy Filled Report
                                </div>
                                <div className="text-xs text-gray-500">
                                  Duplicate with all data
                                </div>
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                onCopy(item, "blank");
                                setOpenDropdown(null);
                              }}
                              className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-150"
                            >
                              <FileText className="w-4 h-4 mr-3 text-gray-400" />
                              <div>
                                <div className="font-medium text-gray-900">
                                  Copy Blank Template
                                </div>
                                <div className="text-xs text-gray-500">
                                  Structure only, no data
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors duration-150"
                      title="Delete Report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {reportData.length} report
            {reportData.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center space-x-4">
            <span>
              {reportData.filter((item) => item.dataSource === "FI").length} FI
              Reports
            </span>
            <span>
              {reportData.filter((item) => item.dataSource === "IS").length} IS
              Reports
            </span>
            <span>
              {reportData.filter((item) => item.isComplete).length} Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTableComponent;
