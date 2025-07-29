import { useState, useEffect, useRef } from 'react';
import {
  FaBoxOpen, FaChartBar, FaUsers, FaShoppingCart, FaSignOutAlt,
  FaTags, FaTruck, FaBullhorn, FaFileAlt, FaCog, FaPlus, FaClipboardList, FaStar, FaRegStar,
  FaComment, FaBlog, FaBars, FaTrash
} from 'react-icons/fa';
import Link from 'next/link';

import { withAdminAuth } from '../../middleware/withAdminAuth';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';


export default function AdminDashboard() {

  const [selectedUserId, setSelectedUserId] = useState(null);
const [userList, setUserList] = useState([]);
const [chatMessages, setChatMessages] = useState([]);
const [adminReply, setAdminReply] = useState('');

  const [activeSection, setActiveSection] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [produkList, setProdukList] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState(null);

const [gambarPreviewUrls, setGambarPreviewUrls] = useState(['', '', '', '', '']);

const [couponCode, setCouponCode] = useState('');
const [discountPercent, setDiscountPercent] = useState('');
const [maxDiscount, setMaxDiscount] = useState('');
const [minPurchase, setMinPurchase] = useState('');
const [coupons, setCoupons] = useState([]);

const [searchTerm, setSearchTerm] = useState('');
const [filterKategori, setFilterKategori] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [estimateArrival, setEstimateArrival] = useState('');
  const [orderList, setOrderList] = useState([]);
  const orderDetailRef = useRef(null);

  const [dashboardStats, setDashboardStats] = useState(null);

  const [showBlogForm, setShowBlogForm] = useState(false);
const [blogList, setBlogList] = useState([]);

const [editMode, setEditMode] = useState(false);
const [editBlog, setEditBlog] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [isDeletingBlogId, setIsDeletingBlogId] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);






const formRef = useRef(null); // untuk scroll otomatis

const [blogImagePreview, setBlogImagePreview] = useState({
  mainImage: '',
  otherImages: ['', '', '']
});






  const [gambarList, setGambarList] = useState([
    { previewUrl: '', file: null },
    { previewUrl: '', file: null },
    { previewUrl: '', file: null },
    { previewUrl: '', file: null },
    { previewUrl: '', file: null },
  ]);
  







  // ✅ State form produk
  const [namaProduk, setNamaProduk] = useState('');
  const [kategori, setKategori] = useState([]);
  const [deskripsi, setDeskripsi] = useState('');
  const [gambar1, setGambar1] = useState(null);
  const [gambar2, setGambar2] = useState(null);
  const [gambar3, setGambar3] = useState(null);
  const [gambar4, setGambar4] = useState(null);
  const [gambar5, setGambar5] = useState(null);
  const [jumlahPembelian, setJumlahPembelian] = useState('');
const [rating, setRating] = useState(' ');
const [isSale, setIsSale] = useState(false);

const [isCouponLoading, setIsCouponLoading] = useState(false);
const [isOrderLoading, setIsOrderLoading] = useState(false);
const [isCancelLoading, setIsCancelLoading] = useState(false);
const [isTerimaLoading, setIsTerimaLoading] = useState(false);
const [isTolakLoading, setIsTolakLoading] = useState(false);
const [isBlogLoadingList, setIsBlogLoadingList] = useState(false);







const [ulasanList, setUlasanList] = useState([
  { nama: '', isi: '', gambar: [null, null, null] },
]);



const addUlasan = () => {
  setUlasanList([...ulasanList, { nama: '', isi: '', gambar: [null, null, null] }]);
};

const updateUlasanField = (index, field, value) => {
  const updated = [...ulasanList];
  updated[index][field] = value;
  setUlasanList(updated);
};

const updateUlasanImage = (index, imgIndex, file) => {
  const updated = [...ulasanList];
  updated[index].gambar[imgIndex] = file;
  setUlasanList(updated);
};



const resetForm = () => {
  setNamaProduk('');
  setKategori([]);
  setDeskripsi('');
  setRating('');
  setJumlahPembelian('');
  setIsSale(false);
  setVariants([{
    color: '',
    size: '',
    price: '',
    discountPrice: '',
    stock: '',
    image: null,
    sku: '',
  }]);
  setGambarList([
    { previewUrl: '', file: null },
    { previewUrl: '', file: null },
    { previewUrl: '', file: null },
    { previewUrl: '', file: null },
    { previewUrl: '', file: null },
  ]);
  setGambarPreviewUrls(['', '', '', '', '']);
  setUlasanList([{ nama: '', isi: '', gambar: [null, null, null] }]);
  setIsEditing(false);
  setEditId(null);
  setShowProductForm(false);
};


  

const handleProductSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const invalidSKU = variants.some((v) => !v.sku || v.sku.trim() === '');
  if (invalidSKU) {
    alert('Setiap varian harus memiliki SKU. Harap lengkapi.');
    setIsLoading(false);
    return;
  }

  const formData = new FormData();

  formData.append('name', namaProduk);
  formData.append('category', kategori.join(','));
  formData.append('description', deskripsi);
  formData.append('purchaseCount', jumlahPembelian);
  formData.append('rating', rating);
  formData.append('isSale', isSale.toString());
  formData.append('variants', JSON.stringify(
  variants.map((v, i) => ({
    color: v.color,
    size: v.size,
    price: parseInt(v.price),
    discountPrice: v.discountPrice ? parseInt(v.discountPrice) : null,
    stock: parseInt(v.stock),
    sku: v.sku || `SKU-${v.color}-${v.size}`,
    imageIndex: i, // untuk mapping gambar
  }))
));

