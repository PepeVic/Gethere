import { AddressModel } from '../../../events/domain/Address';
import AddressEntity from '../../../events/infra/database/entities/Address';
import AppError from '../../../../shared/errors/AppError';
import { BusinessRulesError } from '../../../../shared/errors/BusinessRulesError';
import { Request, Response } from 'express';

export default class AddressController {
  public getAll = async (
    request: Request,
    response: Response
  ): Promise<Response | undefined> => {
    const { rows: adresses, count } = await AddressEntity.findAndCountAll();

    return adresses
      ? response.status(200).json({ total: count, adresses })
      : response.status(404).json({ message: 'Addresses Not Found' });
  };

  public create = async (
    request: Request,
    response: Response
  ): Promise<Response | undefined> => {
    const { bairro, cidade, estado, logradouro, cep, numero }: AddressModel =
      request.body;

    if (!bairro || !cidade || !estado || !logradouro || !cep)
      throw new BusinessRulesError(
        'Required information to create Address not provided'
      );

    const addressCreated = await AddressEntity.create({
      bairro,
      cidade,
      estado,
      logradouro,
      cep,
      numero,
    });

    if (!addressCreated) {
      throw new AppError('Intern Error creating address');
    }

    return response.status(200).json(addressCreated);
  };
}
