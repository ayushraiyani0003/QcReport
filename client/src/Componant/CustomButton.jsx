import { useState } from "react";

const CustomButton = ({
    children,
    variant = "primary",
    size = "medium",
    disabled = false,
    fullWidth = false,
    leftIcon = null,
    rightIcon = null,
    onClick,
    type = "button",
    loading = false,
    className = "",
    ariaLabel = "",
    testId = "",
    ...rest
}) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Base styles
    const baseStyles =
        "font-medium focus:outline-none transition-colors duration-200 flex items-center justify-center";

    // Size styles
    const sizeStyles = {
        small: "px-3 py-1 text-xs",
        medium: "px-4 py-2 text-xs",
        large: "px-6 py-3 text-sm",
    };

    // Variant styles based on ISReport button styles
    const variantStyles = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm border border-blue-700",
        success: "bg-green-600 hover:bg-green-700 text-white rounded shadow-sm border border-green-700",
        danger: "bg-red-600 hover:bg-red-700 text-white rounded shadow-sm border border-red-700",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 rounded shadow-sm border border-gray-300",
        warning: "bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow-sm border border-yellow-600",
        info: "bg-cyan-500 hover:bg-cyan-600 text-white rounded shadow-sm border border-cyan-600",
        light: "bg-gray-100 hover:bg-gray-200 text-gray-800 rounded shadow-sm border border-gray-200",
        dark: "bg-gray-800 hover:bg-gray-900 text-white rounded shadow-sm border border-gray-700",
        outline: "bg-transparent border border-current hover:bg-opacity-10 text-blue-600 rounded shadow-sm",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-800 rounded",
    };

    // Width style
    const widthStyle = fullWidth ? "w-full" : "";

    // Disabled style
    const disabledStyle = disabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer";

    // Loading animation
    const LoadingSpinner = () => (
        <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );

    const handleMouseDown = () => {
        if (!disabled) setIsPressed(true);
    };

    const handleMouseUp = () => {
        if (!disabled) setIsPressed(false);
    };

    const handleMouseEnter = () => {
        if (!disabled) setIsHovered(true);
    };

    const handleMouseLeave = () => {
        if (!disabled) {
            setIsHovered(false);
            setIsPressed(false);
        }
    };

    return (
        <button
            {...rest}
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label={ariaLabel || children}
            data-testid={testId}
            className={`
                ${baseStyles}
                ${sizeStyles[size]}
                ${variantStyles[variant]}
                ${widthStyle}
                ${disabledStyle}
                ${loading ? "cursor-wait" : ""}
                ${className}
            `}
        >
            {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
            {loading && <LoadingSpinner />}
            {children}
            {rightIcon && !loading && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
};

export default CustomButton;