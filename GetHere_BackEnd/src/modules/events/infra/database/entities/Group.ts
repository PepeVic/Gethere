import sequelize from '../../../../../config/sequelize-config';
import { GroupModel } from '../../../../../modules/events/domain/Group';
import { DataTypes } from 'sequelize';

const GroupEntity = sequelize.define<GroupModel>(
  'grupo',
  {
    id_grupo: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    grupo: {
      type: DataTypes.STRING(255),
    },
    icone: {
      type: DataTypes.STRING(255),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);

export default GroupEntity;
