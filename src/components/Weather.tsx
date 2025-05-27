import { fetchWeatherApi } from 'openmeteo'; // https://open-meteo.com/en/docs
import { useEffect, useState } from 'react';
import '../styles/Weather.css'
import { PrecipIcon } from './PrecipIcon';

export function Weather({
    city,
    lat, 
    long
}:{
    city: string,
    lat: string, 
    long: string
}){
    // const [precipitationType, setPrecipitationType] = useState("test");
    // API response template of weatherData
    const [weatherResponse, setWeatherResponse] = useState({
            current: {
                time: new Date(),
                temperature2m: 0,
                rain: 0,
                showers: 0, 
                snowfall: 0,
                isDay: 0,
            },
            daily: {
                time: [new Date()],
                uvIndexMax: new Float32Array([0]),
                precipitationSum: new Float32Array([0]),
                apparentTemperatureMax: new Float32Array([0]),
                apparentTemperatureMin: new Float32Array([0]),
            },
        });

    useEffect(() => {
        async function fetchWeather(){
            const params = {
                "latitude": lat,
                "longitude": long,
                "daily": ["uv_index_max", "precipitation_sum", "apparent_temperature_max", "apparent_temperature_min"],
	            "current": ["temperature_2m", "rain", "showers", "snowfall", "is_day"],             
                "timezone": "America/New_York",
                "forecast_days": 3
            };
            const url = "https://api.open-meteo.com/v1/forecast";
            const responses = await fetchWeatherApi(url, params);

            const response = responses[0];
            const utcOffsetSeconds = response.utcOffsetSeconds();

            const current = response.current()!;
            const daily = response.daily()!;

            // Note: The order of weather variables in the URL query and the indices below need to match!
            const weatherData = {
                current: {
                    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                    temperature2m: current.variables(0)!.value(),
                    rain: current.variables(1)!.value(),
                    showers: current.variables(2)!.value(),
                    snowfall: current.variables(3)!.value(),
                    isDay: current.variables(4)!.value(),
                },
                daily: {
                    time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                    ),
                    uvIndexMax: daily.variables(0)!.valuesArray()!,
                    precipitationSum: daily.variables(1)!.valuesArray()!,
                    apparentTemperatureMax: daily.variables(2)!.valuesArray()!,
                    apparentTemperatureMin: daily.variables(3)!.valuesArray()!,
                },
            };
            setWeatherResponse(weatherData);
        }
        fetchWeather();
    }, [lat, long]);

    const precipitationTypes : number[] = [weatherResponse.current.rain, weatherResponse.current.showers, weatherResponse.current.snowfall, weatherResponse.current.isDay];

    return(
        <div className='weatherReport'>
            <div>
                <h4>{city}</h4>
                <p>Temperature: {weatherResponse.current.temperature2m.toFixed(0)}&deg;C</p>
                <p>High: {weatherResponse.daily.apparentTemperatureMax[0].toFixed(0)}&deg;C</p> 
                <p>Low: {weatherResponse.daily.apparentTemperatureMin[0].toFixed(0)}&deg;C</p>
            </div>
            <div>
                <PrecipIcon precipTypes={precipitationTypes}/>
                <p>Precipitation: {weatherResponse.daily.precipitationSum[0].toFixed(0)}mm</p>
                <p>UV Index: {weatherResponse.daily.uvIndexMax[0].toFixed(0)}</p>
            </div>
            {/* It would be fun to have a amount of sunlight today graphic */}
        </div>
)
}