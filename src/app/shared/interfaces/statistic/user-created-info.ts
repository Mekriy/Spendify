import {Item} from "../item";
import {Category} from "../category";
import {Location} from "../location";

export interface UserCreatedInfo{
  items: Item[],
  categories: Category[],
  locations: Location[],
}
