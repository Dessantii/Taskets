import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

let prisma;

// Inicializa o Prisma apenas no ambiente do servidor
if (typeof window === 'undefined') {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
}

export default async function handler(req, res) {
 res.setHeader('Access-Control-Allow-Origin', '*'); // Permite todas as origens
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos
  const { method } = req;
  
  if (method === 'POST') {
    try {
      const { email, password, type } = req.body;

      if (!email || !password || !type) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      if (type === 'register') {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
          return res.status(409).json({ error: 'Usuário já registrado com este email' });
        }

        await prisma.user.create({
          data: { email, password: await bcrypt.hash(password, 10) },
        });

        return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
      }

      if (type === 'login') {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Retorne apenas os dados necessários do usuário
        res.status(200).json({ message: 'Autenticação bem-sucedida!' });
      } else {
      
        res.status(405).json({ error: 'Método não permitido' });
      };
    

      return res.status(400).json({ error: 'Tipo de operação inválido' });

  } catch (error) {
    console.error('Erro no handler:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
  }}