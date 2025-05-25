import { SubscribeRequest } from '../../../../modules/events/domain/SubscribeRequest';
import ActivityRealizationEntity from '../../../../modules/events/infra/database/entities/ActivityRealization';
import AttendanceEntity from '../../../../modules/events/infra/database/entities/Attendance';
import UsuarioEntity from '../../../../modules/users/infra/database/entities/User';
import { Service } from '../../../../shared/domain/IService';
import { NotFoundError } from '../../../../shared/errors/NotFoundError';

export class UnsubscribeUserInActivityService
  implements Service<SubscribeRequest, string>
{
  async Run({
    id_atividade,
    id_local,
    email,
  }: SubscribeRequest): Promise<string> {
    const id_realizacao_atividade = await ActivityRealizationEntity.findOne({
      where: { id_atividade, id_local },
    }).then((activity) => activity?.id_realizacao_atividade);

    if (!id_realizacao_atividade) {
      return 'ActivityRealization Not Found';
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

    if (!attendanceFound) {
      return 'Attendance Not Found';
    }

    attendanceFound.destroy();
    attendanceFound.save();

    return '';
  }
}