// Kirim gambar varian (1 per varian)
variants.forEach((v, i) => {
  if (v.image instanceof File) {
    formData.append(`variantImage_${i}`, v.image);
  }
});

  // ✅ Gambar (gambarList)
  gambarList.forEach((gambar, index) => {
    if (gambar?.file) {
      formData.append(`image${index + 1}`, gambar.file);
    }
  });

  // ✅ Ulasan
  ulasanList.forEach((ulasan, index) => {
    formData.append(`ulasan[${index}][nama]`, ulasan.nama);
    formData.append(`ulasan[${index}][isi]`, ulasan.isi);

    ulasan.gambar.forEach((gambar, i) => {
      if (gambar instanceof File) {
        formData.append(`ulasan[${index}][gambar${i + 1}]`, gambar);
      }
    });
  });

  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      body: formData,
    });

    const contentType = res.headers.get('content-type');
    let data = null;

    if (contentType?.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.error('Unexpected response (not JSON):', text);
      alert('Server error: unexpected response format.');
      return;
    }

    if (res.ok) {
      alert('Produk berhasil ditambahkan!');
      resetForm(); // ✅ Panggil reset jika ada
    } else {
      alert(data?.message || 'Gagal menambahkan produk');
    }
  } catch (error) {
    console.error('Error submit produk:', error);
    alert('Terjadi kesalahan saat mengirim data.');
  } finally {
    setIsLoading(false); // ⬅️ Selesai loading
  }
};

  
  useEffect(() => {
    // Ambil produk dari API
    const fetchProduk = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (res.ok) {
          setProdukList(data.products);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Gagal mengambil produk:', err);
      }
    };
  
    fetchProduk();
  }, []);

  const handleEdit = (produk) => {
    setNamaProduk(produk.name);
    setKategori(produk.categories?.map((c) => c.name) || []);
    setDeskripsi(produk.description);
    setRating(produk.rating?.toString() || '');
    setJumlahPembelian(produk.purchaseCount?.toString() || '');
    setIsSale(!!produk.isSale);

    const gambarArr = [0, 1, 2, 3, 4].map((i) => {
      const img = produk.imageUrls?.[i];
      return {
        previewUrl: typeof img === 'string' ? img : img?.url || '',
        file: null,
      };
    });
    setGambarList(gambarArr);
    setGambarPreviewUrls(gambarArr.map(g => g.previewUrl));

    const mappedUlasan = (produk.reviews || []).map((u) => ({
      nama: u.nama || '',
      isi: u.isi || '',
      gambar: [0, 1, 2].map((i) => u.gambar?.[i] || null),
    }));
    setUlasanList(mappedUlasan.length ? mappedUlasan : [{ nama: '', isi: '', gambar: [null, null, null] }]);

    console.log('VARIANTS EDIT:', produk.variants);

    const mappedVariants = produk.variants?.map((v) => ({
  color: v.color || '',
  size: v.size || '',
  price: v.price?.toString() || '',
  discountPrice: v.discountPrice?.toString() || '',
  stock: v.stock?.toString() || '',
  sku: v.sku || '',
  image: v.imageUrls?.[0]?.url || '', // ✅ tampilkan URL gambar varian
})) || [];

    setVariants(mappedVariants.length ? mappedVariants : [{
      color: '',
      size: '',
      price: '',
      discountPrice: '',
      stock: '',
      image: null,
      sku: '',
    }]);

    setIsEditing(true);
    setEditId(produk.id);
    setShowProductForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  
  
  
  
  
  
  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    
    setDeletingProductId(id);
  
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
  
      const data = await res.json();
      if (res.ok) {
        alert('Produk berhasil dihapus.');
        // Refresh daftar produk
        setProdukList((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(data.message || 'Gagal menghapus produk.');
      }
    } catch (err) {
      console.error('Gagal menghapus produk:', err);
      alert('Terjadi kesalahan saat menghapus.');
    } finally {
    setDeletingProductId(null); // ⬅️ Reset loading
  }
  };

  const handleUpdateSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const invalidSKU = variants.some((v) => !v.sku || v.sku.trim() === '');
  if (invalidSKU) {
    alert('Setiap varian harus memiliki SKU. Harap lengkapi.');
    setIsLoading(false);
    return;
  }

  const formData = new FormData();
  formData.append('name', namaProduk);
  formData.append('category', kategori.join(','));
  formData.append('description', deskripsi);
  formData.append('purchaseCount', jumlahPembelian);
  formData.append('rating', rating);
  formData.append('isSale', isSale.toString());
  formData.append('variants', JSON.stringify(
    variants.map((v, i) => ({
      color: v.color,
      size: v.size,
      price: parseInt(v.price),
      discountPrice: v.discountPrice ? parseInt(v.discountPrice) : null,
      stock: parseInt(v.stock),
      sku: v.sku || `SKU-${v.color}-${v.size}`,
      imageIndex: i,
    }))
  ));

  variants.forEach((v, i) => {
    if (v.image instanceof File) {
      formData.append(`variantImage_${i}`, v.image);
    }
  });

  gambarList.forEach((gambar, i) => {
    if (gambar.file) {
      formData.append(`image${i + 1}`, gambar.file);
    } else if (gambar.previewUrl) {
      formData.append(`oldImage${i + 1}`, gambar.previewUrl);
    }
  });

  ulasanList.forEach((ulasan, index) => {
    formData.append(`ulasan[${index}][nama]`, ulasan.nama);
    formData.append(`ulasan[${index}][isi]`, ulasan.isi);
    ulasan.gambar.forEach((gambar, i) => {
      if (gambar instanceof File) {
        formData.append(`ulasan[${index}][gambar${i + 1}]`, gambar);
      }
    });
  });

  try {
    const res = await fetch(`/api/products/${editId}`, {
      method: 'PUT',
      body: formData,
    });

    const contentType = res.headers.get('content-type');
    const data = contentType?.includes('application/json') ? await res.json() : await res.text();

    if (res.ok) {
      alert('Produk berhasil diupdate!');
      resetForm();
    } else {
      console.error('Update error:', data);
      alert(data?.message || 'Gagal update produk');
    }
  } catch (err) {
    console.error('Error update produk:', err);
    alert('Terjadi kesalahan saat update produk.');
  } finally {
    setIsLoading(false);
  }
};

  
  
  
  
  
  
  
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const res = await fetch('/api/chat/users');
        const data = await res.json();
        setUserList(data);
      } catch (err) {
        console.error('Gagal fetch user chat:', err);
      }
    };
  
    fetchUserList();
  }, []);
  
  const fetchChatMessages = async (userId) => {
    try {
      const res = await fetch(`/api/chat?userId=${userId}`);
      const data = await res.json();
      setChatMessages(data);
      setSelectedUserId(userId);
    } catch (err) {
      console.error('Gagal fetch chat:', err);
    }
  };
  
  const handleAdminReply = async () => {
    if (!adminReply.trim() || !selectedUserId) return;
  
    const newMsg = {
      sender: 'admin',
      message: adminReply,
      userId: selectedUserId,
    };
  
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });
      setAdminReply('');
      fetchChatMessages(selectedUserId); // refresh
    } catch (err) {
      console.error('Gagal kirim balasan:', err);
    }
  };
  
  const handleKategoriChange = (value) => {
    setKategori((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  
  // Ambil semua kupon dari /api/coupons
const fetchCoupons = async () => {
  try {
    const res = await fetch('/api/coupons');
    if (!res.ok) {
      throw new Error('Gagal fetch kupon');
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error('Format data kupon tidak valid');
    }

    setCoupons(data);
  } catch (err) {
    console.error('Gagal mengambil data kupon:', err.message || err);
    alert('Gagal mengambil data kupon.');
  }
};

  
  useEffect(() => {
    fetchCoupons();
  }, []);
  
  // Kirim kupon baru ke /api/coupons
const handleSubmitCoupon = async (e) => {
  e.preventDefault();
  setIsCouponLoading(true);

  // Validasi form sebelum dikirim
  if (!couponCode || !discountPercent || !maxDiscount || !minPurchase) {
    alert('Mohon lengkapi semua field kupon.');
    return;
  }

  try {
    const payload = {
      code: couponCode.trim(),
      discountPercent: parseInt(discountPercent),
      maxDiscount: parseInt(maxDiscount),
      minPurchase: parseInt(minPurchase),
    };

    const res = await fetch('/api/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Kupon berhasil ditambahkan!');
      setCouponCode('');
      setDiscountPercent('');
      setMaxDiscount('');
      setMinPurchase('');
      fetchCoupons(); // refresh list
    } else {
      alert(data?.message || 'Gagal tambah kupon.');
    }
  } catch (error) {
    console.error('Error saat tambah kupon:', error);
    alert('Terjadi kesalahan saat menyimpan kupon.');
  } finally {
    setIsCouponLoading(false); // ⬅️ Stop loading
  }
};

const handleDeleteCoupon = async (id) => {
  if (!confirm('Yakin ingin menghapus kupon ini?')) return;

  try {
    const res = await fetch(`/api/coupons?id=${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    if (res.ok) {
      alert('Kupon berhasil dihapus!');
      fetchCoupons(); // refresh
    } else {
      alert(data.message || 'Gagal menghapus kupon');
    }
  } catch (error) {
    console.error('Error hapus kupon:', error);
    alert('Terjadi kesalahan saat menghapus.');
  }
};

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/order/all');
      const data = await res.json();
      setOrderList(data.orders);
    } catch (err) {
      console.error('Gagal ambil daftar pesanan:', err);
    }
  };

  fetchOrders();
}, []);

const handleUpdateOrder = async () => {
  setIsOrderLoading(true);
  try {
    const res = await fetch('/api/admin/order/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: selectedOrder?.id,
        newStatus: statusUpdate,
        trackingNumber,
        estimateArrival,
      }),
    });
    const result = await res.json();
    if (res.ok) {
      alert('Pesanan berhasil diperbarui');
      setStatusUpdate('');
      setTrackingNumber('');
      setEstimateArrival('');
      setSelectedOrder(null);
      // Refresh data
      const updated = await fetch('/api/admin/order/all');
      const data = await updated.json();
      setOrderList(data.orders);
    } else {
      alert(result.message || 'Gagal update pesanan');
    }
  } catch (err) {
    console.error('Update pesanan error:', err);
    alert('Terjadi kesalahan saat update.');
  } finally {
    setIsOrderLoading(false);
  }
};

useEffect(() => {
  if (activeSection === 'dashboard') {
    const fetchDashboardStats = async () => {
      try {
        const res = await fetch('/api/admin/dashboard', {
          credentials: 'include',   // ⬅️ ini WAJIB supaya cookie dikirim
        });
        
        const data = await res.json();
        setDashboardStats(data);
      } catch (err) {
        console.error('Gagal fetch statistik dashboard:', err);
      }
    };
    fetchDashboardStats();
  }
}, [activeSection]);

const handleSubmitBlog = async (e) => {
  e.preventDefault();
  setIsBlogLoading(true);
  const formData = new FormData(e.target);

  const isEdit = editMode && editBlog;
  const url = isEdit ? `/api/blogs/${editBlog.id}` : '/api/blogs';
  const method = isEdit ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert(isEdit ? 'Blog berhasil diperbarui!' : 'Blog berhasil ditambahkan!');
      e.target.reset();
      setEditMode(false);
      setEditBlog(null);

      const refreshed = await fetch('/api/blogs');
      const newBlogs = await refreshed.json();
      setBlogList(newBlogs);
    } else {
      alert(data.message || 'Gagal simpan blog');
    }
  } catch (err) {
    console.error('Error simpan blog:', err);
    alert('Terjadi kesalahan');
  } finally {
    setIsBlogLoading(false); // ⬅️ Stop loading
  }
};




useEffect(() => {
  const fetchBlogs = async () => {
    setIsBlogLoadingList(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (res.ok) {
        setBlogList(data);
      } else {
        console.error('Gagal ambil blog:', data.message);
      }
    } catch (err) {
      console.error('Error fetch blogs:', err);
    } finally {
    setIsBlogLoadingList(false);
  }
  };

  if (activeSection === 'blog') {
    fetchBlogs();
  }
}, [activeSection]);

const handleDeleteBlog = async (id) => {
  if (!confirm('Yakin ingin menghapus blog ini?')) return;
  setIsDeletingBlogId(id);

  try {
    const res = await fetch(`/api/blogs/delete?id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (res.ok) {
      alert('Blog berhasil dihapus!');
      setBlogList((prev) => prev.filter((b) => b.id !== id));
    } else {
      alert(data.message || 'Gagal menghapus blog.');
    }
  } catch (err) {
    console.error('Gagal hapus blog:', err);
    alert('Terjadi kesalahan saat menghapus.');
  } finally {
    setIsDeletingBlogId(null); // ⬅️ Reset loading
  }
};

const handleEditBlog = (blog) => {
  setShowBlogForm(true);
  setEditMode(true);
  setEditBlog(blog);

  setBlogImagePreview({
    mainImage: blog.mainImage || '',
    otherImages: blog.otherImages || [], 
  });
};


useEffect(() => {
  if (!editBlog || !showBlogForm) return;

  const form = document.getElementById('blog-form');
  if (form) {
    form.title.value = editBlog.title;
    form.date.value = editBlog.date.split('T')[0];
    form.summary.value = editBlog.summary;
    form.content.value = editBlog.content;

    // Scroll ke form

  }
}, [editBlog, showBlogForm]);

const [variants, setVariants] = useState([
  {
    color: '',
    size: '',
    price: '',
    discountPrice: '',
    stock: '',
    image: null,
    sku: '',
  }
]);

const addVariant = () => {
  setVariants([...variants, {
    color: '',
    size: '',
    price: '',
    discountPrice: '',
    stock: '',
    images: [null, null, null],
    sku: '',
  }]);
};

const removeVariant = (index) => {
  const updated = [...variants];
  updated.splice(index, 1);
  setVariants(updated);
};




  return (
    <main>
     <div className="fixed top-0 left-0 w-full z-40 bg-white shadow-sm px-4 py-3 flex items-center md:hidden">
  <button
    onClick={() => setSidebarOpen(true)}
    className="text-gray-700 p-2 mr-2"
  >
    <FaBars />
  </button>

  <a className="flex items-center space-x-2">
    <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain" />
    <span className="text-xl font-bold text-gray-800">LiiyStore</span>
  </a>
</div>


    <div className="min-h-screen flex">
      {/* Toggle Button (Mobile) */}
      
      {/* Sidebar dan nav (tidak diubah) */}
       <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:static md:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6 justify-between">
          <div>
            <div className="text-2xl font-bold text-center mb-6">LiiyStore<br/>Admin Panel</div>
            <nav className="flex flex-col space-y-4 text-sm">
              <button onClick={() => { setActiveSection('dashboard'); setSidebarOpen(false);}}  className="flex items-center space-x-2 hover:text-yellow-400">
                <FaChartBar /> <span>Dashboard</span>
              </button>
              <button onClick={() => {setActiveSection('produk'); setSidebarOpen(false);}} className="flex items-center space-x-2 hover:text-yellow-400">
                <FaBoxOpen /> <span>Produk</span>
              </button>
              <button onClick={() => { setActiveSection('coupons'); setSidebarOpen(false);}} className="flex items-center space-x-2 hover:text-yellow-400">
                <FaComment /> <span>Coupons</span>
              </button>
              <button onClick={() => { setActiveSection('chat'); setSidebarOpen(false);}} className="flex items-center space-x-2 hover:text-yellow-400">
                <FaComment /> <span>Chat</span>
              </button>
              <button onClick={() => { setActiveSection('orders'); setSidebarOpen(false);}} className="flex items-center space-x-2 hover:text-yellow-400">
                <FaShoppingCart /> <span>Pesanan</span>
              </button>
              <button onClick={() => { setActiveSection('blog'); setSidebarOpen(false);}} className="flex items-center space-x-2 hover:text-yellow-400">
                <FaBlog /> <span>Blog</span>
              </button>
            </nav>
          </div>

          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/auth/login-admin';
            }}
            className="flex items-center space-x-2 text-red-400 hover:text-red-600"
          >
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        />
      )}


      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
      {activeSection === 'dashboard' && (
  <section className="bg-white mt-16 md:mt-0 text-black p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-6">Statistik Penjualan</h2>

    {!dashboardStats ? (
      <p className="text-gray-500">Memuat data...</p>
    ) : (
      <>
        {/* 🔥 Grid Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-blue-100 p-6 rounded-lg shadow flex flex-col justify-center items-center">
            <p className="text-gray-600 text-sm">Penjualan Hari Ini</p>
            <h3 className="text-2xl font-bold">
              Rp{(dashboardStats?.todaySales || 0).toLocaleString('id-ID')}
            </h3>
          </div>

          <div className="bg-green-100 p-6 rounded-lg shadow flex flex-col justify-center items-center">
            <p className="text-gray-600 text-sm">Penjualan Minggu Ini</p>
            <h3 className="text-2xl font-bold">
              Rp{(dashboardStats?.weekSales || 0).toLocaleString('id-ID')}
            </h3>
          </div>

          <div className="bg-purple-100 p-6 rounded-lg shadow flex flex-col justify-center items-center">
            <p className="text-gray-600 text-sm">Penjualan Bulan Ini</p>
            <h3 className="text-2xl font-bold">
              Rp{(dashboardStats?.monthSales || 0).toLocaleString('id-ID')}
            </h3>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg shadow flex flex-col justify-center items-center">
            <p className="text-gray-600 text-sm">Order Masuk</p>
            <h3 className="text-2xl font-bold">
              {dashboardStats?.newOrders || 0}
            </h3>
          </div>
        </div>

        {/* 🔥 Produk Terlaris */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2">Produk Terlaris</h3>
          <ul className="list-disc list-inside">
            {dashboardStats?.topProducts?.map((produk) => (
              <li key={produk.id}>
                {produk.name} - {produk.sold} terjual
              </li>
            ))}
          </ul>
        </div>

        {/* 🔥 Grafik Revenue */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Grafik Pendapatan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardStats.revenueGraph}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </>
    )}
  </section>
)}


        {activeSection === 'produk' && (
          <section id="produk" className="bg-white mt-16 md:mt-0 text-black p-6 rounded-lg shadow-md">

            {showProductForm && (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={isEditing ? handleUpdateSubmit : handleProductSubmit}
              encType="multipart/form-data">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Nama Produk</label>
                  <input type="text" className="border p-2 rounded" value={namaProduk} onChange={(e) => setNamaProduk(e.target.value)} />
                </div>

                <div className="col-span-1 md:col-span-2">
  <h3 className="font-semibold text-sm mb-2">Varian Produk</h3>

  {variants.map((variant, index) => (
    <div key={index} className="border p-4 rounded mb-4 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Model/Warna</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={variant.color}
            onChange={(e) => {
              const newVar = [...variants];
              newVar[index].color = e.target.value;
              setVariants(newVar);
            }}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Model/Ukuran</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={variant.size}
            onChange={(e) => {
              const newVar = [...variants];
              newVar[index].size = e.target.value;
              setVariants(newVar);
            }}
          />
        </div>

        <div>
  <label className="text-sm font-medium">Harga</label>
  <input
    type="number"
    className="border p-2 w-full rounded"
    onWheel={(e) => e.target.blur()} // cegah perubahan karena scroll
    value={variant.price}
    onChange={(e) => {
      const newVar = [...variants];
      newVar[index].price = e.target.value;
      setVariants(newVar);
    }}
  />
</div>


        <div>
  <label className="text-sm font-medium">Harga Diskon</label>
  <input
    type="number"
    className="border p-2 w-full rounded"
    onWheel={(e) => e.target.blur()} // cegah scroll mengubah nilai
    value={variant.discountPrice}
    onChange={(e) => {
      const newVar = [...variants];
      newVar[index].discountPrice = e.target.value;
      setVariants(newVar);
    }}
  />
</div>


       <div>
  <label className="text-sm font-medium">Stok</label>
  <input
    type="number"
    className="border p-2 w-full rounded"
    onWheel={(e) => e.target.blur()} // <- mencegah scroll menambah angka
    value={variant.stock}
    onChange={(e) => {
      const newVar = [...variants];
      newVar[index].stock = e.target.value;
      setVariants(newVar);
    }}
  />
</div>


        <div>
          <label className="text-sm font-medium">SKU</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={variant.sku}
            onChange={(e) => {
              const newVar = [...variants];
              newVar[index].sku = e.target.value;
              setVariants(newVar);
            }}
          />
        </div>
      </div>

      <div className="mt-2">
  <label className="text-sm font-medium">Gambar</label>
  <input
    type="file"
    accept="image/*"
    className="border p-1 w-full rounded"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const newVar = [...variants];
        newVar[index].image = file;
        setVariants(newVar);
      }
    }}
  />
  {variant.image && (
  <img
    src={
      typeof variant.image === 'string'
        ? variant.image
        : variant.image instanceof File
        ? URL.createObjectURL(variant.image)
        : ''
    }
    alt={`Varian ${index + 1} Gambar`}
    className="w-16 h-16 object-cover mt-1 rounded"
  />
)}

</div>


      <button
        type="button"
        className="mt-3 text-sm text-red-600 underline"
        onClick={() => removeVariant(index)}
      >
        Hapus Varian
      </button>
    </div>
  ))}

  <button
    type="button"
    className="text-sm px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    onClick={addVariant}
  >
    + Tambah Varian
  </button>
</div>



                <div className="flex flex-col">
  <label className="text-sm font-medium mb-2">Kategori</label>
  <div className="grid grid-cols-2 gap-2 text-sm">
    {[
  "Hijab dan Pashmina",
  "Mukena Anak - Remaja",
  "Gamis Baby Sampai Dewasa",
  "Mukena Dewasa Standar",
  "Mukena Dewasa Jumbo",
  "Mukena Travel",
  "Ciput/Dalaman Hijab",
  "Bros Aksesoris Hijab",
  "Ikat dan Jepit Rambut (Unisex)",
  "Manset Tangan Islami",
  "Kaos Kaki Islami",
  "Hijab Sekolah & Pramuka",
  "Hijab Syar'i",
  "Bergo Instan Couple Baby - Dewasa",
  "Bergo Instan - Rendra",
  "Bergo Instan - Sport",
  "Bergo Instan Anak - Jersey",
  "Pashmina - Non Plisket",
  "Pashmina - Plisket",
  "Pakaian Koko Dewasa",
  "Pakaian Koko Anak",
  "Sarung Celana Anak - Dewasa",
  "Sarung Dewasa",
  "Sarung Anak",
  "Pakaian Koko Dewasa Putih",
  "Pakaian Koko Anak Putih",
  "Jubah Koko Dewasa",
  "Peci Miki Hat",
  "Peci Turkey",
  "Peci Rajut Oval",
  "Peci Rajut Elastis",
  "Peci Assagofah dan Terompah",
  "Peci Nasional",
  "Kopiah Polos",
  "Kopiah Premium Exclusive",
  "Kopiah Bordir Batik",
  "Kopiah Sablon Batik",
  "Kopiah Motif NU (Nahdlatul Ulama)",
  "Kopiah Motif Kartun Favorit Anak",
  "Kopiah Betawi",
  "Kopiah Polos Biru",
  "Kopiah Motif Tauhid",
  "Kopiah Bordir Kujang",
  "Peci Assagofah & Terompah",
  "Peci Turkey",
  "Peci Miki Hat",
  "Peci Khas Malaysia",
  "Peci Rajut Oval",
  "Peci Rajut Elastis",
  "Peci Khusus Haji",
  "Kopiah Rajut Priangan",
  "Terompah Motif Tauhid & NU",
  "Sajadah Shalat - Besar",
  "Sajadah Muka",
  "Sajadah Travel",
  "Tasbih Digital",
  "Tasbih Kayu",
  "Sarung Dewasa",
  "Tasbih Mutiara",
  "Sarung Dewasa",
  "Sarung Celana Anak - Dewasa",
  "Sarung Anak",
  "Mukena Dewasa",
  "Mukena Anak - Remaja",
  "Mukena Travel",
  "Kopiah_Peci Nasional",
  "Kopiah_Peci Tradisional",
  "Ciput Rajut - Anak",
  "Ciput Rajut - Pita",
  "Ciput Rajut - Persegi",
  "Ciput Rajut - Kerut_Slouchy",
  "Ciput Rajut - Topi",
  "Bros_Pin Hijab",
  "Jarum Pentul Hijab",
  "Peniti Hijab",
  "Ikat Rambut",
  "Jepit Rambut",
  "Hijab",
  "Dress",
  "Gamis",
  "Aksesoris",
  "Cannot use coupon",
  "NEW",
  "Pria",
  "Wanita",
  "Aksesoris"
]
.map((kat) => (
      <label key={kat} className="flex items-center space-x-2">
        <input
          type="checkbox"
          value={kat}
          checked={kategori.includes(kat)}
          onChange={() => handleKategoriChange(kat)}
        />
        <span>{kat}</span>
      </label>
    ))}
  </div>
</div>


                <div className="col-span-1 md:col-span-2 flex flex-col">
                  <label className="text-sm font-medium mb-1">Deskripsi</label>
                  <textarea className="border p-2 rounded" rows="4" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                </div>

                <div className="flex flex-col">
  <label className="text-sm font-medium mb-1">Jumlah Pembelian</label>
  <input
    type="number"
    className="border p-2 rounded"
    value={jumlahPembelian}
    onChange={(e) => setJumlahPembelian(e.target.value)}
    placeholder="Contoh: 123"
  />
</div>

<div className="flex flex-col">
  <label className="text-sm font-medium mb-1">Rating Produk</label>
  <select
    className="border p-2 rounded"
    value={rating}
    onChange={(e) => setRating(e.target.value)}
  >
    {[5, 4, 3, 2, 1].map((bintang) => (
      <option key={bintang} value={bintang}>
        {bintang} Bintang
      </option>
    ))}
  </select>
</div>

<div className="flex items-center space-x-2">
  <input
    type="checkbox"
    id="sale"
    checked={isSale}
    onChange={() => setIsSale(!isSale)}
  />
  <label htmlFor="sale" className="text-sm font-medium">Produk Sedang Sale</label>
</div>







{gambarList.map((gambar, index) => (
  <div key={index} className="flex flex-col">
    <label className="text-sm font-medium mb-1">Gambar {index + 1}</label>
    <input
      type="file"
      name={`image${index + 1}`}
      accept="image/*"
      className="border p-2 rounded"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const newList = [...gambarList];
          newList[index] = {
            previewUrl: URL.createObjectURL(file),
            file,
          };
          setGambarList(newList);
        }
      }}
    />

    {gambar.previewUrl && (
      <img
        src={gambar.previewUrl}
        alt={`Preview Gambar ${index + 1}`}
        className="w-24 h-24 object-cover mt-2 rounded"
      />
    )}
  </div>
))}


