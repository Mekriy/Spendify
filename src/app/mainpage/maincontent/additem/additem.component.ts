import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddItemDialogformComponent } from './add-item-dialogform/add-item-dialogform.component';

interface Category{
  name: string;
}

interface Item{
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrl: './additem.component.scss',
  providers: [DialogService, MessageService]
})
export class AdditemComponent implements OnInit, OnDestroy{

  categories: Category[] | undefined;
  selectedCategory: Category | undefined;

  price: number | undefined;
  totalPrice: number | undefined;

  ngOnInit(): void {
    this.categories = [
      {name: 'Bills'},
      {name: 'Restaurant'},
      {name: 'Games'},
      {name: 'Products'},
      {name: 'Charity'},
      {name: 'Rent'}
    ]
  }

  constructor(public dialogService: DialogService, public messageService: MessageService) {
  }
  ref: DynamicDialogRef | undefined;


  show(){
    this.ref = this.dialogService.open(AddItemDialogformComponent, {
      header: 'Select an item',
      width: '50vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });

    this.ref.onClose.subscribe((data: any) => {
      let summary_and_detail;
      if(data){
        const buttonType = data?.buttonType;
        summary_and_detail = buttonType ? { summary: 'No item Selected', 
        detail: `Pressed '${buttonType}' button` } : 
        { summary: 'Item selected', detail: data?.name };
      } else {
        summary_and_detail = {summary: 'No item Selected',
        detail: 'Pressed close button' };
      }
      this.messageService.add({severity: 'info', ...
      summary_and_detail, life: 3000});
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', 
          summary: 'Maximized', 
          detail: `maximized: ${value.maximized}` });
  });
  }

  ngOnDestroy() {
    if(this.ref){
      this.ref.close();
    }
  }

  items: Item[] = [
    {
      name: 'Milk',
      quantity: 10
    },
    {
      name: 'Games',
      quantity: 123
    },
    {
      name: 'Restaurant meals',
      quantity: 200
    },
    {
      name: 'Restaurant meals1',
      quantity: 200
    },
    {
      name: 'Restaurant meals2',
      quantity: 200
    },
    {
      name: 'Restaurant meals2',
      quantity: 200
    },
    {
      name: 'Restaurant meals2',
      quantity: 200
    },
    {
      name: 'Restaurant meals2',
      quantity: 200
    },
  ]
}