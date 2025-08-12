import React from "react";
import {
    Trash2,
    Edit3,
    Plus,
    X,
    Users,
    Calendar,
    Briefcase,
    User,
} from "lucide-react";
import useUserList from "../hooks/useUserList";
import UserModal from "../components/models/AddEditUserModel";

export default function UserList() {
    const {
        isModalOpen,
        rows,
        modelRef,
        handleCloseModal,
        handleOpenModal,
        handleSaveUser,
        handleDelete,
        handleInputChange,
        formatDate,
        editingUser,
        formData,
    } = useUserList();
    return (
        <div
            className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50`}
        >
            <div className="container mx-auto px-6 py-8">
                <div className={` ${isModalOpen ? "blur-sm" : ""} `}>
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-3 bg-blue-600 rounded-xl">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        User Management
                                    </h1>
                                    <p className="text-gray-600 mt-1">
                                        Manage your team members and their roles
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleOpenModal()}
                                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Add User</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">
                                        Total Users
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">
                                        {rows.length}
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">
                                        Active Roles
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">
                                        {new Set(rows.map((r) => r.role)).size}
                                    </p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <Briefcase className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">
                                        This Month
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">
                                        {
                                            rows.filter(
                                                (r) =>
                                                    new Date(
                                                        r.joined
                                                    ).getMonth() ===
                                                    new Date().getMonth()
                                            ).length
                                        }
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <Calendar className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Team Members
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Joined
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {rows.map((user, index) => (
                                        <tr
                                            key={user.id || index}
                                            className="hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                        <User className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {user.id}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {formatDate(user.joined)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            handleOpenModal(
                                                                user
                                                            )
                                                        }
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors duration-150"
                                                        title="Edit user"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id
                                                            )
                                                        }
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-150"
                                                        title="Delete user"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {rows.length === 0 && (
                                <div className="text-center py-12">
                                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        No users found
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Get started by adding your first team
                                        member.
                                    </p>
                                    <button
                                        onClick={() => handleOpenModal()}
                                        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Add User</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Modal */}
                {isModalOpen && (
                    <UserModal
                        editingUser={editingUser}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleCloseModal={handleCloseModal}
                        handleSaveUser={handleSaveUser}
                        modelRef={modelRef}
                    />
                )}
            </div>
        </div>
    );
}

// Debug:
// example

// const useApplicantTrackingPage = (
//   setOpenDeleteModel = () => {},
//   setApplicantData = () => {},
//   setApplicantModel = () => {},
//   setModelType = () => {} // 'view', 'add', 'edit'
// ) => {

// TODO: add all functionality and besuness logic hear
//   return {
//     // Main data with transformed names
//     data,
//     allApplicants, // Keep for backward compatibility
//     pendingApplicantsData,
//     shortlistedApplicantsData,
//     selectedApplicantsData,
//     rejectedApplicantsData,
//     hiredApplicantsData,
//     newApplicantsData,

//     // Loading and error states
//     ApplicantsLoading,
//     ApplicantsError,
//     EmployeeError,
//     DesignationsLoading,
//     DesignationsError,

//     // Reference data lists
//     employeesList,
//     designationsList,
//     userRole,
//     statusOptions,
//     genderOptions,
//     maritalStatusOptions,
//     allEmployees,
//     allDesignations,

//     // Actions
//     setUserRole,
//     handleViewDetails,
//     handleEdit,
//     handleDelete,
//     handleRowClick,
//     handleAddNew,
//     handleStatusChange,

//     // Helper functions
//     getEmployeeName,
//     getDesignationName,
//     getFormattedDate,
//     getFullName,
// };
// }
