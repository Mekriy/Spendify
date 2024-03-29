import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';


interface Item {
  name: string,
  price: number,
  quantity: number
}

@Component({
  selector: 'app-add-item-dialogform',
  templateUrl: './add-item-dialogform.component.html',
  styleUrl: './add-item-dialogform.component.scss'
})


export class AddItemDialogformComponent {
  items: Item[] = [
    {
      name: 'Milk',
      price: 220,
      quantity: 10
    },
    {
      name: 'Ball',
      price: 100,
      quantity: 1
    },
    {
      name: 'Glue',
      price: 23,
      quantity: 2
    },
    {
      name: 'Glue2',
      price: 24,
      quantity: 3
    },
    {
      name: 'Glue3',
      price: 25,
      quantity: 4
    },
    {
      name: 'Glue4',
      price: 26,
      quantity: 5
    },
    {
      name: 'Glue5',
      price: 27,
      quantity: 6
    }
  ];

  selectedItems!: Item;

  searchItem: Item | undefined;

  constructor(public ref: DynamicDialogRef) {}

  closeDialog(data: any) {
    this.ref.close(data);
  }
  selectProduct(product: Item) {
    this.ref.close(product);
  }

  selectItem(item: any) {

  }
}
