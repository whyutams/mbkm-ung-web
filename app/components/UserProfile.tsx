import { createClient } from "@/utils/supabase/server"
import { getSession } from '@/utils/auth-helpers'
import { UserProfileContent } from "./UserProfileContent"

export async function UserProfile({ username }: { username: string }) {
    const supabase = await createClient()
    const session = await getSession()

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single()

    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .eq("created_by", profile.id)
        .eq("is_published", true)
        .order("created_at", { ascending: false })

    return (
        <UserProfileContent profile={profile} posts={posts} session={session} />
    )
}