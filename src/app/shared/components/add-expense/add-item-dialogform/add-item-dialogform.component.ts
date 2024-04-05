import {Component, OnDestroy} from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {TableLazyLoadEvent} from "primeng/table";
import {PaginationFilter} from "../../../interfaces/pagination-filter";
import {Subject, takeUntil} from "rxjs";
import {ItemService} from "../../../services/item.service";
import {Item} from "../../../interfaces/pagination-item";

@Component({
  selector: 'app-add-item-dialogform',
  templateUrl: './add-item-dialogform.component.html',
  styleUrl: './add-item-dialogform.component.scss',
  providers: [ItemService]
})


export class AddItemDialogformComponent implements OnDestroy{
  paginationItems!: Item[];
  selectedItems!: Item;
  totalRecords: number = 1;
  paginationFilter: PaginationFilter = {
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "Price",
    sortDirection: 1
  }

  unsubscribe$: Subject<void> = new Subject<void>();

  searchItem: Item | undefined;

  constructor(
    private ref: DynamicDialogRef,
    private itemService: ItemService) {}

  closeDialog() {
    this.ref.close();
  }
  addSelectedItems(){
    this.ref.close(this.selectedItems);
  }

  loadItems($event: TableLazyLoadEvent) {
    console.log($event);

    this.paginationFilter.pageNumber = $event.first || 0;
    this.paginationFilter.pageSize = $event.rows || 5;
    this.paginationFilter.sortColumn = $event.sortField?.toString() || 'Name';
    this.paginationFilter.sortDirection = $event.sortOrder || 1;

    this.itemService.getAll(this.paginationFilter).pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe(
        response => {
          this.paginationItems = response.data;
          this.totalRecords = response.totalRecords!;
        })
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
