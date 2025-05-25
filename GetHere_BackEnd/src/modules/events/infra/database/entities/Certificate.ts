import sequelize from '../../../../../config/sequelize-config';
import { CertificateModel } from '../../../../../modules/events/domain/Certificate';
import { DataTypes } from 'sequelize';

const CertificateEntity = sequelize.define<CertificateModel>(
  'certificado',
  {
    id_certificado: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    id_presenca: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    hash_certificado: {
      type: DataTypes.UUID,
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

export default CertificateEntity;
