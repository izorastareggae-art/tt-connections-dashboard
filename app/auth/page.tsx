"use client";

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function AuthProcess() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // 1. Menangkap parameter "code" yang dikirim oleh TikTok di URL
    const code = searchParams.get('code');

    if (code) {
      console.log("Berhasil mendapat Authorization Code:", code);
      
      // DI SINILAH LOGIKA BACKEND BEKERJA
      // Normalnya, di sini kita mengirim 'code' ke server kita, 
      // lalu server kita menukarnya ke API TikTok untuk mendapatkan Foto Profil & Username.
      
      // Untuk simulasi visual, kita buat pura-pura loading 3 detik:
      setTimeout(() => {
        // --- KODE BARU: Simpan tanda di memori browser ---
        localStorage.setItem('login_sukses', 'true');
        
        alert(`Simulasi Sukses! Kode TikTok Anda: ${code}\nMengembalikan ke Dashboard...`);
        router.push('/'); // Pindah kembali ke halaman dashboard utama
      }, 3000);

    } else {
      // Jika tidak ada kode (misal user batal login), langsung kembalikan ke awal
      router.push('/');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col justify-center items-center">
      {/* Animasi Loading Spinner */}
      <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h1 className="text-xl font-bold">Menghubungkan Akun TikTok...</h1>
      <p className="text-sm text-gray-400 mt-2">Jangan tutup halaman ini, sedang menyinkronkan data.</p>
    </div>
  );
}

export default function AuthPage() {
  return (
    // Suspense wajib ada di Next.js jika kita menggunakan useSearchParams
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117]"></div>}>
      <AuthProcess />
    </Suspense>
  );
}