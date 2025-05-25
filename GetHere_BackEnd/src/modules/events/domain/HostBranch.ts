import { Model } from 'sequelize';

export interface HostBranchModel extends Model {
  id_ramo: number;
  ramo: string;
}
