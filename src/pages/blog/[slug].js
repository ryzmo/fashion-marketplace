import Head from 'next/head';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import Navbar from '../navbar';
import Footer from '../footer';

export default function BlogDetailPage({ blog }) {
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <p className="text-gray-600 text-lg">Artikel tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.title} | LiiyStore Blog</title>
        <meta name="description" content={blog.summary} />
      </Head>

      <main>
        <Navbar/>
        <div className="min-h-screen bg-gray-50 text-black py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <img
              src={blog.mainImage}
              alt={blog.title}
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-4 py-2 text-sm">
              {new Date(blog.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>

            <article className="prose prose-base prose-gray max-w-none">
  {blog.content.split('\n').map((line, idx) =>
    line.trim() === '' ? (
      <br key={idx} />
    ) : (
      <p key={idx}>{line}</p>
    )
  )}
</article>



            {blog.otherImages && blog.otherImages.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Galeri Tambahan</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {blog.otherImages.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Gambar tambahan ${idx + 1}`}
                      className="w-full h-48 object-cover rounded shadow-sm hover:shadow-md transition"
                    />
                  ))}
                </div>
              </div>
            )}

            <Link href="/blog" className="inline-block mt-8 text-sm text-blue-600 hover:underline">
              ← Kembali ke Blog
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
      </main>
      
    </>
  );
}

// ✅ Ambil data blog berdasarkan slug
export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  const { slug } = context.params;

  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    return {
      props: {
        blog: blog ? JSON.parse(JSON.stringify(blog)) : null,
      },
    };
  } catch (err) {
    console.error('Error get blog detail:', err);
    return { props: { blog: null } };
  }
}
