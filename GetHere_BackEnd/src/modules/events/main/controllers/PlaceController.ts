import { PlaceModel } from '../../../events/domain/Place';
import PlaceEntity from '../../../events/infra/database/entities/Place';
import { Request, Response } from 'express';

export default class PlaceController {
  public getAllLocals = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    let foundPlaces: PlaceModel[] = [];

    await PlaceEntity.findAll().then((places) => {
      foundPlaces = places;
    });

    return !foundPlaces || !foundPlaces.length
      ? response.status(404).json({ message: 'Nenhum local encontrado' })
      : response.status(200).json(foundPlaces);
  };

  public createLocal = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    let createdLocal: PlaceModel | null = null;

    const localFromRequest = {
      id_endereco: request.body.id_endereco,
      tipo: request.body.tipo,
      capacidade: request.body.capacidade,
      nome: request.body.nome,
    };

    let error: Error | null = null;

    await PlaceEntity.create(localFromRequest)
      .then((local) => (createdLocal = local))
      .catch((err) => (error = err));

    if (error) console.error(error);

    return error
      ? response
          .status(500)
          .json({ message: 'Algo deu errado durante a criação do local' })
      : response.status(200).json(createdLocal);
  };
}
