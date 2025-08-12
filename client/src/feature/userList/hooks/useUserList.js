import { useState, useEffect, useRef } from "react";

const useUserList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [rows, setRows] = useState([
    {
      id: "USR001",
      name: "John Doe",
      role: "Frontend Developer",
      joined: "2024-01-15",
    },
    {
      id: "USR002",
      name: "Jane Smith",
      role: "Product Manager",
      joined: "2023-11-20",
    },
    {
      id: "USR003",
      name: "Mike Johnson",
      role: "UI/UX Designer",
      joined: "2024-03-10",
    },
    {
      id: "USR004",
      name: "Mike jon",
      role: "UI/UX Designer",
      joined: "2024-03-10",
    },
  ]);
  const modelRef = useRef();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    joined: "",
  });

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
    setFormData(
      user || {
        id: "",
        name: "",
        role: "",
        joined: "",
      }
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({ id: "", name: "", role: "", joined: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log(formData);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveUser = () => {
    // Basic validation
    if (!formData.id || !formData.name || !formData.role || !formData.joined) {
      alert("Please fill in all fields");
      return;
    }

    if (editingUser) {
      setRows(rows.map((r) => (r.id === editingUser.id ? formData : r)));
    } else {
      // Check if ID already exists
      if (rows.some((r) => r.id === formData.id)) {
        alert("User ID already exists");
        return;
      }
      setRows([...rows, formData]);
    }

    handleCloseModal();
  };

  const handleDelete = (userId) => {
    setRows(rows.filter((r) => r.id !== userId));
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
    modelRef,
    editingUser, // Add this
    formData, // Add this
    handleCloseModal,
    handleOpenModal,
    handleSaveUser,
    handleDelete,
    handleInputChange,
    formatDate,
  };
};

export default useUserList;
