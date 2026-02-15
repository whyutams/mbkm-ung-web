'use client'

import { motion } from 'framer-motion'
{/* Interfaces */ }
import { Profile } from "@/interfaces"
{/* Interfaces End */ }

export default function AboutUs({ profiles }: { profiles: Profile[] | [] }) {
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

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 px-1">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group overflow-hidden transition-all flex flex-col items-center lg:hover:bg-slate-300/[25%] rounded-lg pt-4"
          >
            <div className="relative w-20 h-20 lg:w-36 lg:h-36 aspect-square flex-shrink-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center rounded-full overflow-hidden mb-4">
              <div className="text-white text-3xl lg:text-6xl font-bold">
                {process.env.NEXT_PUBLIC_DOSEN_PEMBIMBING_LAPANGAN?.charAt(0)}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center">
              <h3 className="md:text-lg text-sm font-bold text-gray-900 mb-1">
                {process.env.NEXT_PUBLIC_DOSEN_PEMBIMBING_LAPANGAN}
              </h3>
              <p className="md:text-sm text-xs text-gray-500 mb-1">Dosen Pembimbing Lapangan</p>
            </div>
          </motion.div>

          {profiles && profiles.length > 0 && profiles.map((user, index) => (
            <motion.a
              href={`/user/${user.username}`}
              key={user.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index === 0 ? 0.1 : index * 0.1 }}
              className="group overflow-hidden transition-all flex flex-col items-center lg:hover:bg-slate-300/[25%] rounded-lg pt-4 cursor-pointer"
            >
              <div className="relative w-20 h-20 lg:w-36 lg:h-36 aspect-square flex-shrink-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center rounded-full overflow-hidden mb-4">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-white text-3xl md:text-5xl font-bold">
                    {user.full_name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center items-center mb-4 text-center">
                <h3 className="md:text-lg text-sm font-bold text-gray-900 mb-1">
                  {user.full_name}
                </h3>
                <p className="md:text-sm text-xs text-gray-500 mb-1">{user.study_program}</p>
                <p className="md:text-xs text-[0.6rem] text-gray-400">NIM: {user.nim}</p>

              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}