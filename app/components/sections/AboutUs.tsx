'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin, Github, Linkedin, Instagram } from 'lucide-react'

const featuredMembers = [
  {
    id: 1,
    username: 'wahyu_pratama',
    fullName: 'Wahyu Pratama',
    nim: '532421001',
    jurusan: 'Teknik Informatika',
    program_studi: 'Pendidikan Teknologi Informasi',
    year: 2021,
    bio: 'Ketua Kelompok Orion. Full-stack Developer yang fokus pada pengembangan sistem monitoring sekolah berbasis Next.js dan Supabase.',
    avatarUrl: null,
    linkedinUrl: 'https://linkedin.com/in/wahyupratama',
    githubUrl: 'https://github.com/whyutams',
    instagramUrl: 'https://instagram.com/wahyu_dev',
  },
  {
    id: 2,
    username: 'siti_aminah',
    fullName: 'Siti Aminah',
    nim: '532421023',
    jurusan: 'Teknik Informatika',
    program_studi: 'Pendidikan Teknologi Informasi',
    year: 2021,
    bio: 'UI/UX Enthusiast. Bertanggung jawab atas desain antarmuka aplikasi SiMon dan media pembelajaran interaktif siswa.',
    avatarUrl: null,
    linkedinUrl: 'https://linkedin.com/in/sitiaminah',
    githubUrl: 'https://github.com/sitiuiux',
    instagramUrl: null, // Contoh jika tidak punya IG
  },
  {
    id: 3,
    username: 'budi_santoso',
    fullName: 'Budi Santoso',
    nim: '532420045',
    jurusan: 'Teknik Informatika',
    program_studi: 'Pendidikan Teknologi Informasi',
    year: 2020,
    bio: 'IoT Engineer. Mengembangkan perangkat keras "Smart Garden" dan integrasi sensor kehadiran siswa menggunakan ESP32.',
    avatarUrl: 'https://i.pinimg.com/736x/05/84/5e/05845e778e60beae1586402d80410c68.jpg',
    linkedinUrl: null,
    githubUrl: 'https://github.com/budishield',
    instagramUrl: 'https://instagram.com/budi_iot',
  },
  {
    id: 4,
    username: 'putri_indah',
    fullName: 'Putri Indah',
    nim: '532422010',
    jurusan: 'Teknik Informatika',
    program_studi: 'Pendidikan Teknologi Informasi',
    year: 2022,
    bio: 'Content Creator & Educational Tech. Fokus pada digitalisasi materi ajar dan pelatihan literasi digital untuk guru.',
    avatarUrl: null,
    linkedinUrl: 'https://linkedin.com/in/putriindah',
    githubUrl: 'https://github.com/putricode',
    instagramUrl: 'https://instagram.com/putri_daily',
  },
  {
    id: 5,
    username: 'riko_fajar',
    fullName: 'Riko Fajar',
    nim: '532421055',
    jurusan: 'Teknik Informatika',
    program_studi: 'Pendidikan Teknologi Informasi',
    year: 2021,
    bio: 'Network Administrator. Bertanggung jawab atas pemeliharaan jaringan laboratorium komputer sekolah untuk persiapan ANBK.',
    avatarUrl: null,
    linkedinUrl: 'https://linkedin.com/in/rikofajar',
    githubUrl: null, // Contoh jika tidak punya Github
    instagramUrl: 'https://instagram.com/riko_net',
  },
  {
    id: 6,
    username: 'anisa_rahma',
    fullName: 'Anisa Rahma',
    nim: '532422033',
    jurusan: 'Teknik Informatika',
    program_studi: 'Pendidikan Teknologi Informasi',
    year: 2022,
    bio: 'Multimedia Specialist. Fokus pada pembuatan video pembelajaran kreatif dan desain aset visual untuk media sosial sekolah.',
    avatarUrl: null,
    linkedinUrl: null, // Contoh jika tidak punya LinkedIn
    githubUrl: 'https://github.com/anisadesign',
    instagramUrl: 'https://instagram.com/anisa_art',
  },
  {
    id: 7,
    username: 'dimas_anggara',
    fullName: 'Dimas Anggara',
    nim: '532420088',
    jurusan: 'Teknik Informatika',
    program_studi: 'Pendidikan Teknologi Informasi',
    year: 2020,
    bio: 'Data Analyst Enthusiast. Membantu operator sekolah dalam pengolahan data siswa dan visualisasi statistik akademik menggunakan Excel & Python.',
    avatarUrl: null,
    linkedinUrl: 'https://linkedin.com/in/dimasanggara',
    githubUrl: 'https://github.com/dimascode',
    instagramUrl: null,
  },
]

export default function AboutUs() {
  return (
    <section id="tentang-kami" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Tentang Kami
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl">
              Dosen Pembimbing Lapangan dan Daftar Mahasiswa
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 px-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group overflow-hidden transition-all flex flex-col items-center lg:hover:bg-slate-300/[25%] rounded-lg pt-4"
          >
            <div className="relative w-20 h-20 lg:h-36 md:w-36 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center rounded-full overflow-hidden mb-4">
              <div className="text-white text-3xl lg:text-6xl font-bold">
                A
              </div>
            </div>

            <div className="flex flex-col justify-center items-center mb-4 text-center">
              <h3 className="md:text-lg text-sm font-bold text-gray-900 mb-1">
                {process.env.NEXT_PUBLIC_DOSEN_PEMBIMBING_LAPANGAN}
              </h3>
              <p className="md:text-sm text-xs text-gray-500 mb-1">Dosen Pembimbing Lapangan</p>
            </div>
          </motion.div>

          {featuredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index === 0 ? 0.1 : index * 0.1 }}
              className="group overflow-hidden transition-all flex flex-col items-center lg:hover:bg-slate-300/[25%] rounded-lg pt-4"
            >
              <div className="relative w-20 h-20 lg:h-36 md:w-36 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center rounded-full overflow-hidden mb-4">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-white text-3xl lg:text-6xl font-bold">
                    {member.fullName.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center items-center mb-4 text-center">
                <h3 className="md:text-lg text-sm font-bold text-gray-900 mb-1">
                  {member.fullName}
                </h3>
                <p className="md:text-sm text-xs text-gray-500 mb-1">{member.program_studi}</p>
                <p className="md:text-xs text-[0.6rem] text-gray-400 mb-4">NIM: {member.nim}</p>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}