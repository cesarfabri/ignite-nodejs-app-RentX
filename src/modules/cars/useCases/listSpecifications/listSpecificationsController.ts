import { Request, Response } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';

import { ListSpecificationsUseCase } from './listSpecificationsUseCase';

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);

    const all = await listSpecificationsUseCase.execute();
    return response.json(all);
  }
}

export { ListSpecificationsController };
