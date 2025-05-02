// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Hoş geldin!</h1>
      <p>Devam etmek için giriş yap veya kaydol:</p>
      <div className="mt-4 space-x-4">
        <Link href="/login" className="underline text-blue-600">Giriş</Link>
        <Link href="/register" className="underline text-blue-600">Kayıt Ol</Link>
      </div>
    </main>
  );
}
