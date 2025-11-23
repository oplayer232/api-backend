import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { z } from 'zod';

const authService = new AuthService();

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export class AuthController {
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Registrar novo usuário
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               name:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   */
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = registerSchema.parse(req.body);
      const user = await authService.register(email, password, name);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Fazer login
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login realizado com sucesso
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const result = await authService.login(email, password);
      return res.json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}