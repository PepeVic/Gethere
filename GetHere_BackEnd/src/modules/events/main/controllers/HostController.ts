import { HostModel } from '../../../events/domain/Host';
import HostEntity from '../../../events/infra/database/entities/Host';
import { Request, Response } from 'express';

export default class HostController {
  public getAllHosts = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    let foundHosts: HostModel[] = [];

    await HostEntity.findAll().then((hostes) => (foundHosts = hostes));

    return !foundHosts || !foundHosts.length
      ? response.status(404).json({ message: 'Nenhum apresentador encontrado' })
      : response.status(200).json(foundHosts);
  };

  public createHost = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    let createdHost: HostModel | null = null;

    const hostFromRequest = {
      id_ramo: request.body.id_ramo,
      nome: request.body.nome,
    };

    let error: Error | null = null;

    await HostEntity.create(hostFromRequest)
      .then((host) => (createdHost = host))
      .catch((err) => (error = err));

    if (error) console.error(error);

    return error
      ? response.status(500).json({
          message: 'Algo deu errado durante a criação do apresentador',
        })
      : response.status(200).json(createdHost);
  };
}
