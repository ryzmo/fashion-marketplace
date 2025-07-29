export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  
    try {
      const response = await fetch('https://api.komerce.id/shipping-cities', {
        headers: {
          'x-api-key': process.env.KOMERCE_API_KEY,
        },
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal ambil data kota');
  
      return res.status(200).json(data);
    } catch (err) {
      console.error('Gagal ambil data kota:', err);
      return res.status(500).json({ message: 'Error ambil daftar kota' });
    }
  }
  