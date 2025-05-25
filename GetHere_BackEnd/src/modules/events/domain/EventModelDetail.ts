import { CompanyModel } from '../../../modules/companies/domain/Company';
import { ActivityCategoryModel } from './ActivityCategory';
import { ActivityHostsModel } from './ActivityHosts';
import { AddressModel } from './Address';
import { GroupModel } from './Group';

export interface EventModelDetail {
  id_evento?: number;
  id_empresa: number;
  id_grupo: number;
  site_evento?: string;
  descricao_evento?: string;
  nome_evento: string;
  capacidade_evento?: number;
  expirado?: boolean;
  timestamp_criacao?: Date;
  atividades?: AtividadeDetail[];
  grupo?: GroupModel;
  empresa?: CompanyModel;
  sedes?: VunueModelDetail[];
  teste: string;
}

interface AtividadeDetail {
  id_atividade: number;
  id_evento: number;
  id_local: number;
  nome_atividade: string;
  data_inicial: Date;
  data_final: Date;
  capacidade_participantes: number;
  descricao_atividade: string;
  realizacao_atividades?: ActivityRealizationDetail[];
  atividade_categoria?: ActivityCategoryModel[];
  atividade_apresentadores?: ActivityHostsModel[];
}

interface VunueModelDetail {
  id_sede?: number;
  id_evento: number;
  id_endereco: number;
  data_inicial: Date;
  data_final: Date;
  endereco: AddressModel;
}

interface ActivityRealizationDetail {
  id_realizacao_atividade: number;
  id_atividade: number;
  id_local: number;
  quantidadePresencas: number;
  inscrito: boolean;
  local?: PlaceModelDetail;
}

interface PlaceModelDetail {
  id_local?: number;
  id_endereco: number;
  tipo: string;
  capacidade?: number;
  nome: string;
  endereco: AddressModel;
}
