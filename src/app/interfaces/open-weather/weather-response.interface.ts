import { CloudsInterface } from "./clouds.interface"
import { CoordInterface } from "./coord.interface"
import { MainInterface } from "./main.interface"
import { SysInterface } from "./sys.interface"
import { WeatherInterface } from "./weather.interface"
import { WindInterface } from "./wind.interface"

export interface OpenWeatherWeatherResponseInterface {
    base: string
    clouds: CloudsInterface
    cod: number
    coord: CoordInterface
    dt: number
    id: number
    main: MainInterface
    name: string
    sys: SysInterface
    timezone: number
    visibility: number
    weather: WeatherInterface[]
    wind: WindInterface
}
