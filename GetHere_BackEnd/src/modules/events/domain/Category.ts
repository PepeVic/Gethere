import { Model } from 'sequelize';
export interface CategoryModel extends Model {
  id_categoria: number;
  categoria: string;
}
