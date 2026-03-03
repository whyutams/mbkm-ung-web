import { redirect } from 'next/navigation'
import { getSession } from '@/utils/auth-helpers'
import { BookOpen, Users, Eye, GalleryHorizontal, FileText, BarChart2, TrendingUp } from 'lucide-react'
{/* Libs */ }
import { createClient } from '@/utils/supabase/server'
{/* Libs End */ }
{/* Components */ }
import AnimatedCounter from '@/app/components/AnimatedCounter'
{/* Components End */ }

export default async function DashboardPage() {
    {/* AUTH CHECK */ }
    const session = await getSession()

    if (!session) {
        redirect('/login')
    }
    {/* AUTH CHECK END */ }

    const { user, profile } = session

    {/* SUPABASE */ }
    const supabase = await createClient()

    {/* Stats */ }
    const { count: totalPosts } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true)

    const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

    const { count: totalViews } = await supabase
        .from('viewers')
        .select('*', { count: 'exact', head: true })
        .is('post_id', null)

    const { count: myPosts } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('created_by', user.id)
    {/* Stats End */ }
    {/* SUPABASE END */ }

    const stats = [
        {
            icon: FileText,
            label: 'Blog Saya',
            value: myPosts || 0,
            color: 'blue',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-600',
            roles: ['user', 'superadmin']
        },
        {
            icon: BookOpen,
            label: 'Total Blog',
            value: totalPosts || 0,
            color: 'orange',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-600',
            roles: ['user', 'superadmin']
        },
        {
            icon: Eye,
            label: 'Total Pengunjung Anda',
            value: totalViews || 0, 
            color: 'green',
            bgColor: 'bg-green-100',
            textColor: 'text-green-600',
            roles: ['user', 'superadmin']
        },
        {
            icon: GalleryHorizontal,
            label: 'Total Galeri',
            value: 0,
            color: 'purple',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-600',
            roles: ['user', 'superadmin']
        },
        {
            icon: TrendingUp,
            label: 'Total Pengunjung Global',
            value: totalViews || 0,
            color: 'rose',
            bgColor: 'bg-rose-100',
            textColor: 'text-rose-600',
            roles: ['superadmin']
        },
        {
            icon: Users,
            label: 'Total User',
            value: totalUsers || 0,
            color: 'teal',
            bgColor: 'bg-teal-100',
            textColor: 'text-teal-600',
            roles: ['superadmin']
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div
                    data-aos="fade-up"
                    data-aos-duration="800"
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Selamat Datang, {user.full_name}! 👋
                    </h1>
                    <p className="text-gray-600">
                        Pantau aktivitas dan lihat ringkasan statistik Anda di sini.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.filter(_ => _.roles.find(_ => _ == (session?.profile.role || "user"))).map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <div
                                key={stat.label}
                                data-aos="fade-up"
                                data-aos-duration="700"
                                data-aos-delay={index * 100}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                                        <Icon className={`h-6 w-6 ${stat.textColor}`} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                    <AnimatedCounter value={stat.value} delay={0.5 + (index * 0.1)} />
                                </h3>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}