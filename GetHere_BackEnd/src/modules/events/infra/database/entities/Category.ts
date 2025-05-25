import sequelize from '../../../../../config/sequelize-config';
import { CategoryModel } from '../../../../../modules/events/domain/Category';
import { DataTypes } from 'sequelize';

const CategoryEntity = sequelize.define<CategoryModel>(
  'categoria',
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    categoria: {
      type: DataTypes.STRING(255),
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);

export default CategoryEntity;
