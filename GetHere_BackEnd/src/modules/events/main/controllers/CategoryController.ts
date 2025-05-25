import CategoryEntity from '../../../events/infra/database/entities/Category';
import { PaginationPage } from '../../../../shared/domain/Pagination';
import { convert } from '../../../../shared/main/helpers/ConvertPageSizeToOffset';
import { Request, Response } from 'express';
import { CategoryModel } from '../../../events/domain/Category';
import { BusinessRulesError } from '../../../../shared/errors/BusinessRulesError';
export default class CategoryController {
  public getAllCategories = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const page = +(request.query.page as string) || 1;
    const pageSize = +(request.query.pagesize as string) || 25;

    const { rows: events, count } = await CategoryEntity.findAndCountAll({
      ...convert({ page, pageSize } as PaginationPage),
    });

    return !events || !events.length
      ? response.status(404).json({ message: 'Categories not Found' })
      : response.status(200).json({ total: count, events });
  };

  public createCategory = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { categoria }: CategoryModel = request.body;

    if (!categoria) {
      throw new BusinessRulesError('Category description is missing');
    }

    const categoryCreated = await CategoryEntity.create({ categoria });

    return !categoryCreated
      ? response.status(400).json({ message: 'Error Creating Category' })
      : response.status(200).json(categoryCreated);
  };
}
