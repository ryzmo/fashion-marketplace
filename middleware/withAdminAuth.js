import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export function withAdminAuth(gssp) {
  return async (context) => {
    const { req } = context;
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
      return {
        redirect: { destination: '/auth/login-admin', permanent: false },
      };
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== 'admin') {
        return {
          redirect: { destination: '/auth/login-admin', permanent: false },
        };
      }

      return gssp ? gssp(context) : { props: { admin: decoded } };
    } catch (err) {
      return {
        redirect: { destination: '/auth/login-admin', permanent: false },
      };
    }
  };
}