<div className="col-span-1 md:col-span-2">
  <label className="text-sm font-medium mb-2">Ulasan Produk</label>
  {ulasanList.map((ulasan, idx) => (
    <div key={idx} className="border p-4 rounded mb-4 bg-gray-50">
      <div className="mb-2">
        <label className="text-sm font-medium">Nama Pengulas</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={ulasan.nama}
          onChange={(e) => updateUlasanField(idx, 'nama', e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="text-sm font-medium">Isi Ulasan</label>
        <textarea
          className="border p-2 w-full rounded"
          rows="3"
          value={ulasan.isi}
          onChange={(e) => updateUlasanField(idx, 'isi', e.target.value)}
        />
      </div>

      {/* ✅ Ini bagian gambar ulasan */}
      <div className="grid grid-cols-3 gap-2">
        {ulasan.gambar.map((gambarUrl, i) => (
          <div key={i} className="flex flex-col items-center">
            <label className="text-sm font-medium">Gambar {i + 1}</label>
            <input
              type="file"
              accept="image/*"
              className="border p-1 w-full rounded"
              onChange={(e) => updateUlasanImage(idx, i, e.target.files[0])}
            />
            {/* 🔥 Tampilkan preview gambar lama kalau ada */}
            {gambarUrl && typeof gambarUrl === 'string' && (
              <img
                src={gambarUrl}
                alt={`Preview Ulasan ${idx + 1} Gambar ${i + 1}`}
                className="w-16 h-16 object-cover mt-1 rounded"
              />
            )}
          </div>
        ))}
      </div>

    </div>
  ))}

  <button
    type="button"
    onClick={addUlasan}
    className="mt-2 text-sm px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
  >
    + Tambah Ulasan
  </button>
</div>



<div className="col-span-1 md:col-span-2 flex gap-4 mb-16">
  <button
  type="submit"
  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
  disabled={isLoading}
>
  {isLoading ? 'Menyimpan...' : isEditing ? 'Update Produk' : 'Simpan Produk'}
</button>


  {isEditing && (
    <button
      type="button"
      onClick={resetForm}
      className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
    >
      Batal Edit
    </button>
  )}
</div>

              </form>
            )}

