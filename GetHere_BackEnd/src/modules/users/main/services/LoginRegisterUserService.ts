import { UserModel } from '../../../../modules/users/domain/User';
import UsuarioEntity from '../../../../modules/users/infra/database/entities/User';
import { UserRepository } from '../../../../modules/users/infra/database/repositories/UserRepository';
import { Service } from '../../../../shared/domain/IService';
import validateGoogleToken from '../../../../shared/main/helpers/validateGoogleToken';
import { TokenPayload } from 'google-auth-library';

export class LoginRegisterUserService
  implements Service<string, UserModel | null>
{
  async Run(parameter: string): Promise<UserModel | null> {
    const token = parameter;

    // validar token e retornar email do User
    const tokenPayload: TokenPayload = await validateGoogleToken(
      token as string
    );

    const userRepository: UserRepository = new UserRepository();

    // Buscar na base o usuario pelo email para verificar se existe
    const userFound = await userRepository.GetUserByEmail(
      tokenPayload.email || ''
    );

    if (userFound) return userFound;

    return await UsuarioEntity.create({
      email: tokenPayload.email || '',
      nome_usuario: tokenPayload.name || '',
      imagem_perfil: tokenPayload.picture || '',
      data_nascimento: '1500-04-22 01:00:00',
    });
  }
}
