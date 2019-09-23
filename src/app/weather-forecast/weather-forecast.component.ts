import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GetTodayWeatherService } from '../get-today-weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  forecastForm: FormGroup;
  city:any;
  country:any;
  year: number;
  month: number;
  day: number;
  date: string;
  futureDay: number;
  latestDay: string;
  show=false;
  forecastList: Object;
  dayList=[];
  loopArray:{'day':any,'weather':any};
  yearAndMonth: string;
  finalList: any=[];
  options:any;
  xRange: any=[];
  maxTempRange: any=[];
  minTempRange:any=[];
  tableShow:any=false;
  
  constructor(private fb:FormBuilder,private forecastService:GetTodayWeatherService) { }

  ngOnInit() {
    this.forecastForm=this.fb.group({
      country:new FormControl(''),
      city:new FormControl('')
    })
    this.date=this.getDate();
    this.getPeriod();
    this.loopArray={'day':this.dayList,'weather':this.forecastList};
    console.log(this.loopArray);
    
    this.yearAndMonth=this.year+'-'+this.month;
    this.latestDay=this.year+'-'+this.month+'-'+this.futureDay;
    
  }
  getPeriod(){
    for(let i=this.day;i<this.futureDay-1;i++){
      this.dayList.push(i);
    

    }
    console.log(this.dayList);
  }
  getDate(){
    let date=new Date();
    this.year=date.getFullYear();
    this.month=date.getMonth()+1;
    this.day=date.getDate();
    this.futureDay=date.getDate()+6;
    return this.year+'-'+this.month+'-'+this.day;
    
  }
  getForecastWeather(city,country){
     this.show=true;
     this.tableShow=true;
     this.finalList=[];
     this.forecastService.getForecastWeather(this.city,this.country).subscribe(res=>{
       console.log(res);
       this.forecastList=res['list']; 
       console.log(this.forecastList);
       console.log(typeof(this.forecastList));
       //get choosed array
       for(let i=0;i<res['list'].length;i++){
          let tmp=res['list'];   
          // console.log(tmp.length);
          if(tmp[i]['dt_txt'].search("12:00:00")!=-1){
            this.finalList.push(tmp[i]);  
                   
          }     
          }
          console.log(this.finalList);
      
        
        this.getXRange();
        this.getMaxTemp();
        this.getMinTemp();

        console.log(this.xRange);
    
       
       this.dayList=this.dayList.concat(this.forecastList);
     }

     )
   
  console.log(this.dayList);
  }

  //get x range
  getXRange(){
    for (let i=0;i<this.finalList.length;i++){
          var temp= this.finalList[i].dt_txt.split(' ');
          console.log(temp);
          this.xRange.push(temp[0]);

        }
  }
  //get Max Temp
  getMaxTemp(){
    for(let i=0;i<this.finalList.length;i++){
      var temp=(this.finalList[i].main.temp_max-273).toFixed(2);
      this.maxTempRange.push(temp);
    }
    console.log(this.maxTempRange);
  }
  //get Min Temp
  getMinTemp(){
    for(let i=0;i<this.finalList.length;i++){
      var temp=(this.finalList[i].main.temp_min-273.15).toFixed(2);
      this.minTempRange.push(temp);
    }
    console.log(this.minTempRange);
  }
  getCharts(){
    this.tableShow=false;
    this.options = {
      title: {
          text: 'Weather Forecat',
          // subtext: '纯属虚构'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data:['Max-Temp','Min-Temp']
      },
      toolbox: {
          show: true,
          feature: {
              dataZoom: {
                  yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
          }
      },
      xAxis:  {
          type: 'category',
          boundaryGap: false,
          // data: ['周一','周二','周三','周四','周五','周六','周日']
          data: this.xRange,
          // data:this.finalList
      },
      yAxis: {
          type: 'value',
          splitNumber:6,
          axisLabel: {
              formatter: '{value} °C'
          }

      },
      series: [
          {
              name:'Max Temperature',
              type:'line',
              // data:[11, 11, 15, 13, 12, 13, 10],
              data:this.maxTempRange,
              markPoint: {
                  data: [
                      {type: 'max', name: 'Max Temperature'},
                      {type: 'min', name: 'Min Temperature'}
                  ]
              },
              markLine: {
                  data: [
                      {type: 'average', name: 'Average Temperature'}
                  ]
              }
          },
          {
              name:'Min Temperature',
              type:'line',
              // data:[1, -2, 2, 5, 3, 2, 0],
              data:this.minTempRange,
              // markPoint: {
              //     data: [
              //         {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
              //     ]
              // },
              markLine: {
                  data: [
                      {type: 'average', name: '平均值'},
                      [{
                          symbol: 'none',
                          x: '90%',
                          yAxis: 'max'
                      }, {
                          symbol: 'circle',
                          label: {
                              normal: {
                                  position: 'start',
                                  formatter: '最大值'
                              }
                          },
                          type: 'max',
                          name: '最高点'
                      }]
                  ]
              }
          }
      ]
  };

  }
 

  

}
