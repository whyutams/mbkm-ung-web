'use client'

import Link from "next/link"
{/* Interfaces */ }
import { Profile } from "@/interfaces"
{/* Interfaces End */ }

export default function AboutUs({ profiles, generalSetting }: { profiles: Profile[] | [], generalSetting: any }) {
  return (
    <section id="tentang-kami" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-aos="fade-up"
          data-aos-duration="800"
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
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 px-1">
          <div
            data-aos="fade-in"
            data-aos-duration="700"
            className="group overflow-hidden transition-all flex flex-col items-center lg:hover:bg-slate-300/[25%] rounded-lg pt-4"
          >
            <div className="relative w-20 h-20 lg:w-36 lg:h-36 aspect-square flex-shrink-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center rounded-full overflow-hidden mb-4">
              {generalSetting?.mbkm_dpl_avatar ? (
                <img
                  src={generalSetting.mbkm_dpl_avatar}
                  alt={generalSetting?.mbkm_dpl || process.env.NEXT_PUBLIC_DOSEN_PEMBIMBING_LAPANGAN}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-white text-3xl lg:text-6xl font-bold">
                  {(generalSetting?.mbkm_dpl || process.env.NEXT_PUBLIC_DOSEN_PEMBIMBING_LAPANGAN)?.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center items-center text-center">
              <h3 className="md:text-lg text-sm font-bold text-gray-900 mb-1">
                {generalSetting?.mbkm_dpl || process.env.NEXT_PUBLIC_DOSEN_PEMBIMBING_LAPANGAN}
              </h3>
              <p className="md:text-sm text-xs text-gray-500 mb-1">Dosen Pembimbing Lapangan</p>
            </div>
          </div>

          {profiles && profiles.length > 0 && profiles.map((user, index) => (
            <Link
              href={`/user/${user.username}`}
              key={user.id}
              data-aos="fade-in"
              data-aos-duration="700"
              data-aos-delay={index === 0 ? 100 : index * 100}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}