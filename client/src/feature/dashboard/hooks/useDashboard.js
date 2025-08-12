// src/hooks/useDashboard.js
import { useState, useRef, useEffect } from "react";
import { nodes } from "../../../data";

export const useDashboard = () => {
    // Main data state
    const [reportData, setReportData] = useState(nodes);
    const [filteredData, setFilteredData] = useState(nodes);

    // Filter and search states
    const [filterStatus, setFilterStatus] = useState("View All");
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({
        reportType: "",
        clientNumber: "",
        date: "",
    });
    const [appliedFilters, setAppliedFilters] = useState({});

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    // Dropdown states
    const [showDropdown, setShowDropdown] = useState(false);
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const [reportTypeMenuOpen, setReportTypeMenuOpen] = useState(false);
    const [clientMenuOpen, setClientMenuOpen] = useState(false);

    // Refs
    const dropdownRef = useRef(null);
    const filterRef = useRef(null);

    // Calculate stats
    const stats = {
        totalItems: reportData.length,
        completedItems: reportData.filter((item) => item.isComplete).length,
        pendingItems: reportData.filter((item) => !item.isComplete).length,
        categories: [...new Set(reportData.map((item) => item.type))].length,
    };

    const filterTabs = ["View All", "Blank Report", "Fill Report"];

    // Client options for filter dropdown
    const clientOptions = [
        ...new Set(reportData.map((item) => item.clientNumber)),
    ];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target)
            ) {
                setFilterMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Apply filters whenever dependencies change
    useEffect(() => {
        let result = [...reportData];

        // Apply status filter
        if (filterStatus === "Blank Report") {
            result = result.filter((item) => !item.isComplete);
        } else if (filterStatus === "Fill Report") {
            result = result.filter((item) => item.isComplete);
        }

        // Apply search text
        if (searchText.trim() !== "") {
            const search = searchText.trim().toLowerCase();
            result = result.filter((item) => {
                const name = item.name?.toLowerCase() || "";
                const clientNumber = item.clientNumber?.toLowerCase() || "";
                const deadline = formatDate(item.deadline) || "";
                const status = item.isComplete ? "fill report" : "blank report";

                return (
                    name.includes(search) ||
                    clientNumber.includes(search) ||
                    deadline.includes(search) ||
                    status.includes(search)
                );
            });
        }

        // Apply advanced filters
        if (appliedFilters.reportType) {
            const reportType = appliedFilters.reportType.toLowerCase();
            result = result.filter((item) => {
                const itemReportType = item.reportType?.toLowerCase() || "";
                return itemReportType.includes(reportType);
            });
        }

        if (appliedFilters.clientNumber) {
            const client = appliedFilters.clientNumber.toLowerCase();
            result = result.filter((item) => {
                const itemClient = item.clientNumber?.toLowerCase() || "";
                return itemClient.includes(client);
            });
        }

        if (appliedFilters.date) {
            result = result.filter((item) => {
                const itemDate = formatDate(item.deadline);
                return itemDate === appliedFilters.date;
            });
        }

        setFilteredData(result);
    }, [reportData, filterStatus, searchText, appliedFilters]);

    // Helper function to format dates
    const formatDate = (date) => {
        if (!(date instanceof Date)) return "";
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Toggle functions
    const toggleShowDropdown = () => setShowDropdown(!showDropdown);
    const toggleFilterMenu = () => setFilterMenuOpen(!filterMenuOpen);
    const toggleReportTypeMenu = () =>
        setReportTypeMenuOpen(!reportTypeMenuOpen);
    const toggleClientMenu = () => setClientMenuOpen(!clientMenuOpen);

    // Filter handlers
    const handleReportTypeChange = (type) => {
        setFilters((prev) => ({ ...prev, reportType: type }));
        setReportTypeMenuOpen(false);
    };

    const selectClientNumber = (client) => {
        setFilters((prev) => ({ ...prev, clientNumber: client }));
        setClientMenuOpen(false);
    };

    const clearClientSelection = () => {
        setFilters((prev) => ({ ...prev, clientNumber: "" }));
        setClientMenuOpen(false);
    };

    const handleApplyFilters = () => {
        setAppliedFilters(filters);
        setFilterMenuOpen(false);
    };

    const handleClearFilters = () => {
        setFilters({
            reportType: "",
            clientNumber: "",
            date: "",
        });
        setAppliedFilters({});
    };

    // Check if any filters are active
    const hasActiveFilters = Object.values(appliedFilters).some(Boolean);

    // Modal handlers
    const openAddModal = () => {
        setCurrentItem(null);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // CRUD operations
    const handleSaveItem = (itemData) => {
        if (itemData.id) {
            // Update existing item
            setReportData((prev) =>
                prev.map((item) =>
                    item.id === itemData.id ? { ...item, ...itemData } : item
                )
            );
        } else {
            // Add new item
            const newItem = {
                ...itemData,
                id: Date.now(),
                nodes: [],
            };
            setReportData((prev) => [...prev, newItem]);
        }
        closeModal();
    };

    const handleCopyItem = (item) => {
        const choice = window.prompt("Type 'blank' or 'fill' to copy:");
        const newItem = {
            ...item,
            isComplete: choice === "fill",
            id: Date.now(),
        };
        setReportData((prev) => [...prev, newItem]);
    };

    const handleDeleteItem = (item) => {
        if (window.confirm("Are you sure you want to delete this report?")) {
            setReportData((prev) => prev.filter((i) => i.id !== item.id));
        }
    };

    return {
        // State
        filteredData,
        filterStatus,
        searchText,
        filters,
        appliedFilters,
        isModalOpen,
        currentItem,
        showDropdown,
        filterMenuOpen,
        reportTypeMenuOpen,
        clientMenuOpen,
        stats,
        clientOptions,
        hasActiveFilters,

        // Refs
        dropdownRef,
        filterRef,

        filterTabs,

        // Setters
        setFilterStatus,
        setSearchText,
        setFilters,

        // Toggle functions
        toggleShowDropdown,
        toggleFilterMenu,
        toggleReportTypeMenu,
        toggleClientMenu,

        // Filter handlers
        handleReportTypeChange,
        selectClientNumber,
        clearClientSelection,
        handleApplyFilters,
        handleClearFilters,

        // Modal handlers
        openAddModal,
        openEditModal,
        closeModal,

        // CRUD operations
        handleSaveItem,
        handleCopyItem,
        handleDeleteItem,

        // Helper functions
        formatDate,
    };
};
