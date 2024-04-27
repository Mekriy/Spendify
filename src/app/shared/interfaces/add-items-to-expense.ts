export interface AddItemsToExpense{
  expenseId: string;
  items: {
    id: string;
    quantity: number;
  }[]
}
