import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo_splashscreen.png";
import GunungImage from "../assets/Gunung_splashscreen.png";
import { FaSearch } from "react-icons/fa";

const Splash = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#3D5347] text-white min-h-screen relative flex items-start justify-center px-6 md:px-12 pt-24 overflow-hidden">
            {/* Konten Utama */}
            <div className="relative z-10 w-full max-w-md md:max-w-2xl text-center md:text-left mx-auto">
                <p className="text-xs font-semibold tracking-wide mb-1">
                    JELAJAH TANPA BATAS
                </p>

                <div className="relative mb-2 flex items-center">
                    <h1 className="text-3xl font-extrabold tracking-wider mr-2 relative">
                        PARAKE
                        <span className="relative inline-block">
                            LANA
                            <img
                                src={Logo}
                                alt="logo"
                                className="absolute w-15 h-9 -top-7 left-[18%]"
                            />
                        </span>
                    </h1>
                </div>


                <p className="text-sm font-semibold mb-3">
                    PENYEWAAN ALAT PENDAKIAN
                </p>

                <p className="italic text-sm leading-snug mb-3">
                    “Karena gunung nggak butuh barang baru, tapi semangat baru”.
                </p>

                <p className="text-sm leading-snug mb-3">
                    Sewa peralatan pendakian berkualitas tanpa harus beli mahal. Tenda, carrier, sleeping bag, dan lainnya siap temani petualanganmu!
                </p>

                <p className="text-sm mb-5">@parakelana.adventure</p>

                <button
                    onClick={() => navigate("/login")}
                    className="bg-white text-[#3D5347] text-sm px-4 py-2 rounded-full shadow hover:bg-[#3D5347] hover:text-white transition flex items-center mx-auto md:mx-0"
                >
                    <FaSearch className="mr-2" /> Temukan Peralatanmu!
                </button>
            </div>

            {/* Gambar Gunung */}
            <img
                src={GunungImage}
                alt="Gunung"
                className="hidden md:block absolute bottom-0 right-0 w-1/2 max-w-none opacity-40 z-0 translate-x-1/4 translate-y-1/3"
            />
        </div>
    );
};

export default Splash;
