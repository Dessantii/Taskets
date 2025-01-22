import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { email, password, type } = req.body;

    try {
      if (type === 'register') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
          },
        });
        return res.status(201).json({ message: 'User registered!', user });
      }

      if (type === 'login') {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful', user });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
