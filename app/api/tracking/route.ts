import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
// import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()
        const body = await request.json()
        const { ip } = body

        // const headersList = await headers()
        // const ip =
        //     headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
        //     headersList.get('x-real-ip') ||
        //     headersList.get('cf-connecting-ip') ||
        //     'unknown'

        if (!ip || ip === 'unknown') {
            return NextResponse.json(
                { success: false, error: 'Unable to determine IP or IP is missing' },
                { status: 400 }
            )
        }

        const { data: existing } = await supabase
            .from('viewers')
            .select('ip, created_at')
            .eq('ip', ip)
            .is('post_id', null)
            .maybeSingle()

        if (existing) {
            return NextResponse.json({
                success: true,
                data: {
                    ip: existing.ip,
                    created_at: existing.created_at,
                    already_exists: true
                }
            })
        }

        const { data: inserted, error } = await supabase
            .from('viewers')
            .insert({ ip })
            .select('ip, created_at')
            .single()

        if (error) {
            console.error('Error inserting viewer:', error.message)
            return NextResponse.json(
                { success: false, error: 'Failed to track visitor' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            data: {
                ip: inserted.ip,
                created_at: inserted.created_at,
                already_exists: false
            }
        })

    } catch (error: any) {
        console.error('Unexpected error in track-visitor API:', error.message)
        return NextResponse.json(
            { success: false, error: 'Internal server error or Invalid JSON' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient()

        const { count, error } = await supabase
            .from('viewers')
            .select('*', { count: 'exact', head: true })
            .is('post_id', null)

        if (error) {
            return NextResponse.json(
                { success: false, error: 'Failed to get count' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            count: count || 0
        })

    } catch (error: any) {
        console.error('Unexpected error in get count:', error?.message)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}