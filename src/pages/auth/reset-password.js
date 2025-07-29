import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak sama');
      return;
    }

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, token }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Password berhasil diubah. Silakan login kembali.');
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } else {
      setError(data.message || 'Reset password gagal');
    }
    setIsLoading(false);
  };

  return (
    <div className="relative text-black min-h-screen flex items-center justify-center px-4">
      {/* Background Blur */}
      <img
        src="/assets/bg-login.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
      />
      <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm"></div>

      {/* Card */}
      <form
        onSubmit={handleResetPassword}
        className="relative z-10 bg-gradient-to-br from-white to-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        {/* Branding */}
        <div className="flex items-center space-x-3 mb-6">
          <img src="/logo.jpg" alt="LiiyStore Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-lg font-bold text-gray-900">LiiyStore</h1>
        </div>

        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Reset Password</h2>

        {message && <p className="text-green-600 text-sm mb-3 text-center">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

        <input
          type="password"
          placeholder="Password Baru"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Konfirmasi Password Baru"
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
          {isLoading ? 'Mengubah...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}
