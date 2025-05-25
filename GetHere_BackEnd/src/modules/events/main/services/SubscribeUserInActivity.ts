import { AttendanceModel } from '../../../../modules/events/domain/Attendance';
import { SubscribeRequest } from '../../../../modules/events/domain/SubscribeRequest';
import ActivityRealizationEntity from '../../../../modules/events/infra/database/entities/ActivityRealization';
import AttendanceEntity from '../../../../modules/events/infra/database/entities/Attendance';
import UsuarioEntity from '../../../../modules/users/infra/database/entities/User';
import { Service } from '../../../../shared/domain/IService';
import { NotFoundError } from '../../../../shared/errors/NotFoundError';

export class SubscribeUserInActivityService
  implements
    Service<
      SubscribeRequest,
      { attendance: AttendanceModel | null; message: string }
    >
{
  async Run({ id_atividade, id_local, email }: SubscribeRequest): Promise<{
    attendance: AttendanceModel | null;
    message: string;
  }> {
    const id_realizacao_atividade =
      await ActivityRealizationEntity.findOrCreate({
        where: { id_atividade, id_local },
      }).then(([activity, _]) => activity.id_realizacao_atividade);

    if (!id_realizacao_atividade) {
      return {
        attendance: null,
        message: 'Error creating/getting ActivityRealization',
      };
    }

    const user = await UsuarioEntity.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundError('User Not Found');
    }

    const id_participante = user.id_usuario;

    const attendanceFound = await AttendanceEntity.findOne({
      where: { id_participante, id_realizacao_atividade },
    });

    if (attendanceFound) {
      return {
        attendance: null,
        message: 'Attendance already exists',
      };
    }

    const attendance = await AttendanceEntity.create({
      id_participante,
      id_realizacao_atividade,
    });

    if (!attendance) {
      return {
        attendance: null,
        message: 'Error creating Attendance',
      };
    }

    return { attendance, message: '' };
  }
}
