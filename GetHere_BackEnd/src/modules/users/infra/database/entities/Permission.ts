import sequelize from '../../../../../config/sequelize-config';
import { PermissionModel } from '../../../../../modules/users/domain/Permission';
import { DataTypes } from 'sequelize';

const PermissionEntity = sequelize.define<PermissionModel>(
  'permissionamento',
  {
    id_usuario: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },

    id_grupo_usuario: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'usuarios',
  }
);

export default PermissionEntity;
