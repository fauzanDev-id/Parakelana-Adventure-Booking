// src/App.jsx
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";

import Splash from "./components/Splash";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";
import About from "./components/About"
import Navbar from "./components/Navbar";
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Booking from './components/Booking';
import Checkout from './components/Checkout';
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

// 💡 Bagian utama aplikasi yang menangani routing dan navbar
function AppWrapper() {
    const location = useLocation();
    const hideNavbar =
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/profile" ||
        location.pathname === "/booking" ||
        location.pathname === "/edit-profile" ||
        location.pathname === "/checkout";
    const [username, setUsername] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.displayName || user.email || "Pengguna");
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div
            className="flex flex-col"
            style={{
                background: "linear-gradient(180deg, #3F4F44 4%, #F1F8E8 80%)",
            }}
        >
            {!hideNavbar && <Navbar username={username} />}
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
        </div>
    );
}


// 💡 Bungkus AppWrapper dengan Router
function App() {
    return (
        <Router>
            <AppWrapper />
        </Router>
    );
}

export default App;
