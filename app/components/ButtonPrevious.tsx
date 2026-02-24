'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from "lucide-react"
import NProgress from 'nprogress'

export default function ButtonPrevious({ className }: { className: string }) {
    const router = useRouter()

    const handleBack = () => {
        NProgress.start()

        if (window.history.length > 1) {
            router.back()
        } else {
            router.push('/')
        }
    }

    return (
        <button
            onClick={handleBack}
            type="button"
            className={`inline-flex items-center gap-2 transition-colors text-sm ${className}`}
        >
            <ArrowLeft className="w-4 h-4" />
            Kembali
        </button>
    )
}