import sequelize from '../../../../../config/sequelize-config';
import { AttendanceModel } from '../../../../../modules/events/domain/Attendance';
import { DataTypes, Sequelize } from 'sequelize';
import CertificateEntity from './Certificate';

const AttendanceEntity = sequelize.define<AttendanceModel>(
  'presenca',
  {
    id_presenca: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_participante: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_realizacao_atividade: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    data_inscricao: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    expirada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);
AttendanceEntity.hasOne(CertificateEntity, { foreignKey: 'id_presenca' });

export default AttendanceEntity;
