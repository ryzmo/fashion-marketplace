import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { withAuth } from '../../middleware/withAuth';
import { FaSearch, FaCommentDots, FaInstagram, FaTiktok, FaBars, FaPhoneAlt, FaHeart, FaUser, FaShoppingBag, FaWallet } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from './navbar';

function ChatPage({ user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const userId = user?.id;
  const searchRef = useRef(null);

  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/chat?userId=${userId}`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Gagal fetch pesan:', err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsg = { sender: 'user', message: input, userId };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });
      fetchMessages();
    } catch (error) {
      console.error('Gagal kirim pesan:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [userId]);

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
  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}&category=${category}`); // ✅ hasil akhir
  };

  useEffect(() => {
    const markMessagesAsRead = async () => {
      try {
        await fetch('/api/chat/mark-read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
      } catch (err) {
        console.error('Gagal tandai pesan sebagai dibaca:', err);
      }
    };
  
    if (userId) {
      markMessagesAsRead();
    }
  }, [userId]);
  

  const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);

  return (
    <main className="min-h-screen">
      {/* Header & Nav tetap seperti sebelumnya */}
      <Navbar/>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="md:w-64 w-full bg-white border-r flex flex-col justify-between shadow-sm">
          <div>
            <div className="px-6 py-5 border-b">
              <h2 className="text-xl font-bold text-gray-800">💬 LiiyStore Chat</h2>
              <p className="text-sm text-gray-500 mt-1">Selamat datang 👋</p>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-800">
                Admin siap membantu kamu. Kirim pesan kapan saja!
              </div>
            </div>
          </div>
        </aside>

        {/* Chat Panel */}
        <main className="flex-1 flex flex-col bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Live Chat dengan Admin</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-4 py-2 rounded-xl text-sm max-w-[80%] lg:max-w-[60%] shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border rounded-bl-none'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="bg-white border-t px-6 py-4 flex gap-2">
            <input
              type="text"
              placeholder="Tulis pesan..."
              className="flex-1 border border-gray-300 px-4 py-2 rounded-full text-sm focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-blue-700"
            >
              <FaPaperPlane />
            </button>
          </div>
        </main>
      </div>
    </main>
  );
}

export const getServerSideProps = withAuth(async ({ user }) => {
  return { props: { user } };
});

export default ChatPage;
