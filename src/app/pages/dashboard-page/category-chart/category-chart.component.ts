import { Component, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import {DashboardService} from "../../../shared/services/dashboard.service";
import {DashboardPieResponse} from "../../../shared/interfaces/dashboard-pie-response";

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss']
})
export class CategoryChartComponent implements OnInit{
  constructor(
    private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getExpensesCountByCategories()
      .subscribe({
        next: data => {
          this.loadPie(data)
        },
        error: err => {
          this.loadPie(null)
        }
      });
  }
  private loadPie(data: DashboardPieResponse[] | null){
    if(data === null || data.length === 0){
      let chartDom = document.getElementById('main')!;
      let myChart = echarts.init(chartDom);
      let option: EChartsOption;
      option = {
        title: {
          text: 'Expenses by categories',
          subtext: 'You don\'t have expenses for data',
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
            name: 'Categories',
            type: 'pie',
            radius: '50%',
            data: [
              {
                value: 1, name: 'Food'
              },
              {
                value: 1, name: 'Gaming'
              },
              {
                value: 1, name: 'Entertainment'
              },
              {
                value: 1, name: 'Rent'
              },
              {
                value: 1, name: 'Medicine'
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          },
        ]
      };
      option && myChart.setOption(option);
    }
    else{
      let chartDom = document.getElementById('main')!;
      let myChart = echarts.init(chartDom);
      let option: EChartsOption;
      option = {
        title: {
          text: 'Expenses by categories',
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
            name: 'Categories',
            type: 'pie',
            radius: '50%',
            data: data.map(item => ({ name: item.name, value: item.count })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          },
        ]
      };
      option && myChart.setOption(option);
    }
  }
}
