import { Injectable } from '@angular/core';
import * as highcharts from 'angular-highcharts'
@Injectable({
  providedIn: 'root'
})
export class StatJChartserviceService {

  constructor() { }
  ChartCreate(type:any,xAxis:any,title:any,series:any) :highcharts.Chart{
    console.log("full series")
    console.log(series)
    const chart=new highcharts.Chart({
      chart: {
        type: type
      },
      title: {
        text: title
      },
      xAxis: {
        categories: xAxis
    },
      credits: {
        enabled: false
      },
      series: series
    });
    
    return chart;
  }
  ChartDestroy(chart:highcharts.Chart){
    chart.destroy()
  }
  ChartRecreate(chart:highcharts.Chart,type:any,xAxis:any,title:any,series:any):highcharts.Chart{
    this.ChartDestroy(chart)
    let singleseries:any
    let seriesofchart:any[] =[]
    for (let i = 2; i <  series.length; i++) {
      
      // Do something with the current line, for example:
   
      singleseries={
        type:'line',
        name:series[0][i-2],
        data:series[i]
      }
      seriesofchart.push(singleseries)
     
    }
   return this.ChartCreate(type,xAxis,title,seriesofchart)
    
  }
  ChartRecreateBar(chart:highcharts.Chart,type:any,xAxis:any,title:any,series:any):highcharts.Chart{
    this.ChartDestroy(chart)
    let singleseries:any
    let seriesofchart:any[] =[]
    for (let i = 2; i <  series.length; i++) {
      
      // Do something with the current line, for example:
   
      singleseries={
        type:'bar',
        name:series[0][i-2],
        data:series[i]
      }
      seriesofchart.push(singleseries)
     
    }
   return this.ChartCreate(type,xAxis,title,seriesofchart)
    
  }
  
  ChartRecreatePie(mychart:highcharts.Chart,type:any,series:any,title:any):highcharts.Chart{
    let xAxis=series[0];
    this.ChartDestroy(mychart)
 
    const chart=new highcharts.Chart({
      chart: {
        type: type
      },
      title: {
        text: "data"
      },
      xAxis: {
        categories: xAxis
    },
    yAxis: {
      min: 0,
      title: {
          text: 'Presence'
      },
      stackLabels: {
          enabled: true
      }
  },
      credits: {
        enabled: false
      },
      plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
      series: series
    });
    
    return chart;
  }

  


}
