// middleware/withApiAuth.js
import { verifyUser } from '../lib/auth';

export function withApiAuth(handler) {
  return async (req, res) => {
    const user = verifyUser(req);

    if (!user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    req.user = user; // inject ke request
    return handler(req, res); // ✅ HARUS pakai return handler
  };
}
