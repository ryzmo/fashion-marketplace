import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak sama');
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push('/auth/login');
    } else {
      setError(data.message || 'Registrasi gagal');
    }
    setIsLoading(false);
  };

  return (
    <div className="relative text-black min-h-screen flex items-center justify-center px-4">
      {/* Background Image with Blur */}
      <img
        src="/assets/bg-login.jpg" // Pastikan gambar tersedia
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
      />
      <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm"></div>

      {/* Form Card */}
      <form
        onSubmit={handleRegister}
        className="relative z-10 bg-gradient-to-br from-white to-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        {/* Branding */}
        <div className="flex items-center space-x-3 mb-6">
          <img src="/logo.jpg" alt="LiiyStore Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-lg font-bold text-gray-900">LiiyStore</h1>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-900">Buat Akun Baru</h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Nama Lengkap"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Konfirmasi Password"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition disabled:opacity-60"
        >
          {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
        </button>

        <p className="text-sm text-center mt-6 text-gray-700">
          Sudah punya akun?{' '}
          <Link href="/auth/login" className="text-black font-semibold hover:underline">
            Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
}
