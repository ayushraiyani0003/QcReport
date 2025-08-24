import React from "react";
import { X, ChevronDown } from "lucide-react";

export default function UserModal({
    editingUser,
    formData = {}, // Default empty object so no undefined error
    handleInputChange,
    handleCloseModal,
    handleSaveUser,
    modelRef,
    roles = [], // Add roles prop with default empty array
}) {
    console.log("editingUser", editingUser);
    console.log("formdata", formData);

    return (
        <div className="">
            <div className={`bg-black opacity-50 fixed inset-0 z-40`}></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div
                    className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-200"
                    ref={modelRef}
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">
                            {editingUser ? "Edit User" : "Add New User"}
                        </h2>
                        <button
                            onClick={handleCloseModal}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-150"
                        >
                            <X className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    User ID
                                </label>
                                <input
                                    name="userName"
                                    type="text"
                                    value={formData?.userName || ""} // Safe access
                                    onChange={handleInputChange}
                                    disabled={editingUser}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                                    placeholder="Enter user ID"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    value={formData?.name || ""}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    User Role
                                </label>
                                <div className="relative">
                                    <select
                                        name="userRoll"
                                        value={formData?.userRoll || ""}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="" disabled>
                                            Select a role
                                        </option>
                                        {roles.map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Custom dropdown arrow */}
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {editingUser ? "New Password" : "Password"}
                                    {editingUser && (
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    )}
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData?.password || ""}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder={
                                        editingUser
                                            ? "Enter new password"
                                            : "Enter password"
                                    }
                                />
                                {editingUser && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Password field is required when editing
                                        user
                                    </p>
                                )}
                            </div>

                            {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Join Date
                </label>
                <input
                  name="joined"
                  type="date"
                  value={formData?.joined || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div> */}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end space-x-3 mt-8">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveUser}
                                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                {editingUser ? "Update User" : "Add User"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
