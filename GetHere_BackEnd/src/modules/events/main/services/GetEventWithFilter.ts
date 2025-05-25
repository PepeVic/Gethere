import sequelize from '../../../../config/sequelize-config';
import { EventModel } from '../../../../modules/events/domain/Event';
import { EventFilterRequest } from '../../../../modules/events/infra/database/entities/EventFilterRequest';
import { Service } from '../../../../shared/domain/IService';
import { NotFoundError } from '../../../../shared/errors/NotFoundError';
import { QueryTypes } from 'sequelize';

export class GetEventWithFilter
  implements Service<EventFilterRequest, EventModel[]>
{
  async Run({ group, name }: EventFilterRequest): Promise<EventModel[]> {
    const whereStatement: string[] = [];

    if (name) {
      whereStatement.push(`lower(nome_evento) like '%${name}%'`);
    }

    if (group) {
      whereStatement.push(`lower(g.grupo) like '%${group}%'`);
    }

    const events = await sequelize.query<EventModel>(
      `
      select * from eventos.evento e
        inner join eventos.grupo g  on g.id_grupo  = e.id_grupo
      where ${whereStatement.join('AND ')}`,
      {
        nest: true,
        type: QueryTypes.SELECT,
      }
    );

    if (!events) throw new NotFoundError('Event not found');

    return events;
  }
}
