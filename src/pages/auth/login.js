// pages/auth/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/');
      } else {
        setError(data.message || 'Login gagal');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-[#f9f9f9] px-4 py-10">
  <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-2xl overflow-hidden">
    
    {/* Sign In Section */}
    <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
      {/* Branding */}
      <div className="flex items-center space-x-2 mb-6 justify-center md:justify-start">
        <img src="/logo.jpg" alt="LiiyStore Logo" className="w-12 h-12 object-contain" />
        <h1 className="text-lg font-bold text-gray-900">LiiyStore</h1>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">Sign in</h2>

      {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full border text-black border-gray-300 px-4 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border text-black border-gray-300 px-4 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="text-right text-sm mb-4">
          <Link href="/auth/forgot-password" className="text-gray-700 hover:underline">
            Lupa kata sandi?
          </Link>
        </div>
        <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white font-bold py-2 rounded-full hover:bg-gray-800 transition disabled:opacity-60"
            >
              {isLoading ? 'Memproses...' : 'SIGN IN'}
            </button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-700">
        Belum punya akun?{' '}
        <Link href="/auth/register" className="text-black font-semibold hover:underline">
          Daftar di sini
        </Link>
      </p>
    </div>

    {/* Sign Up Section */}
    <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center items-center p-10 space-y-4">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center leading-snug">Selamat Datang di LiiyStore!</h2>
      <p className="text-sm text-center leading-relaxed max-w-md opacity-80">
        Belum punya akun? Yuk, daftar dan temukan koleksi fashion muslim eksklusif dari LiiyStore hanya untuk kamu.
      </p>
      <Link
        href="/auth/register"
        className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold text-sm tracking-wide uppercase"
      >
        Daftar Sekarang
      </Link>
    </div>

  </div>
</div>

  );
}
