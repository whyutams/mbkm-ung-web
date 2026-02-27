import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, ArrowLeft, Facebook, Twitter, Linkedin as LinkedinIcon } from "lucide-react"
import type { Metadata } from "next"
{/* Components */ }
import BlurImage from "@/app/components/BlurImage"
import TipTapRenderer from "@/app/components/TipTapRenderer"
import ArticleViewer from "@/app/components/ArticleViewer"
import ButtonPrevious from "@/app/components/ButtonPrevious"
{/* Components End */ }
{/* Interfaces */ }
import { Post } from "@/interfaces"
interface ArticlePageProps {
    params: Promise<{ slug: string }>
}
{/* Interfaces End */ }

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params
    const supabase = await createClient()

    const { data } = await supabase
        .from("posts")
        .select(`
      title,
      description,
      thumbnail_url,
      created_by (
        full_name
      )
    `)
        .eq("slug", slug)
        .eq("is_published", true)
        .single()

    const post = data as unknown as Post

    if (!post) return {};

    const authorName = Array.isArray(post.created_by)
        ? post.created_by[0]?.full_name
        : post.created_by?.full_name

    return {
        title: `${post.title} - MBKM UNG`,
        description: post.description || `Article by ${authorName || 'Unknown'}`,
        openGraph: {
            title: post.title,
            description: post.description || undefined,
            images: post.thumbnail_url ? [post.thumbnail_url] : undefined,
        },
    }
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: post, error: postError } = await supabase
        .from("posts")
        .select(`
      *,
      created_by (
        full_name,
        username,
        avatar_url,
        nim,
        study_program
      )
    `)
        .eq("slug", slug)
        .eq("is_published", true)
        .single()

    if (postError || !post) {
        notFound()
    }

    const author = Array.isArray(post.created_by) ? post.created_by[0] : post.created_by

    const { data: relatedPosts } = await supabase
        .from("posts")
        .select(`
      id,
      title,
      slug,
      description,
      thumbnail_url,
      created_at,
      created_by (
        full_name,
        username
      )
    `)
        .eq("is_published", true)
        .neq("slug", slug)
        .order("created_at", { ascending: false })
        .limit(3)

    return (
        <main className="min-h-screen bg-gray-50">
            <article>
                <div className="bg-white border-b border-gray-100 py-8 pt-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ButtonPrevious className="text-gray-600 hover:text-orange-600 mb-6" />

                        <div className="max-w-4xl">
                            <h1
                                data-aos="fade-up"
                                data-aos-duration="800"
                                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
                            >
                                {post.title}
                            </h1>

                            <div
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-delay="100"
                                className="flex flex-wrap items-center gap-4 text-sm text-gray-600"
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <time dateTime={post.created_at}>
                                        {new Date(post.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </time>
                                </div>
                                <span className="text-gray-300">•</span>
                                <ArticleViewer postId={post.id} />
                            </div>
                        </div>
                    </div>
                </div>

                {post.thumbnail_url && (
                    <div
                        data-aos="fade-in"
                        data-aos-duration="800"
                        className="bg-white"
                    >
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <div className="relative h-64 md:h-96 lg:h-[28rem] rounded-xl overflow-hidden">
                                <BlurImage
                                    src={post.thumbnail_url}
                                    alt={post.title}
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        <div className="lg:col-span-8">
                            {post.description && (
                                <div
                                    data-aos="fade-up"
                                    data-aos-duration="800"
                                    className="mb-8"
                                >
                                    <p className="text-xl text-gray-600 leading-relaxed">
                                        {post.description}
                                    </p>
                                </div>
                            )}

                            <div
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-delay="100"
                                className="bg-white rounded-xl p-6 md:p-8 shadow-sm"
                            >
                                <TipTapRenderer content={post.content} />
                            </div>

                            <div
                                data-aos="fade-up"
                                data-aos-duration="800"
                                className="mt-8 pt-6 border-t border-gray-200"
                            >
                                <p className="text-gray-600 font-medium mb-4">Bagikan artikel ini:</p>
                                <div className="flex gap-3">
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                                        title="Share on Facebook"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-colors"
                                        title="Share on Twitter"
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors"
                                        title="Share on LinkedIn"
                                    >
                                        <LinkedinIcon className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <aside className="lg:col-span-4">
                            <div className="lg:sticky lg:top-24 space-y-6">
                                <div
                                    data-aos="fade-left"
                                    data-aos-duration="800"
                                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                                >
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Penulis</h3>
                                    <Link href={`/user/${author.username}`} className="block group">
                                        <div className="flex items-start gap-3">
                                            {author.avatar_url ? (
                                                <img
                                                    src={author.avatar_url}
                                                    alt={author.full_name}
                                                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                                    {author.full_name.charAt(0)}
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors truncate">
                                                    {author.full_name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">{author.study_program}</p>
                                                <p className="text-xs text-gray-400 mt-1">{author.nim}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {relatedPosts && relatedPosts.length > 0 && (
                                    <div
                                        data-aos="fade-left"
                                        data-aos-duration="800"
                                        data-aos-delay="100"
                                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                                    >
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Artikel Terkait</h3>
                                        <div className="space-y-4">
                                            {relatedPosts.slice(0, 3).map((relatedPost: any) => (
                                                <Link
                                                    key={relatedPost.id}
                                                    href={`/post/${relatedPost.slug}`}
                                                    className="block group"
                                                >
                                                    <div className="flex gap-3">
                                                        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                                            {relatedPost.thumbnail_url ? (
                                                                <BlurImage
                                                                    src={relatedPost.thumbnail_url}
                                                                    alt={relatedPost.title}
                                                                    className="w-full h-full"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                                                                    <span className="text-gray-500 text-xs">No img</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0 transition-colors">
                                                            <h4 className="font-semibold text-sm text-gray-900 group-hover:text-orange-600 line-clamp-2 leading-snug mb-1">
                                                                {relatedPost.title}
                                                            </h4>
                                                            <p className="text-xs text-gray-800 line-clamp-2 group-hover:text-orange-600">
                                                                {relatedPost.description}
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-2">
                                                                {new Date(relatedPost.created_at).toLocaleDateString('id-ID', {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </article>
        </main>
    )
}