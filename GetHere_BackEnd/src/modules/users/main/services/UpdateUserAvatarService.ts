import { configUpload } from '../../../../config/upload';
import { UserModel } from '../../../../modules/users/domain/User';
import { UserRepository } from '../../../../modules/users/infra/database/repositories/UserRepository';
import { Service } from '../../../../shared/domain/IService';
import AppError from '../../../../shared/errors/AppError';
import { NotFoundError } from '../../../../shared/errors/NotFoundError';
import fs from 'fs';
import path from 'path';

interface UpdateUserAvatarRequest {
  user_id: string;
  filename?: string;
}

export class UpdateUserAvatarService
  implements Service<UpdateUserAvatarRequest, UserModel>
{
  async Run({
    user_id,
    filename,
  }: UpdateUserAvatarRequest): Promise<UserModel> {
    const userRepository = new UserRepository();

    const user = await userRepository.GetUserById(user_id);

    if (!user) {
      throw new NotFoundError('User Not Found');
    }

    if (user.imagem_perfil) {
      // DELETANDO AVATAR ANTERIOR DO USUÁRIO

      // join(path até a pasta tmp + nome do arquivo a deletar)
      const userAvatarFilePath = path.join(
        configUpload.directoryTmp,
        user.imagem_perfil
      );

      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.imagem_perfil = filename || '';

    const userUpdated = await userRepository.Update(
      user.id_usuario as string,
      user
    );

    if (!userUpdated) throw new AppError('Error updating user');

    return userUpdated;
  }
}
