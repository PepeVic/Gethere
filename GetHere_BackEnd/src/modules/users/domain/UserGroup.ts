import { Model } from 'sequelize';

export interface UserGroupModel extends Model {
  id_grupo_usuario: number;
  nome_grupo: string;
}
