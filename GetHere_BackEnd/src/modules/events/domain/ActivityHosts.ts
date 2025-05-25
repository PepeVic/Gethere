import { Model } from 'sequelize';

export interface ActivityHostsModel extends Model {
  id_atividade: number;
  id_apresentador: number;
}
