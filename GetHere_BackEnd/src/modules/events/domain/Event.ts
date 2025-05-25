import { Model } from 'sequelize';
export interface EventModel extends Model {
  id_evento?: number;
  id_empresa: number;
  id_grupo: number;
  site_evento?: string;
  descricao_evento?: string;
  nome_evento: string;
  capacidade_evento?: number;
  expirado?: boolean;
  timestamp_criacao?: Date;
}
