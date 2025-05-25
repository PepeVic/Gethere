import { Model } from 'sequelize';

export interface PermissionModel extends Model {
  id_usuario: number;
  id_grupo_usuario: number;
}