<div className="flex flex-wrap items-start sm:items-center justify-between gap-4 mb-6">
  {/* Input & Filter */}
  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-1">
    {/* Input Search */}
    <input
      type="text"
      placeholder="Cari produk..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-gray-300 px-4 py-2 rounded w-full sm:w-64"
    />

    {/* Filter Kategori */}
    <div className="border border-gray-300 px-4 py-3 rounded w-full max-h-48 overflow-y-auto bg-white">
      <label className="block text-sm font-semibold mb-2">Filter Kategori</label>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {[
          "Hijab dan Pashmina",
  "Mukena Anak - Remaja",
  "Gamis Baby Sampai Dewasa",
  "Mukena Dewasa Standar",
  "Mukena Dewasa Jumbo",
  "Mukena Travel",
  "Ciput/Dalaman Hijab",
  "Bros Aksesoris Hijab",
  "Ikat dan Jepit Rambut (Unisex)",
  "Manset Tangan Islami",
  "Kaos Kaki Islami",
  "Hijab Sekolah & Pramuka",
  "Hijab Syar'i",
  "Bergo Instan Couple Baby - Dewasa",
  "Bergo Instan - Rendra",
  "Bergo Instan - Sport",
  "Bergo Instan Anak - Jersey",
  "Pashmina - Non Plisket",
  "Pashmina - Plisket",
  "Pakaian Koko Dewasa",
  "Pakaian Koko Anak",
  "Sarung Celana Anak - Dewasa",
  "Sarung Dewasa",
  "Sarung Anak",
  "Pakaian Koko Dewasa Putih",
  "Pakaian Koko Anak Putih",
  "Jubah Koko Dewasa",
  "Peci Miki Hat",
  "Peci Turkey",
  "Peci Rajut Oval",
  "Peci Rajut Elastis",
  "Peci Assagofah dan Terompah",
  "Peci Nasional",
  "Kopiah Polos",
  "Kopiah Premium Exclusive",
  "Kopiah Bordir Batik",
  "Kopiah Sablon Batik",
  "Kopiah Motif NU (Nahdlatul Ulama)",
  "Kopiah Motif Kartun Favorit Anak",
  "Kopiah Betawi",
  "Kopiah Polos Biru",
  "Kopiah Motif Tauhid",
  "Kopiah Bordir Kujang",
  "Peci Assagofah & Terompah",
  "Peci Turkey",
  "Peci Miki Hat",
  "Peci Khas Malaysia",
  "Peci Rajut Oval",
  "Peci Rajut Elastis",
  "Peci Khusus Haji",
  "Kopiah Rajut Priangan",
  "Terompah Motif Tauhid & NU",
  "Sajadah Shalat - Besar",
  "Sajadah Muka",
  "Sajadah Travel",
  "Tasbih Digital",
  "Tasbih Kayu",
  "Sarung Dewasa",
  "Tasbih Mutiara",
  "Sarung Dewasa",
  "Sarung Celana Anak - Dewasa",
  "Sarung Anak",
  "Mukena Dewasa",
  "Mukena Anak - Remaja",
  "Mukena Travel",
  "Kopiah_Peci Nasional",
  "Kopiah_Peci Tradisional",
  "Ciput Rajut - Anak",
  "Ciput Rajut - Pita",
  "Ciput Rajut - Persegi",
  "Ciput Rajut - Kerut_Slouchy",
  "Ciput Rajut - Topi",
  "Bros_Pin Hijab",
  "Jarum Pentul Hijab",
  "Peniti Hijab",
  "Ikat Rambut",
  "Jepit Rambut",
  "Hijab",
  "Dress",
  "Gamis",
  "Aksesoris",
  "Cannot use coupon",
  "NEW",
  "Pria",
  "Wanita",
  "Aksesoris"
        ].map((kategori) => (
          <label key={kategori} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={kategori}
              checked={filterKategori.includes(kategori)}
              onChange={() => {
                if (filterKategori.includes(kategori)) {
                  setFilterKategori(filterKategori.filter(k => k !== kategori));
                } else {
                  setFilterKategori([...filterKategori, kategori]);
                }
              }}
            />
            <span>{kategori}</span>
          </label>
        ))}
      </div>
    </div>
  </div>

  {/* Tombol Cari */}
  <div className="w-full sm:w-auto">
    <button
      className="bg-blue-600 text-white w-full sm:w-auto px-6 py-2 rounded hover:bg-blue-700"
      onClick={async () => {
        try {
          let url = `/api/search?`;
          if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;
          if (filterKategori.length > 0) {
            const encoded = filterKategori.map(kat => encodeURIComponent(kat)).join(',');
            url += `category=${encoded}`;
          }
          const res = await fetch(url);
          const data = await res.json();
          setProdukList(data.products);
        } catch (err) {
          console.error('Gagal cari produk:', err);
        }
      }}
    >
      Cari
    </button>
  </div>
