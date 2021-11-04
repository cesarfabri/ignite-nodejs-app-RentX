import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';

// interface IResponse {
//   id: string;
//   name: string;
//   email: string;
//   driver_license: string;
//   avatar: string;
// }

@injectable()
class ListUsersUseCase {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.list();
    return users;
  }
}

export { ListUsersUseCase };
