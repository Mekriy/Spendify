export interface UpdateItems{
  expenseId: string,
  items: {
    id: string;
    quantity: number;
  }[]
}
