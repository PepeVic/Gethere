export interface CreateEventRequest {
  evento: EventCreate;
  atividades: ActivityCreateEvent[];
}

interface EventCreate {
  id_empresa: number;
  id_grupo: number;
  site_evento?: string;
  descricao_evento?: string;
  nome_evento: string;
  capacidade_evento?: number;
  id_sede: number;
}

interface ActivityCreateEvent {
  nome_atividade: string;
  data_inicial: Date;
  data_final: Date;
  capacidade_participantes: number;
  descricao_atividade: string;
  id_categoria: number;
  locais: ActivityRealizationCreateEvent[];
  apresentadores: HostsCreateEvent[];
}

interface ActivityRealizationCreateEvent {
  id_local: number;
}
interface HostsCreateEvent {
  id_apresentador: number;
}
