import sequelize from '../../../../../config/sequelize-config';
import { ActivityCategoryModel } from '../../../../../modules/events/domain/ActivityCategory';
import { DataTypes } from 'sequelize';
import CategoryEntity from './Category';

const ActivityCategoryEntity = sequelize.define<ActivityCategoryModel>(
  'atividade_categoria',
  {
    id_atividade: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },

    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    schema: 'eventos',
  }
);
ActivityCategoryEntity.belongsTo(CategoryEntity, {
  foreignKey: 'id_categoria',
});

export default ActivityCategoryEntity;