</div>



            {/* ✅ Section untuk menampilkan produk */}

<div className="flex items-center justify-between mb-4">
<h2 className="text-lg font-semibold"> Daftar Produk</h2>
  <button
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
    onClick={() => setShowProductForm(!showProductForm)}
  >
    <FaPlus /> <span>Upload Produk Baru</span>
  </button>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {produkList.length === 0 ? (
    <p className="text-gray-500 col-span-full text-center">Belum ada produk.</p>
  ) : (
    produkList.map((produk) => (
      <div key={produk.id} className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition-all">
        {/* Gambar Produk */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {produk.imageUrls?.slice(0, 2).map((img, idx) => (
            <img
              key={idx}
              src={typeof img === 'string' ? img : img.url}
              alt={`${produk.name} ${idx + 1}`}
              className="w-full h-28 object-cover rounded"
            />
          ))}
        </div>

        {/* Info Produk */}
        <div className="space-y-1 text-sm text-gray-800">
          <h4 className="font-bold text-base text-gray-900 truncate">{produk.name}</h4>
          <p className="text-xs text-gray-500">Kategori: {produk.categories?.map((cat) => cat.name).join(', ') || '-'}</p>
          <p className="text-xs">Ukuran: <span className="font-medium">{produk.size}</span></p>
          <p className="text-xs">Sale: <span className={produk.isSale ? 'text-green-600' : 'text-gray-500'}>{produk.isSale ? 'Ya' : 'Tidak'}</span></p>
          
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((i) =>
              i <= produk.rating ? (
                <FaStar key={i} className="text-yellow-400 text-xs" />
              ) : (
                <FaRegStar key={i} className="text-gray-300 text-xs" />
              )
            )}
            <span className="text-xs text-gray-500">({produk.rating})</span>
          </div>

          <p className="text-xs">Dibeli: {produk.purchaseCount}x</p>

          {/* Harga */}
          <div className="mt-1 text-sm">
  {(() => {
    const prices = produk.variants?.map(v => v.discountPrice || v.price) || [];
    if (prices.length === 0) {
      // fallback jika tidak ada variants
      return (
        <p className="text-black font-semibold">
          Rp{typeof produk.price === 'number' ? produk.price.toLocaleString('id-ID') : '0'}
        </p>
      );
    }

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...produk.variants.map(v => v.price || 0));
    const hasDiscount = produk.variants?.some(v => v.discountPrice);

    return hasDiscount ? (
      <div>
        <p className="text-xs line-through text-gray-400">
          Rp{maxPrice.toLocaleString('id-ID')}
        </p>
        <p className="text-red-500 font-bold">
          Rp{minPrice.toLocaleString('id-ID')}
        </p>
      </div>
    ) : (
      <p className="text-black font-semibold">
        Rp{minPrice.toLocaleString('id-ID')}
      </p>
    );
  })()}
</div>



          {/* Deskripsi Singkat */}
          <p className="text-xs text-gray-600 mt-1">
            {produk.description?.slice(0, 80)}{produk.description?.length > 80 ? '...' : ''}
          </p>
        </div>

        {/* Aksi */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => handleEdit(produk)}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
          >
            Edit
          </button>
          <button
  onClick={() => handleDelete(produk.id)}
  disabled={deletingProductId === produk.id}
  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs disabled:opacity-60"
>
  {deletingProductId === produk.id ? 'Menghapus...' : 'Hapus'}
</button>

          <Link
            href={`/admin/ulasan/${produk.id}`}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
          >
            Detail Produk
          </Link>
        </div>
      </div>
    ))
  )}
