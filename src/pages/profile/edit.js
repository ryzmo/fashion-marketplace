import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { withAuth } from '../../../middleware/withAuth';
import Navbar from '../navbar';
import Footer from '../footer';

export default function EditProfilePage({ user }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: user.name || '',
    phone: user.phone || '',
    address: user.address || '',
    birthdate: user.birthdate || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/user/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, userId: user.id }),
    });
    if (res.ok) router.push('/profile');
  };

  return (
    <main>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 text-black py-10 px-4">
      
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Edit Profil</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Nama Lengkap</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
          </div>
          <div>
            <label className="text-sm text-gray-600">Nomor Telepon</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Alamat Pengiriman</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Tanggal Lahir</label>
            <input type="text" name="birthdate" value={form.birthdate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
          </div>

          <button type="submit" className="px-6 py-2 bg-black text-white rounded hover:bg-gray-700">Simpan</button>
        </form>
      </div>
      
    </div>
    <Footer/>
    </main>
    
  );
}

export const getServerSideProps = withAuth(async ({ user }) => {
  return { props: { user } };
});