import { UserModel } from '../../../../modules/users/domain/User';
import UsuarioEntity from '../../../../modules/users/infra/database/entities/User';
import { Service } from '../../../../shared/domain/IService';
import { BusinessRulesError } from '../../../../shared/errors/BusinessRulesError';
import { isCpfValid } from '../../../../shared/main/helpers/ValidateCpf';

export class CreateUserService implements Service<UserModel, UserModel | null> {
  async Run(userInfo: UserModel): Promise<UserModel | null> {
    const { validate, field } = this.isUserInformationValidate(userInfo);

    if (!validate) throw new BusinessRulesError(`${field} is not Valid`, 400);

    const userFound = await UsuarioEntity.findOne({
      where: { email: userInfo.email },
    });

    if (userFound) {
      throw new BusinessRulesError('User already exists');
    }

    const userCreated = await UsuarioEntity.create(userInfo);

    if (!userCreated) throw new BusinessRulesError('User could not be created');

    return userCreated;
  }

  private isUserInformationValidate(user: UserModel): {
    validate: boolean;
    field: string;
  } {
    if (!isCpfValid(user.cpf)) return { validate: false, field: 'CPF' };
    if (!user.nome_usuario) return { validate: false, field: 'Nome' };

    return { validate: true, field: '' };
  }
}
