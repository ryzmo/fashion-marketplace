import { withAuth } from '../../middleware/withAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaSearch, FaCommentDots, FaInstagram, FaTiktok, FaBars, FaPhoneAlt, FaHeart, FaUser, FaShoppingBag, FaWallet } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Navbar from './navbar';
import Footer from './footer';

export default function WishlistPage({ wishlist }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/search?search=${search}&category=${category}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Gagal fetch: ${res.status} - ${text}`);
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Error saat fetch data produk:', err.message);
      }
    };
    fetchProducts();
  }, [search, category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}&category=${category}`);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar/>
      <div className="bg-white border-b py-10 shadow-sm">
  <div className="max-w-7xl mx-auto px-4">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Wishlist Saya</h1>
    <p className="text-sm text-gray-500">
      Produk favorit yang telah kamu simpan
    </p>
  </div>
</div>

      <section className="max-w-7xl mx-auto px-4 py-14">
        


        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Belum ada produk di wishlist kamu.</p>
        ) : (
          <div className="px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {wishlist.map(({ id, product }) => (
      <div
  key={product.id}
  className="bg-white rounded-xl shadow group hover:shadow-xl transition overflow-hidden"
>
  {/* Tombol hapus */}
  <div className="relative">
    <button
      onClick={async () => {
        const confirmDelete = confirm(`Hapus "${product.name}" dari wishlist?`);
        if (!confirmDelete) return;
        try {
          const res = await fetch(`/api/wishlist/${id}`, { method: 'DELETE' });
          if (res.ok) window.location.reload();
          else alert('Gagal menghapus dari wishlist');
        } catch (err) {
          console.error('Gagal hapus:', err);
          alert('Terjadi kesalahan');
        }
      }}
      className="absolute top-2 right-2 w-7 h-7 bg-white text-red-500 border border-red-200 rounded-full text-xs flex items-center justify-center hover:bg-red-100 z-10"
      title="Hapus dari wishlist"
    >
      ×
    </button>

    {/* ✅ Gambar persegi dengan aspect-ratio */}
    <Link href={`/produk/${product.id}`} className="block">
  <div className="w-full relative pb-[100%] overflow-hidden rounded-t-xl">
    <img
      src={
        typeof product.imageUrls[0] === 'string'
          ? product.imageUrls[0]
          : product.imageUrls[0]?.url
      }
      alt={product.name}
      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
  </div>
</Link>

  </div>

  {/* Nama produk */}
  <div className="p-4 text-center">
    <Link href={`/produk/${product.id}`}>
      <h3 className="text-sm font-semibold text-gray-800 hover:text-red-500 line-clamp-2">
        {product.name}
      </h3>
    </Link>
  </div>
</div>

    ))}
  </div>
</div>

        )}
      </section>
      <Footer/>
    </main>
  );
}

export const getServerSideProps = withAuth(async ({ user }) => {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  const wishlistRaw = await prisma.wishlistItem.findMany({
    where: { userId: user.id },
    include: { product: true },
  });

  const wishlist = wishlistRaw.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    product: {
      ...item.product,
      createdAt: item.product.createdAt?.toISOString?.() || null,
      updatedAt: item.product.updatedAt?.toISOString?.() || null,
    },
  }));

  return {
    props: {
      wishlist,
    },
  };
});