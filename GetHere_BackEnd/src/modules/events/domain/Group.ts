import { Model } from 'sequelize';

export interface GroupModel extends Model {
  id_grupo?: number;
  grupo: string;
  icone: string;
}
