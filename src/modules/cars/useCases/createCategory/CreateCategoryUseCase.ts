import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
    // Principio de inversão de dependencia
    // Em vez de retornar o response, passa somente o erro.
    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!');
      // return response.status(400).json({ error: 'Category already exists!' });
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
