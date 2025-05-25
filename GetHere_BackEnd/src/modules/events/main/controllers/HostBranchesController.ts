import { HostBranchModel } from '../../../events/domain/HostBranch';
import HostBranchEntity from '../../../events/infra/database/entities/HostBranch';
import AppError from '../../../../shared/errors/AppError';
import { BusinessRulesError } from '../../../../shared/errors/BusinessRulesError';
import { Request, Response } from 'express';

export default class HostBranchController {
  public getAll = async (
    request: Request,
    response: Response
  ): Promise<Response | undefined> => {
    const { rows: hostBranches, count } =
      await HostBranchEntity.findAndCountAll();

    return hostBranches
      ? response.status(200).json({ total: count, hostBranches })
      : response.status(404).json({ message: 'Host Branch Not Found' });
  };

  public create = async (
    request: Request,
    response: Response
  ): Promise<Response | undefined> => {
    const { ramo }: HostBranchModel = request.body;

    if (!ramo) {
      throw new BusinessRulesError(
        'Required information to create Host Branch not provided'
      );
    }

    const hostBranchCreated = await HostBranchEntity.create({ ramo });

    if (!hostBranchCreated) {
      throw new AppError('Intern Error creating address');
    }

    return response.status(200).json(hostBranchCreated);
  };
}
