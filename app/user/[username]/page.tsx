import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, BookOpen, Linkedin, Github, Instagram, ArrowLeft, Mail, GraduationCap, MapPin } from "lucide-react"
import type { Metadata } from "next"
{/* Components */ }
import BlurImage from "@/app/components/BlurImage"
import ButtonPrevious from "@/app/components/ButtonPrevious"
{/* Components End */ }

interface UserPageProps {
    params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
    const { username } = await params
    const supabase = await createClient()

    const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, bio")
        .eq("username", username)
        .single()

    if (!profile) return {};

    return {
        title: `${profile.full_name} - MBKM UNG`,
        description: profile.bio || `Profile ${profile.full_name}`,
    }
}

export default async function UserDetailPage({ params }: UserPageProps) {
    const { username } = await params
    const supabase = await createClient()

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single()

    if (profileError || !profile) {
        notFound()
    }

    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .eq("created_by", profile.id)
        .eq("is_published", true)
        .order("created_at", { ascending: false })

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white py-20 pt-32">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ButtonPrevious className="text-white/80 hover:text-white mb-8" />

                    <div
                        data-aos="fade-up"
                        data-aos-duration="800"
                        className="flex flex-col md:flex-row gap-8 items-start md:items-center"
                    >
                        <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                            {profile.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt={profile.full_name}
                                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center border-4 border-white shadow-xl">
                                    <span className="text-6xl font-bold">{profile.full_name.charAt(0)}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-bold mb-3">{profile.full_name}</h1>
                            <p className="text-xl text-white/90 mb-4">@{profile.username}</p>

                            <div className="flex flex-wrap gap-4 text-sm">
                                {profile.study_program && (
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                                        <GraduationCap className="w-4 h-4" />
                                        {profile.study_program}
                                    </div>
                                )}
                                {profile.year && (
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                                        <Calendar className="w-4 h-4" />
                                        Angkatan {profile.year}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div
                            data-aos="fade-right"
                            data-aos-duration="800"
                            className="bg-white rounded-2xl shadow-md p-6 sticky top-24"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi</h2>

                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="text-gray-500 mb-1">NIM</p>
                                    <p className="font-semibold text-gray-900">{profile.nim}</p>
                                </div>

                                {profile.major && (
                                    <div>
                                        <p className="text-gray-500 mb-1">Jurusan</p>
                                        <p className="font-semibold text-gray-900">{profile.major}</p>
                                    </div>
                                )}

                                {profile.study_program && (
                                    <div>
                                        <p className="text-gray-500 mb-1">Program Studi</p>
                                        <p className="font-semibold text-gray-900">{profile.study_program}</p>
                                    </div>
                                )}

                                {profile.year && (
                                    <div>
                                        <p className="text-gray-500 mb-1">Tahun Angkatan</p>
                                        <p className="font-semibold text-gray-900">{profile.year}</p>
                                    </div>
                                )}
                            </div>

                            {(profile.linkedin_url || profile.github_url || profile.instagram_url) && (
                                <>
                                    <hr className="my-6 border-gray-200" />
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Social Media</h3>
                                    <div className="flex gap-3">
                                        {profile.linkedin_url && (
                                            <a
                                                href={profile.linkedin_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                                title="LinkedIn"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                        {profile.github_url && (
                                            <a
                                                href={profile.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                                                title="GitHub"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {profile.instagram_url && (
                                            <a
                                                href={profile.instagram_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                                                title="Instagram"
                                            >
                                                <Instagram className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        {profile.bio && (
                            <div
                                data-aos="fade-up"
                                data-aos-duration="800"
                                className="bg-white rounded-2xl shadow-md p-6 mb-8"
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang</h2>
                                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                            </div>
                        )}

                        <div
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay="100"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Artikel ({posts?.length || 0})
                                </h2>
                            </div>

                            {posts && posts.length > 0 ? (
                                <div className="space-y-6">
                                    {posts.map((post: any, index: number) => (
                                        <article
                                            key={post.id}
                                            data-aos="fade-up"
                                            data-aos-duration="700"
                                            data-aos-delay={index * 100}
                                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                        >
                                            <div className="md:flex">
                                                <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
                                                    {post.thumbnail_url ? (
                                                        <BlurImage
                                                            src={post.thumbnail_url}
                                                            alt={post.title}
                                                            className="w-full h-full"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                                                            <BookOpen className="w-12 h-12 text-gray-500" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-6 md:w-2/3">
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <time dateTime={post.created_at}>
                                                            {new Date(post.created_at).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric',
                                                            })}
                                                        </time>
                                                    </div>

                                                    <Link href={`/artikel/${post.slug}`}>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-orange-600 transition-colors line-clamp-2">
                                                            {post.title}
                                                        </h3>
                                                    </Link>

                                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                                        {post.description}
                                                    </p>

                                                    <Link
                                                        href={`/artikel/${post.slug}`}
                                                        className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                                                    >
                                                        Baca Selengkapnya
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">Belum ada artikel yang dipublikasikan</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}   