import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodayWeatherComponent } from './today-weather/today-weather.component';
import {HomeComponent} from './home/home.component';
import {WeatherForecastComponent} from './weather-forecast/weather-forecast.component'
const routes: Routes = [
  {
    path:'today',
    component:TodayWeatherComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'forecast',
    component:WeatherForecastComponent, 
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full',

  },
  {
    path:'**',
    component:HomeComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
