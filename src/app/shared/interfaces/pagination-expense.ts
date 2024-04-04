import {Item} from "./item";
import {Category} from "./category";
import {Location} from "./location";

export interface PaginationExpense{
  id?: string,
  price?: number;
  date?: Date;
  categoryName?: string;
  location?: Location;
  items?: Item[];
}
