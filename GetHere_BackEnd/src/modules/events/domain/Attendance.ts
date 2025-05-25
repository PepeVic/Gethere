import { Model } from 'sequelize';

export interface AttendanceModel extends Model {
  id_presenca?: number;
  id_participante: number;
  id_atividade: number;
  data_inscricao?: Date;
  expirada?: Date;
}
