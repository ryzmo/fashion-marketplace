// File: src/pages/api/me.js
import { verifyUser } from '../../../lib/auth'; // kamu sudah buat verifyUser

export default async function handler(req, res) {
  const user = verifyUser(req);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}
