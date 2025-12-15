import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { FaUser, FaLock } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";
import bgImg from "../assets/Pendaki_login.jpeg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const togglePassword = () => setShowPassword(!showPassword);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err) {
            console.error("Login error:", err.code, err.message); // ✅ Tambahkan ini untuk melihat penyebab error
            setError("Email atau password salah.");
        }
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="absolute inset-0 bg-white/40"></div>

            <div className="relative z-10 w-full max-w-md md:max-w-lg h-full flex flex-col items-center justify-center p-6 mx-auto">
                <h2
                    className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
                >
                    SIGN IN
                </h2>

                {/* Email input */}
                    <div className="flex items-center bg-white rounded-full px-5 py-4 mb-5 w-full shadow-soft hover:shadow-medium transition-all border-2 border-transparent hover:border-[#3F4F44]">
                    <FaUser className="text-[#3F4F44] mr-4 text-lg" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent focus:outline-none w-full text-gray-900 placeholder-gray-500 font-medium"
                    />
                </div>

                {/* Password input */}
                    <div className="flex items-center bg-white rounded-full px-5 py-4 mb-6 w-full shadow-soft hover:shadow-medium transition-all border-2 border-transparent hover:border-[#3F4F44]">
                    <FaLock className="text-[#3F4F44] mr-4 text-lg" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent focus:outline-none w-full text-gray-900 placeholder-gray-500 font-medium"
                    />
                    <button type="button" onClick={togglePassword} className="hover:scale-110 transition-transform">
                        {showPassword ? (
                            <IoEye className="text-[#3F4F44] text-lg" />
                        ) : (
                            <IoEyeOff className="text-[#3F4F44] text-lg" />
                        )}
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mb-4 font-semibold animate-pulse">{error}</p>}

                {/* Link Registrasi */}
                <p className="text-sm text-center mb-8 text-gray-700 font-medium">
                    Belum punya akun?{" "}
                    <a href="#" className="text-[#3F4F44] font-bold hover:underline transition-all">
                        Registrasi sekarang
                    </a>
                </p>

                {/* Tombol Login */}
                    <button
                        onClick={handleLogin}
                        className="btn-primary w-full max-w-xs text-lg font-bold"
                    >
                    Yuk Mulai!
                </button>
            </div>
        </div>
    );
};

export default Login;
