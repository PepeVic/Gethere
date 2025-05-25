import sequelize from '../../../../../config/sequelize-config';
import { ActivityHostsModel } from '../../../../../modules/events/domain/ActivityHosts';
import { DataTypes } from 'sequelize';
import HostEntity from './Host';

const ActivityHostsEntity = sequelize.define<ActivityHostsModel>(
  'atividade_apresentadores',
  {
    id_atividade: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },

    id_apresentador: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);
ActivityHostsEntity.belongsTo(HostEntity, { foreignKey: 'id_apresentador' });

export default ActivityHostsEntity;
