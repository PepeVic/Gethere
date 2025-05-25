import { Model } from 'sequelize';
export interface CompanyModel extends Model {
  id_empresa?: number;
  id_responsavel: number;
  site?: string;
  cnpj: string;
  nome_fantasia: string;
  email?: string;
  telefone?: string;
}
