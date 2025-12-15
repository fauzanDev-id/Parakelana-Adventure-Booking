import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import images from src/assets
import tenda2 from '../assets/tenda2.png';
import carrier from '../assets/carrier.png';
import sleepingBag from '../assets/sleeping_Bags.png';
import matras from '../assets/matras.png';
import jaket from '../assets/jaket.png';
import sarungTangan from '../assets/sarungtangan.png';
import headlamp from '../assets/alat.jpeg';

import kompor from '../assets/kompor.png';
import cookingSet from '../assets/cookingset.png';
import lampu from '../assets/bakpao.png';
import pole from '../assets/trackingpole.png';
import gas from '../assets/gas.png';
import kursi from '../assets/kursi.png';
import meja from '../assets/meja.png';

import gunungPrau from '../assets/gunung_prau.jpeg';
import sindoro from '../assets/sindoro.jpg';
import rinjani from '../assets/rinjani.jpg';

const popularItems = [
    { name: 'Tenda', price: 'Rp 40.000/Hari', img: tenda2 },
    { name: 'Carrier', price: 'Rp 25.000/Hari', img: carrier },
    { name: 'Sleeping Bags', price: 'Rp 10.000/Hari', img: sleepingBag },
    { name: 'Matras', price: 'Rp 5.000/Hari', img: matras },
    { name: 'Jaket', price: 'Rp 25.000/Hari', img: jaket },
    { name: 'Sarung Tangan', price: 'Rp 7.000/Hari', img: sarungTangan },
    { name: 'Headlamp', price: 'Rp 10.000/Hari', img: headlamp },
    { name: 'Sleeping Pad', price: 'Rp 8.000/Hari', img: matras },
    { name: 'Raincoat', price: 'Rp 15.000/Hari', img: jaket },
    { name: 'Boots Hiking', price: 'Rp 35.000/Hari', img: headlamp },
    { name: 'Compass', price: 'Rp 12.000/Hari', img: pole },
    { name: 'Hat/Cap', price: 'Rp 8.000/Hari', img: sarungTangan },
    { name: 'Backpack 70L', price: 'Rp 50.000/Hari', img: carrier },
    { name: 'Thermal Gloves', price: 'Rp 9.000/Hari', img: sarungTangan },
    { name: 'Oxygen Mask', price: 'Rp 20.000/Hari', img: headlamp },
];

const otherItems = [
    { name: 'Kompor', price: 'Rp 10.000/Hari', img: kompor },
    { name: 'Cooking Set', price: 'Rp 10.000/Hari', img: cookingSet },
    { name: 'Lampu Bakpo', price: 'Rp 10.000/Hari', img: lampu },
    { name: 'Tracking Pole', price: 'Rp 10.000/Hari', img: pole },
    { name: 'Gas Portable', price: 'Rp 10.000/Hari', img: gas },
    { name: 'Kursi Lipat', price: 'Rp 15.000/Hari', img: kursi },
    { name: 'Meja Lipat', price: 'Rp 20.000/Hari', img: meja },
    { name: 'Tali Sepatu', price: 'Rp 3.000/Hari', img: sarungTangan },
    { name: 'Water Bottle', price: 'Rp 5.000/Hari', img: cookingSet },
    { name: 'Backpack Rain Cover', price: 'Rp 8.000/Hari', img: carrier },
    { name: 'Bantalan Leher', price: 'Rp 4.000/Hari', img: matras },
    { name: 'Emergency Whistle', price: 'Rp 2.000/Hari', img: headlamp },
    { name: 'Thermal Underwear', price: 'Rp 12.000/Hari', img: jaket },
    { name: 'Map & GPS', price: 'Rp 25.000/Hari', img: pole },
    { name: 'First Aid Kit', price: 'Rp 30.000/Hari', img: lampu },
    { name: 'Tent Stakes', price: 'Rp 5.000/Hari', img: kompor },
    { name: 'Rope 50M', price: 'Rp 18.000/Hari', img: pole },
    { name: 'Carabiner Set', price: 'Rp 22.000/Hari', img: gas },
    { name: 'Harness', price: 'Rp 35.000/Hari', img: carrier },
    { name: 'Karabiners Lock', price: 'Rp 8.000/Hari', img: meja },
];

