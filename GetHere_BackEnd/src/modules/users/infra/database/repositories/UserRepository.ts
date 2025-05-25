import { UserModel } from '../../../../../modules/users/domain/User';
import UsuarioEntity from '../../../../../modules/users/infra/database/entities/User';

export class UserRepository {
  public async CreateUser(user: UserModel): Promise<UserModel> {
    return await UsuarioEntity.create(user);
  }

  public async GetUserByEmail(email: string): Promise<UserModel | null> {
    const userInstance = await UsuarioEntity.findOne({
      where: { email },
      raw: true,
      nest: true,
    });
    return userInstance;
  }

  public async GetUserById(id: string | number): Promise<UserModel | null> {
    return await UsuarioEntity.findByPk(id);
  }

  public async Update(
    id_usuario: string | number,
    newInfo: Partial<UserModel>
  ): Promise<UserModel | null> {
    await UsuarioEntity.update(newInfo, { where: { id_usuario } });
    return await this.GetUserById(id_usuario);
  }
}
