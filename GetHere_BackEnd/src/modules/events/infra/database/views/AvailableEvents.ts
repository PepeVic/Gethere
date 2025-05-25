import sequelize from '../../../../../config/sequelize-config';
import { ActivityModel } from '../../../../../modules/events/domain/Activity';
import { DataTypes } from 'sequelize';

const AvailableEvents = sequelize.define<ActivityModel>(
  'eventos_disponiveis',
  {
    id_evento: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    nome_evento: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    decricao_evento: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    site_evento: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    capacidade_evento: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    id_grupo: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    grupo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    timestamp_criacao: {
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
export default AvailableEvents;
