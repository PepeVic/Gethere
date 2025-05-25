import sequelize from '../../../../../config/sequelize-config';
import { PlaceModel } from '../../../../../modules/events/domain/Place';
import { DataTypes } from 'sequelize';
import AddressEntity from './Address';

const PlaceEntity = sequelize.define<PlaceModel>(
  'local',
  {
    id_local: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_endereco: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    capacidade: {
      type: DataTypes.INTEGER,
    },
    nome: {
      type: DataTypes.STRING(255),
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);
PlaceEntity.belongsTo(AddressEntity, { foreignKey: 'id_endereco' });
export default PlaceEntity;
