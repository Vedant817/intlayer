import type { Request } from 'express';
import type { ObjectId } from 'mongoose';

const DEFAULT_PAGE_SIZE = 1000;
const DEFAULT_PAGE = 1;

type Filters = Record<string, string | string[] | ObjectId | ObjectId[]>;

export type FiltersAndPagination<T extends Filters> =
  | ({
      page?: string | number;
      pageSize?: string | number;
    } & T)
  | undefined;

export type FiltersAndPaginationResult<T extends Filters> = {
  filters: T;
  page: number;
  skip: number;
  pageSize: number;
  getNumberOfPages: (totalItems: number) => number;
};

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getFiltersAndPaginationFromBody = <T extends Filters>(
  req: Request<FiltersAndPagination<T>>
): FiltersAndPaginationResult<T> => {
  let filters = {} as T;
  let pageSize = DEFAULT_PAGE_SIZE;
  let page = DEFAULT_PAGE;

  const query = req.query as unknown as FiltersAndPagination<T>;

  if (typeof query === 'object') {
    const {
      pageSize: pageSizeRequest,
      page: pageRequest,
      ...filtersRequest
    } = query;

    if (typeof pageSizeRequest === 'string') {
      pageSize = parseInt(pageSizeRequest, 10);
    } else if (typeof pageSizeRequest === 'number') {
      pageSize = pageSizeRequest;
    }

    if (typeof pageRequest === 'string') {
      page = parseInt(pageRequest, 10);
    } else if (typeof pageRequest === 'number') {
      page = pageRequest;
    }

    if (filtersRequest && Object.keys(filtersRequest).length > 0) {
      filters = filtersRequest as T;
    }
  }

  const skip = (page - 1) * pageSize;

  const getNumberOfPages = (totalItems: number) =>
    Math.ceil(totalItems / pageSize);

  return {
    filters,
    skip,
    page,
    pageSize,
    getNumberOfPages,
  };
};
