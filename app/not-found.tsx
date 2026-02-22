'use client'

import { ArrowLeft, SearchX } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4 pt-32 pb-20">
            <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="300"
                className="w-full text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full mb-8">
                    <SearchX className="w-12 h-12 text-primary" />
                </div>

                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    Halaman Tidak Ditemukan
                </h2>

                <p className="text-gray-600 mb-8">
                    Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali Ke Beranda
                </Link>
            </div>
        </main>
    )
}