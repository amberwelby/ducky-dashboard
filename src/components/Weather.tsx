import { fetchWeatherApi } from 'openmeteo'; // https://open-meteo.com/en/docs
import { useEffect, useState } from 'react';

export function Weather({
    city,
    lat, 
    long
}:{
    city: string,
    lat: string, 
    long: string
}){
    const [weatherResponse, setWeatherResponse] = useState({
            current: {
                time: new Date(),
                temperature2m: 0,
                precipitation: 0,
            },
            daily: {
                time: [new Date()],
                uvIndexMax: new Float32Array,
            },
        });

    useEffect(() => {
        async function fetchWeather(){
            const params = {
                "latitude": lat,
                "longitude": long,
                "daily": "uv_index_max",
                "current": ["temperature_2m", "precipitation"],
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
                    precipitation: current.variables(1)!.value(),
                },
                daily: {
                    time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                    ),
                    uvIndexMax: daily.variables(0)!.valuesArray()!,
                },
            };
            setWeatherResponse(weatherData);
        }
        fetchWeather();
    }, [lat, long]);

return(
    <div>
        <p>{city}</p>
        <p>Temperature: {weatherResponse.current.temperature2m}</p>
        <p>Precipitation: {weatherResponse.current.precipitation}</p>
        <p>UV Index: {weatherResponse.daily.uvIndexMax}</p>
        {/* It would be fun to have a amount of sunlight today graphic */}
    </div>
)
}