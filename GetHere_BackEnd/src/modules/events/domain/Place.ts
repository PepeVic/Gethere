import { Model } from 'sequelize';

export interface PlaceModel extends Model {
  id_local?: number;
  id_endereco: number;
  tipo: string;
  capacidade?: number;
  nome: string;
}
