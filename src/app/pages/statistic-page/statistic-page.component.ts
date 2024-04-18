import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from "echarts";
import {ExpenseService} from "../../shared/services/expense.service";
import {Subject, takeUntil} from "rxjs";
import {AverageMoneySpentInMonthByYear} from "../../shared/interfaces/statistic/average-money-spent-in-month-by-year";
import {
  AverageMoneySpentInMonthByCategory
} from "../../shared/interfaces/statistic/average-money-spent-in-month-by-category";
import {CountItemsInExpensesByCategory} from "../../shared/interfaces/statistic/count-items-in-expenses-by-category";

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic-page.component.html',
  styleUrl: './statistic-page.component.scss'
})
export class StatisticPageComponent implements OnInit, OnDestroy{
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getAverageMoneySpentInMonthByCategory()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: value => this.loadPie(value),
        error: err => console.log("getAverageMoneySpentInMonthByCategory", err)
        })
    this.expenseService.getCountItemsBoughtInCategory()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: value => this.loadBars(value),
        error: err => console.log("getCountItemsBoughtInCategory", err)
      })
    this.expenseService.getAverageMoneySpentInMonthByYear()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: value => this.loadLine(value),
        error: err => console.log("getAverageMoneySpentInMonthByYear", err)
      })
  }
  private loadPie(data: AverageMoneySpentInMonthByCategory[]){
    let chartDom = document.getElementById('avgInMonthByCategory')!;
    let myChart = echarts.init(chartDom);
    let option: EChartsOption;
    option = {
      title: {
        text: 'Average in month by Category',
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
          data: data.map(item => ({ value: item.average, name: item.categoryName }))
        }
      ]
    };
    option && myChart.setOption(option);
  }
  private loadBars(data: CountItemsInExpensesByCategory[]){
    let chartDom = document.getElementById('itemsInExpensesByCategory')!;
    let myChart = echarts.init(chartDom);
    let option: EChartsOption;
    option = {
      title: {
        text: 'Items in expenses by categories',
        left: 'center',
        textStyle: {
          color: 'white',
        },
        subtextStyle: {
          color: 'white'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: data.map(item => item.categoryName),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: data.map(item => item.count)
        }
      ]
    };
    option && myChart.setOption(option);
  }
  private loadLine(data: AverageMoneySpentInMonthByYear[]){
    let chartDom = document.getElementById('avgInMonthByYear')!;
    let myChart = echarts.init(chartDom);
    let option: EChartsOption;
    option = {
      title: {
        text: 'Average by month in year',
        left: 'center',
        textStyle: {
          color: 'white',
        },
        subtextStyle: {
          color: 'white'
        }
      },
      xAxis: {
        type: 'category',
        data: data.map(item => this.getMonthName(item.monthNumber))
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data.map(item => item.average),
          type: 'line',
          smooth: true,
        }
      ]
    };
    option && myChart.setOption(option);
  }

  getMonthName (monthNumber: number) { //1 = January
    var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December' ];
    return monthNames[monthNumber - 1];
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
