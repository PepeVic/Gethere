import sequelize from '../../../../../config/sequelize-config';
import { HostModel } from '../../../../../modules/events/domain/Host';
import { DataTypes } from 'sequelize';

const HostEntity = sequelize.define<HostModel>(
  'apresentador',
  {
    id_apresentador: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    id_ramo: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);

export default HostEntity;
