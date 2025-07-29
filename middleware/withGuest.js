// middleware/withGuest.js
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

export function withGuest(handler) {
    return async (ctx) => {
      console.log('🟡 withGuest middleware masuk'); // ← Tambahan log
      const { req } = ctx;
      const cookies = req.headers.cookie;
      const parsed = cookies ? parse(cookies) : {};
      const token = parsed.token;
  
      if (token) {
        try {
          jwt.verify(token, process.env.JWT_SECRET);
          console.log('🔒 Token valid, redirect ke /');
          return {
            redirect: {
              destination: '/',
              permanent: false,
            },
          };
        } catch (err) {
          console.log('⚠️ Token tidak valid, lanjut ke halaman login');
        }
      }
  
      return handler(ctx);
    };
  }
  