const suggestions = [
    {
        name: 'Gunung Prau',
        height: '2.565 mdpl',
        desc: 'Sunrise ikonik & trek bersahabat. Rekomendasi terbaik untuk pemula.',
        img: gunungPrau,
    },
    {
        name: 'Gunung Sindoro',
        height: '3.136 mdpl',
        desc: 'Jalur berbatu, tanjakan stabil. Cocok bagi pendaki menengah atas.',
        img: sindoro,
    },
    {
        name: 'Gunung Rinjani',
        height: '3.726 mdpl',
        desc: 'Jalur berat, view luar biasa. Rekomendasi untuk yang berpengalaman.',
        img: rinjani,
    },
    {
        name: 'Gunung Merapi',
        height: '2.968 mdpl',
        desc: 'Trek menantang dengan pemandangan kawah yang spektakuler. Untuk pendaki berpengalaman.',
        img: gunungPrau,
    },
    {
        name: 'Gunung Semeru',
        height: '3.676 mdpl',
        desc: 'Gunung tertinggi di Jawa. Trek panjang dengan pasir bergerak di area puncak.',
        img: sindoro,
    },
    {
        name: 'Gunung Kerinci',
        height: '3.805 mdpl',
        desc: 'Gunung tertinggi di Sumatera. Pemandangan alam yang memukau sepanjang pendakian.',
        img: rinjani,
    },
];

export default function DashboardMobile() {
    const navigate = useNavigate();
    
    const handleItemClick = (item) => {
        navigate("/booking", { state: { item } });
    };

    return (
        <div
            className="min-h-screen text-gray-800 px-4 md:px-12 py-5 pt-24 pb-10 font-sans overflow-y-auto"
            style={{
                backgroundColor: '#DAEBCE',
            }}
        >
            {/* Welcome Text */}
            <div className="animate-fade-in mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 gradient-text mb-2">
                    🏔️ Selamat Datang, Sobat Petualang!
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                    Kami siap mendukung langkahmu menaklukkan alam dengan perlengkapan terbaik!
                </p>
            </div>

            {/* Search Box */}
            <input
                type="text"
                placeholder="🔍 Temukan teman petualanganmu di sini"
                className="input-field mb-8 text-lg shadow-soft"
            />

            {/* Popular Items */}
            <h2 className="mb-4 font-bold text-xl text-gray-800 flex items-center gap-2">
                ⭐ Banyak Dipakai
            </h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 rounded-xl">
                {popularItems.map((item, index) => (
                    <div
                        key={index}
                        className="card-item min-w-[140px] flex-shrink-0 text-center cursor-pointer group"
                        onClick={() => handleItemClick(item)}
                    >
                        <div className="relative overflow-hidden rounded-lg mb-3 group-hover:scale-110 transition-transform">
                            <img src={item.img} alt={item.name} className="h-24 w-full object-contain group-hover:brightness-110" />
                        </div>
                        <p className="text-sm font-bold text-gray-800 group-hover:text-[#3F4F44]">{item.name}</p>
                        <p className="text-xs font-semibold text-[#3F4F44] mt-1 group-hover:text-green-600">{item.price}</p>
                    </div>
                ))}
            </div>

            {/* Other Items */}
            <h2 className="mt-8 mb-4 font-bold text-xl text-gray-800 flex items-center gap-2">
                🎒 Alat Lainnya
            </h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 rounded-xl">
                {otherItems.map((item, index) => (
                    <div
                        key={index}
                        className="card-item min-w-[140px] flex-shrink-0 text-center cursor-pointer group"
                        onClick={() => handleItemClick(item)}
                    >
                        <div className="relative overflow-hidden rounded-lg mb-3 group-hover:scale-110 transition-transform">
                            <img src={item.img} alt={item.name} className="h-24 w-full object-contain group-hover:brightness-110" />
                        </div>
                        <p className="text-sm font-bold text-gray-800 group-hover:text-[#3F4F44]">{item.name}</p>
                        <p className="text-xs font-semibold text-[#3F4F44] mt-1 group-hover:text-green-600">{item.price}</p>
                    </div>
                ))}
            </div>

            {/* Hiking Suggestions */}
            <h2 className="mt-8 mb-4 font-bold text-xl text-gray-800 flex items-center gap-2">
                ⛰️ Saran Pendakian
            </h2>
            <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0 pb-10">
                {suggestions.map((mountain, index) => (
                    <div
                        key={index}
                        className="card-hover bg-gradient-to-br from-[#F1F8E8] to-white rounded-xl p-4 flex flex-row md:flex-col items-center md:items-start space-x-4 md:space-x-0 border-2 border-transparent hover:border-[#3F4F44]"
                    >
                        <img
                            src={mountain.img}
                            alt={mountain.name}
                            className="w-24 h-20 md:w-full md:h-48 object-cover rounded-lg shadow-soft group-hover:shadow-medium"
                        />
                        <div className="flex-1">
                            <h3 className="font-bold text-base text-[#3F4F44] mb-1">{mountain.name}</h3>
                            <p className="text-sm font-semibold text-green-600 mb-2">📍 {mountain.height}</p>
                            <p className="text-xs text-gray-700 leading-relaxed">{mountain.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
