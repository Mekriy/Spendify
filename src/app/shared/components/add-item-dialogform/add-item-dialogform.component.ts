import {Component, OnDestroy} from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {TableLazyLoadEvent} from "primeng/table";
import {PaginationFilter} from "../../interfaces/pagination-filter";
import {Subject, takeUntil} from "rxjs";
import {ItemService} from "../../services/item.service";
import {TableItemPagination} from "../../interfaces/table-item-pagination";
import {TabViewChangeEvent} from "primeng/tabview";

@Component({
  selector: 'app-add-item-dialogform',
  templateUrl: './add-item-dialogform.component.html',
  styleUrl: './add-item-dialogform.component.scss',
  providers: [ItemService]
})

export class AddItemDialogformComponent implements OnDestroy{
  constructor(
    private ref: DynamicDialogRef,
    private itemService: ItemService,
  ) {}

  tableAllItems!: TableItemPagination[];
  tableUserItems!: TableItemPagination[];
  selectedAllItems!: TableItemPagination[];
  selectedUserItems!: TableItemPagination[];

  itemAndQuantity: { id: string; name: string; price: number, quantity: number; }[] = [];

  totalRecords: number = 1;
  paginationAllFilter: PaginationFilter = {
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "Price",
    sortDirection: 1,
    typeItemsVisibility: 'all'
  }
  paginationUserFilter: PaginationFilter = {
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "Price",
    sortDirection: 1,
    typeItemsVisibility: 'all'
  }

  unsubscribe$: Subject<void> = new Subject<void>();

  selectedOption: string = 'all';

  closeDialog() {
    this.ref.close();
  }

  addSelectedAllItems(){
    if (this.selectedAllItems) {
      this.itemAndQuantity = this.selectedAllItems.map(item => ({
        id: item.id,
        name: item.name!,
        price: item.price,
        quantity: item.quantity
      }));
    }
    this.ref.close(this.itemAndQuantity);
  }
  addSelectedUserItems(){
    if (this.selectedAllItems) {
      this.itemAndQuantity = this.selectedAllItems.map(item => ({
        id: item.id,
        name: item.name!,
        price: item.price,
        quantity: item.quantity
      }));
    }
    this.ref.close(this.itemAndQuantity);
  }

  loadAllItems($event: TableLazyLoadEvent) {
    this.paginationAllFilter.pageNumber = $event.first || 0;
    this.paginationAllFilter.pageSize = $event.rows || 5;
    this.paginationAllFilter.sortColumn = $event.sortField?.toString() || 'Name';
    this.paginationAllFilter.sortDirection = $event.sortOrder || 1;
    this.paginationAllFilter.typeItemsVisibility = this.selectedOption;

    this.itemService.getItemsPagination(this.paginationAllFilter)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        response => {
          this.tableAllItems = response.data;
          this.totalRecords = response.totalRecords!;
        }
      )
  }
  loadUserItems($event: TableLazyLoadEvent) {
    this.paginationUserFilter.pageNumber = $event.first || 0;
    this.paginationUserFilter.pageSize = $event.rows || 5;
    this.paginationUserFilter.sortColumn = $event.sortField?.toString() || 'Name';
    this.paginationUserFilter.sortDirection = $event.sortOrder || 1;
    this.paginationUserFilter.typeItemsVisibility = this.selectedOption;

    this.itemService.getItemsPagination(this.paginationUserFilter)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        response => {
          this.tableUserItems = response.data;
          this.totalRecords = response.totalRecords!;
        }
      )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  changeOption($event: TabViewChangeEvent) {
    if($event.index === 1){
      this.selectedOption = 'user';
    }
    else{
      this.selectedOption = 'all'
    }
  }
}
