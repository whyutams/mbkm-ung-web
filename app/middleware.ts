import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    {/* Check supabase session */ }
    const response = await updateSession(request)

    const pathname = request.nextUrl.pathname

    const protectedRoutes = ['/dashboard', '/admin']
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

    if (isProtectedRoute) {
        {/* Check user */ }
        const supabaseResponse = response.cookies.get('sb-access-token')

        if (!supabaseResponse) {
            const redirectUrl = new URL('/login', request.url)
            redirectUrl.searchParams.set('redirect', pathname)
            return Response.redirect(redirectUrl)
        }
    }

    if (pathname === '/login') {
        {/* Check user */ }
        const supabaseResponse = response.cookies.get('sb-access-token')

        if (supabaseResponse) {
            return Response.redirect(new URL('/dashboard', request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}