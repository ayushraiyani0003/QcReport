"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Simulated user data (you can replace this with real user data from props/context)
    const firstName = "Alina";
    const lastName = "Smith";
    const role = "Admin";

    // Generate avatar URL from API
    const avatarUrl = `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="px-10 py-1 h-[62px] pt-3 pb-1 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.4)] sticky top-0 z-50 ">
            <div className="flex items-center justify-between">
                {/* Left - Logo */}
                <img
                    src="/src/assets/Logo - Sunchaser Structure.jpeg"
                    alt="Sunchaser Structures Logo"
                    className="h-[35px] w-auto"
                />

                {/* Right - Nav + Profile */}
                <div className="flex items-center gap-6 ml-auto">
                    <nav className="flex gap-8">
                        <Link to="/Dashboard" className="menu_btn">
                            Dashboard
                        </Link>
                        <Link to="/userlist" className="menu_btn">
                            User List
                        </Link>
                        <Link to="/settings" className="menu_btn">
                            {" "}
                            {/* Changed to /settings */}
                            Setting
                        </Link>
                    </nav>

                    {/* User Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <img
                                src={avatarUrl || "/placeholder.svg"}
                                alt={`${firstName} ${lastName}`}
                                className="w-[35px] h-[35px] rounded-full object-cover content-center"
                            />
                            <div className="flex flex-col text-sm text-gray-800 leading-tight">
                                <span className="font-medium">{`${firstName}${lastName}`}</span>
                                <span className="text-xs text-black-600">
                                    {role}
                                </span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        </div>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                                <ul className="text-sm text-gray-700">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Profile
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Settings
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            localStorage.removeItem(
                                                "isLoggedIn"
                                            );
                                            navigate("/login", {
                                                replace: true,
                                            });
                                        }}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
