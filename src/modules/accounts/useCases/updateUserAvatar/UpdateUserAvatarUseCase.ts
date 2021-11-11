// adicionar coluna avatar na tabela users
// refatorar entidade de user com a coluna avatar
// configurar upload do Multer
// criar regra de negócio do upload
// criar controller

import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    // não precisa validar o usuario. Através da rota autenticada já se faz a validação.
    const user = await this.usersRepository.findById(user_id);

    // remover o avatar antes de persistir
    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    // faz atualização com o avatar.
    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
