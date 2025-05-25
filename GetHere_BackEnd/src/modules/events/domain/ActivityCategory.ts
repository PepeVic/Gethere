import { Model } from 'sequelize';

export interface ActivityCategoryModel extends Model {
  id_atividade: number;
  id_categoria: number;
}
