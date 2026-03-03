import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
{/* Components */ }
import { UserProfile } from "@/app/components/UserProfile"
{/* Components End */ }

interface UserProps {
    params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: UserProps): Promise<Metadata> {
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

export default async function UserDetailPage({ params }: UserProps) {
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

    return (
        <UserProfile username={username} />
    )
}   