import { Model } from 'sequelize';

export interface UserModel extends Model {
  id_usuario?: string;
  email: string;
  cpf: string;
  imagem_perfil: string;
  data_nascimento?: Date;
  nome_usuario: string;
}
