import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // karena kita pakai Formidable
  },
};

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fungsi parse form data
const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true, keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fields, files } = await parseForm(req);
const orderId = fields.orderId?.toString();
const reason = fields.reason?.toString();


    console.log('📝 Fields:', fields);
    console.log('🖼️ Files:', files);

    // Validasi field wajib
    if (!orderId || !reason) {
      return res.status(400).json({ success: false, message: 'Data tidak lengkap.' });
    }

    const parsedOrderId = parseInt(orderId);
    if (isNaN(parsedOrderId)) {
      console.error('❌ orderId bukan angka valid:', orderId);
      return res.status(400).json({ success: false, message: 'ID pesanan tidak valid.' });
    }

    let evidenceUrl = null;

    // Upload bukti jika ada file evidence
    const evidenceFile = files?.evidence;
    const current = Array.isArray(evidenceFile) ? evidenceFile[0] : evidenceFile;

    if (current && current.filepath && fs.existsSync(current.filepath)) {
      const result = await cloudinary.uploader.upload(current.filepath, {
        folder: 'liiystore-return-evidence',
      });
      evidenceUrl = result.secure_url;
    }

    // Data yang akan diupdate
    const dataUpdate = {
      status: 'Permintaan-Pengembalian',
      returnReason: reason,
    };

    if (evidenceUrl) {
      dataUpdate.returnEvidence = evidenceUrl;
    }

    console.log('🚀 Data untuk update:', dataUpdate);

    // Update ke database
    const updatedOrder = await prisma.order.update({
      where: { id: parsedOrderId },
      data: dataUpdate,
    });

    return res.status(200).json({ success: true, order: updatedOrder });
  } catch (err) {
    console.error('❌ Error di /api/order-return:');
    console.error('Error Full:', err);
    console.error('Error Stack:', err.stack);
    return res.status(500).json({
      success: false,
      message: 'Gagal memproses pengembalian.',
      error: err?.message || 'Unknown error',
      full: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    });
  }
}
