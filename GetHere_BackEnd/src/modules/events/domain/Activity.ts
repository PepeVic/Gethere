import { Model } from 'sequelize';

export interface ActivityModel extends Model {
  id_atividade?: number;
  id_evento: number;
  id_local: number;
  nome_atividade: string;
  data_inicial: Date;
  data_final: Date;
  capacidade_participantes: number;
  descricao_atividade: string;
}
