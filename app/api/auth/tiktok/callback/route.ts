import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) return NextResponse.json({ error: 'Kode tidak ditemukan' }, { status: 400 });

    try {
        const tokenRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_key: process.env.TIKTOK_CLIENT_KEY || '',
                client_secret: process.env.TIKTOK_CLIENT_SECRET || '',
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.TIKTOK_REDIRECT_URI || '',
            })
        });
        const tokenData = await tokenRes.json();

        if (!tokenData.access_token) return NextResponse.json({ error: 'Gagal mendapatkan token' }, { status: 400 });

        const userRes = await fetch('https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name,follower_count', {
            headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
        });
        const userData = await userRes.json();

        return NextResponse.json({ sukses: true, profil: userData.data.user });
    } catch (err) {
        return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
    }
}
