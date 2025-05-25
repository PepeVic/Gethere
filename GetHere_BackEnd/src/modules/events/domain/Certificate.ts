import { Model } from 'sequelize';
export interface CertificateModel extends Model {
  id_certificado: number;
  id_presenca: number;
  hash_certificado: string;
}
