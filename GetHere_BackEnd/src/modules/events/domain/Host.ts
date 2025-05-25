import { Model } from 'sequelize';
export interface HostModel extends Model {
  id_apresentador: number;
  nome: string;
  id_ramo: number;
}
