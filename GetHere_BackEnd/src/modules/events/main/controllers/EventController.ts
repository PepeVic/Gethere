import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import sequelize from '../../../../config/sequelize-config';
import { PaginationPage } from '../../../../shared/domain/Pagination';
import AppError from '../../../../shared/errors/AppError';
import { BusinessRulesError } from '../../../../shared/errors/BusinessRulesError';
import { NotFoundError } from '../../../../shared/errors/NotFoundError';
import { convert } from '../../../../shared/main/helpers/ConvertPageSizeToOffset';
import getTokenPayload from '../../../../shared/main/helpers/validateGoogleToken';
import { CreateEventRequest } from '../../../events/domain/CreateEventRequest';
import { EventModel } from '../../../events/domain/Event';
import ActivityEntity from '../../../events/infra/database/entities/Activity';
import ActivityCategoryEntity from '../../../events/infra/database/entities/ActivityCategory';
import ActivityHostsEntity from '../../../events/infra/database/entities/ActivityHosts';
import ActivityRealizationEntity from '../../../events/infra/database/entities/ActivityRealization';
import EventEntity from '../../../events/infra/database/entities/Event';
import { EventFilterRequest } from '../../../events/infra/database/entities/EventFilterRequest';
import UsuarioEntity from '../../../users/infra/database/entities/User';
import {
  GetDetailedEventService,
  GetEventDetailedRequest,
} from '../services/GetDetailedEventService';
import { GetEventWithFilter } from '../services/GetEventWithFilter';

export default class EventController {
  public getAvailableEvents = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const page = +(request.query.page as string) || 1;
    const pageSize = +(request.query.pagesize as string) || 5;

    const { rows: events, count } = await EventEntity.findAndCountAll({
      ...convert({ page, pageSize } as PaginationPage),
    });

    return !events || !events.length
      ? response.status(404).json({ message: 'Eventos não encontrados' })
      : response.status(200).json({ total: count, events });
  };

  public getEventFilter = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { name, group } = request.query;

    const filters = {
      name: name || '',
      group: group || '',
    } as EventFilterRequest;

    const service = new GetEventWithFilter();
    const eventsFounded: EventModel[] = await service.Run(filters);

    return !eventsFounded || !eventsFounded.length
      ? response.status(404).json({ message: 'Evento não encontrado :/' })
      : response.status(200).json(eventsFounded);
  };

  public getEventById = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { id } = request.params;
    const { email } = request.query;

    if (!id) throw new BusinessRulesError('Event ID is missing');

    const service = new GetDetailedEventService();

    const eventDetailed = await service.Run({
      id_evento: +id,
      email,
    } as GetEventDetailedRequest);

    return eventDetailed
      ? response.status(200).json(eventDetailed)
      : response.status(404).json({ message: 'No event provided' });
  };

  public getEventsParticipated = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const payload = await getTokenPayload(request.headers.gtoken as string);

    if (!payload || !payload.email) {
      throw new Error('Email is required');
    }

    const userFound = await UsuarioEntity.findOne({
      where: { email: payload.email },
    });

    if (!userFound) {
      throw new NotFoundError('User Not Found');
    }

    const id_usuario = userFound.id_usuario;

    const eventsFounded = await sequelize.query<EventModel>(
      `
      select * from eventos.evento e
      inner join eventos.atividade a  on a.id_evento  = e.id_evento
      inner join eventos.realizacao_atividade ra  on ra.id_atividade = a.id_atividade
      inner join eventos.presenca p on p.id_realizacao_atividade = ra.id_realizacao_atividade
      where p.id_participante = ${id_usuario}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    return !eventsFounded
      ? response.status(404).json({ message: 'Evento não encontrado :/' })
      : response.status(200).json(eventsFounded);
  };

  public createEvent = async (
    request: Request,
    response: Response
  ): Promise<Response | undefined> => {
    const { evento, atividades }: CreateEventRequest = request.body;

    this.validations({ evento, atividades });

    // Criando Evento
    const eventCreated = await EventEntity.create(evento);

    if (!eventCreated) {
      throw new AppError('Error creating Event');
    }

    for (const activity of atividades) {
      if (!activity.locais.length) {
        throw new BusinessRulesError(
          'At least one Place is required to create an Activity'
        );
      }

      // Cria Atividade
      const activityCreated = await ActivityEntity.create({
        ...activity,
        id_evento: eventCreated.id_evento,
      });

      if (!activityCreated) {
        throw new AppError('Error creating activity');
      }

      const id_atividade = activityCreated.id_atividade;

      // Cria realizacao_atividade
      for (const local of activity.locais) {
        const activityRealization = await ActivityRealizationEntity.create({
          id_atividade,
          id_local: local.id_local,
        });

        if (!activityRealization) {
          throw new AppError('Error creating activityRealization');
        }
      }

      // Criar atividade_apresentador
      for (const apresentador of activity.apresentadores) {
        const activityHost = await ActivityHostsEntity.create({
          id_atividade,
          id_apresentador: apresentador.id_apresentador,
        });

        if (!activityHost) {
          throw new AppError('Error creating activityHost');
        }
      }

      // Criar atividade_categoria
      const activityCategory = await ActivityCategoryEntity.create({
        id_atividade,
        id_categoria: activity.id_categoria,
      });

      if (!activityCategory) {
        throw new AppError('Error creating activityCategory');
      }

      const id_evento = eventCreated.id_evento || 0;

      const service = new GetDetailedEventService();
      const eventFound = await service.Run({ id_evento, email: '' });

      return eventFound
        ? response.status(200).json(eventFound)
        : response.status(400).json({ message: 'Error getting created Event' });
    }
  };

  private validations({ evento, atividades }: CreateEventRequest): void {
    if (!evento) {
      throw new BusinessRulesError('Event information is missing');
    }

    if (!atividades) {
      throw new BusinessRulesError(
        'At least one Activity is required to create an Event'
      );
    }

    if (!evento.id_grupo) {
      throw new BusinessRulesError('id_grupo is required');
    }
  }
}
