import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return NextResponse.redirect(new URL('/?error=no_code', request.url));
    }

    // Menggunakan HTML kecil di callback untuk mencatat sesi login ke browser, lalu masuk ke beranda
    const htmlResponse = `
      <html>
        <head>
          <script>
            localStorage.setItem('tt_logged_in', 'true');
            window.location.href = '/';
          </script>
        </head>
        <body>
          <p>Login berhasil, mengalihkan ke dashboard...</p>
        </body>
      </html>
    `;

    return new NextResponse(htmlResponse, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return NextResponse.redirect(new URL('/?error=server_error', request.url));
  }
}
