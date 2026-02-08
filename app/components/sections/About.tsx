'use client'

import { motion } from 'framer-motion'
import { Code, Users, BookOpen, Rocket, Shield, Zap } from 'lucide-react'

const features = [
    {
        icon: Code,
        title: 'Portfolio Proyek',
        description: 'Showcase proyek-proyek terbaik dari mahasiswa MBKM dengan dokumentasi lengkap dan live demo.',
    },
    {
        icon: BookOpen,
        title: 'Platform Blog',
        description: 'Berbagi pengetahuan, pengalaman, dan insight melalui artikel-artikel berkualitas.',
    },
    {
        icon: Users,
        title: 'Direktori Anggota',
        description: 'Terhubung dengan sesama mahasiswa MBKM dan bangun networking yang solid.',
    },
    {
        icon: Rocket,
        title: 'Inovasi Digital',
        description: 'Dorong kreativitas dan inovasi dalam pengembangan teknologi informasi.',
    },
    {
        icon: Shield,
        title: 'Sistem Aman',
        description: 'Platform dengan keamanan terjamin menggunakan Supabase authentication.',
    },
    {
        icon: Zap,
        title: 'Performa Cepat',
        description: 'Dibangun dengan Next.js 14 untuk pengalaman pengguna yang optimal.',
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
}

export default function About() {
    return (
        <section id="about" className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                        Tentang Platform
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Fitur yang Kami Tawarkan
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Platform lengkap untuk mahasiswa MBKM dalam mengembangkan portofolio,
                        berbagi pengetahuan, dan membangun jaringan profesional.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                variants={itemVariants}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-orange-200"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 sm:p-12 shadow-2xl">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Siap Bergabung dengan Kami?
                        </h3>
                        <p className="text-orange-100 mb-6 max-w-2xl">
                            Daftarkan diri Anda dan mulai membangun portofolio digital yang profesional bersama MBKM UNG.
                        </p>
                        <button className="px-8 py-4 bg-white text-orange-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                            Hubungi Admin
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}