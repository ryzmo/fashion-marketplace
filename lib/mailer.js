import nodemailer from 'nodemailer';

// Setup transporter Gmail
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Fungsi untuk mengirim email WELCOME saat registrasi
export const sendWelcomeEmail = async (to, name) => {
  const mailOptions = {
    from: `"Liiystore Team" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Selamat datang di Liiystore, ${name}!`,
    text: `Halo ${name},

Terima kasih telah mendaftar di Liiystore.
Silakan login dan mulai berbelanja sekarang di https://www.liiystore.id/auth/login.

Salam,
Tim Liiystore`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
        <h2 style="color: #333;">Halo ${name},</h2>
        <p style="font-size: 16px; color: #555;">
          Terima kasih telah mendaftar di <strong>Liiystore</strong>. Kami sangat senang menyambutmu sebagai bagian dari komunitas kami.
        </p>
        <p style="font-size: 16px; color: #555;">
          Silakan <a href="www.liiystore.id/auth/login" target="_blank" rel="noopener noreferrer" style="color: #007bff;">login</a> dan mulai berbelanja sekarang 🚀
        </p>
        <hr style="margin: 30px 0;" />
        <p style="font-size: 14px; color: #888;">
          Jika kamu tidak merasa mendaftar, abaikan email ini.
        </p>
        <p style="font-size: 14px; color: #888;">Salam hangat,<br /><strong>Tim Liiystore</strong></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Fungsi untuk mengirim email RESET PASSWORD
export const sendResetPasswordEmail = async (to, name, resetLink) => {
  const mailOptions = {
    from: `"Liiystore Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Permintaan Reset Password di Liiystore`,
    text: `Halo ${name},

Kami menerima permintaan untuk reset password akun Anda.
Klik link berikut untuk mengatur password baru:

${resetLink}

Link ini hanya berlaku selama 15 menit.

Jika Anda tidak merasa meminta reset password, abaikan email ini.

Salam,
Tim Liiystore`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
        <h2 style="color: #333;">Halo ${name},</h2>
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
};

// Fungsi untuk kirim notifikasi ke admin saat ada pesanan baru
export const sendOrderNotificationToAdmins = async (adminEmails, orderId) => {
  const mailOptions = {
    from: `"Liiystore Notifikasi" <${process.env.EMAIL_USER}>`,
    to: adminEmails.join(','),
    subject: `📦 Pesanan Baru Masuk - Order #${orderId}`,
    text: `Pesanan baru telah dibuat dengan ID: #${orderId}. Silakan cek dashboard admin.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px;">
        <h2 style="color: #333;">📢 Pesanan Baru Masuk!</h2>
        <p style="font-size: 16px; color: #555;">
          Order ID: <strong>#${orderId}</strong>
        </p>
        <p style="font-size: 16px; color: #555;">
          Silakan login ke dashboard admin untuk meninjau detail pesanan dan mulai proses pengiriman.
        </p>
        <a href="https://www.liiystore.id/admin" style="display: inline-block; margin-top: 20px; padding: 10px 16px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
          Buka Dashboard Admin
        </a>
        <hr style="margin: 30px 0;" />
        <p style="font-size: 14px; color: #888;">Email ini otomatis dikirim oleh sistem Liiystore</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

