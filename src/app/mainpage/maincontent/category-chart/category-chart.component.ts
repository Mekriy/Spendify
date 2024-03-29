import { Component, OnInit} from '@angular/core';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss']
})
export class CategoryChartComponent implements OnInit{


  ngOnInit(): void {
  var chartDom = document.getElementById('main')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    title: {
      text: 'Expenses by categories',
      subtext: 'Fake Data',
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
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Gaming' },
          { value: 735, name: 'Bills' },
          { value: 580, name: 'Products' },
          { value: 484, name: 'Entertainment' },
          { value: 300, name: 'Project expenses' }
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
}
