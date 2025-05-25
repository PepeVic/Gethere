import sequelize from '../../../../../config/sequelize-config';
import { CompanyModel } from '../../../../../modules/companies/domain/Company';
import { DataTypes } from 'sequelize';
import CompanyOrganizerEntity from './CompanyOrganizers';

const CompanyEntity = sequelize.define<CompanyModel>(
  'empresa',
  {
    id_empresa: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_responsavel: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    site: {
      type: DataTypes.STRING(255),
    },
    cnpj: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    nome_fantasia: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
    },
    telefone: {
      type: DataTypes.STRING(255),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'empresas',
  }
);
CompanyEntity.hasOne(CompanyOrganizerEntity, { foreignKey: 'id_empresa' });

export default CompanyEntity;
