import { Component, inject } from '@angular/core';
import { OpenWeatherApiService } from '../services/open-weather-api.service';
import { RoosterService, WeatherInfoType } from '../services/rooster.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    private openWeatherApiService = inject(OpenWeatherApiService);
    private roosterService = inject(RoosterService);

    rooster: string = '';
    weatherInfo!: WeatherInfoType;
    weatherCondition: string = 'clouds';
    locationDenied: boolean = false;

    constructor() { }

    async getData(position: GeolocationPosition) {
        const response = await this
            .openWeatherApiService
            .getWeather(
                position.coords.latitude,
                position.coords.longitude
            );

        this.rooster = this.roosterService.getRooster(response.main.humidity, response.main.temp)
        this.weatherInfo = this.roosterService.getWeatherInfo(response)
        this.weatherCondition = this.openWeatherApiService.getWeatherCondition(response.weather[0].id)
    }

    ionViewDidEnter() {
        this.getCurrentLocation()
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator
                .geolocation
                .getCurrentPosition((position: GeolocationPosition) => {
                    this.getData(position)
                }, (error: GeolocationPositionError) => {
                    this.geoPositionErrorHandler(error)
                })
        } else {
            // alert("Geolocation is not supported by this browser.")
        }
    }

    geoPositionErrorHandler(error: GeolocationPositionError) {
        switch (error.code) {
            case 1:
                console.log(error.message)
                this.locationDenied = true
                break;
            default:
                console.log(error)
                break;
        }
    }

}
