import React from "react";
import { Eye, Copy, Edit, Trash2, FileText } from "lucide-react";

const TableComponent = ({ reportData, onEdit, onCopy, onDelete }) => {
  // Column width configuration
  const COLUMN_WIDTHS = {
    index: "60px",
    reportName: "2fr",
    clientNumber: "1fr",
    deadline: "1fr",
    status: "1fr",
    type: "1fr",
    actions: "140px",
  };

  // Generate grid template from configuration
  const gridTemplate = Object.values(COLUMN_WIDTHS).join(" ");

  return (
    <div className="bg-white flex flex-col h-[91.5%]">
      {/* Table Header - Fixed */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <div
          className="grid gap-4 text-sm font-semibold text-gray-700"
          style={{
            gridTemplateColumns: gridTemplate,
          }}
        >
          <div className="text-center">#</div>
          <div>Report Name</div>
          <div>Client Number</div>
          <div>Deadline</div>
          <div>Status</div>
          <div>Type</div>
          <div className="text-center">Actions</div>
        </div>
      </div>

      {/* Table Body - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="divide-y divide-gray-100 pb-4">
          {reportData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No reports found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            [...reportData].reverse().map((item, index) => (
              <div
                key={item.id}
                className="grid gap-4 px-6 py-0 hover:bg-gray-50 transition-colors duration-150 min-h-[50px]"
                style={{
                  gridTemplateColumns: gridTemplate,
                }}
              >
                <div className="text-center text-sm text-gray-600 font-medium flex items-center justify-center h-full">
                  {reportData.length - index}
                </div>
                <div className="font-medium text-gray-900 flex items-center h-full">
                  <span className="truncate">{item.name}</span>
                </div>
                <div className="text-gray-600 font-mono text-sm flex items-center h-full">
                  <span className="truncate">{item.clientNumber || "N/A"}</span>
                </div>
                <div className="text-gray-600 text-sm flex items-center h-full">
                  {`${item.deadline.getDate().toString().padStart(2, "0")}-${(
                    item.deadline.getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}-${item.deadline.getFullYear()}`}
                </div>
                <div className="flex items-center h-full">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.isComplete
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-orange-100 text-orange-800 border border-orange-200"
                    }`}
                  >
                    {item.isComplete ? "Completed" : "In Progress"}
                  </span>
                </div>
                <div className="text-gray-600 text-sm flex items-center h-full">
                  <span className="truncate">{item.type || "N/A"}</span>
                </div>
                <div className="flex items-center justify-center gap-1 h-full">
                  <button
                    onClick={() => console.log("Open", item)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 group"
                    title="View Report"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onCopy(item)}
                    className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-150 group"
                    title="Copy Report"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-150 group"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 group"
                    title="Delete Report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
