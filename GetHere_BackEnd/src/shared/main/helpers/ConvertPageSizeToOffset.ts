import { PaginationOffSet, PaginationPage } from '../../domain/Pagination';

export const convert = ({
  page,
  pageSize,
}: PaginationPage): PaginationOffSet => {
  const offset = (+page - 1) * +pageSize;
  return {
    offset,
    limit: +offset + +pageSize,
  };
};
