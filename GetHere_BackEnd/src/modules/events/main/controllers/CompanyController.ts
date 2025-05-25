import { CompanyModel } from '../../../companies/domain/Company';
import CompanyEntity from '../../../companies/infra/database/entities/Company';
import { PaginationPage } from '../../../../shared/domain/Pagination';
import { BusinessRulesError } from '../../../../shared/errors/BusinessRulesError';
import { convert } from '../../../../shared/main/helpers/ConvertPageSizeToOffset';
import { Request, Response } from 'express';
import { Op } from 'sequelize';

export default class CompanyController {
  public getAllCompanies = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const page = +(request.query.page as string) || 1;
    const pageSize = +(request.query.pagesize as string) || 25;

    let whereStatement;

    if (request.query.name) {
      whereStatement = {
        nome_fantasia: { [Op.iLike]: `%${request.query.name}%` },
      };
    }

    const { rows: companies, count } = await CompanyEntity.findAndCountAll({
      ...convert({ page, pageSize } as PaginationPage),
      where: whereStatement,
    });

    return !companies || !companies.length
      ? response.status(404).json({ message: 'Companies not Found' })
      : response.status(200).json({ total: count, companies });
  };

  public createCompanies = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const company: CompanyModel = request.body;

    if (!company || !company.cnpj || !company.nome_fantasia)
      throw new BusinessRulesError('Company information is missing');

    const companyFound = await CompanyEntity.findOne({
      where: { cnpj: company.cnpj },
    });

    if (companyFound) {
      throw new BusinessRulesError('Company already Exists');
    }

    const companyCreated = await CompanyEntity.create(company);

    return companyCreated
      ? response.status(200).json(companyCreated)
      : response
          .status(400)
          .json({ message: 'Was not possible create Company' });
  };
}
