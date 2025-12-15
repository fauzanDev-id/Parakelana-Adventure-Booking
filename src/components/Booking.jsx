import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaCheck, FaCreditCard, FaShoppingCart } from "react-icons/fa";

export default function Booking() {
    const navigate = useNavigate();
    const location = useLocation();
    const [quantity, setQuantity] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Sample item dari location state
    const item = location.state?.item || {
        name: "Tenda",
        price: 40000,
        img: null,
        description: "Tenda berkualitas tinggi dengan kapasitas 2-3 orang, tahan cuaca ekstrem, material anti air premium."
    };

    const calculateTotalDays = () => {
        if (!startDate || !endDate) return 1;
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (!isFinite(start) || !isFinite(end)) return 1;
        const diffTime = end - start;
        const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        return diffDays;
    };

    const totalDays = calculateTotalDays();
    const parsePrice = (p) => {
        if (typeof p === 'number') return p;
        if (!p) return 0;
        try {
            const s = String(p);
            // keep digits, dots and commas, remove currency text and /Hari
            const cleaned = s.replace(/[^0-9.,-]/g, '').replace(/\./g, '').replace(/,/g, '.');
            const n = parseFloat(cleaned);
            return Number.isFinite(n) ? n : 0;
        } catch (e) {
            return 0;
        }
    };

    const priceNumber = parsePrice(item.price);
    const totalPrice = Number(priceNumber || 0) * Number(quantity || 0) * Number(totalDays || 1);

    const handleBooking = async () => {
        if (!startDate || !endDate || quantity < 1) {
            alert("Silakan lengkapi semua data booking!");
            return;
        }

        setIsLoading(true);
        
        // Simpan ke localStorage (shopping cart)
        const cartItem = {
            id: Date.now(),
            name: item.name,
            price: Number(priceNumber || 0),
            img: item.img,
            quantity: Number(quantity || 0),
            startDate,
            endDate,
            totalDays: Number(totalDays || 1),
            totalPrice: Number(totalPrice || 0)
        };

        // Ambil cart yang sudah ada
        let existingCart = [];
        try {
            const cartData = localStorage.getItem("parakelanaCart");
            existingCart = cartData ? JSON.parse(cartData) : [];
            if (!Array.isArray(existingCart)) {
                existingCart = [];
            }
        } catch (error) {
            console.error("Error parsing cart:", error);
            existingCart = [];
        }
        
        // Cek apakah item sudah ada di cart dengan tanggal yang sama
        const existingItemIndex = existingCart.findIndex(
            c => c.name === item.name && c.startDate === startDate && c.endDate === endDate
        );

        if (existingItemIndex >= 0) {
            // Tambah quantity jika sudah ada (safely coerce numbers)
            existingCart[existingItemIndex].quantity = Number(existingCart[existingItemIndex].quantity || 0) + Number(quantity || 0);
            existingCart[existingItemIndex].price = Number(existingCart[existingItemIndex].price || 0);
            existingCart[existingItemIndex].totalDays = Number(existingCart[existingItemIndex].totalDays || 1);
            existingCart[existingItemIndex].totalPrice =
                existingCart[existingItemIndex].price *
                existingCart[existingItemIndex].quantity *
                existingCart[existingItemIndex].totalDays;
        } else {
            // Tambah item baru ke cart
            existingCart.push(cartItem);
        }

        localStorage.setItem("parakelanaCart", JSON.stringify(existingCart));

        setTimeout(() => {
            alert(`✅ ${item.name} ditambahkan ke keranjang!\n\nJumlah: ${quantity}\nTanggal: ${startDate} - ${endDate}\nTotal: Rp ${Number(totalPrice || 0).toLocaleString()}`);
            setIsLoading(false);
            navigate("/profile");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#DAEBCE] via-[#E5F0D8] to-[#F1F8E8] pt-20 pb-12 px-4 md:px-8 overflow-y-auto">
            {/* Header */}
            <div className="max-w-3xl mx-auto animate-fade-in">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 text-[#3F4F44] font-bold text-lg hover:scale-105 transition-transform mb-6"
                >
                    <FaArrowLeft className="text-2xl" /> Kembali
                </button>

                <h1 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-12">
                    🎒 Form Booking
                </h1>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Item Details */}
                    <div className="card-hover bg-gradient-to-br from-white to-[#F1F8E8] rounded-2xl shadow-hard p-8 border-2 border-[#3F4F44]/10">
                        <h2 className="text-3xl font-bold text-[#3F4F44] mb-4">{item.name}</h2>
                        
                        <div className="bg-[#F1F8E8] rounded-xl h-64 w-full mb-6 flex items-center justify-center overflow-hidden">
                            {item.img ? (
                                <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                            ) : (
                                <div className="text-6xl">📦</div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-600 font-semibold mb-2">Deskripsi Produk</p>
                                <p className="text-gray-700 text-base leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-400">
                                <p className="text-gray-600 text-sm font-semibold">Harga Per Hari</p>
                                <p className="text-3xl font-bold text-green-600">
                                    Rp {Number(priceNumber || 0).toLocaleString()}
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-300 space-y-2">
                                <p className="text-sm text-gray-600 font-semibold">💡 Informasi</p>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>✅ Garansi kualitas terjamin</li>
                                    <li>✅ Gratis konsultasi penggunaan</li>
                                    <li>✅ Asuransi perlengkapan tersedia</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="card-hover bg-gradient-to-br from-white to-[#F1F8E8] rounded-2xl shadow-hard p-8 border-2 border-[#3F4F44]/10">
                        <h3 className="text-2xl font-bold text-[#3F4F44] mb-6 flex items-center gap-2">
                            <FaShoppingCart className="text-2xl" /> Detail Pemesanan
                        </h3>

                        <div className="space-y-6">
                            {/* Quantity */}
                            <div>
                                <label className="block text-gray-800 font-bold mb-3 text-lg">
                                    📦 Jumlah Barang
                                </label>
                                <div className="flex items-center gap-4 bg-gray-100 rounded-xl p-3 w-fit">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="bg-red-500 text-white w-10 h-10 rounded-lg font-bold hover:bg-red-600 transition-colors text-xl"
                                    >
                                        −
                                    </button>
                                    <span className="text-2xl font-bold text-gray-800 w-8 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="bg-green-500 text-white w-10 h-10 rounded-lg font-bold hover:bg-green-600 transition-colors text-xl"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Start Date */}
                            <div>
                                <label className="block text-gray-800 font-bold mb-3 text-lg flex items-center gap-2">
                                    <FaCalendarAlt /> Tanggal Mulai
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="input-field text-base shadow-soft font-semibold"
                                />
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="block text-gray-800 font-bold mb-3 text-lg flex items-center gap-2">
                                    <FaCalendarAlt /> Tanggal Selesai
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="input-field text-base shadow-soft font-semibold"
                                />
                            </div>

                            {/* Days Count */}
                            {totalDays > 0 && (
                                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 border-2 border-yellow-400">
                                    <p className="text-gray-700 font-semibold text-base">
                                        📅 Durasi Sewa: <span className="text-orange-600 font-bold text-lg">{totalDays} Hari</span>
                                    </p>
                                </div>
                            )}

                            {/* Summary */}
                            <div className="bg-gradient-to-r from-[#3F4F44] to-[#2a3831] rounded-xl p-6 text-white space-y-3">
                                <div className="flex justify-between items-center text-base">
                                    <span>Harga per Item:</span>
                                    <span className="font-bold">Rp {Number(priceNumber || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-base">
                                    <span>Jumlah Item:</span>
                                    <span className="font-bold">{quantity} pcs</span>
                                </div>
                                <div className="flex justify-between items-center text-base">
                                    <span>Durasi Sewa:</span>
                                    <span className="font-bold">{totalDays || 1} hari</span>
                                </div>
                                <div className="border-t-2 border-white/30 pt-3 flex justify-between items-center text-xl">
                                    <span className="font-bold">Total Harga:</span>
                                    <span className="text-2xl font-bold text-yellow-300">
                                        Rp {Number(totalPrice || 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Booking Button */}
                            <button
                                onClick={handleBooking}
                                disabled={isLoading}
                                className="btn-primary w-full font-bold text-lg shadow-hard hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <FaShoppingCart className="text-xl" />
                                {isLoading ? "Memproses..." : "Tambah ke Keranjang"}
                            </button>

                            {/* Info */}
                            <p className="text-center text-xs text-gray-600">
                                💳 Pembayaran dapat dilakukan saat pengambilan barang atau transfer bank
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="card-hover bg-white rounded-xl shadow-soft p-6 text-center border-2 border-[#3F4F44]/10">
                        <p className="text-4xl mb-3">🚚</p>
                        <h4 className="font-bold text-gray-800 mb-2">Pengambilan Mudah</h4>
                        <p className="text-sm text-gray-600">Ambil barang sesuai jadwal yang disepakati</p>
                    </div>
                    <div className="card-hover bg-white rounded-xl shadow-soft p-6 text-center border-2 border-[#3F4F44]/10">
                        <p className="text-4xl mb-3">🛡️</p>
                        <h4 className="font-bold text-gray-800 mb-2">Asuransi Tersedia</h4>
                        <p className="text-sm text-gray-600">Lindungi barang Anda dengan asuransi terpercaya</p>
                    </div>
                    <div className="card-hover bg-white rounded-xl shadow-soft p-6 text-center border-2 border-[#3F4F44]/10">
                        <p className="text-4xl mb-3">💬</p>
                        <h4 className="font-bold text-gray-800 mb-2">Bantuan 24/7</h4>
                        <p className="text-sm text-gray-600">Tim support siap membantu Anda kapan saja</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
