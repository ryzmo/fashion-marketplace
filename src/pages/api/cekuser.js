import { verifyUser } from '../../../lib/auth';

export default function handler(req, res) {
  console.log('🍪 Cookie dari header:', req.headers.cookie); // LOG DI SINI!

  const user = verifyUser(req);

  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.status(401).json({ message: 'Belum login' });
  }
}
