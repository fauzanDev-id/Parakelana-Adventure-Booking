import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaArrowLeft, FaCreditCard, FaCheckCircle, FaQrcode } from "react-icons/fa";
import qrisImg from "../assets/qris-placeholder.svg";

export default function Checkout() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod");

    useEffect(() => {
        try {
            const data = localStorage.getItem("parakelanaCart");
            const parsed = data ? JSON.parse(data) : [];
            const arr = Array.isArray(parsed) ? parsed : [];
            // sanitize numeric fields to avoid NaN in totals
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
            const safe = arr.map(it => {
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
            setCart(safe);
        } catch (e) {
            console.error("Failed to load cart:", e);
            setCart([]);
        }
    }, []);

    const totalPrice = cart.reduce((s, it) => s + Number(it.totalPrice || 0), 0);
    const totalItems = cart.reduce((s, it) => s + Number(it.quantity || 0), 0);

    const handlePay = async () => {
        if (cart.length === 0) return;

        // Periksa apakah profil pengguna sudah lengkap (minimal name dan phone)
        try {
            let profile = null;

            const user = auth.currentUser;
            if (user) {
                try {
                    const snap = await getDoc(doc(db, "profiles", user.uid));
                    if (snap.exists()) profile = snap.data();
                } catch (err) {
                    console.error("Gagal membaca profile dari Firestore:", err);
                }
            }

            // fallback ke localStorage bila tidak ada user atau profile
            if (!profile) {
                try {
                    const stored = localStorage.getItem("parakelanaProfile");
                    profile = stored ? JSON.parse(stored) : null;
                } catch (e) {
                    console.error("Error membaca profil dari localStorage:", e);
                }
            }

            if (!profile || !profile.name || !profile.phone) {
                alert("Harap lengkapi profil Anda (nama & nomor telepon) sebelum melakukan pembayaran.");
                navigate('/edit-profile');
                return;
            }
        } catch (e) {
            console.error("Error memeriksa profil:", e);
        }

        setProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            // Clear cart
            localStorage.removeItem("parakelanaCart");
            setProcessing(false);
            alert("Pembayaran berhasil. Terima kasih! \nPesanan akan diproses.");
            navigate("/dashboard");
        }, 1600);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#DAEBCE] to-[#F1F8E8] pt-20 pb-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#3F4F44] font-semibold mb-6">
                    <FaArrowLeft /> Kembali
                </button>

                <h1 className="text-3xl font-bold text-[#3F4F44] mb-6">Checkout</h1>

                {cart.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl shadow-soft text-center">
                        <p className="text-lg font-semibold mb-3">Keranjang kosong</p>
                        <button onClick={() => navigate('/dashboard')} className="btn-primary">Lanjutkan Belanja</button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-4 shadow-soft">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                                    <div>
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-sm text-gray-600">{item.quantity} × {item.totalDays || 1} hari</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600">Rp {Number(item.totalPrice || 0).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gradient-to-r from-[#3F4F44] to-[#2a3831] rounded-xl p-4 text-white">
                        <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Total ({totalItems} item)</span>
                                <span className="font-bold text-2xl">Rp {Number(totalPrice || 0).toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-white/80">Pilih metode pembayaran dan konfirmasi pesanan.</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-soft">
                            <label className="font-semibold mb-2 block">Metode Pembayaran</label>
                            <div className="flex gap-3 flex-wrap">
                                <label className={`p-3 rounded-lg border ${paymentMethod === 'cod' ? 'border-[#3F4F44]' : 'border-gray-200'} cursor-pointer`}>
                                    <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                                    <div className="flex items-center gap-2"><FaCreditCard /> Bayar di tempat (COD)</div>
                                </label>
                                <label className={`p-3 rounded-lg border ${paymentMethod === 'qris' ? 'border-[#3F4F44]' : 'border-gray-200'} cursor-pointer`}>
                                    <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'qris'} onChange={() => setPaymentMethod('qris')} />
                                    <div className="flex items-center gap-2"><FaQrcode /> QRIS</div>
                                </label>
                            </div>
                        </div>

                        {paymentMethod === 'qris' && (
                            <div className="bg-white rounded-xl p-4 shadow-soft flex flex-col items-center gap-3">
                                <p className="font-semibold">Scan QRIS berikut untuk menyelesaikan pembayaran</p>
                                <img src={qrisImg} alt="QRIS Placeholder" className="w-64 h-64 object-contain bg-white p-2 rounded" />
                                <p className="text-sm text-gray-600">(Ini adalah gambar QRIS mentahan untuk demo)</p>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button onClick={() => navigate('/dashboard')} className="btn-secondary flex-1">Kembali</button>
                            <button onClick={handlePay} disabled={processing} className="btn-primary flex-1">
                                {processing ? 'Memproses...' : 'Bayar Sekarang'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
