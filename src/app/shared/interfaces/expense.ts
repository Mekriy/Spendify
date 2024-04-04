import {Item} from "./item";
import {Category} from "./category";
import {Location} from "./location";

export interface Expense{
  id?: string;
  price?: number;
  date?: Date;
  category?: Category;
  location?: Location;
  items?: Item[];
}
