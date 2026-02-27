import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { Calendar, Search, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import type { Metadata } from "next"
{/* Components */ }
import BlurImage from "@/app/components/BlurImage"
import PostSearchBox from "@/app/components/PostSearchBox"
{/* Components End */ }

export const metadata: Metadata = {
    title: "Blog & Artikel - MBKM UNG",
    description: "Kumpulan artikel dan cerita dari mahasiswa MBKM Universitas Negeri Gorontalo",
}

export default async function Posts({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams
    const page = Number(params.page) || 1
    const search = (params.search as string) || ""
    const perPage = 12

    {/* SUPABASE */ }
    const supabase = await createClient();

    {/* General */ }
    const { data: general, error: generalError } = await supabase
        .from("general")
        .select("*")
        .limit(1)
        .maybeSingle();
    let generalSetting: any = {};
    if (!generalError && general?.data) {
        const _f = [{ name: "_mbkm_location_name", value: (JSON.parse(general.data)).mbkm_location_name }];
        generalSetting = JSON.parse(_f.map(_ => general?.data?.replaceAll(`{${_.name}}`, _.value))[0]);
    }
    if (generalError) console.log("Error fetch general:", generalError.message);
    {/* General End */ }

    {/* Posts */ }
    let query = supabase
        .from("posts")
        .select(`
            *,
            created_by (
                full_name,
                username,
                avatar_url,
                nim
            )
        `, { count: 'exact' })
        .eq('is_published', true)
        .order("created_at", { ascending: false })

    if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const from = (page - 1) * perPage
    const to = from + perPage - 1

    const { data: posts, error: postsError, count } = await query.range(from, to)

    if (postsError) console.log("Error fetch posts:", postsError.message)
    {/* Posts End */ }
    {/* SUPABASE END */ }

    const totalPages = Math.ceil((count || 0) / perPage)
    const mbkm_location_name = generalSetting?.mbkm_location_name || process.env.NEXT_PUBLIC_APP_NAME

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white py-16 pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        data-aos="fade-up"
                        data-aos-duration="800"
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Blog & Artikel
                        </h1>
                        <p className="text-xl text-white/90 mb-8">
                            Cerita dan pengalaman dari mahasiswa MBKM {mbkm_location_name ? `di ${mbkm_location_name}` : ""}
                        </p>

                        <PostSearchBox search={search} />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <p className="text-gray-600">
                        {search ? (
                            <>Menampilkan hasil untuk <span className="font-semibold">"{search}"</span> - {count || 0} artikel</>
                        ) : (
                            <>{count || 0} artikel tersedia</>
                        )}
                    </p>

                    {search && (
                        <Link
                            href="/post"
                            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                        >
                            Reset Filter
                        </Link>
                    )}
                </div>

                {posts && posts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post: any, index: number) => (
                                <article
                                    key={post.id}
                                    data-aos="fade-up"
                                    data-aos-duration="700"
                                    data-aos-delay={index % 12 * 50}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                                >
                                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                                        {post.thumbnail_url ? (
                                            <BlurImage
                                                src={post.thumbnail_url}
                                                alt={post.title}
                                                className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                                                <div className="text-gray-600 text-sm opacity-70">Tidak ada gambar</div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
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

                                        <Link href={`/post/${post.slug}`}>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                                                {post.title}
                                            </h3>
                                        </Link>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                                            {post.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2">
                                                {post.created_by.avatar_url ? (
                                                    <img
                                                        src={post.created_by.avatar_url}
                                                        alt={post.created_by.full_name}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs">
                                                        {post.created_by.full_name.charAt(0)}
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-gray-700 truncate max-w-[120px]">
                                                        {post.created_by.full_name}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/post/${post.slug}`}
                                                className="text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1 group/link"
                                            >
                                                Baca
                                                <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center">
                                <div className="flex items-center gap-2">
                                    {page > 1 && (
                                        <Link
                                            href={`/post?page=${page - 1}${search ? `&search=${search}` : ''}`}
                                            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                            aria-label="Previous page"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </Link>
                                    )}

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                                        if (
                                            pageNum === 1 ||
                                            pageNum === totalPages ||
                                            (pageNum >= page - 1 && pageNum <= page + 1)
                                        ) {
                                            return (
                                                <Link
                                                    key={pageNum}
                                                    href={`/post?page=${pageNum}${search ? `&search=${search}` : ''}`}
                                                    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors font-medium text-sm ${pageNum === page
                                                        ? 'bg-orange-500 text-white border border-orange-500'
                                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </Link>
                                            )
                                        } else if (pageNum === page - 2 || pageNum === page + 2) {
                                            return (
                                                <span key={pageNum} className="flex items-center justify-center w-8 h-10 text-gray-400">
                                                    ...
                                                </span>
                                            )
                                        }
                                        return null
                                    })}

                                    {page < totalPages && (
                                        <Link
                                            href={`/post?page=${page + 1}${search ? `&search=${search}` : ''}`}
                                            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                            aria-label="Next page"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div
                        data-aos="fade-up"
                        data-aos-duration="800"
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-12 h-12 text-orange-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Tidak ada blog/artikel ditemukan
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {search ? `Coba kata kunci lain atau reset filter` : 'Belum ada artikel yang dipublikasikan'}
                        </p>
                        {search && (
                            <Link
                                href="/post"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
                            >
                                Reset Filter
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </main>
    )
}