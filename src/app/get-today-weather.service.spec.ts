import { TestBed } from '@angular/core/testing';

import { GetTodayWeatherService } from './get-today-weather.service';

describe('GetTodayWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetTodayWeatherService = TestBed.get(GetTodayWeatherService);
    expect(service).toBeTruthy();
  });
});
