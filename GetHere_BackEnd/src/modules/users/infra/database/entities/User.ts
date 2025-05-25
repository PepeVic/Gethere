import sequelize from '../../../../../config/sequelize-config';
import CompanyEntity from '../../../../../modules/companies/infra/database/entities/Company';
import CompanyOrganizerEntity from '../../../../../modules/companies/infra/database/entities/CompanyOrganizers';
import AttendanceEntity from '../../../../../modules/events/infra/database/entities/Attendance';
import { UserModel } from '../../../../../modules/users/domain/User';
import { DataTypes } from 'sequelize';
import PermissionEntity from './Permission';

const UsuarioEntity = sequelize.define<UserModel>(
  'usuario',
  {
    id_usuario: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    cpf: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: true,
    },
    imagem_perfil: {
      type: DataTypes.STRING(255),
      unique: false,
      allowNull: true,
    },
    data_nascimento: {
      type: DataTypes.DATE,
      allowNull: true,
      unique: false,
    },
    nome_usuario: DataTypes.STRING(255),
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'usuarios',
  }
);
UsuarioEntity.hasOne(CompanyOrganizerEntity, { foreignKey: 'id_organizador' });
UsuarioEntity.hasMany(AttendanceEntity, { foreignKey: 'id_participante' });
UsuarioEntity.hasMany(PermissionEntity, { foreignKey: 'id_usuario' });
UsuarioEntity.hasOne(CompanyEntity, { foreignKey: 'id_responsavel' });

export default UsuarioEntity;
