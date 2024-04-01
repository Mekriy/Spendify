import {Item} from "./IItem";
import {Category} from "./ICategory";
import {Location} from "./ILocation";

export interface Expense{
  id?: string;
  price?: number;
  date?: Date;
  category?: Category;
  location?: Location;
  items?: Item[];
}
