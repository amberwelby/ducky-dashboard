import '../styles/WeatherCard.css'
import { TbArrowBadgeRight } from 'react-icons/tb';
import { PrecipIcon } from './PrecipIcon';
import type { WeatherReport } from './WeatherCarousel';

export function WeatherCard({
    city, 
    moveRight
}:{
    city: WeatherReport, 
    moveRight: () => void 
}){
     const precipitationTypes : number[] = [city.current.rain, city.current.showers, city.current.snowfall, city.current.isDay];
   
    return(
    <div className='weatherReport'>
        <div>
            <h4>{city.city.name}</h4>
            <p>Temperature: {city.current.temperature2m.toFixed(0)}&deg;C</p>
            <p>High: {city.daily.apparentTemperatureMax[0].toFixed(0)}&deg;C</p> 
            <p>Low: {city.daily.apparentTemperatureMin[0].toFixed(0)}&deg;C</p>
        </div>
        <div>
            <div className='precipicon'>
                <PrecipIcon precipTypes={precipitationTypes}/>
            </div>
            <p>Precipitation: {city.daily.precipitationSum[0].toFixed(0)}mm</p>
            <p>UV Index: {city.daily.uvIndexMax[0].toFixed(0)} {city.daily.uvIndexMax[0] > 5 ? "(high)" : "(low)"}</p>
        </div>
        {/* It would be fun to have a amount of sunlight today graphic */}
        <div>
            <TbArrowBadgeRight size={(7*4)} onClick={moveRight}/>
        </div>
    </div>
    )
}