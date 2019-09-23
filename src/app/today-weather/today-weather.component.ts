import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';

import { GetTodayWeatherService } from '../get-today-weather.service';


@Component({
  selector: 'app-today-weather',
  templateUrl: './today-weather.component.html',
  styleUrls: ['./today-weather.component.css']
})
export class TodayWeatherComponent implements OnInit {
  weatherList:any;
  weatherForm:FormGroup;
  country:any;
  city:any;
  year:any;
  month:any;
  day:any;
  date:any;
  show:any=false;
  temp:any;
  minTemp:any;
  maxTemp:any;
  humidity:any;
  weather:any;
  windSpeed:any;
  constructor(private fb:FormBuilder,
    private todayservice:GetTodayWeatherService,){
    
 }
 
  ngOnInit() {
    this.weatherForm=this.fb.group({
    country:new FormControl(''),
    city:new FormControl('')
  })
 
  this.country="CN";
  this.date=this.getDate();
  
  console.log(this.country);
 
  }
  getDate(){
    let date=new Date();
    this.year=date.getFullYear();
    this.month=date.getMonth()+1;
    this.day=date.getDate();
    return this.year+'-'+this.month+'-'+this.day;
    
  }
  getWeather(country,city){
    this.show=true;
    this.todayservice.getTodayWeather(this.city,this.country).subscribe(res=>{
    
    this.weatherList=res;
    // console.log(res);
    console.log(this.weatherList);
    this.temp=(this.weatherList.main.temp-273.15).toFixed(2);
    this.minTemp=(this.weatherList.main.temp_min-273.15).toFixed(2);
    this.maxTemp=(this.weatherList.main.temp_max-273.15).toFixed(2);
    this.windSpeed=this.weatherList.wind.speed;
    this.weather=this.weatherList.weather[0].description;   
    
    this.humidity=this.weatherList.main.humidity;

  })
  }
  reset(){
    this.show=false;
    this.country='';
    this.city='';
  }

  
}
