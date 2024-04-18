import {Component, OnInit} from '@angular/core';
import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic-page.component.html',
  styleUrl: './statistic-page.component.scss'
})
export class StatisticPageComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
    this.loadBars(null);
    this.loadLine(null);
    this.loadPie(null);
  }

  private loadLine(data: null){
    let chartDom = document.getElementById('avgInMonthByYear')!;
    let myChart = echarts.init(chartDom);
    let option: EChartsOption;
    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        }
      ]
    };
    option && myChart.setOption(option);
  }
  private loadPie(data: null){
    let chartDom = document.getElementById('itemsInExpensesByCategory')!;
    let myChart = echarts.init(chartDom);
    let option: EChartsOption;
    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          color: 'white'
        }
      },
      series: [
        {
          name: 'Access From',
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
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
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
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };
    option && myChart.setOption(option);
  }
  private loadBars(data: null){
    let chartDom = document.getElementById('avgInMonthByCategory')!;
    let myChart = echarts.init(chartDom);
    let option: EChartsOption;
    option = {
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };
    option && myChart.setOption(option);
  }
}
