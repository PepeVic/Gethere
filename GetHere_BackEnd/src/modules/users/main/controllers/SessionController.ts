import AppError from '../../../../shared/errors/AppError';
import { Request, Response } from 'express';
import { LoginRegisterUserService } from '../services/LoginRegisterUserService';

// Metódo responsável por realizar o login/cadastro do usuário
export default async (req: Request, res: Response): Promise<Response> => {
  const { gtoken } = req.headers;

  const loginService = new LoginRegisterUserService();

  const usuario = await loginService.Run(gtoken as string);

  if (usuario == null)
    throw new AppError('User information could not be found', 400);

  return res.status(200).json(usuario);
};
