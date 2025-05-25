import { Model } from 'sequelize';

export interface CompanyOrganizersModel extends Model {
  id_empresa: number;
  id_organizador: number;
}
