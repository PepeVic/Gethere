import sequelize from '../../../../../config/sequelize-config';
import { ActivityRealizationModel } from '../../../../../modules/events/domain/ActivityRealization';
import { DataTypes } from 'sequelize';
import AttendanceEntity from './Attendance';
import PlaceEntity from './Place';

const ActivityRealizationEntity = sequelize.define<ActivityRealizationModel>(
  'realizacao_atividade',
  {
    id_realizacao_atividade: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },

    id_atividade: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    id_local: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);
ActivityRealizationEntity.hasMany(AttendanceEntity, {
  foreignKey: 'id_realizacao_atividade',
});
ActivityRealizationEntity.belongsTo(PlaceEntity, {
  foreignKey: 'id_local',
});

export default ActivityRealizationEntity;
