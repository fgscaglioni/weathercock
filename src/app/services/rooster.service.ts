import { Injectable } from '@angular/core';
import { OpenWeatherWeatherResponseInterface } from '../interfaces/open-weather/weather-response.interface';


@Injectable({
  providedIn: 'root'
})
export class RoosterService {

  // Branco/cinza com temperatura entre 17 e 26°C;
  // Rosa claro com temperatura abaixo dos 15°C e 100% umidade, ou seja, chovendo e frio;
  // Azul: tempo bom e seco com temperatura acima dos 27°C.
  getRooster(humidity: number, temperature: number) {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    let color = 'white'

    if (temperature < 17 && humidity > 95) {
      color = 'pink'
    } else if ((temperature >= 17 && temperature < 27) || temperature < 17) {
      color = 'white'
    } else if (temperature >= 27) {
      color = 'blue'
    }

    return `assets/img/${color}${randomNumber}.jpg`;
  }

  getWeatherInfo(openWeatherResponse: OpenWeatherWeatherResponseInterface): WeatherInfoType {
    const icon = openWeatherResponse.weather[0].icon;
    // return `https://openweathermap.org/img/wn/${icon}@2x.png`
    return {
      icon: `https://openweathermap.org/img/wn/${icon}.png`,
      temp: Math.round(openWeatherResponse.main.temp),
      hum: Math.round(openWeatherResponse.main.humidity),
      max: Math.round(openWeatherResponse.main.temp_max),
      min: Math.round(openWeatherResponse.main.temp_min),
    }
  }

}

export interface WeatherInfoType {
  icon: string;
  temp: number;
  hum: number;
  max: number;
  min: number;
}
