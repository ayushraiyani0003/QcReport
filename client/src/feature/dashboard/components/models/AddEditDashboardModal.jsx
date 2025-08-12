import React from "react";
import { X } from "lucide-react";

const AddEditDashboardModal = ({ isOpen, onClose, item, onSave }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    deadline: "",
    type: "",
    clientNumber: "",
    isComplete: false,
    reportType: "",
  });

  React.useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        deadline: item.deadline ? formatDateForInput(item.deadline) : "",
        type: item.type || "",
        clientNumber: item.clientNumber || "",
        isComplete: item.isComplete || false,
        reportType: item.reportType || "",
      });
    } else {
      setFormData({
        name: "",
        deadline: "",
        type: "",
        clientNumber: "",
        isComplete: false,
        reportType: "",
      });
    }
  }, [item]);

  const formatDateForInput = (date) => {
    if (!(date instanceof Date)) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const deadline = formData.deadline
      ? new Date(formData.deadline)
      : new Date();
    onSave({
      ...formData,
      deadline,
      id: item?.id,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {item ? "Edit Record" : "Add New Record"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Type</option>
              <option value="FI-Report">FI-Report</option>
              <option value="IS-Report">IS-Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Number
            </label>
            <input
              type="text"
              name="clientNumber"
              value={formData.clientNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Report Type</option>
              <option value="FI Report">FI Report</option>
              <option value="IS Report">IS Report</option>
              <option value="Meeting Notes">Meeting Notes</option>
              <option value="Fill Report">Fill Report</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isComplete"
              checked={formData.isComplete}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Mark as completed
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {item ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditDashboardModal;
