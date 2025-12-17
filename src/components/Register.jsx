import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";
import bgImg from "../assets/Pendaki_login.jpeg";

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const validateForm = () => {
        if (!fullName.trim()) {
            setError("Nama lengkap harus diisi.");
            return false;
        }
        if (!email.trim()) {
            setError("Email harus diisi.");
            return false;
        }
        if (password.length < 6) {
            setError("Password minimal 6 karakter.");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Password tidak cocok.");
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        setError("");
        
        if (!validateForm()) return;

        setLoading(true);
        try {
            // Buat user dengan email dan password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update profile dengan nama lengkap
            await updateProfile(userCredential.user, {
                displayName: fullName,
            });

            // Redirect ke dashboard setelah registrasi berhasil
            navigate("/dashboard");
        } catch (err) {
            console.error("Register error:", err.code, err.message);
            
            // Pesan error yang lebih user-friendly
            if (err.code === "auth/email-already-in-use") {
                setError("Email sudah terdaftar.");
            } else if (err.code === "auth/invalid-email") {
                setError("Format email tidak valid.");
            } else if (err.code === "auth/weak-password") {
                setError("Password terlalu lemah.");
            } else {
                setError("Registrasi gagal. Silakan coba lagi.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="absolute inset-0 bg-white/40"></div>

            <div className="relative z-10 w-full max-w-md md:max-w-lg h-full flex flex-col items-center justify-center p-6 mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text">
                    DAFTAR
                </h2>

                {/* Full Name input */}
                <div className="flex items-center bg-white rounded-full px-5 py-4 mb-5 w-full shadow-soft hover:shadow-medium transition-all border-2 border-transparent hover:border-[#3F4F44]">
                    <FaUser className="text-[#3F4F44] mr-4 text-lg" />
                    <input
                        type="text"
                        placeholder="Nama Lengkap"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-transparent focus:outline-none w-full text-gray-900 placeholder-gray-500 font-medium"
                    />
                </div>

                {/* Email input */}
                <div className="flex items-center bg-white rounded-full px-5 py-4 mb-5 w-full shadow-soft hover:shadow-medium transition-all border-2 border-transparent hover:border-[#3F4F44]">
                    <FaEnvelope className="text-[#3F4F44] mr-4 text-lg" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent focus:outline-none w-full text-gray-900 placeholder-gray-500 font-medium"
                    />
                </div>

                {/* Password input */}
                <div className="flex items-center bg-white rounded-full px-5 py-4 mb-5 w-full shadow-soft hover:shadow-medium transition-all border-2 border-transparent hover:border-[#3F4F44]">
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

                {/* Confirm Password input */}
                <div className="flex items-center bg-white rounded-full px-5 py-4 mb-6 w-full shadow-soft hover:shadow-medium transition-all border-2 border-transparent hover:border-[#3F4F44]">
                    <FaLock className="text-[#3F4F44] mr-4 text-lg" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Konfirmasi Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-transparent focus:outline-none w-full text-gray-900 placeholder-gray-500 font-medium"
                    />
                    <button type="button" onClick={toggleConfirmPassword} className="hover:scale-110 transition-transform">
                        {showConfirmPassword ? (
                            <IoEye className="text-[#3F4F44] text-lg" />
                        ) : (
                            <IoEyeOff className="text-[#3F4F44] text-lg" />
                        )}
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mb-4 font-semibold animate-pulse">{error}</p>}

                {/* Link Login */}
                <p className="text-sm text-center mb-8 text-gray-700 font-medium">
                    Sudah punya akun?{" "}
                    <Link to="/login" className="text-[#3F4F44] font-bold hover:underline transition-all">
                        Masuk di sini
                    </Link>
                </p>

                {/* Tombol Register */}
                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="btn-primary w-full max-w-xs text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Mendaftar..." : "Daftar Sekarang"}
                </button>
            </div>
        </div>
    );
};

export default Register;
