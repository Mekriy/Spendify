export interface UpdateExpense{
  id?: string,
  price?: number;
  date?: Date;
  categoryId?: string;
  locationId: string;
}
