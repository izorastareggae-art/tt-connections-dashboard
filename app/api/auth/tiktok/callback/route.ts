import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return NextResponse.redirect(new URL('/?error=no_code', request.url));
    }

    // Buat respons pengalihan (redirect) ke halaman utama dashboard
    const response = NextResponse.redirect(new URL('/', request.url));
    
    // Simpan tanda login berhasil ke Cookies browser agar tidak mental ke login WhatsApp
    response.cookies.set('auth_status', 'logged_in', {
      path: '/',
      maxAge: 60 * 60 * 24, // Berlaku selama 24 jam
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL('/?error=server_error', request.url));
  }
}
