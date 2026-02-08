'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import BlurImage from '../BlurImage'

const recentPosts = [
  {
    id: 1,
    title: 'Meningkatkan Literasi Digital Guru Melalui Pelatihan Canva',
    slug: 'meningkatkan-literasi-digital-guru-canva',
    description: 'Dokumentasi kegiatan workshop pembuatan media pembelajaran interaktif berbasis visual bersama dewan guru di SDN 15 Kota Gorontalo.',
    thumbnail: 'https://media-cdn.tripadvisor.com/media/photo-s/07/4c/58/94/suasana-pelatihan-positive.jpg',
    author: {
      name: 'Rahmat Hidayat',
      avatar: '/assets/avatars/rahmat.jpg',
    },
    publishedAt: '2024-02-10',
    readTime: 5,
  },
  {
    id: 2,
    title: 'Tantangan dan Keseruan Adaptasi Teknologi di Sekolah Pelosok',
    slug: 'tantangan-adaptasi-teknologi-sekolah',
    description: 'Cerita pengalaman kami mengenalkan penggunaan laptop dan internet dasar (AKM Kelas) kepada siswa yang baru pertama kali memegang komputer.',
    thumbnail: 'https://img.antarafoto.com/cache/1200x794/2018/04/09/unbk-menggunakan-laptop-siswa-dan-guru-gmx4-dom.webp',
    author: {
      name: 'Siti Aminah',
      avatar: '/assets/avatars/siti.jpg',
    },
    publishedAt: '2024-02-08',
    readTime: 7,
  },
  {
    id: 3,
    title: 'Implementasi Sistem Informasi Perpustakaan Digital Sederhana',
    slug: 'implementasi-sistem-perpustakaan-digital',
    description: 'Upaya kelompok MBKM dalam membantu digitalisasi administrasi sekolah untuk mempermudah sirkulasi peminjaman buku siswa.',
    thumbnail: null,
    author: {
      name: 'Budi Santoso',
      avatar: '/assets/avatars/budi.jpg',
    },
    publishedAt: '2024-02-05',
    readTime: 6,
  },
  {
    id: 4,
    title: 'Mengasah Logika Siswa Lewat Pemrograman Visual Scratch',
    slug: 'mengasah-logika-siswa-scratch',
    description: 'Kegiatan ekstrakurikuler komputer: Mengajarkan konsep algoritma dasar dan computational thinking kepada siswa SD dengan cara yang menyenangkan.',
    thumbnail: null,
    author: {
      name: 'Dwi Putri',
      avatar: '/assets/avatars/dwi.jpg',
    },
    publishedAt: '2024-02-01',
    readTime: 6,
  },
  {
    id: 5,
    title: 'Revitalisasi Website Sekolah Sebagai Sarana Informasi Publik',
    slug: 'revitalisasi-website-sekolah',
    description: 'Project pembuatan profil sekolah berbasis web untuk memudahkan penyebaran informasi jadwal ujian dan penerimaan siswa baru (PPDB).',
    thumbnail: 'https://www.jagoanhosting.com/blog/wp-content/uploads/2023/05/contoh-website-SMA-Negeri-2-Kebumen-www.smandakebumen.sch_.id_-1.png',
    author: {
      name: 'Eko Prasetyo',
      avatar: '/assets/avatars/eko.jpg',
    },
    publishedAt: '2024-01-28',
    readTime: 4,
  },
]

export default function BlogPreview() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const AUTOPLAY_INTERVAL = 5000
  const getMaxIndex = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        return Math.max(0, recentPosts.length - 4)
      } else if (window.innerWidth >= 768) {
        return Math.max(0, recentPosts.length - 2)
      }
    }
    return Math.max(0, recentPosts.length - 1)
  }
  {/* Effects */ }
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = getMaxIndex()
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(interval)
  }, [isAutoPlaying])
  {/* Effects End */ }

  {/* Functions */ }
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)
  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = getMaxIndex()
      return prev >= maxIndex ? 0 : prev + 1
    })
  }
  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = getMaxIndex()
      return prev <= 0 ? maxIndex : prev - 1
    })
  }
  const handleDotClick = (index: number) => {
    const maxIndex = getMaxIndex()
    setCurrentIndex(Math.min(index, maxIndex))
    setIsAutoPlaying(false)
  }
  {/* Functions End */ }

  return (
    <section id="blog" className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4"
        >
          <div>
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              Blog & Artikel
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Artikel Terbaru
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl">
              Baca artikel-artikel menarik seputar teknologi, programming, dan pengalaman
              dari mahasiswa MBKM.
            </p>
          </div>
          <Link
            href="/blog"
            className="group md:flex hidden items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/50 flex-shrink-0"
          >
            Lihat Semua
          </Link>
        </motion.div>

        <div className="relative px-0 lg:px-16">
          <div
            className="overflow-hidden rounded-2xl p-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={scrollContainerRef}
          >
            <motion.div
              className="flex"
              animate={{
                x: `-${currentIndex * 100}%`,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <motion.article
                    className="group bg-white rounded-2xl overflow-hidden shadow transition-all border border-gray-100 h-full"
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <div className="relative h-48 bg-slate-200 overflow-hidden">
                      {post.thumbnail ? (
                        <BlurImage
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-300 to-slate-400">
                          <div className="text-slate-600 text-sm opacity-70">Tidak ada gambar</div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </time>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-5 mb-4 line-clamp-3 text-justify min-h-[3.75rem]">
                        {post.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <User className="h-3.5 w-3.5" />
                          <span>
                            Oleh <span className="font-medium text-gray-700">{post.author.name}</span>
                          </span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1 group/link"
                        >
                          Baca
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hidden lg:block">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-400 z-10 border border-gray-200"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= getMaxIndex()}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-400 z-10 border border-gray-200"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: getMaxIndex() + 1}).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all ${index === getMaxIndex()+1 ? 'hidden md:inline' : ''} ${index === currentIndex
                ? 'w-8 bg-orange-500'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex lg:hidden justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= getMaxIndex()}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center sm:hidden"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all shadow-lg"
          >
            Lihat Semua Artikel
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}