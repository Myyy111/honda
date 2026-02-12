"use client";

import { ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface UnitNavigationProps {
    carName: string;
    whatsappNumber: string;
}

export function UnitNavigation({ carName, whatsappNumber }: UnitNavigationProps) {
    const handleContactSpecialist = () => {
        const message = `Halo, saya butuh bantuan spesialis untuk unit *${carName}*.`;
        window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, "_blank");
    };

    return (
        <div className="sticky top-[80px] z-[40] bg-white border-b border-slate-100 hidden md:block shadow-sm">
            <div className="w-full px-12">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-4">
                        <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">{carName}</span>
                        <div className="h-4 w-px bg-slate-200" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Detail Unit</span>
                    </div>

                    <div className="flex items-center gap-10 h-full">
                        {["OVERVIEW", "SPESIFIKASI", "INTERIOR", "EKSTERIOR", "HARGA"].map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    const id = item.toLowerCase();
                                    const el = document.getElementById(id);
                                    if (el) {
                                        const offset = 160;
                                        const bodyRect = document.body.getBoundingClientRect().top;
                                        const elementRect = el.getBoundingClientRect().top;
                                        const elementPosition = elementRect - bodyRect;
                                        const offsetPosition = elementPosition - offset;

                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                                className="text-[10px] font-black tracking-[0.3em] text-cyan-900/40 hover:text-red-600 transition-all border-b-2 border-transparent hover:border-red-600 h-full px-2"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center">
                        <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">Authorized Dealer</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
