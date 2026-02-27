'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Search } from 'lucide-react'
import NProgress from "nprogress"

export default function PostSearchBox({ search }: { search: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchValue, setSearchValue] = useState(searchParams.get('search') || '')
    const [isPending, startTransition] = useTransition()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchValue.trim().length !== 0) {
            NProgress.start()

            startTransition(() => {
                const params = new URLSearchParams()
                if (searchValue.trim()) {
                    params.set('search', searchValue.trim())
                }
                params.set('page', '1')

                const queryString = params.toString()
                router.push(`/post${queryString ? `?${queryString}` : ''}`)
            })
        }
    }

    useEffect(() => {
        NProgress.done()
        if (search != searchValue.toString()) setSearchValue("")
    }, [search])

    return (
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Cari blog/artikel..."
                className="w-full px-6 py-4 rounded-full text-gray-900 pr-14 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                disabled={isPending}
            />
            <button
                type="submit"
                disabled={isPending}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            >
                {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Search className="w-5 h-5" />
                )}
            </button>
        </form>
    )
}