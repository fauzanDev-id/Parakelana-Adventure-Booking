import React from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/profile");
    };

    return (
        <div
            className="min-h-screen w-full px-6 md:px-8 pb-16 text-gray-800 font-sans relative"
            style={{ backgroundColor: "#DAEBCE" }}
        >
            {/* Tombol Kembali */}
            <button
                onClick={handleBack}
                className="absolute top-6 left-6 bg-[#F1F8E8] text-xl text-gray-800 rounded-full p-2 shadow-md"
            >
                {"<"}
            </button>

            {/* Judul */}
            <h1 className="text-center text-3xl md:text-4xl font-bold pt-20 gradient-text">
                ✏️ Edit Profile
            </h1>

            {/* Form */}
            <form className="pt-12 space-y-6 max-w-sm md:max-w-xl mx-auto text-base font-medium animate-fade-in">
                <div>
                    <label className="block mb-2 font-bold text-gray-800">📝 Nama</label>
                    <input
                        type="text"
                        placeholder="Nama Lengkap"
                        className="input-field shadow-soft"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-bold text-gray-800">👤 Username</label>
                    <input
                        type="text"
                        placeholder="Nama Pengguna"
                        className="input-field shadow-soft"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-bold text-gray-800">👥 Jenis Kelamin</label>
                    <input
                        type="text"
                        placeholder="Perempuan/Laki-laki"
                        className="input-field shadow-soft"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-bold text-gray-800">📞 No. Telepon</label>
                    <input
                        type="text"
                        placeholder="+62 xxx xxx xxx"
                        className="input-field shadow-soft"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-bold text-gray-800">📧 Email</label>
                    <input
                        type="email"
                        placeholder="parakelana@gmail.com"
                        className="input-field shadow-soft"
                    />
                </div>

                <div className="pt-8">
                    <button
                        type="submit"
                        className="btn-primary w-full font-bold text-lg shadow-hard hover:shadow-xl"
                    >
                        💾 Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
