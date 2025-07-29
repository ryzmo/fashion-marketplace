import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Link reset password telah dikirim ke email Anda.');
      } else {
        setError(data.message || 'Gagal mengirim email reset password');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengirim permintaan.');
    } finally {
      setLoading(false);
    }
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

      {/* Form Card */}
      <form
        onSubmit={handleForgotPassword}
        className="relative z-10 bg-gradient-to-br from-white to-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        {/* Branding */}
        <div className="flex items-center space-x-3 mb-6">
          <img src="/logo.jpg" alt="LiiyStore Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-lg font-bold text-gray-900">LiiyStore</h1>
        </div>

        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Lupa Password</h2>

        {message && <p className="text-green-600 text-sm mb-3 text-center">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 font-semibold transition disabled:opacity-60"
        >
          {loading ? 'Mengirim...' : 'Kirim Link Reset'}
        </button>
      </form>
    </div>
  );
}
