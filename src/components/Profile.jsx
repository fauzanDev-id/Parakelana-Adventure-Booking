import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import {
    FaUserEdit,
    FaCalendarAlt,
    FaBell,
    FaLock,
    FaSignOutAlt,
    FaTrash,
    FaCamera,
    FaShoppingCart,
    FaPlus,
    FaMinus,
} from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import lampu from "../assets/bakpao.png";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const [showPhotoOptions, setShowPhotoOptions] = useState(false);
        const [cart, setCart] = useState(() => {
                const parsePrice = (p) => {
                    if (typeof p === 'number') return p;
                    if (!p) return 0;
                    try {
                        const s = String(p);
                        const cleaned = s.replace(/[^0-9.,-]/g, '').replace(/\./g, '').replace(/,/g, '.');
                        const n = parseFloat(cleaned);
                        return Number.isFinite(n) ? n : 0;
                    } catch (e) {
                        return 0;
                    }
                };

                try {
                    const cartData = localStorage.getItem("parakelanaCart");
                    if (!cartData) return [];
                    const parsed = JSON.parse(cartData);
                    const arr = Array.isArray(parsed) ? parsed : [];
                    // sanitize numeric fields using parsePrice
                    return arr.map(it => {
                        const priceNum = parsePrice(it.price);
                        const qty = Number(it.quantity || 0);
                        const days = Number(it.totalDays || 1);
                        return {
                            ...it,
                            price: priceNum,
                            quantity: qty,
                            totalDays: days,
                            totalPrice: Number(it.totalPrice) || (priceNum * Math.max(1, qty) * Math.max(1, days))
                        };
                    });
                } catch (error) {
                    console.error("Error parsing cart:", error);
                    return [];
                }
            });
    const [showCart, setShowCart] = useState(false);

    const handleLogout = () => {
        navigate("/");
    };

    const handleBack = () => {
        navigate("/dashboard");
    };

    const updateCartQuantity = (id, newQuantity) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                const qty = Math.max(1, Number(newQuantity || 1));
                const price = Number(item.price || 0);
                const days = Number(item.totalDays || 1);
                return {
                    ...item,
                    quantity: qty,
                    totalPrice: price * qty * days
                };
            }
            return item;
        }).filter(item => item.quantity > 0);
        
        setCart(updatedCart);
        localStorage.setItem("parakelanaCart", JSON.stringify(updatedCart));
    };

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("parakelanaCart", JSON.stringify(updatedCart));
    };

    const totalCartPrice = cart.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);

    return (
        <div
            className="min-h-screen text-gray-800 px-4 md:px-8 pt-10 pb-12 font-sans flex flex-col items-center relative"
            style={{ backgroundColor: "#F1F8E8" }}
        >
            {/* Tombol Kembali */}
            <button
                onClick={handleBack}
                className="absolute top-8 left-6 bg-[#DAEBCE] text-xl text-gray-800 rounded-full p-2 shadow-md"
            >
                {"<"}
            </button>

            {/* Judul Profile */}
            <h1 className="mt-8 text-3xl md:text-4xl font-bold text-gray-800 text-center gradient-text">
                👤 Profile
            </h1>

            {/* Foto & Nama */}
            <div className="flex flex-col items-center mt-12 animate-fade-in">
                <div
                    className="relative w-32 h-32 cursor-pointer group"
                    onClick={() => setShowPhotoOptions(true)}
                >
                    <img
                        src={lampu}
                        alt="Profile"
                        className="rounded-full w-full h-full object-cover border-4 border-[#3F4F44] shadow-hard group-hover:shadow-xl group-hover:scale-105 transition-all"
                    />
                    <div className="absolute bottom-0 right-0 bg-white p-3 rounded-full shadow-hard group-hover:scale-110 transition-transform cursor-pointer border-2 border-[#3F4F44]">
                        <FiEdit2 className="text-[#3F4F44] text-lg" />
                    </div>
                </div>
                <h2 className="mt-4 text-center text-2xl font-bold text-[#3F4F44]">
                    Namamu
                </h2>
            </div>

            {/* Menu Aksi */}
            <div className="mt-12 mb-32 w-full flex justify-center animate-slide-left">
                <div className="w-full max-w-md md:max-w-lg bg-gradient-to-br from-[#DAEBCE] to-[#E5F0D8] rounded-2xl px-6 py-6 space-y-4 text-sm shadow-hard border-2 border-[#3F4F44]/10">
                    {[
                        {
                            icon: <FaUserEdit />,
                            label: "Edit Profil",
                            onClick: () => navigate("/edit-profile"),
                            color: "from-blue-400 to-blue-500"
                        },
                        {
                            icon: <FaCalendarAlt />,
                            label: "Booking",
                            onClick: () => { },
                            color: "from-purple-400 to-purple-500"
                        },
                        {
                            icon: <FaBell />,
                            label: "Notifikasi",
                            onClick: () => { },
                            color: "from-yellow-400 to-yellow-500"
                        },
                        {
                            icon: <FaLock />,
                            label: "Ubah Password",
                            onClick: () => { },
                            color: "from-red-400 to-red-500"
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between px-3 py-3 cursor-pointer hover:bg-white rounded-lg transition-all hover:shadow-soft hover:scale-102"
                            onClick={item.onClick}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`bg-gradient-to-r ${item.color} w-10 h-10 rounded-full flex items-center justify-center shadow-md text-white`}>
                                    {item.icon}
                                </div>
                                <span className="font-bold text-gray-800">{item.label}</span>
                            </div>
                            <span className="text-xl text-gray-400">→</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tombol Logout */}
            <div className="w-full flex justify-center mt-4 animate-slide-right gap-4 flex-wrap">
                <button
                    onClick={() => navigate('/checkout')}
                    className="btn-secondary font-bold text-base shadow-hard hover:shadow-xl flex items-center gap-2 relative"
                >
                    <FaShoppingCart className="text-lg" /> 
                    Keranjang
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={handleLogout}
                    className="btn-secondary font-bold text-base shadow-hard hover:shadow-xl flex items-center gap-2"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>

            {/* Shopping Cart */}
            {showCart && (
                <div className="w-full mt-8 animate-fade-in">
                    <div className="max-w-md md:max-w-lg mx-auto bg-gradient-to-br from-white to-[#F1F8E8] rounded-2xl shadow-hard p-6 border-2 border-[#3F4F44]/10">
                        <h2 className="text-2xl font-bold text-[#3F4F44] mb-6 flex items-center gap-2">
                            <FaShoppingCart className="text-2xl" /> Keranjang Belanja ({cart.length})
                        </h2>

                        {cart.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-4xl mb-3">🛒</p>
                                <p className="text-gray-600 font-semibold text-lg">Keranjang Anda kosong</p>
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="btn-primary mt-4 font-bold"
                                >
                                    Lanjut Berbelanja
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-white rounded-xl p-4 border-2 border-[#3F4F44]/10 hover:shadow-soft transition-all"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h4 className="font-bold text-gray-800 text-lg">{item.name}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        📅 {item.startDate} → {item.endDate}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        ⏱️ {item.totalDays} hari
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-600 transition-colors"
                                                >
                                                    <FaTrash className="text-lg" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                                                    <button
                                                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                        className="bg-red-500 text-white w-7 h-7 rounded-md font-bold hover:bg-red-600 transition-colors text-sm flex items-center justify-center"
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                    <span className="font-bold text-gray-800 w-6 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                        className="bg-green-500 text-white w-7 h-7 rounded-md font-bold hover:bg-green-600 transition-colors text-sm flex items-center justify-center"
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-xs text-gray-600">Subtotal</p>
                                                    <p className="font-bold text-green-600 text-lg">
                                                        Rp {Number(item.totalPrice || 0).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-gradient-to-r from-[#3F4F44] to-[#2a3831] rounded-xl p-4 text-white mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">Total Item:</span>
                                        <span className="font-bold text-lg">{cart.reduce((sum, item) => sum + item.quantity, 0)} pcs</span>
                                    </div>
                                    <div className="border-t border-white/30 pt-2 flex justify-between items-center">
                                        <span className="font-bold text-lg">Total Harga:</span>
                                        <span className="text-2xl font-bold text-yellow-300">
                                            Rp {Number(totalCartPrice || 0).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => navigate("/dashboard")}
                                        className="w-full btn-secondary font-bold text-base"
                                    >
                                        ➕ Lanjut Berbelanja
                                    </button>
                                    <button
                                        onClick={() => navigate('/checkout')}
                                        className="w-full btn-primary font-bold text-base shadow-hard hover:shadow-xl"
                                    >
                                        💳 Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            {showPhotoOptions && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end">
                    <div className="bg-[#F1F8E8] w-full rounded-t-2xl p-6 max-w-md md:max-w-lg relative pb-10">
                        {/* Tombol Kembali */}
                        <button
                            onClick={() => setShowPhotoOptions(false)}
                            className="absolute top-4 left-4 bg-[#DAEBCE] text-xl text-gray-800 rounded-full p-2 shadow-md"
                        >
                            {"<"}
                        </button>

                        {/* Judul Modal (tengah) */}
                        <h2 className="text-center text-lg font-semibold text-gray-800">
                            Ubah Foto Profil
                        </h2>

                        {/* Opsi */}
                        <div className="flex justify-around text-center text-sm mt-8">
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <FaTrash className="text-xl" />
                                <span>Hapus</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <FaCamera className="text-xl" />
                                <span>Ambil Foto</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <MdPhotoLibrary className="text-xl" />
                                <span>Album</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
