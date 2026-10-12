import { NextResponse } from 'next/server';

export async function GET() {
    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    const redirectUri = process.env.TIKTOK_REDIRECT_URI;
    const csrfState = Math.random().toString(36).substring(2); 
    const scopes = 'user.info.basic,user.info.profile,user.info.stats,video.publish,video.upload';

    const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&response_type=code&scope=${scopes}&redirect_uri=${redirectUri}&state=${csrfState}`;

    return NextResponse.redirect(url);
}
