import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function EditProfile() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        let unsub = () => {};
        try {
            unsub = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        const docRef = doc(db, "profiles", user.uid);
                        const snap = await getDoc(docRef);
                        if (snap.exists()) {
                            const p = snap.data();
                            setName(p.name || "");
                            setUsername(p.username || "");
                            setGender(p.gender || "");
                            setPhone(p.phone || "");
                            setEmail(p.email || "");
                            setAddress(p.address || "");
                            return;
                        }
                    } catch (err) {
                        console.error("Gagal membaca profile dari Firestore:", err);
                    }
                }

                // fallback ke localStorage jika tidak login atau tidak ada profile di Firestore
                try {
                    const stored = localStorage.getItem("parakelanaProfile");
                    if (stored) {
                        const p = JSON.parse(stored);
                        setName(p.name || "");
                        setUsername(p.username || "");
                        setGender(p.gender || "");
                        setPhone(p.phone || "");
                        setEmail(p.email || "");
                        setAddress(p.address || "");
                    }
                } catch (e) {
                    console.error("Failed to load profile from localStorage:", e);
                }
            });
        } catch (e) {
            console.error(e);
        }

        return () => unsub();
    }, []);

    const handleBack = () => {
        navigate("/profile");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const profile = {
            name: name.trim(),
            username: username.trim(),
            gender: gender.trim(),
            phone: phone.trim(),
            email: email.trim(),
            address: address.trim(),
        };

        // Jika ada user login, simpan ke Firestore, kalau tidak simpan ke localStorage
        const user = auth.currentUser;
        if (user) {
            try {
                await setDoc(doc(db, "profiles", user.uid), profile, { merge: true });
            } catch (err) {
                console.error("Gagal menyimpan profile ke Firestore:", err);
                // fallback ke localStorage
                localStorage.setItem("parakelanaProfile", JSON.stringify(profile));
            }
        } else {
            localStorage.setItem("parakelanaProfile", JSON.stringify(profile));
        }

        navigate("/profile");
    };

    return (
        <div
            className="min-h-screen w-full px-6 md:px-8 pb-16 text-gray-800 font-sans relative"
            style={{ backgroundColor: "#DAEBCE" }}
        >
            <button
                onClick={handleBack}
                className="absolute top-6 left-6 bg-[#F1F8E8] text-xl text-gray-800 rounded-full p-2 shadow-md"
            >
                {"<"}
            </button>

            <h1 className="text-center text-3xl md:text-4xl font-bold pt-20 gradient-text">
                ✏️ Edit Profile
            </h1>

            <form onSubmit={handleSubmit} className="pt-12 space-y-6 max-w-sm md:max-w-xl mx-auto text-base font-medium animate-fade-in">
                <div>
                    <label className="block mb-2 font-bold text-gray-800">📝 Nama</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Nama Lengkap"
                        className="input-field shadow-soft"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-bold text-gray-800">👤 Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Nama Pengguna"
                        className="input-field shadow-soft"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-bold text-gray-800">👥 Jenis Kelamin</label>
                    <input
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        type="text"
                        placeholder="Perempuan/Laki-laki"
                        className="input-field shadow-soft"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-bold text-gray-800">📞 No. Telepon</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        placeholder="+62 xxx xxx xxx"
                        className="input-field shadow-soft"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-bold text-gray-800">📧 Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="parakelana@gmail.com"
                        className="input-field shadow-soft"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-bold text-gray-800">🏠 Alamat</label>
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        placeholder="Alamat lengkap"
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
