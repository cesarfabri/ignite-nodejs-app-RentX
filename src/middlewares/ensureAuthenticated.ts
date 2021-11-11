import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing', 401);
  }

  // retorno -> Bearer <toke>
  // na posição [0] = Bearer
  // na posição [1] = <token>

  // desestruturando array
  const [, token] = authHeader.split(' ');

  try {
    // const decoded = verify(token,
    // '131d2e377489c2f27fa608532cd92b3a12929421530b93f5ec63ed728550a0c4')

    // dentro do token vai ter o iat, exp e o sub que é o id do usuário
    // pegar somente o sub via interface IPayload
    const { sub: user_id } = verify(
      token,
      process.env.SECRET_JWT,
    ) as IPayload;

    // Para buscar se o usuário existe no BD
    const usersRepository = new UsersRepository();
    // via o user_id pego no token
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}
