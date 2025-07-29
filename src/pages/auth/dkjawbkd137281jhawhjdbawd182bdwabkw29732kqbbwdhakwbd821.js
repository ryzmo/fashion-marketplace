import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RegisterAdmin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleRegister = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    if (!email || !password || !name || !confirmPassword) {
      setErrorMsg('Semua field wajib diisi.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Password dan konfirmasi password tidak cocok.');
      setIsLoading(false);
      return;
    }

    const res = await fetch('/api/auth/register-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccessMsg('Registrasi berhasil! Mengarahkan ke login...');
      setTimeout(() => router.push('/auth/login-admin'), 1500);
    } else {
      setErrorMsg(data.message || 'Gagal registrasi admin.');
    }

    setIsLoading(false);
  };


  return (
    <div className="relative text-black min-h-screen flex items-center justify-center px-4">
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

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Register Admin</h2>

        {errorMsg && <p className="text-red-600 text-sm mb-3 text-center">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm mb-3 text-center">{successMsg}</p>}

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Nama Lengkap</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Admin"
          />
        </div>

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

        <div className="mb-6">
  <label className="block text-sm text-gray-600 mb-1">Konfirmasi Password</label>
  <input
    type="password"
    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    placeholder="Ulangi Password"
  />
</div>


        <button
          onClick={handleRegister}
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition disabled:opacity-60"
        >
          {isLoading ? 'Mendaftarkan...' : 'Daftar Admin'}
        </button>
      </div>
    </div>
  );
}
