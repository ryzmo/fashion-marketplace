import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UlasanPage() {
  const router = useRouter();
  const { id } = router.query;

  const [nama, setNama] = useState('');
  const [komentar, setKomentar] = useState('');
  const [gambarList, setGambarList] = useState([
    { file: null, preview: '' }, // Gambar 1
    { file: null, preview: '' }, // Gambar 2
    { file: null, preview: '' }, // Gambar 3
  ]);
  const [loading, setLoading] = useState(false);
  const [sudahAdaReview, setSudahAdaReview] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/product/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.product?.reviews?.length) {
            const lastReview = data.product.reviews.at(-1);
            setNama(lastReview.nama?.toString() || '');
            setKomentar(lastReview.isi?.toString() || '');

            const loadedGambar = [0, 1, 2].map(i => ({
              file: null,
              preview: lastReview.gambar?.[i]?.url || '',
            }));
            setGambarList(loadedGambar);
            setSudahAdaReview(true);
          }
        })
        .catch(err => console.error('Gagal fetch product:', err));
    }
  }, [id]);

  const handleFileChange = (index) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const newGambarList = [...gambarList];
      newGambarList[index] = {
        file: file,
        preview: URL.createObjectURL(file),
      };
      setGambarList(newGambarList);
    }
  };

  const handleSubmit = async () => {
    if (!nama.trim() || !komentar.trim()) {
      alert('Lengkapi nama dan ulasan ya 😄');
      return;
    }

    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('komentar', komentar);

    gambarList.forEach((gambar, index) => {
      if (gambar.file) {
        // Kalau ada file baru, kirim file
        formData.append(`gambar${index + 1}`, gambar.file);
      } else if (gambar.preview.startsWith('http')) {
        // Kalau tidak ada file baru, kirim preview URL lama
        formData.append(`gambar${index + 1}`, gambar.preview);
      }
    });

    setLoading(true);
    try {
      const res = await fetch(`/api/product/${id}/review`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        alert('Ulasan berhasil disimpan!');
        const newReview = data.product.reviews.at(-1);

        setNama(newReview.nama?.toString() || '');
        setKomentar(newReview.isi?.toString() || '');

        const updatedGambar = [0, 1, 2].map(i => ({
          file: null,
          preview: newReview.gambar?.[i]?.url || '',
        }));
        setGambarList(updatedGambar);
        setSudahAdaReview(true);
      } else {
        alert('Gagal menyimpan ulasan: ' + (data.message || ''));
      }
    } catch (err) {
      console.error('Gagal submit:', err);
      alert('Terjadi kesalahan saat mengirim ulasan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="w-full shadow-sm max-w-5xl mx-auto bg-white px-4 py-3 flex items-center justify-between">
  <a href="/" className="flex items-center space-x-2">
    <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
    <span className="text-xl font-bold text-gray-800">LiiyStore</span>
  </a>
</div>
    <div className="max-w-2xl mx-auto text-black bg-gray-50 p-6 rounded shadow-sm">
      <h1 className="text-xl font-bold mb-4">📝 Ulasan Produk</h1>

      <div className="mb-6">
        {/* Nama Pengulas */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Nama Pengulas</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Isi Ulasan */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Isi Ulasan</label>
          <textarea
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            className="w-full border px-3 py-2 rounded h-28"
          />
        </div>

        {/* Upload Gambar */}
        <p className="text-sm text-red-500 mb-2">
  ⚠️ Jika ingin memperbarui ulasan, upload ulang semua gambar. Jika tidak, gambar lama akan terhapus.
</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {gambarList.map((gambar, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1">Gambar {index + 1}</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange(index)}
              />
              {gambar.preview && (
                <img
                  src={gambar.preview}
                  alt={`Preview Gambar ${index + 1}`}
                  className="mt-2 w-24 h-24 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm"
        >
          {loading ? 'Menyimpan...' : sudahAdaReview ? 'Kirim Ulang' : 'Kirim Ulasan'}
        </button>
      </div>
    </div>
    </main>
    
  );
}
