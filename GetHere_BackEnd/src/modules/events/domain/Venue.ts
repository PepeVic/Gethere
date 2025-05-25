import { Model } from 'sequelize';
export interface VenueModel extends Model {
  id_sede?: number;
  id_evento: number;
  id_endereco: number;
  data_inicial: Date;
  data_final: Date;
}
