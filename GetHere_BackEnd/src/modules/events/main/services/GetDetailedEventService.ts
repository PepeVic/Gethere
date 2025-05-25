/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import CompanyEntity from '../../../../modules/companies/infra/database/entities/Company';
import { EventModelDetail } from '../../../../modules/events/domain/EventModelDetail';
import ActivityEntity from '../../../../modules/events/infra/database/entities/Activity';
import ActivityCategoryEntity from '../../../../modules/events/infra/database/entities/ActivityCategory';
import ActivityHostsEntity from '../../../../modules/events/infra/database/entities/ActivityHosts';
import ActivityRealizationEntity from '../../../../modules/events/infra/database/entities/ActivityRealization';
import AddressEntity from '../../../../modules/events/infra/database/entities/Address';
import AttendanceEntity from '../../../../modules/events/infra/database/entities/Attendance';
import CategoryEntity from '../../../../modules/events/infra/database/entities/Category';
import EventEntity from '../../../../modules/events/infra/database/entities/Event';
import GroupEntity from '../../../../modules/events/infra/database/entities/Group';
import HostEntity from '../../../../modules/events/infra/database/entities/Host';
import PlaceEntity from '../../../../modules/events/infra/database/entities/Place';
import VenueEntity from '../../../../modules/events/infra/database/entities/Venue';
import UsuarioEntity from '../../../../modules/users/infra/database/entities/User';
import { Service } from '../../../../shared/domain/IService';
import { NotFoundError } from '../../../../shared/errors/NotFoundError';

export interface GetEventDetailedRequest {
  id_evento: number;
  email: string;
}

export class GetDetailedEventService
  implements Service<GetEventDetailedRequest, EventModelDetail | null>
{
  private userId: number;

  async Run({
    id_evento,
    email,
  }: GetEventDetailedRequest): Promise<EventModelDetail | null> {
    if (email) {
      const user = await UsuarioEntity.findOne({
        where: { email },
      });

      if (user) this.userId = +(user.id_usuario || 0);
    }

    const event = (
      await EventEntity.findOne({
        where: { id_evento },
        include: [
          {
            model: ActivityEntity,
            as: 'atividades',
            include: [
              {
                model: ActivityRealizationEntity,
                as: 'realizacao_atividades',
                include: [
                  {
                    model: PlaceEntity,
                    include: [AddressEntity],
                  },
                ],
              },
              {
                model: ActivityCategoryEntity,
                as: 'atividade_categoria',
                include: [{ model: CategoryEntity }],
              },
              {
                model: ActivityHostsEntity,
                as: 'atividade_apresentadores',
                include: [{ model: HostEntity }],
              },
            ],
          },
          {
            model: GroupEntity,
            as: 'grupo',
          },
          {
            model: CompanyEntity,
            as: 'empresas',
          },
          {
            model: VenueEntity,
            as: 'sedes',
            include: [
              {
                model: AddressEntity,
              },
            ],
          },
        ],
      })
    )?.toJSON() as Partial<EventModelDetail>;

    if (!event) throw new NotFoundError('Event not found');

    return await this.fillActivities(event as EventModelDetail);
  }

  private fillActivities = async (
    event: EventModelDetail
  ): Promise<EventModelDetail> => {
    if (!event.atividades) {
      return event;
    }

    for (const activity of event.atividades) {
      if (!activity.realizacao_atividades) continue;

      if (!Array.isArray(activity.realizacao_atividades))
        activity.realizacao_atividades = [activity.realizacao_atividades];

      for (const realizationActivity of activity.realizacao_atividades) {
        // search if user is subscribed in activity
        if (this.userId && this.userId > 0) {
          const attendance = await AttendanceEntity.findOne({
            where: {
              id_participante: this.userId,
              id_realizacao_atividade:
                realizationActivity.id_realizacao_atividade,
            },
          });

          realizationActivity.inscrito = !!attendance;
        }

        // fill ActivityRealization with the attendance quantity
        realizationActivity.quantidadePresencas = await AttendanceEntity.count({
          where: {
            id_realizacao_atividade:
              realizationActivity.id_realizacao_atividade,
          },
        });
      }
    }
    return event;
  };
}
