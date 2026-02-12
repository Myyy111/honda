
// Production Build Fix - Syncing with Vercel
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCarBySlug, getSettings } from "@/lib/store";
import {
    ChevronRight,
    ShieldCheck,
    Droplets,
    CreditCard,
    CheckCircle2,
    Image as ImageIcon,
    TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { CTASection } from "./cta-section";
import { UnitNavigation } from "./unit-navigation";

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { slug } = await params;
    const car = await getCarBySlug(slug);

    if (!car) {
        return {
            title: "Unit Tidak Ditemukan",
        }
    }

    return {
        title: `${car.name} - Unit Honda Terbaru | Honda Official`,
        description: `${car.description?.substring(0, 160)}`,
        openGraph: {
            images: [car.thumbnail],
        },
    }
}

export default async function CarDetail({ params }: Props) {
    const { slug } = await params;
    const car = await getCarBySlug(slug);

    if (!car) {
        notFound();
    }

    const settingsData = await getSettings();
    const settings = settingsData.reduce((acc: any, curr: any) => ({ ...acc, [curr.key]: curr.value }), {});
    const whatsappNumber = settings.whatsapp_number || "6281234567890";

    // Parse JSON strings
    const gallery = JSON.parse(car.gallery || "[]");
    const images = gallery.length > 0 ? gallery : [car.thumbnail];
    const specs = JSON.parse(car.specs || "{}");
    const colors = JSON.parse(car.colors || "[]");

    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(car.price);

    return (
        <div className="bg-white min-h-screen pb-32 overflow-x-hidden">
            {/* 1. CINEMATIC HERO */}
            <section id="overview" className="relative h-[60vh] md:h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950">
                {/* Background Car Image */}
                <div className="absolute inset-0 z-0 opacity-40">
                    {car.thumbnail ? (
                        <Image
                            src={car.thumbnail}
                            alt={`${car.name} Lifestyle`}
                            fill
                            className="object-cover scale-110 blur-sm"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10 pt-20">
                    <div className="max-w-4xl space-y-8 text-center md:text-left">
                        <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-white">
                            THE ALL NEW <br /> <span className="text-red-600">{car.name}</span>
                        </h1>
                        <p className="text-white/60 max-w-2xl text-base md:text-lg font-medium leading-relaxed mx-auto md:mx-0">
                            Nikmati kombinasi sempurna antara performa legendaris Honda dan teknologi masa depan yang menginspirasi setiap perjalanan Anda.
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-[10px] font-bold uppercase tracking-[0.3em] pt-4">
                            <div className="flex items-center gap-2">
                                <Link href="/" className="text-white/30 hover:text-white transition-colors">Home</Link>
                                <ChevronRight className="h-3 w-3 text-white/20" />
                                <Link href="/mobil" className="text-white/30 hover:text-white transition-colors">Mobil Baru</Link>
                                <ChevronRight className="h-3 w-3 text-white/20" />
                                <span className="text-red-500">{car.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. UNIT NAVIGATION */}
            <UnitNavigation carName={car.name} whatsappNumber={whatsappNumber} />

            {/* 3. PRODUCT SHOWCASE */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Left: Car Image Showcase */}
                        <div className="lg:col-span-12 xl:col-span-7 relative">
                            <div className="relative aspect-[16/9] md:aspect-[16/10] w-full group">
                                {car.thumbnail ? (
                                    <Image
                                        src={car.thumbnail}
                                        alt={car.name}
                                        fill
                                        className="object-contain transition-transform duration-700"
                                        priority
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <ImageIcon className="h-20 w-20 text-slate-100" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Info Area */}
                        <div className="lg:col-span-12 xl:col-span-5 space-y-10">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-slate-900 mb-6">
                                    {car.name}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <Badge className="bg-red-600 hover:bg-red-600 text-white text-[10px] font-black tracking-widest uppercase py-1.5 px-6 rounded-full border-none">
                                        {car.status}
                                    </Badge>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-4 py-1.5 rounded-full">
                                        Authorized Dealer
                                    </span>
                                </div>
                            </div>

                            {/* Color Selector */}
                            {colors.length > 0 && (
                                <div className="space-y-6 pt-8 border-t border-slate-50">
                                    <div className="flex justify-between items-center">
                                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">PILIH WARNA</p>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {colors.map((color: any, i: number) => (
                                            <div key={i} className="group relative">
                                                <div
                                                    className="h-12 w-12 rounded-xl border-2 border-white shadow-sm cursor-pointer transition-all group-hover:scale-110 group-hover:shadow-md group-hover:border-red-600/20"
                                                    style={{ backgroundColor: color.hex }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price Area */}
                            <div className="space-y-3 pt-8 border-t border-slate-50">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">HARGA MULAI OTR JAKARTA</p>
                                <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">{formattedPrice}</h2>
                                <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">*Estimasi Harga Dapat Berubah Sewaktu-waktu</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4">
                                <CTASection
                                    carId={car.id}
                                    carName={car.name}
                                    carPrice={car.price}
                                    whatsappNumber={whatsappNumber}
                                    catalogUrl={(car as any).catalogUrl || settings.global_catalog_url}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SPECIFICATIONS */}
            <section id="spesifikasi" className="py-24 bg-slate-50/50 border-y border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 border-l-4 border-red-600 pl-6">
                            SPESIFIKASI <span className="text-red-600">UTAMA</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: "Kapasitas Mesin", value: specs["Engine Capacity"] || "-" },
                            { label: "Tenaga Maksimum", value: specs["Max Power"] || "-" },
                            { label: "Torsi Maksimum", value: specs["Max Torque"] || "-" },
                            { label: "Transmisi", value: specs["Transmission"] || "-" },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm group">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 group-hover:text-red-600 flex items-center gap-2">
                                    {item.label}
                                </p>
                                <p className="text-xl font-black text-slate-900 uppercase tracking-tight">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. DESCRIPTION */}
            <section id="interior" className="py-24 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="space-y-8">
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-[0.9]">
                            {car.name} <br /> <span className="text-red-600">Legendary Performance.</span>
                        </h3>
                        <p className="text-slate-500 text-lg leading-relaxed font-medium">
                            {car.description}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
