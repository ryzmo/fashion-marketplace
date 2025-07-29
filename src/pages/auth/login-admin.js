import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg('Email dan password wajib diisi.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.role === 'admin') {
        router.push('/admin');
      } else {
        setErrorMsg(data.message || 'Login gagal atau Anda bukan admin.');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan saat mencoba login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-black flex items-center justify-center px-4">
      {/* Background */}
      <img
        src="/assets/bg-login.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
      />
      <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm" />

      {/* Form Card */}
      <div className="relative z-10 bg-gradient-to-br from-white to-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-md">
        {/* Branding */}
        <div className="flex items-center space-x-3 mb-6">
          <img src="/logo.jpg" alt="LiiyStore Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-lg font-bold text-gray-900">LiiyStore Admin</h1>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login Admin</h2>

        {errorMsg && (
          <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@email.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 font-semibold transition disabled:opacity-60"
        >
          {loading ? 'Memproses...' : 'Login'}
        </button>
      </div>
    </div>
  );
}
