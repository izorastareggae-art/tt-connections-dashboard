import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  // Buat respons redirect ke halaman utama
  const response = NextResponse.redirect(new URL('/', request.url));
  
  // Simpan penanda bahwa user sudah login (berlaku 1 hari)
  response.cookies.set('auth_status', 'logged_in', {
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return response;
}
