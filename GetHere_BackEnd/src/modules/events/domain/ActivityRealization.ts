import { Model } from 'sequelize';

export interface ActivityRealizationModel extends Model {
  id_realizacao_atividade: number;
  id_atividade: number;
  id_local: number;
}
