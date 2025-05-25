import { SubscribeRequest } from '../../../events/domain/SubscribeRequest';
import { BusinessRulesError } from '../../../../shared/errors/BusinessRulesError';
import { Request, Response } from 'express';
import { SubscribeUserInActivityService } from '../services/SubscribeUserInActivity';
import { UnsubscribeUserInActivityService } from '../services/UnsubscribeUserInActivity';
import getTokenPayload from '../../../../shared/main/helpers/validateGoogleToken';

export default class ActivityController {
  public subscribe = async (
    request: Request,
    response: Response
  ): Promise<Response | undefined> => {
    const { id_atividade, id_local }: SubscribeRequest = request.body;

    if (!id_atividade || !id_local)
      throw new BusinessRulesError('Activity Id and or Place Id is missing');

    const payload = await getTokenPayload(request.headers.gtoken as string);

    if (!payload || !payload.email) {
      throw new Error('Email is required');
    }

    const service = new SubscribeUserInActivityService();

    const { attendance, message } = await service.Run({
      id_atividade,
      id_local,
      email: payload.email as string,
    });

    return attendance
      ? response.status(201).json(attendance)
      : response.status(400).json({ message });
  };

  public unsubscribe = async (
    request: Request,
    response: Response
  ): Promise<Response | undefined> => {
    const { id_atividade, id_local }: SubscribeRequest = request.body;

    if (!id_atividade || !id_local)
      throw new BusinessRulesError('Activity Id and or Place Id is missing');

    const payload = await getTokenPayload(request.headers.gtoken as string);

    if (!payload || !payload.email) {
      throw new Error('Email is required');
    }

    const service = new UnsubscribeUserInActivityService();

    const message = await service.Run({
      id_atividade,
      id_local,
      email: payload.email as string,
    });

    return !message
      ? response.status(201).json()
      : response.status(400).json({ message });
  };
}
