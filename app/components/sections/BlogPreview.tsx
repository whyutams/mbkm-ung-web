'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
{/* Components */ }
import BlurImage from '../BlurImage'
{/* Components End */ }
{/* Interfaces */ }
import { Post } from "@/interfaces"
{/* Interfaces End */ }

export default function BlogPreview({ posts }: { posts: Post[] | [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [itemsPerPage, setItemsPerPage] = useState(1)
  const [mounted, setMounted] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const AUTOPLAY_INTERVAL = 5000

  useEffect(() => {
    setMounted(true)

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3)
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, posts.length - itemsPerPage)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex])

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
    setIsAutoPlaying(false)
  }

  if (!mounted) return null;

  return (
    <section id="blog" className="py-20 lg:py-32 bg-[#F8FAFC]">
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
              Informasi
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl">
              Artikel terbaru seputar kegiatan kami di lapangan
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
          <motion.div
            className="overflow-hidden rounded-2xl p-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={scrollContainerRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.6 } }}
            viewport={{ once: true }}
          >

            <motion.div
              className="flex"
              animate={{
                x: `-${currentIndex * (100 / itemsPerPage)}%`,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              {posts && posts.length > 0 && posts.map((post: any) => (
                <div
                  key={post.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <motion.article
                    className="group bg-white rounded-2xl overflow-hidden shadow transition-all border border-gray-100 h-full"
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <div className="relative h-48 bg-slate-200 overflow-hidden">
                      {post.thumbnail_url ? (
                        <BlurImage
                          src={post.thumbnail_url}
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
                          <time dateTime={post.created_at}>
                            {new Date(post.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </time>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 max-h-[3.5rem]">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-5 mb-4 line-clamp-3 text-justify min-h-[3.75rem]">
                        {post.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <User className="h-3.5 w-3.5" />
                          <span>
                            Oleh <span className="font-medium text-gray-700">{post.created_by.full_name}</span>
                          </span>
                        </div>
                        <Link
                          href={`/artikel/${post.slug}`}
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
          </motion.div>

          <div
            className="hidden lg:block"
          >
            <motion.button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:text-gray-400 z-10 border border-gray-200"
              aria-label="Previous"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.5, ease: "easeOut" } }}
              viewport={{ once: true }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:text-gray-400 z-10 border border-gray-200"
              aria-label="Next"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.5, ease: "easeOut" } }}
              viewport={{ once: true }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all ${index === currentIndex
                ? 'w-8 bg-orange-500'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to slide ${index + 1}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 0.6, delay: 0.75, ease: "easeOut" } }}
              viewport={{ once: true }}
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
            disabled={currentIndex >= maxIndex}
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
            Lihat Semua
          </Link>
        </motion.div>
      </div>
    </section>
  )
}