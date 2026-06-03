import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { usuarioRepository } from '../repositories/usuario.repository';
import { authMiddleware } from '../middleware/auth.middleware';
import { LoginDTO, RegisterDTO } from '../types/auth.types';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação e perfil do usuário
 */
 
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDTO'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Usuário ou e-mail já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
 
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza login e retorna token JWT
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Usuário ou senha inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
 
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Dados do usuário logado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Token inválido ou não fornecido
 */

router.post('/register', async (req: Request, res: Response) => {
  const { nome, usuario, email, senha, celular, altura, peso } = req.body as RegisterDTO;

  if (!nome || !usuario || !email || !senha) {
    res.status(400).json({ success: false, message: 'Campos obrigatórios: nome, usuario, email, senha.' });
    return;
  }

  const usuarioExiste = await usuarioRepository.findByUsuario(usuario);
  if (usuarioExiste) {
    res.status(400).json({ success: false, message: 'Nome de usuário já cadastrado.' });
    return;
  }

  const emailExiste = await usuarioRepository.findByEmail(email);
  if (emailExiste) {
    res.status(400).json({ success: false, message: 'E-mail já cadastrado.' });
    return;
  }

  const novoUsuario = await usuarioRepository.create({ nome, usuario, email, senha, celular, altura, peso });

  res.status(201).json({ success: true, data: novoUsuario });
});

router.post('/login', async (req: Request, res: Response) => {
  const { usuario, senha } = req.body as LoginDTO;
  console.log('Login attempt:', { usuario });
  console.log('Request body:', req.body);
  if (!usuario || !senha) {
    res.status(400).json({ success: false, message: 'Usuário e senha são obrigatórios.' });
    return;
  }

  const usuarioEncontrado = await usuarioRepository.findByUsuario(usuario);
  if (!usuarioEncontrado) {
    res.status(401).json({ success: false, message: 'Usuário ou senha inválidos.' });
    return;
  }

  const senhaCorreta = await usuarioRepository.verificarSenha(senha, usuarioEncontrado.senha);
  if (!senhaCorreta) {
    res.status(401).json({ success: false, message: 'Usuário ou senha inválidos.' });
    return;
  }

  const token = jwt.sign(
    { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario, email: usuarioEncontrado.email },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
  );

  res.json({
    success: true,
    data: {
      token,
      usuario: {
        id:      usuarioEncontrado.id,
        nome:    usuarioEncontrado.nome,
        usuario: usuarioEncontrado.usuario,
        email:   usuarioEncontrado.email,
      }
    }
  });
});

router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  const usuario = await usuarioRepository.findById(req.usuario!.id);
  res.json({ success: true, data: usuario });
});

export default router;