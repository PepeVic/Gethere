import sequelize from '../../../../../config/sequelize-config';
import CompanyEntity from '../../../../../modules/companies/infra/database/entities/Company';
import { EventModel } from '../../../../../modules/events/domain/Event';
import { DataTypes, Sequelize } from 'sequelize';
import ActivityEntity from './Activity';
import GroupEntity from './Group';
import VenueEntity from './Venue';

const EventEntity = sequelize.define<EventModel>(
  'evento',
  {
    id_evento: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_empresa: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_grupo: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    site_evento: {
      type: DataTypes.STRING(255),
    },
    descricao_evento: {
      type: DataTypes.STRING(255),
    },
    nome_evento: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    capacidade_evento: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    expirado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    timestamp_criacao: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);
EventEntity.hasMany(ActivityEntity, { foreignKey: 'id_evento' });
EventEntity.hasMany(VenueEntity, { foreignKey: 'id_evento' });
EventEntity.belongsTo(GroupEntity, { foreignKey: 'id_grupo' });
EventEntity.hasMany(CompanyEntity, { foreignKey: 'id_empresa' });

export default EventEntity;
