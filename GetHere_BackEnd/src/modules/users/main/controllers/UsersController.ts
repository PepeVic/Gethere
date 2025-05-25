import { BusinessRulesError } from '../../../../shared/errors/BusinessRulesError';
import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';
import { UpdateUserService } from '../services/UpdateUserService';

export default class UsersController {
  public updateUserAvatar = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.Run({
      user_id: request.body.id,
      filename: request.file?.filename,
    });

    return response.status(200).json(user);
  };

  public updateUser = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    if (!request.params.id) throw new BusinessRulesError('User ID is missing');

    const { id } = request.params;
    const service = new UpdateUserService();
    const userUpdated = await service.Run({
      id,
      infoToBeUpdated: request.body,
    });

    return response.status(200).json(userUpdated);
  };

  public createUser = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    if (!request.body?.user)
      throw new BusinessRulesError('User information not provided');

    const service = new CreateUserService();
    const userCreated = service.Run(request.body.user);

    return response.status(200).json(userCreated);
  };
}
