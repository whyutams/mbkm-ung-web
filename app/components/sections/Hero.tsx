'use client'

import { useState, useEffect } from "react"
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Users, BookOpen } from 'lucide-react'
import Link from 'next/link'
{/* Components */ }
import AnimatedCounter from '../AnimatedCounter'
{/* Components End */ }
{/* Interfaces */ }
interface HeroProps {
    postsCount: number;
    profilesCount: number;
}
{/* Interfaces End */ }

export default function Hero({ postsCount, profilesCount }: HeroProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const stats = [
        {
            icon: Users,
            number: profilesCount,
            label: 'Mahasiswa Terdaftar',
        },
        {
            icon: BookOpen,
            number: postsCount,
            label: 'Artikel Blog',
        },
    ]

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 500 
            setIsScrolled(scrolled)
        }

        handleScroll()

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 brightness-75">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/90" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
                    style={{
                        backgroundImage: `url('/assets/img/rektorat.jpg')`,
                        backgroundColor: '#1a202c'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-block mb-4"
                    >
                        <span className="px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 md:text-sm text-xs font-medium md:font-semibold">
                            MBKM - Asistensi Mengajar di Satuan Pendidikan
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
                    >
                        Belajar, Berkarya, dan {' '}
                        <span className="text-orange-500">Berinovasi</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="md:text-lg text-base text-gray-300 mb-8 leading-relaxed"
                    >
                        {process.env.NEXT_PUBLIC_APP_DESCRIPTION}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="#blog"
                            className="group px-8 py-4 bg-orange-500 text-white md:text-base text-sm rounded-full font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/50 flex items-center justify-center gap-2"
                        >
                            Lihat Blog & Artikel
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="#about"
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white md:text-base text-sm rounded-full font-semibold hover:bg-white/20 transition-all flex items-center justify-center"
                        >
                            Tentang Kami
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-16 lg:mt-24"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl lg:p-8 p-5 shadow-2xl">
                        <div className="md:block hidden"></div>
                        {stats.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                    className="flex items-center mx-auto gap-4 sm:flex-row sm:text-left"
                                >
                                    <div className="flex-shrink-0 md:w-14 md:h-14 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                        <Icon className="md:h-7 md:w-7 h-6 w-6 text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="md:text-3xl text-2xl font-bold text-white">
                                            <AnimatedCounter value={stat.number} delay={1.5} />
                                        </p>
                                        <p className="text-gray-300 md:text-sm text-xs">{stat.label}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                        <div className="md:block hidden"></div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <div className={`flex flex-col items-center gap-2 text-white/60 transition-all ${isScrolled ? "opacity-0 scale-95 duration-300" : "opacity-100 scale-100 duration-1000"}`}>
                    <span className="md:text-sm text-xs text-center font-medium">Scroll untuk melihat lebih banyak</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex justify-center pt-1"
                    >
                        <ChevronDown className="h-7 w-7 text-white/80" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}