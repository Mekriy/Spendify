import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationFilter} from "../../../shared/interfaces/pagination-filter";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {TableItemPagination} from "../../../shared/interfaces/table-item-pagination";
import {TableLazyLoadEvent} from "primeng/table";
import {Observable, Subject, takeUntil} from "rxjs";
import {AdminService} from "../../../shared/services/admin.service";
import {GeneralInfo} from "../../../shared/interfaces/statistic/general-info";
import {TodayExpensesByCategories} from "../../../shared/interfaces/statistic/today-expenses-by-categories";
import * as echarts from "echarts";
import {ItemToBePublic} from "../../../shared/interfaces/item-to-be-public";
import {Category} from "../../../shared/interfaces/category";
import {UpdateCategory} from "../../../shared/interfaces/updates/update-category";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../shared/services/category.service";

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
    private router: Router,
    private categoryService: CategoryService,
    private fb: FormBuilder,
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
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.loadStatistic();
    this.loadGeneralInfo();
    this.loadCategories();
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
            categoryName: 'No categories',
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
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
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

  publicCategories!: Category[];
  showInput: boolean = false;
  newCategoryName: string = '';
  oldCategoryName: string = '';
  selectedPublicCategory!: Category;
  categoryForm!: FormGroup;

  changeNameInput(selectedUserCategory: Category) {
    if(selectedUserCategory.name!.length <= 0)
      this.showInput = false;
    else {
      this.showInput = !this.showInput;
      this.oldCategoryName = selectedUserCategory.name!;
      this.newCategoryName = selectedUserCategory.name!;
    }
  }

  updateCategory() {
    let update: UpdateCategory = {
      newName: this.newCategoryName,
      oldName: this.oldCategoryName,
    }
    this.adminService.updateCategory(update)
      .pipe()
      .subscribe({
        next: value => this.router.navigateByUrl(`/${this.router.url}`, {skipLocationChange: true}).then(()=> window.location.reload()),
      })
  }

  deleteCategory(selectedUserCategory: Category) {
    this.adminService.delete(selectedUserCategory.name!)
      .pipe()
      .subscribe({
        next: value => this.router.navigateByUrl(`/${this.router.url}`, {skipLocationChange: true}).then(()=> window.location.reload()),
      })
  }

  private loadCategories() {
    this.adminService.getCategories()
      .pipe()
      .subscribe({
        next: value => {
          this.publicCategories = value;
        },
      })
  }

  onSubmit($event: any) {
    let category: Category = {
      name: this.categoryForm.value.name,
    }
    this.categoryService.create(category)
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe({
        next: () => this.router.navigateByUrl(`/${this.router.url}`, {skipLocationChange: true}).then(() => window.location.reload()),
      });
  }
}
