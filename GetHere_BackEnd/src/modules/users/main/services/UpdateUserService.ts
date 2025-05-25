import { UserModel } from '../../../../modules/users/domain/User';
import UsuarioEntity from '../../../../modules/users/infra/database/entities/User';
import { UserRepository } from '../../../../modules/users/infra/database/repositories/UserRepository';
import { Service } from '../../../../shared/domain/IService';
import { NotFoundError } from '../../../../shared/errors/NotFoundError';

interface UpdateUserRequest {
  id: string;
  infoToBeUpdated: Partial<UserModel>;
}

export class UpdateUserService
  implements Service<UpdateUserRequest, UserModel | null>
{
  async Run({
    id,
    infoToBeUpdated,
  }: UpdateUserRequest): Promise<UserModel | null> {
    const repository = new UserRepository();

    let user = await repository.GetUserById(id);

    if (!user) throw new NotFoundError('User not found');

    user = { ...user, ...infoToBeUpdated } as UserModel;

    await repository.Update(id, infoToBeUpdated);

    const userFound = await UsuarioEntity.findByPk(id);

    return userFound;
  }
}
