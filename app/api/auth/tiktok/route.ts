import { NextResponse } from 'next/server';

export async function GET() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY?.trim();
  const redirectUri = process.env.TIKTOK_REDIRECT_URI?.trim();

  // Pastikan konfigurasi tersedia
  if (!clientKey || !redirectUri) {
    console.error('TikTok OAuth configuration is missing');

    return NextResponse.json(
      { error: 'Konfigurasi TikTok belum lengkap di server' },
      { status: 500 }
    );
  }

  const scopes =
    'user.info.basic,user.info.profile,user.info.stats,video.publish,video.upload';

  const params = new URLSearchParams({
    client_key: clientKey,
    response_type: 'code',
    scope: scopes,
    redirect_uri: redirectUri,
    state: crypto.randomUUID(),
  });

  const url =
    `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;

  return NextResponse.redirect(url);
}
