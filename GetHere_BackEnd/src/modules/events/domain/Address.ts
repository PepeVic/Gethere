import { Model } from 'sequelize';

export interface AddressModel extends Model {
  id_endereco: number;
  logradouro: string;
  cidade: string;
  estado: string;
  cep: string;
  bairro: string;
  numero: string;
}
