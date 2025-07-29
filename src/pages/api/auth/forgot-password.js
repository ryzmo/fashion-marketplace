import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { transporter } from '../../../../lib/mailer'; // tetap pakai transporter yang sudah kamu buat

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email wajib diisi' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Email tidak ditemukan' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' }); // Token berlaku 15 menit
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;

    const mailOptions = {
      from: `"Liiystore Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Reset Password Anda',
      text: `Halo ${user.name},

Kami menerima permintaan untuk reset password akun Anda.
Klik link berikut untuk mengatur password baru:

${resetLink}

Link ini hanya berlaku selama 15 menit.

Jika Anda tidak merasa meminta reset password, abaikan email ini.

Salam,
Tim Liiystore`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #333;">Halo ${user.name},</h2>
          <p style="font-size: 16px; color: #555;">
            Kami menerima permintaan untuk reset password akun Anda.
          </p>
          <p style="font-size: 16px; color: #555;">
            Silakan klik tombol di bawah ini untuk mengatur password baru:
          </p>
          <p style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" target="_blank" rel="noopener noreferrer" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
          </p>
          <p style="font-size: 14px; color: #888;">
            Link ini hanya berlaku selama 15 menit. Jika Anda tidak meminta reset password, abaikan email ini.
          </p>
          <hr style="margin: 30px 0;" />
          <p style="font-size: 14px; color: #888;">
            Salam hangat,<br /><strong>Tim Liiystore</strong>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email reset password telah dikirim' });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan, coba lagi nanti' });
  }
}
