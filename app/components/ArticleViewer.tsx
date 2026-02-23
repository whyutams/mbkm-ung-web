'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
{/* Components */}
import AnimatedCounter from './AnimatedCounter'
{/* Components End */}

interface ArticleViewerProps {
    postId: number
}

export default function ArticleViewer({ postId }: ArticleViewerProps) {
    const [viewerCount, setViewerCount] = useState<number>(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const ipResponse = await fetch('https://api.ipify.org?format=json')
                const { ip } = await ipResponse.json()

                const response = await fetch('/api/tracking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ip, post_id: postId, get_all: true })
                })

                const result = await response.json()

                if (result.success && result.count !== undefined) {
                    setViewerCount(result.count)
                }
            } catch (error) {
                console.error('Error tracking article view:', error)
            } finally {
                setLoading(false)
            }
        })();
    }, [postId])

    if (loading) {
        return (
            <div className="flex items-center gap-2 text-gray-400">
                <Eye className="w-4 h-4 animate-pulse" />
                <span>...</span>
            </div>
        ) 
    }

    return (
        <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>Dibaca oleh <AnimatedCounter value={viewerCount} /> orang</span>
        </div>
    )
}