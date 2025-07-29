import { useState } from 'react';
import { useRouter } from 'next/router';
import { withAuth } from '../../../middleware/withAuth';

function ChangePassword({ user }) {
  const router = useRouter();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (form.newPassword !== form.confirmPassword) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    const res = await fetch('/api/user/change-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      }),
    });

    const data = await res.json();
    setIsLoading(false);
    if (!res.ok) {
      setError(data.error || 'Gagal mengganti password.');
    } else {
      setSuccess('Password berhasil diganti.');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => router.back(), 2000);
    }
  };

  return (
    <div className="relative min-h-screen text-black flex items-center justify-center px-4 py-10">
      {/* Background Blur */}
      <img
        src="/assets/bg-login.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
      />
      <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-xl bg-gradient-to-br from-white to-gray-100 p-8 rounded-xl shadow-2xl">
        {/* Branding */}
        <div className="flex items-center space-x-3 mb-6">
          <img src="/logo.jpg" alt="LiiyStore Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-lg font-bold text-gray-900">LiiyStore</h1>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Ganti Password</h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Password Saat Ini</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password Baru</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Konfirmasi Password Baru</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            />
          </div>

          <button
  type="submit"
  disabled={isLoading}
  className={`w-full py-2 rounded-full font-semibold transition ${
    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 text-white'
  }`}
>
  {isLoading ? 'Menyimpan...' : 'Simpan Password Baru'}
</button>

        </form>
      </div>
    </div>
  );
}

export const getServerSideProps = withAuth(async ({ user }) => {
  return { props: { user } };
});

export default ChangePassword;
