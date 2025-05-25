import sequelize from '../../../../../config/sequelize-config';
import { CompanyOrganizersModel } from '../../../domain/CompanyOrganizers';
import { DataTypes } from 'sequelize';

const CompanyOrganizerEntity = sequelize.define<CompanyOrganizersModel>(
  'organizadores_empresa',
  {
    id_empresa: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    id_organizador: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'empresas',
  }
);

export default CompanyOrganizerEntity;
