import Link from 'next/link';
import Navbar from './navbar';
import Footer from './footer';

export default function BlogPage({ blogs, totalPages, currentPage }) {

  return (
    <main className="min-h-screen bg-white">
      <Navbar/>
      <div className="bg-white border-b py-10 shadow-sm">
  <div className="max-w-7xl mx-auto px-4">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Artikel & Blog LiiyStore</h1>
    <p className="text-sm text-gray-500">
      Temukan berbagai cerita, inspirasi, dan tips terbaru dari LiiyStore.
    </p>
  </div>
</div>
      <div className="max-w-7xl py-12 mx-auto px-4">
        


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {blogs.map((post) => (
    <Link key={post.id} href={`/blog/${post.slug}`} className="group">
      <div className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img
            src={post.mainImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">{post.title}</h2>
          <p className="text-sm text-gray-500 mb-2">
            {new Date(post.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p className="text-sm text-gray-700 line-clamp-3">{post.summary}</p>
          <span className="text-sm text-blue-600 hover:underline inline-block mt-3">
            Baca Selengkapnya..
          </span>
        </div>
      </div>
    </Link>
  ))}
</div>

{totalPages > 1 && (
  <div className="mt-10">
    <div className="flex justify-center items-center space-x-1 text-sm">
      {/* Tombol Sebelumnya */}
      {currentPage > 1 && (
        <Link
          href={`/blog?page=${currentPage - 1}`}
          className="px-2 py-1 rounded border text-gray-700 border-gray-300 hover:bg-gray-100"
        >
          ←
        </Link>
      )}

      {/* Nomor halaman (responsive) */}
      {Array.from({ length: totalPages }).map((_, idx) => {
        const pageNum = idx + 1;
        const showPage =
          pageNum === currentPage ||
          pageNum === currentPage - 1 ||
          pageNum === currentPage + 1;

        return (
          <div
            key={pageNum}
            className={`${
              showPage ? 'inline-block' : 'hidden sm:inline-block'
            }`}
          >
            <Link
              href={`/blog?page=${pageNum}`}
              className={`px-3 py-1 rounded border ${
                pageNum === currentPage
                  ? 'bg-black text-white border-black'
                  : 'text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </Link>
          </div>
        );
      })}

      {/* Tombol Berikutnya */}
      {currentPage < totalPages && (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="px-2 py-1 rounded border text-gray-700 border-gray-300 hover:bg-gray-100"
        >
          →
        </Link>
      )}
    </div>
  </div>
)}


      </div>
      <Footer/>
    </main>
  );
}

// ✅ Ambil data dari API
export async function getServerSideProps(context) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = context.req.headers.host;
  const page = parseInt(context.query.page || '1');
  const perPage = 20;

  try {
    const res = await fetch(`${protocol}://${host}/api/blogs`);
    const allBlogs = await res.json();
    const totalPages = Math.ceil(allBlogs.length / perPage);
    const paginated = allBlogs.slice((page - 1) * perPage, page * perPage);

    return {
      props: {
        blogs: paginated,
        totalPages,
        currentPage: page,
      },
    };
  } catch (err) {
    console.error('Gagal ambil data blog:', err);
    return {
      props: {
        blogs: [],
        totalPages: 0,
        currentPage: 1,
      },
    };
  }
}
