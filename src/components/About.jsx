import React from "react";
import logoParakelana from "../assets/logo_parakelana1.png";
import alatAbout from "../assets/alat_about.jpg";

export default function About() {
    return (
        <div className="w-full bg-gradient-to-b from-[#DAEBCE] via-[#E5F0D8] to-[#F1F8E8] flex justify-center font-poppins py-12 overflow-y-auto min-h-screen">
            <div className="w-full max-w-md md:max-w-4xl px-5 md:px-8 pt-24 pb-10 space-y-8 mx-auto">
                
                {/* LOGO TENGAH */}
                <div className="flex justify-center animate-bounce">
                    <img
                        src={logoParakelana}
                        alt="Logo Parakelana"
                        className="w-20 h-20 object-contain rounded-full shadow-hard hover:scale-110 transition-transform"
                    />
                </div>

                {/* ABOUT TULISAN */}
                <div className="text-center space-y-4 animate-fade-in">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#3F4F44] tracking-wide gradient-text">
                        🏔️ ABOUT PARAKELANA
                    </h1>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                        Parakelana hadir untuk mendukung petualanganmu tanpa harus membeli
                        perlengkapan baru yang mahal. Kami menyediakan layanan penyewaan
                        alat-alat pendakian berkualitas seperti tenda, carrier, sleeping bag,
                        dan perlengkapan lainnya, siap menemani setiap langkahmu menjelajahi alam.
                    </p>
                </div>

                {/* KENAPA MEMILIH */}
                <div className="card-hover bg-gradient-to-r from-[#F1F8E8] to-white rounded-2xl shadow-soft p-6 flex gap-6 items-start border-2 border-[#3F4F44]/10">
                    <img
                        src={alatAbout}
                        alt="Kenapa Memilih"
                        className="w-28 h-28 md:w-48 md:h-48 object-cover rounded-xl shadow-medium flex-shrink-0"
                    />
                    <div className="text-base text-[#3F4F44] space-y-3">
                        <h2 className="font-bold text-lg mb-3">✨ Kenapa Memilih Parakelana?</h2>
                        <ul className="space-y-2 text-base text-gray-700 list-none font-medium">
                            <li>✅ Praktis & Terjangkau</li>
                            <li>✅ Peralatan Berkualitas Tinggi</li>
                            <li>✅ Mendukung Petualangan Ramah Lingkungan</li>
                        </ul>
                    </div>
                </div>

                {/* VISI */}
                <div className="card-hover bg-gradient-to-r from-white to-[#F1F8E8] rounded-2xl shadow-soft p-6 text-center border-2 border-[#3F4F44]/10">
                    <h3 className="text-[#3F4F44] font-bold text-xl mb-3">🎯 Visi Kita</h3>
                    <p className="text-gray-800 text-base font-medium leading-relaxed">
                        Membuat kegiatan mendaki dan petualangan lebih mudah
                        diakses oleh siapa saja, sambil tetap menjaga kelestarian alam.
                    </p>
                </div>

                {/* MISI */}
                <div className="card-hover bg-gradient-to-r from-[#F1F8E8] to-white rounded-2xl shadow-soft p-6 border-2 border-[#3F4F44]/10">
                    <h3 className="text-[#3F4F44] font-bold text-xl mb-4 text-center">🚀 Misi Kita</h3>
                    <ul className="list-disc list-inside space-y-3 text-base text-gray-800 font-medium">
                        <li>
                            Menyediakan peralatan pendakian berkualitas dengan harga terjangkau.
                        </li>
                        <li>
                            Mengedukasi pendaki untuk tetap menjaga keselamatan dan lingkungan.
                        </li>
                        <li>
                            Mendukung komunitas pecinta alam dengan layanan yang amanah dan profesional.
                        </li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="text-center pt-6 animate-slide-left">
                    <p className="text-base font-bold text-[#3F4F44] mb-4">
                        Yuk Mulai petualanganmu,{" "}
                    </p>
                    <button className="btn-primary font-bold text-lg shadow-hard hover:shadow-xl">
                        📦 Sewa Alatmu Sekarang!
                    </button>
                </div>
            </div>
        </div>
    );
}
