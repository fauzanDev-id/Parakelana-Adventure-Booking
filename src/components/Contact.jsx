import React from "react";
import { FaInstagram, FaTiktok, FaYoutube, FaFacebookF } from "react-icons/fa";

export default function Contact() {
    return (
        <div className="bg-[#DAEBCE] min-h-screen w-full font-poppins flex flex-col overflow-y-auto">
            {/* Konten Utama */}
            <main className="flex-grow flex justify-center">
                <div className="w-full max-w-md md:max-w-4xl px-4 md:px-8 pt-24 pb-10 space-y-6 mx-auto">
                    {/* Judul */}
                    <div className="text-center space-y-1">
                        <h1 className="text-sm font-bold text-[#3F4F44]">Contact Us</h1>
                        <p className="text-[10px] text-gray-700 leading-snug">
                            “Kami siap membantu persiapan petualanganmu. <br />
                            Butuh informasi, saran perlengkapan, atau ingin sewa alat?” <br />
                            Hubungi kami sekarang dan wujudkan pendakian impianmu!
                        </p>
                    </div>

                    {/* Kontak & Form */}
                    <div className="bg-[#F1F8E8] rounded-lg shadow-md p-4">
                        <div className="flex flex-col md:flex-row gap-3 items-start">
                            {/* Kiri */}
                            <div className="w-full md:w-1/2 text-[9px] md:text-[10px] text-gray-800 space-y-3">
                                <div>
                                    <p className="font-bold text-[#3F4F44]">Tanya Alat? Sini Ngobrol!</p>
                                    <p className="text-[9px]">Masih bingung harus bawa alat apa aja buat mendaki? Hubungi kami kapan saja!</p>
                                </div>
                                <div>
                                    <p className="font-semibold">📍 Alamat</p>
                                    <p className="ml-3 -mt-1">Semarang, Jawa Tengah</p>
                                </div>
                                <div>
                                    <p className="font-semibold">📞 Telepon</p>
                                    <p className="ml-3 -mt-1">+62-8162-2884-4</p>
                                </div>
                                <div>
                                    <p className="font-semibold">✉️ Email</p>
                                    <p className="ml-3 -mt-1 break-all">parakelana_adventure@gmail.com</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Follow Us:</p>
                                    <div className="flex gap-2 mt-1">
                                        {["🎵", "📷", "▶️", "📘"].map((icon, i) => (
                                            <span key={i} className="w-4 h-4 bg-white rounded-full shadow flex items-center justify-center text-[9px]">
                                                {icon}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Kanan */}
                            <div className="w-full md:w-1/2 bg-white rounded-md p-2 shadow-inner space-y-1">
                                <p className="text-[#3F4F44] font-semibold text-[9px]">Tanya Sekarang</p>
                                <input type="text" placeholder="Nama" className="w-full p-1 border border-gray-300 rounded text-[9px]" />
                                <input type="email" placeholder="Email" className="w-full p-1 border border-gray-300 rounded text-[9px]" />
                                <textarea placeholder="Pesan" rows="2" className="w-full p-1 border border-gray-300 rounded text-[9px]" />
                                <button className="w-full py-1 bg-[#3F4F44] text-white rounded text-[9px]">Submit</button>
                            </div>
                        </div>
                    </div>

                    {/* Google Maps */}
                    <div className="rounded-lg overflow-hidden shadow-md">
                        <iframe
                            title="Google Maps"
                            src="https://www.google.com/maps?q=sewa+alat+outdoor+parakelana&output=embed"
                            className="w-full h-36 border-none"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-[#DAEBCE] px-4 pb-6 mt-auto">
                <div className="max-w-[412px] mx-auto text-[8.5px] text-gray-800 flex flex-wrap justify-between gap-y-4 leading-snug">
                    {/* Brand */}
                    <div className="w-full sm:w-auto flex-1 min-w-[100px]">
                        <p className="font-bold">Parakelana</p>
                        <p className="mt-1 leading-tight text-[8.5px]">
                            Sewa alat pendakian mudah, hemat, tanpa ribet. Temukan perlengkapan terbaik untuk petualanganmu.
                        </p>
                    </div>

                    {/* Menu Utama */}
                    <div className="flex-1 min-w-[80px] ml-6">
                        <p className="font-bold">Menu Utama</p>
                        <ul className="mt-1 space-y-0.5">
                            <li>Beranda</li>
                            <li>Tentang Kami</li>
                            <li>Peralatan</li>
                            <li>Saran Jalur</li>
                            <li>Hubungi Kami</li>
                        </ul>
                    </div>

                    {/* Informasi */}
                    <div className="flex-1 min-w-[90px]">
                        <p className="font-bold">Informasi</p>
                        <ul className="mt-1 space-y-0.5">
                            <li>Cara Sewa</li>
                            <li>Tips Pendakian</li>
                            <li>Promo & Diskon</li>
                            <li>Kebijakan Privasi</li>
                        </ul>
                    </div>
                </div>

                {/* Sosial Media Horizontal */}
                <div className="mt-4 max-w-md md:max-w-4xl mx-auto text-[9px] md:text-[10px] text-black flex items-center gap-6 justify-start">
                    <div className="flex items-center gap-1">
                        <FaInstagram size={12} />
                        <span>@parakelana.adventure</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaTiktok size={12} />
                        <span>@parakelana.adventure</span>
                    </div>
                </div>
            </footer>

        </div>
    );
}
