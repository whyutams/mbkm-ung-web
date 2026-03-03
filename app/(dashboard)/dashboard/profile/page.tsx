import { redirect } from 'next/navigation'
import { getSession } from '@/utils/auth-helpers'
{/* Components */ }
import { UserProfile } from "@/app/components/UserProfile"
{/* Components End */ }

export default async function UserDetailPage() {
    const session = await getSession()

    if (!session) {
        redirect('/login')
    } 

    return (
        <UserProfile username={session.user.username} />
    )
}   