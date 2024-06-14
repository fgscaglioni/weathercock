import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OpenWeatherWeatherResponseInterface } from '../interfaces/open-weather/weather-response.interface';
import { exampleResponse } from './weather-response.example';


@Injectable({
  providedIn: 'root'
})
export class OpenWeatherApiService {

  private http = inject(HttpClient)
  private thunderstormCodes = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
  private drizzleCodes = [300, 301, 302, 310, 311, 312, 313, 314, 321]
  private rainCodes = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531]
  private snowCodes = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]
  private atmosphereCodes = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781]
  private clearCodes = [800]
  private cloudsCodes = [801, 802, 803, 804]
  private weatherConditionCodes = [
    { codes: this.thunderstormCodes, condition: 'thunderstorm' },
    { codes: this.drizzleCodes, condition: 'drizzle' },
    { codes: this.rainCodes, condition: 'rain' },
    { codes: this.snowCodes, condition: 'snow' },
    { codes: this.atmosphereCodes, condition: 'atmosphere' },
    { codes: this.clearCodes, condition: 'clear' },
    { codes: this.cloudsCodes, condition: 'clouds' }
  ]

  constructor() { }

  getWeatherCondition(weatherConditionCode: number) {
    let weatherCondition = 'clouds'
    this.weatherConditionCodes.forEach((condition) => {
      if (condition.codes.includes(weatherConditionCode)) {
        weatherCondition = condition.condition
      }
    })
    return weatherCondition
  }

  async getWeather(lat: number, lon: number) {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const paramsObj = {
      lat: String(lat),
      lon: String(lon),
      appid: environment.openWeather.api.key,
      units: 'metric',
      lang: 'pt_br'
    };
    const searchParams = new URLSearchParams(paramsObj);

    let response: OpenWeatherWeatherResponseInterface;

    if (environment.production) {
      response = <OpenWeatherWeatherResponseInterface>await firstValueFrom(
        this.http.get(`${baseUrl}?${searchParams.toString()}`)
      )
    } else {
      response = exampleResponse
    }

    return response
  }
}
