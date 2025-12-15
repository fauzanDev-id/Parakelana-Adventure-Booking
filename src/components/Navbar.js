// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_parakelana1.png";

export default function Navbar({ username }) {
    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:max-w-5xl bg-[#3F4F44] text-white py-2 px-4 md:px-6 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center justify-between ">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2">
                <div className="bg-white rounded-full flex items-center shadow-md">
                    <img src={logo} alt="Logo" className="h-6 w-6 object-contain" />
                </div>
            </Link>

            {/* Menu */}
            <div className="flex space-x-3 text-xs md:text-sm font-medium">
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                <Link to="/about" className="hover:underline">About</Link>
                <Link to="/contact" className="hover:underline">Contact</Link>
            </div>

            {/* User */}
            <Link to="/profile">
                <div className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-xs hidden sm:inline">{username}</span>
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black text-[10px] font-bold">
                        {username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                </div>
            </Link>
        </nav>
    );
}
