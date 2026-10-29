import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return NextResponse.redirect(new URL('/?error=no_code', request.url));
    }

    // Di sini Anda bisa menukar 'code' dengan Access Token TikTok jika diperlukan,
    // atau untuk sementara menandai sesi login berhasil via Cookies/Redirect:
    const response = NextResponse.redirect(new URL('/', request.url));
    
    // Simpan tanda login berhasil ke Cookies browser selama 1 hari
    response.cookies.set('tiktok_logged_in', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24, // 24 jam
    });

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL('/?error=server_error', request.url));
  }
}
