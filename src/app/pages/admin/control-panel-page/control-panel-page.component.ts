import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationFilter} from "../../../shared/interfaces/pagination-filter";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ItemService} from "../../../shared/services/item.service";
import {TableItemPagination} from "../../../shared/interfaces/table-item-pagination";
import {TableLazyLoadEvent} from "primeng/table";
import {Observable, Subject, takeUntil} from "rxjs";
import {AdminService} from "../../../shared/services/admin.service";
import {GeneralInfo} from "../../../shared/interfaces/statistic/general-info";
import {TodayExpensesByCategories} from "../../../shared/interfaces/statistic/today-expenses-by-categories";
import {
  AverageMoneySpentInMonthByCategory
} from "../../../shared/interfaces/statistic/average-money-spent-in-month-by-category";
import * as echarts from "echarts";
import {ItemToBePublic} from "../../../shared/interfaces/item-to-be-public";

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-control-panel-page',
  templateUrl: './control-panel-page.component.html',
  styleUrl: './control-panel-page.component.scss',
  providers: [DynamicDialogRef]
})
export class ControlPanelPageComponent implements OnInit, OnDestroy{
  itemsToChange!: TableItemPagination[];
  todayExpenses!: TodayExpensesByCategories[];
  constructor(
    private ref: DynamicDialogRef,
    private adminService: AdminService,
  ) {}

  selectedAllItems!: TableItemPagination[];

  totalRecords: number = 1;
  paginationAllFilter: PaginationFilter = {
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "Price",
    sortDirection: 1,
    typeItemsVisibility: 'private'
  }
  unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(){
    this.loadStatistic();
    this.loadGeneralInfo();
  }

  loadAllItems($event: TableLazyLoadEvent) {
    this.paginationAllFilter.pageNumber = $event.first || 0;
    this.paginationAllFilter.pageSize = $event.rows || 5;
    this.paginationAllFilter.sortColumn = $event.sortField?.toString() || 'Name';
    this.paginationAllFilter.sortDirection = $event.sortOrder || 1;
    this.paginationAllFilter.typeItemsVisibility = 'private';

    this.adminService.getPrivateItems(this.paginationAllFilter)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        response => {
          this.itemsToChange = response.data;
          this.totalRecords = response.totalRecords!;
        }
      )
  }
  loadStatistic(){
    this.adminService.getStatistic()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: value => {
          this.todayExpenses = value;
          console.log(this.todayExpenses)
          this.loadPie(this.todayExpenses, 'Today\'s expenses by Categories on site')
        },
        error: err => {
          this.todayExpenses = [
            {
              categoryName: 'Default category',
              expenseCount: 1
            },
          ]
          this.loadPie(this.todayExpenses, 'No expenses by categories for today')
        }
        })
  }
  info!: GeneralInfo;
  loadGeneralInfo(){
    this.adminService.getGeneralInfo()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: value => this.info = value,
        error: err => {
          this.info = {
            categoryName: 'Default category',
            count: 0,
            allExpensesCount: 0,
            averageExpensePrice: 0
          }
        }
      })
  }

  private loadPie(data: TodayExpensesByCategories[], text: string){
    let chartDom = document.getElementById('infoUsers')!;
    let myChart = echarts.init(chartDom);
    let option: EChartsOption;
    option = {
      title: {
        text: `${text}`,
        left: 'center',
        textStyle: {
          color: 'white',
        },
        subtextStyle: {
          color: 'white'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        textStyle: {
          color: 'white'
        }
      },
      series: [
        {
          name: 'Category',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            show: false
          },
          data: data.map(item => ({ value: item.expenseCount, name: item.categoryName }))
        }
      ]
    };
    option && myChart.setOption(option);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  changeVisibility(item: TableItemPagination) {
    let makePublic: ItemToBePublic = {
      id: item.id,
      review: item.value!
    }
    this.adminService.changeItemVisibility(makePublic)
      .pipe()
      .subscribe();
  }
}
