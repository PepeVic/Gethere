import { GroupModel } from '../../../events/domain/Group';
import GroupEntity from '../../../events/infra/database/entities/Group';
import { Request, Response } from 'express';
import { Op } from 'sequelize';

export default class GroupController {
  public getGroupByName = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { name } = request.query;

    let gruposFounded: GroupModel[] = [];

    await GroupEntity.findAll({
      where: { grupo: { [Op.iLike]: `%${name}%` } },
    }).then((groups) => (gruposFounded = groups));

    return !gruposFounded || !gruposFounded.length
      ? response.status(404).json({ message: 'Grupo não encontrado' })
      : response.status(200).json(gruposFounded);
  };

  public getAllGroups = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    let foundGroups: GroupModel[] = [];

    await GroupEntity.findAll().then((groups) => (foundGroups = groups));

    return !foundGroups || !foundGroups.length
      ? response.status(404).json({ message: 'Nenhum grupo econtrado' })
      : response.status(200).json(foundGroups);
  };

  public createGroup = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    let createdGroup: GroupModel | null = null;

    const requestGroup = {
      grupo: request.body.nome,
      icone: request.body.icone,
    };

    let error: Error | null = null;

    await GroupEntity.create(requestGroup)
      .then((group) => (createdGroup = group))
      .catch((err) => (error = err));

    if (error) console.error(error);

    return error
      ? response
          .status(500)
          .json({ message: 'Algo deu errado durante a criação do grupo' })
      : response.status(200).json(createdGroup);
  };
}
