import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { fromEventPattern } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetTodayWeatherService {
  
  private headers=new HttpHeaders().set("X-RapidAPI-Host","community-open-weather-map.p.rapidapi.com")
  .set("X-RapidAPI-Key","174156cddemshd528f7161bd3c2bp188c03jsndc664b770463");
  constructor(private http:HttpClient,) { }
  getForecastWeather(city,country){
    const headers=this.headers;
    const baseUrl="https://community-open-weather-map.p.rapidapi.com/forecast";
    return this.http.get(baseUrl+'?q='+city+','+country,{headers});

  }
  getTodayWeather(city,country){
    const headers=this.headers;
    const baseUrl="https://community-open-weather-map.p.rapidapi.com/weather";
    return this.http.get(baseUrl+'?q='+city+','+country,{headers});
  }

}
