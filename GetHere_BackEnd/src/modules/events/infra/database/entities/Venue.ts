import sequelize from '../../../../../config/sequelize-config';
import { VenueModel } from '../../../../../modules/events/domain/Venue';
import { DataTypes } from 'sequelize';
import AddressEntity from './Address';

const VenueEntity = sequelize.define<VenueModel>(
  'sede',
  {
    id_sede: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_evento: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_endereco: {
      type: DataTypes.BIGINT,
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
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);
VenueEntity.belongsTo(AddressEntity, { foreignKey: 'id_endereco' });

export default VenueEntity;
