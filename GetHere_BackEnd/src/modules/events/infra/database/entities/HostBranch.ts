import sequelize from '../../../../../config/sequelize-config';
import { HostBranchModel } from '../../../../../modules/events/domain/HostBranch';
import { DataTypes } from 'sequelize';
import HostEntity from './Host';

const HostBranchEntity = sequelize.define<HostBranchModel>(
  'apresentador_ramo',
  {
    id_ramo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    ramo: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);
HostBranchEntity.hasMany(HostEntity, { foreignKey: 'id_ramo' });

export default HostBranchEntity;