</div>


          </section>
        )}

{activeSection === 'coupons' && (
  <section className="bg-white p-6 mt-16 md:mt-0 text-black rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-4">Manajemen Kupon Diskon</h2>

    <form onSubmit={handleSubmitCoupon} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <input
        type="text"
        placeholder="Kode Kupon"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Diskon (%)"
        value={discountPercent}
        onChange={(e) => setDiscountPercent(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Maks Diskon (Rp)"
        value={maxDiscount}
        onChange={(e) => setMaxDiscount(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Min Pembelian (Rp)"
        value={minPurchase}
        onChange={(e) => setMinPurchase(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button
  type="submit"
  className="md:col-span-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
  disabled={isCouponLoading}
>
  {isCouponLoading ? 'Menyimpan...' : 'Simpan Kupon'}
</button>

    </form>

    <div>
      <h4 className="text-sm font-semibold mb-2">Daftar Kupon</h4>
      {coupons.length === 0 ? (
        <p className="text-gray-500">Belum ada kupon.</p>
      ) : (
        <ul className="space-y-2">
  {coupons.map((c) => (
    <li key={c.id} className="border p-3 rounded bg-gray-50 flex justify-between items-center">
      <div>
        <strong>{c.code}</strong> - Diskon {c.discountPercent}% (max Rp{c.maxDiscount.toLocaleString('id-ID')}) - Min. Rp{c.minPurchase.toLocaleString('id-ID')}
      </div>
      <button
        onClick={() => handleDeleteCoupon(c.id)}
        className="text-red-500 hover:underline text-sm"
      >
        Hapus
      </button>
    </li>
  ))}
</ul>

      )}
    </div>
  </section>
)}

{activeSection === 'chat' && (
  <section id="chat" className="bg-white mt-16 md:mt-0 text-black p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-4">Live Chat Pengguna</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Daftar Pengguna */}
      <div className="border rounded p-3 h-[500px] overflow-y-auto">
        <h4 className="font-semibold mb-2">Pengguna</h4>
        {userList.map((user) => (
          <button
            key={user.id}
            onClick={() => fetchChatMessages(user.id)}
            className={`block w-full text-left px-3 py-2 rounded hover:bg-blue-100 ${
              selectedUserId === user.id ? 'bg-blue-200 font-bold' : ''
            }`}
          >
            {user.name || user.email || `Pengguna ${user.id}`}
          </button>
        ))}
      </div>

      {/* Riwayat Chat */}
      <div className="md:col-span-2 flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto space-y-3 p-3 border rounded mb-4 bg-gray-50">
          {chatMessages.length === 0 ? (
            <p className="text-gray-500">Pilih pengguna untuk melihat chat.</p>
          ) : (
            chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg text-sm max-w-xs ${
                    msg.sender === 'admin'
                      ? 'bg-yellow-400 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Balas Pesan */}
        {selectedUserId && (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tulis balasan..."
              value={adminReply}
              onChange={(e) => setAdminReply(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleAdminReply}
              className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
            >
              Kirim
            </button>
          </div>
        )}
      </div>
    </div>
  </section>
)}

{activeSection === 'orders' && (
  <section className="bg-white mt-16 md:mt-0 text-black p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-4">Kelola Pesanan</h2>

    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">User</th>
            <th className="border px-3 py-2">Total</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Waktu</th>
            <th className="border px-3 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => (
            <tr key={order.id} className="text-center">
              <td className="border px-2 py-2">#{order.id}</td>
              <td className="border px-2 py-2">{order.user?.name || 'User #' + order.userId}</td>
              <td className="border px-2 py-2">Rp{order.total.toLocaleString('id-ID')}</td>
              <td className="border px-2 py-2">
  <span
    className={`
      px-2 py-1 rounded text-xs font-semibold
      ${
        order.status === 'Dibayar'
          ? 'bg-green-100 text-green-700'
          : order.status === 'Sedang-Dikirim'
          ? 'bg-blue-100 text-blue-700'
          : order.status === 'Telah-Sampai'
          ? 'bg-purple-100 text-purple-700'
          : order.status === 'Dibatalkan'
          ? 'bg-red-100 text-red-700'
          : order.status === 'Permintaan-Pengembalian'
          ? 'bg-yellow-100 text-yellow-700'
          : order.status === 'Proses-Pengembalian'
          ? 'bg-indigo-100 text-indigo-700'
          : order.status === 'Pengembalian-Diterima'
          ? 'bg-emerald-100 text-emerald-700'
          : order.status === 'Pengembalian-Ditolak'
          ? 'bg-rose-100 text-rose-700'
          : 'bg-gray-100 text-gray-700'
      }
    `}
  >
    {order.status}
  </span>
</td>

              <td className="border px-2 py-2">{new Date(order.createdAt).toLocaleString('id-ID')}</td>
              <td className="border px-2 py-2">
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setTimeout(() => {
                      orderDetailRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 300); // kasih delay dikit supaya scroll setelah form muncul
                  }}
                  
                  className="text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {selectedOrder && (
  <div ref={orderDetailRef} className="mt-6 p-4 border rounded bg-gray-50">

    <h4 className="text-md font-semibold mb-3">Ubah Status Pesanan #{selectedOrder.id}</h4>

    <p className="text-sm mb-2">
  <strong>Status Sekarang:</strong>{' '}
  <span
    className={`
      px-2 py-1 rounded text-xs font-semibold
      ${
        selectedOrder.status === 'Dibayar'
          ? 'bg-green-100 text-green-700'
          : selectedOrder.status === 'Sedang-Dikirim'
          ? 'bg-blue-100 text-blue-700'
          : selectedOrder.status === 'Telah-Sampai'
          ? 'bg-purple-100 text-purple-700'
          : selectedOrder.status === 'Dibatalkan'
          ? 'bg-red-100 text-red-700'
          : selectedOrder.status === 'Permintaan-Pengembalian'
          ? 'bg-yellow-100 text-yellow-700'
          : 'bg-gray-100 text-gray-700'
      }
    `}
  >
    {selectedOrder.status?.toUpperCase() || '—'}
  </span>
</p>

    {/* Update Status & Pengiriman */}
    <div className="grid md:grid-cols-3 gap-4">
      <select
        value={statusUpdate}
        onChange={(e) => setStatusUpdate(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">-- Pilih Status Baru --</option>
        <option value="Sedang-Dikirim">Sedang-Dikirim</option>
        <option value="Telah-Sampai">Telah-Sampai</option>
        <option value="Diterima-Penjual">Diterima Penjual</option>
        <option value="Dikirim-Ulang">Dikirim Ulang</option>
      </select>

      <input
        type="text"
        placeholder="No. Resi Pengiriman"
        className="border p-2 rounded"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />

      <input
        type="text"
        placeholder="Estimasi Sampai (ex: 2-3 hari)"
        className="border p-2 rounded"
        value={estimateArrival}
        onChange={(e) => setEstimateArrival(e.target.value)}
      />
    </div>

    <div className="mt-4 flex gap-4">
      <button
  onClick={handleUpdateOrder}
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
  disabled={isOrderLoading}
>
  {isOrderLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
</button>

      <button
        onClick={() => setSelectedOrder(null)}
        className="text-gray-600 hover:underline text-sm"
      >
        Batal
      </button>

      {['Dibayar', 'Diterima-Penjual'].includes(selectedOrder.status) && (
  <button
  onClick={async () => {
    const reason = prompt('Tulis alasan pembatalan:');
    if (!reason) return;

    setIsCancelLoading(true); // ⬅️ mulai loading

    try {
      const res = await fetch('/api/order-cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: selectedOrder.id, reason }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Pesanan berhasil dibatalkan');
        setSelectedOrder(null);
        const updated = await fetch('/api/admin/order/all');
        const json = await updated.json();
        setOrderList(json.orders);
      } else {
        alert(data.message || 'Gagal membatalkan pesanan');
      }
    } catch (err) {
      console.error('Gagal membatalkan pesanan:', err);
      alert('Terjadi kesalahan.');
    } finally {
      setIsCancelLoading(false); // ⬅️ pastikan loading berhenti
    }
  }}
  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-auto disabled:opacity-60"
  disabled={isCancelLoading} // ⬅️ opsional: disable tombol saat loading
>
  {isOrderLoading ? 'Membatalkan...' : '❌ Batalkan Pesanan'}
</button>

)}



      
    </div>

    {selectedOrder.status === 'Permintaan-Pengembalian' && (
  <div className="bg-yellow-50 border border-yellow-300 p-4 mt-6 rounded space-y-3">
    <h4 className="text-md font-semibold text-yellow-800">📦 Permintaan Pengembalian</h4>

    {/* Alasan Pengembalian */}
    <p className="text-sm"><strong>Alasan:</strong> {selectedOrder.returnReason || '-'}</p>

    {/* Bukti Gambar */}
    {selectedOrder.returnEvidence && (
      <div>
        <p className="text-sm mb-1"><strong>Bukti Foto:</strong></p>
        <img
          src={selectedOrder.returnEvidence}
          alt="Bukti Pengembalian"
          className="w-40 h-40 object-cover rounded border"
        />
      </div>
    )}

    {/* Alamat Kirim */}
    <div className="bg-white p-3 rounded border mt-3">
      <p className="text-sm text-gray-800">
        📍 <strong>Alamat Pengembalian Produk:</strong><br />
        Toko Liiystore<br />
        Jl. Contoh No.123, Kota Besar, Provinsi Indonesia<br />
        Telepon: 0812-3456-7890
      </p>
    </div>

    {/* Tombol Terima Pengembalian */}
   <button
  onClick={async () => {
    if (!confirm('Terima pengembalian ini?')) return;

    setIsTerimaLoading(true); // ⬅️ Mulai loading

    try {
      const res = await fetch('/api/order-accept-return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: selectedOrder.id }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Pengembalian diterima!');
        setSelectedOrder(null);
        const updated = await fetch('/api/admin/order/all');
        const json = await updated.json();
        setOrderList(json.orders);
      } else {
        alert(data.message || 'Gagal menerima pengembalian');
      }
    } catch (err) {
      console.error('Error menerima pengembalian:', err);
      alert('Terjadi kesalahan.');
    } finally {
      setIsTerimaLoading(false); // ⬅️ Akhiri loading
    }
  }}
  className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-sm disabled:opacity-60"
  disabled={isTerimaLoading} // Opsional: disable saat loading
>
  {isTerimaLoading ? 'Menerima...' : '✅ Terima Pengembalian'}
</button>

    <button
  onClick={async () => {
    const reason = prompt('Tulis alasan menolak pengembalian:');
    if (!reason) return;

    if (!confirm('Yakin tolak pengembalian ini?')) return;

    setIsTolakLoading(true); // ⬅️ Mulai loading

    try {
      const res = await fetch('/api/order-reject-return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: selectedOrder.id, reason }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Pengembalian ditolak!');
        setSelectedOrder(null);
        const updated = await fetch('/api/admin/order/all');
        const json = await updated.json();
        setOrderList(json.orders);
      } else {
        alert(data.message || 'Gagal menolak pengembalian');
      }
    } catch (err) {
      console.error('Error tolak pengembalian:', err);
      alert('Terjadi kesalahan saat menolak pengembalian.');
    } finally {
      setIsTolakLoading(false); // ⬅️ Selesai loading
    }
  }}
  className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 text-sm ml-2 disabled:opacity-60"
  disabled={isTolakLoading} // ⬅️ Optional: mencegah klik ganda
>
  {isTolakLoading ? 'Menolak...' : '❌ Tolak Pengembalian'}
</button>


  </div>
)}

{selectedOrder.status === 'Proses-Pengembalian' && (
  <div className="bg-blue-50 border border-blue-300 p-4 mt-6 rounded space-y-3">
    <h4 className="text-md font-semibold text-blue-800">📦 Sedang Proses Pengembalian</h4>
    <p className="text-sm">
      <strong>Ekspedisi Pengembalian:</strong> {selectedOrder.returnCourierName || '—'}
    </p>
    <p className="text-sm">
      <strong>Nomor Resi Pengembalian:</strong> {selectedOrder.returnTrackingNumber || '—'}
    </p>
  </div>
)}



    {/* Detail Produk */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="bg-white border rounded p-4 shadow">
    <h4 className="text-md font-semibold mb-3">📋 Rincian Produk</h4>
    {selectedOrder.items.map((item) => (
      <div key={item.id} className="flex gap-4 border-b py-3">
        <img
          src={
            Array.isArray(item.product.imageUrls)
              ? typeof item.product.imageUrls[0] === 'string'
                ? item.product.imageUrls[0]
                : item.product.imageUrls[0]?.url
              : '/placeholder.png'
          }
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded"
        />

        <div className="text-sm">
          <p className="font-medium">{item.product.name}</p>

          {/* Tambahkan Ukuran dan Warna */}
          {item.size && (
            <p className="text-gray-600 text-xs">Model/Ukuran: {item.size}</p>
          )}
          {item.color && (
            <p className="text-gray-600 text-xs">Model/Warna: {item.color}</p>
          )}

          <p className="text-xs">Jumlah: {item.quantity}</p>

          {/* Harga item */}
          {(() => {
            const original = item.price || item.product.price || 0;
            const discount = item.discountPrice;

            return discount ? (
              <p className="text-sm">
                <span className="line-through text-gray-400 text-xs mr-1">
                  Rp{original.toLocaleString('id-ID')}
                </span>
                <span className="text-red-500 font-semibold">
                  Rp{discount.toLocaleString('id-ID')}
                </span>
              </p>
            ) : (
              <p className="text-black font-semibold text-sm">
                Rp{original.toLocaleString('id-ID')}
              </p>
            );
          })()}
        </div>
      </div>
    ))}
  </div>

  {/* Info Pengiriman */}
  <div className="bg-white border rounded p-4 shadow">
    <h4 className="text-md font-semibold mb-3">📍 Info Pengiriman</h4>

    <p className="text-sm"><strong>Nama:</strong> {selectedOrder.user?.name || '—'}</p>
    <p className="text-sm"><strong>Telepon:</strong> {selectedOrder.user?.phone || '—'}</p>

    {selectedOrder.buyerNote && (
      <p className="text-sm mt-2">
        <strong>Catatan Pembeli:</strong> {selectedOrder.buyerNote}
      </p>
    )}

    {/* Alamat */}
    <div className="flex items-start justify-between gap-2 mt-2">
      <div className="text-sm flex-1">
        <strong>Alamat Lengkap:</strong><br />
        {selectedOrder.user?.address || '—'}, {selectedOrder.user?.city || '—'}, {selectedOrder.user?.province || '—'}
      </div>

      <button
        onClick={() => {
          const fullAddress = `${selectedOrder.user?.address || ''}, ${selectedOrder.user?.city || ''}, ${selectedOrder.user?.province || ''}`;
          navigator.clipboard.writeText(fullAddress.trim());
          alert('Alamat berhasil disalin!');
        }}
        className="text-blue-600 text-xs hover:underline"
      >
        Salin 📋
      </button>
    </div>
    <p className="text-sm mt-2"><strong>Ongkos Kirim:</strong> Rp{selectedOrder.shippingCost?.toLocaleString('id-ID') || 0}</p>

    <p className="text-sm"><strong>Total Pesanan:</strong> Rp{selectedOrder.total.toLocaleString('id-ID')}</p>
    
  </div>
</div>

  </div>
)}

  </section>
)}

        {activeSection === 'blog' && (
          <section className="bg-white mt-16 md:mt-0 text-black p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Manajemen Blog</h2>

            {/* ✅ Tombol toggle tampilkan form */}
            <button
              onClick={() => setShowBlogForm(!showBlogForm)}
              className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {showBlogForm ? 'Tutup Form Blog' : '+ Tambah Blog Baru'}
            </button>

            {/* ✅ Form blog (jika showBlogForm true) */}
            {showBlogForm && (
              <form
                ref={formRef}
          id="blog-form"
                onSubmit={handleSubmitBlog}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                encType="multipart/form-data"
              >
                <input type="text" name="title" placeholder="Judul Blog" required className="border p-2 rounded" />
                <input type="date" name="date" required className="border p-2 rounded" />
                <textarea name="summary" placeholder="Deskripsi Singkat" rows="3" required className="border p-2 rounded md:col-span-2" />
                <textarea
          name="content"
          placeholder="Isi Blog"
          rows={20}
          required
          className="border p-3 rounded md:col-span-2 w-full min-h-[400px] text-base"
        />

                {/* Gambar Utama */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium block mb-1">Gambar Utama</label>
            <input type="file" name="mainImage" accept="image/*" className="border p-2 rounded w-full" />
          </div>
          {editMode && blogImagePreview.mainImage && (
            <div className="mt-2 md:mt-0">
              <img
                src={blogImagePreview.mainImage}
                alt="Gambar Utama"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>

        {/* Gambar Tambahan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i, index) => (
            <div key={i} className="flex flex-col">
              <label className="text-sm font-medium mb-1">Gambar Tambahan {i}</label>
              <input
                type="file"
                name={`otherImage${i}`}
                accept="image/*"
                className="border p-2 rounded"
              />
              {editMode && blogImagePreview.otherImages[index] && (
                <img
                  src={blogImagePreview.otherImages[index]}
                  alt={`Gambar Tambahan ${i}`}
                  className="w-24 h-24 object-cover mt-2 rounded border"
                />
              )}
            </div>
          ))}
        </div>
        {editMode && (
          <button
            type="button"
            onClick={() => {
              setEditMode(false);
              setEditBlog(null);
              document.getElementById('blog-form')?.reset();
            }}
            className="text-sm bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Batal Edit
          </button>
        )}


                <button
          type="submit"
          disabled={isBlogLoading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 md:col-span-2 disabled:opacity-60"
        >
          {isBlogLoading ? 'Menyimpan...' : 'Simpan Blog'}
        </button>

              </form>
            )}

            {/* ✅ List Blog yang sudah ada */}
            <div>
          <h3 className="text-md font-semibold mb-3">Blog yang Telah Diunggah</h3>
          {isBlogLoadingList ? (
          <p className="text-gray-500 text-center">Memuat blog...</p>
        ) : blogList.length === 0 ? (
          <p className="text-gray-500">Belum ada blog.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogList.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden border flex flex-col">
                  <img
                    src={blog.mainImage}
                    alt={blog.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{blog.title}</h4>
                      <p className="text-xs text-gray-500 mb-2">📅 {new Date(blog.date).toLocaleDateString('id-ID')}</p>
                      <p className="text-sm text-gray-700 mb-2">{blog.summary}</p>
                    </div>

                    {/* Tombol aksi */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className="text-sm px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      disabled={isDeletingBlogId === blog.id}
                      className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-60"
                    >
                      {isDeletingBlogId === blog.id ? 'Menghapus...' : 'Hapus'}
                    </button>
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Lihat Blog
                      </Link>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        )}
        </div>
          </section>
        )}
      </main>
    </div>
    </main>
  );
}

export const getServerSideProps = withAdminAuth();