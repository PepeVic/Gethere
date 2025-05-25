import { Model } from 'sequelize';

export interface AvailableEventsModel extends Model {
  id_evento: number;
  nome_evento: string;
  descricao_evento: string;
  site_evento: string;
  capacidade_evento: number;
  id_grupo: number;
  grupo: string;
  timestamp_criacao: Date;
}
