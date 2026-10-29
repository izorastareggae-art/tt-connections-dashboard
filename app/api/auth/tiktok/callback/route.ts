import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  // Buat halaman HTML sementara yang menyimpan status ke localStorage lalu lempar ke beranda
  const htmlContent = `
    <html>
      <body>
        <script>
          localStorage.setItem('login_sukses', 'true');
          window.location.href = '/';
        </script>
      </body>
    </html>
  `;

  return new NextResponse(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}
