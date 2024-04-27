import {Item} from "./item";
import {Category} from "./category";
import {Location} from "./location";
import {DropdownCategory} from "./dropdown-category";

export interface PaginationExpense{
  id?: string,
  price?: number;
  date?: Date;
  category?: DropdownCategory;
  location: Location;
  items?: Item[];
}
