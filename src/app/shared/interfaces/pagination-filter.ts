export interface PaginationFilter{
  pageNumber: number;
  pageSize: number;
  sortColumn: string | string [];
  sortDirection: number;
  typeItemsVisibility?: string;
  filter?: string;
  userId?: string;
}
