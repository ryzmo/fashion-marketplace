import { withAdminAuth } from '../../../../middleware/withAdminAuth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Link from 'next/link';
import LoadingBar from '../../LoadingBar';

export default function UlasanProduk() {
  const router = useRouter();
  const { id } = router.query;

  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduk = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (res.ok) setProduk(data.product);
        else console.error(data.message);
      } catch (err) {
        console.error('Gagal fetch produk:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, [id]);

  if (loading) return <LoadingBar />;
  if (!produk) return <div className="p-6 text-center text-gray-600">Produk tidak ditemukan.</div>;

  return (
    <main>
      <div className="w-full shadow-sm max-w-5xl mx-auto bg-white px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold text-gray-800">LiiyStore</span>
        </a>
      </div>

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Detail Produk & Ulasan</h1>
            <Link href="/admin">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                ← Kembali ke Admin
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{produk.name}</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {produk.imageUrls?.map((img, idx) => (
                <div key={idx} className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                  <img
                    src={typeof img === 'string' ? img : img.url}
                    alt={`Gambar ${idx + 1}`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-gray-700 text-sm">
                <strong>Kategori:</strong> {produk.categories?.map(c => c.name).join(', ') || '-'}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Harga Minimum:</strong>{' '}
                Rp{produk.price?.toLocaleString('id-ID') || 0}
              </p>
              {produk.discountPrice && (
                <p className="text-red-500 text-sm">
                  <strong>Diskon:</strong> Rp{produk.discountPrice.toLocaleString('id-ID')}
                </p>
              )}
              <p className="text-gray-700 text-sm">
                <strong>Stok:</strong> {produk.stock || 0}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Rating:</strong> {produk.rating} / 5
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Terjual:</strong> {produk.purchaseCount?.toLocaleString('id-ID') || 0}
              </p>
            </div>

            {/* Varian */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Varian Produk</h3>
              {produk.variants?.length > 0 ? (
                <div className="space-y-2">
                  {produk.variants.map((v, i) => (
                    <div key={i} className="border p-3 rounded-md bg-gray-50">
                      <p className="text-sm">
                        <strong>Varian:</strong> {v.variantName}
                      </p>
                      <p className="text-sm">Warna: {v.color || '-'}</p>
                      <p className="text-sm">Ukuran: {v.size}</p>
                      <p className="text-sm">
                        Harga:{' '}
                        {v.discountPrice ? (
                          <>
                            <span className="line-through text-gray-400 text-xs mr-1">
                              Rp{v.price.toLocaleString('id-ID')}
                            </span>
                            <span className="text-red-600">
                              Rp{v.discountPrice.toLocaleString('id-ID')}
                            </span>
                          </>
                        ) : (
                          <>Rp{v.price.toLocaleString('id-ID')}</>
                        )}
                      </p>
                      <p className="text-sm">Stok: {v.stock}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Tidak ada varian.</p>
              )}
            </div>
          </div>

          {/* Ulasan Produk */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-base font-semibold text-gray-800 mb-3">Ulasan Produk</h2>

            {produk.reviews?.length > 0 ? (
              <div className="grid gap-3">
                {produk.reviews.map((ulasan, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-2 rounded-md shadow-sm hover:shadow-md transition"
                  >
                    <p className="text-xs font-bold text-gray-800 mb-1">{ulasan.nama}</p>
                    <p className="text-gray-600 mb-2 text-[11px]">{ulasan.isi}</p>

                    {ulasan.gambar?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {ulasan.gambar.map((gbr, imgIdx) => {
                          const url = typeof gbr === 'string' ? gbr : gbr?.url;
                          if (!url) return null;
                          return (
                            <div key={imgIdx} className="w-16 h-16 overflow-hidden rounded-sm">
                              <img
                                src={url}
                                alt={`Ulasan Gambar ${imgIdx + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transform transition"
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4 text-xs">Belum ada ulasan.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = withAdminAuth();
