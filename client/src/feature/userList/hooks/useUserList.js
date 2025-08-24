import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchAllUsers,
    selectUsers,
    selectLoading,
    selectError,
    updateUser,
    createUser,
    deleteUser,
} from "../../../store/UserListSlice";

const useUserList = () => {
    const dispatch = useDispatch();

    // Redux selectors
    const rows = useSelector(selectUsers);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // Predefined roles for dropdown - expanded with more options
    const roles = ["Admin", "User"];

    // Local state for modal and form management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const modelRef = useRef();

    const [formData, setFormData] = useState({
        userName: "",
        name: "",
        userRoll: "",
        joined: "",
        password: "",
    });

    // Fetch users on component mount
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    // Handle click outside modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isModalOpen &&
                modelRef.current &&
                !modelRef.current.contains(event.target)
            ) {
                handleCloseModal();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    const handleOpenModal = (user = null) => {
        setEditingUser(user);
        if (user) {
            // For editing: set user data but keep password empty
            setFormData({
                userName: user.userName,
                name: user.name,
                userRoll: user.userRoll,
                joined: user.joined,
                password: "", // Always empty for editing
            });
        } else {
            // For new user: empty form
            setFormData({
                userName: "",
                name: "",
                userRoll: "",
                joined: "",
                password: "",
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({
            userName: "",
            name: "",
            userRoll: "",
            joined: "",
            password: "",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveUser = async () => {
        // Basic validation - password is always required
        if (
            !formData.userName ||
            !formData.name ||
            !formData.userRoll ||
            !formData.password
        ) {
            alert("Please fill in all fields including password");
            return;
        }

        // Additional validation for editing - ensure password is provided
        if (editingUser && !formData.password.trim()) {
            alert("Please enter a new password");
            return;
        }

        try {
            // Add joined = today's date for new users, keep existing for editing
            if (!editingUser) {
                const today = new Date();
                formData.joined = `${today.getFullYear()}-${
                    today.getMonth() + 1
                }-${today.getDate()}`;
            }

            if (editingUser) {
                // Update existing user
                await dispatch(
                    updateUser({
                        id: editingUser.id,
                        userData: formData,
                    })
                ).unwrap();
            } else {
                // Check if ID already exists
                if (rows.some((r) => r.userName === formData.userName)) {
                    alert("User ID already exists");
                    return;
                }
                // Add joined date for new user
                const today = new Date();
                const userDataWithDate = {
                    ...formData,
                    joined: `${today.getFullYear()}-${
                        today.getMonth() + 1
                    }-${today.getDate()}`,
                };
                // Create new user
                await dispatch(createUser(userDataWithDate)).unwrap();
            }
            handleCloseModal();
        } catch (error) {
            console.error("Error saving user:", error);
            alert("Error saving user. Please try again.");
        }
    };

    const handleDelete = async (userId) => {
        try {
            await dispatch(deleteUser(userId)).unwrap();
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Error deleting user. Please try again.");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return {
        isModalOpen,
        rows,
        loading: loading.fetchAll, // Specific loading state for fetchAll
        error,
        modelRef,
        editingUser,
        formData,
        roles, // Available roles for dropdown
        handleCloseModal,
        handleOpenModal,
        handleSaveUser,
        handleDelete,
        handleInputChange,
        formatDate,
    };
};

export default useUserList;

// Error saving user: User ID is required
