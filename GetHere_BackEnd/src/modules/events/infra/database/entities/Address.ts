import sequelize from '../../../../../config/sequelize-config';
import { AddressModel } from '../../../../../modules/events/domain/Address';
import { DataTypes } from 'sequelize';

const AddressEntity = sequelize.define<AddressModel>(
  'endereco',
  {
    id_endereco: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    logradouro: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    cidade: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    estado: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    cep: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    bairro: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    numero: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);

export default AddressEntity;
