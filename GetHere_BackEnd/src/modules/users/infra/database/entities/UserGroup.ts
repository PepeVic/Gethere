import sequelize from '../../../../../config/sequelize-config';
import { UserGroupModel } from '../../../../../modules/users/domain/UserGroup';
import { DataTypes } from 'sequelize';
import PermissionEntity from './Permission';

const UserGroupEntity = sequelize.define<UserGroupModel>(
  'grupo_usuario',
  {
    id_grupo_usuario: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_grupo: {
      type: DataTypes.STRING(255),
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'usuarios',
  }
);
UserGroupEntity.hasMany(PermissionEntity, { foreignKey: 'id_grupo_usuario' });

export default UserGroupEntity;
