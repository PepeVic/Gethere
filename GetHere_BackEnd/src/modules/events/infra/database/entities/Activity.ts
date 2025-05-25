import sequelize from '../../../../../config/sequelize-config';
import { ActivityModel } from '../../../../../modules/events/domain/Activity';
import { DataTypes } from 'sequelize';
import ActivityCategoryEntity from './ActivityCategory';
import ActivityHostsEntity from './ActivityHosts';
import ActivityRealizationEntity from './ActivityRealization';

const ActivityEntity = sequelize.define<ActivityModel>(
  'atividade',
  {
    id_atividade: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    id_evento: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    nome_atividade: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    data_inicial: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    data_final: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    capacidade_participantes: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },

    descricao_atividade: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);
ActivityEntity.hasMany(ActivityRealizationEntity, {
  foreignKey: 'id_atividade',
});
ActivityEntity.hasMany(ActivityCategoryEntity, { foreignKey: 'id_atividade' });
ActivityEntity.hasMany(ActivityHostsEntity, { foreignKey: 'id_atividade' });

export default ActivityEntity;
