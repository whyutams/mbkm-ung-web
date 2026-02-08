'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Github, ExternalLink, Users } from 'lucide-react'
import Image from 'next/image'

const featuredProjects = [
  {
    id: 1,
    title: 'E-Learning Platform',
    slug: 'e-learning-platform',
    description: 'Platform pembelajaran online interaktif dengan fitur video conference dan quiz real-time.',
    thumbnail: '/assets/projects/project-1.jpg',
    category: 'Web Development',
    members: ['John Doe', 'Jane Smith', 'Bob Johnson'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/example/project',
  },
  {
    id: 2,
    title: 'Smart Campus App',
    slug: 'smart-campus-app',
    description: 'Aplikasi mobile untuk manajemen kampus pintar dengan IoT integration.',
    thumbnail: '/assets/projects/project-2.jpg',
    category: 'Mobile Development',
    members: ['Alice Brown', 'Charlie Davis'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/example/project',
  },
  {
    id: 3,
    title: 'AI Chatbot Assistant',
    slug: 'ai-chatbot-assistant',
    description: 'Chatbot cerdas menggunakan Natural Language Processing untuk customer service.',
    thumbnail: '/assets/projects/project-3.jpg',
    category: 'Artificial Intelligence',
    members: ['David Wilson', 'Emma Taylor'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/example/project',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function ProjectsPreview() {
  return (
    <section id="projects" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4"
        >
          <div>
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              Portofolio Proyek
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Proyek Unggulan Kami
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl">
              Lihat hasil karya terbaik dari mahasiswa MBKM yang telah menyelesaikan
              berbagai proyek inovatif.
            </p>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/50 flex-shrink-0"
          >
            Lihat Semua
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden">
                {/* Placeholder - ganti dengan Image component jika ada thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-6xl opacity-50">
                    {project.category === 'Web Development' && '🌐'}
                    {project.category === 'Mobile Development' && '📱'}
                    {project.category === 'Artificial Intelligence' && '🤖'}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-semibold rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Members */}
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {project.members.length} anggota tim
                  </span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex-1 text-center px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Detail
                  </Link>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-gray-300 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-gray-300 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link - Mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center sm:hidden"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all shadow-lg"
          >
            Lihat Semua Proyek
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}