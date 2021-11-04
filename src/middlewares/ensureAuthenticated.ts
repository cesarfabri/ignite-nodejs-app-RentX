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
    // pegar somente o sub
    const { sub: user_id } = verify(
      token,
      process.env.SECRET_JWT,
    ) as IPayload;

    // console.log(sub);
    const usersRepository = new UsersRepository();

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
