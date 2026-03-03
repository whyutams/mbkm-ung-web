'use client'

import { Trash } from "lucide-react";

export function UserProfileContentPostDeleteButton({ post_slug }: { post_slug: string }) {
    return (
        <button
            type="button"
            onClick={() => { alert("Hapus action"); }}
            className="flex gap-2 items-center justify-center w-full px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-center"
        >
            <Trash className="w-4 h-4" /> Hapus
        </button>
    )
}