import * as cookie from 'cookie'; // ✅ FIXED
import jwt from 'jsonwebtoken';

export function verifyUser(req) {
  try {
    const cookieHeader = req?.headers?.cookie;

    if (!cookieHeader) {
      console.warn('⚠️ Tidak ada cookie di request');
      return null;
    }

    const parsed = cookie.parse(cookieHeader); // ✅ Tidak error lagi
    const token = parsed.token;

    if (!token) {
      console.warn('⚠️ Token tidak ditemukan');
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    console.log('✅ User decoded:', decoded);
    return decoded;
  } catch (err) {
    console.error('verifyUser error:', err.message);
    return null;
  }
}
