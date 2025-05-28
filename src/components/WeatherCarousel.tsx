// Carousel concept from https://codesandbox.io/p/sandbox/simple-carousel-without-external-library-oxjgu
import { fetchWeatherApi } from 'openmeteo'; // https://open-meteo.com/en/docs
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TbArrowBarRight } from "react-icons/tb";
import { WeatherCard } from './WeatherCard';

export type WeatherReport = {
    city: City,
    current: {
        time: Date,
        temperature2m: number,
        rain: number,
        showers: number, 
        snowfall: number,
        isDay: number,
    },
    daily: {
        time: Date[],
        uvIndexMax: Float32Array,
        precipitationSum: Float32Array,
        apparentTemperatureMax: Float32Array,
        apparentTemperatureMin: Float32Array,
    },
}

// Move this eventually
export type City = {
    name: string,
    lat: string, 
    long: string
}

        // {
        //     current: {
        //         time: new Date(),
        //         temperature2m: 0,
        //         rain: 0,
        //         showers: 0, 
        //         snowfall: 0,
        //         isDay: 0,
        //     },
        //     daily: {
        //         time: [new Date()],
        //         uvIndexMax: new Float32Array([0]),
        //         precipitationSum: new Float32Array([0]),
        //         apparentTemperatureMax: new Float32Array([0]),
        //         apparentTemperatureMin: new Float32Array([0]),
        //     },
        // }

export function WeatherCarousel({
    cities
}:{
    cities: City[]
}){
    // Weather data
    const [weatherResponse, setWeatherResponse] = useState<WeatherReport[]>([]);
    
    const lats : string[] = useMemo(() => { 
        const tempLats : string[] = [];   
        for(let i = 0; i < cities.length; i++){
        tempLats[i] = cities[i].lat;
    }
    return tempLats}, [cities]);

    const longs : string[] = useMemo(() => {   
        const tempLongs : string[] = []; 
        for(let i = 0; i < cities.length; i++){
        tempLongs[i] = cities[i].long;
    }
    return tempLongs}, [cities]);

    useEffect(() => {
        async function fetchWeather(){
            const params = {
                "latitude": lats,
                "longitude": longs,
                "daily": ["uv_index_max", "precipitation_sum", "apparent_temperature_max", "apparent_temperature_min"],
	            "current": ["temperature_2m", "rain", "showers", "snowfall", "is_day"],             
                "timezone": "America/New_York",
                "forecast_days": 3
            };
            const url = "https://api.open-meteo.com/v1/forecast";
            const responses = await fetchWeatherApi(url, params);
            const cityResponses : WeatherReport[] = [];

            for(let i = 0; i < responses.length; i++){
                const response = responses[i];
                const utcOffsetSeconds = response.utcOffsetSeconds();
                
                const current = response.current()!;
                const daily = response.daily()!;
                
                // Note: The order of weather variables in the URL query and the indices below need to match!
                const weatherData = {
                    city: cities[i],
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

                cityResponses[i] = weatherData;
            }
            setWeatherResponse(cityResponses);
        }
        fetchWeather();
    }, [cities, lats, longs]);

    // Carousel
    const [curr, setCurr] = useState(0);
    const len = weatherResponse.length;

    const moveRight = useCallback(() => {
        setCurr(curr + 1 > len - 1 ? 0 : curr + 1);
    }, [curr, len]);

    return(
        <>
            <TbArrowBarRight onClick={moveRight}/>
            {weatherResponse.map((city, index) => {
                return(
                    <div key={index}>{curr === index && <WeatherCard city={city}></WeatherCard>}</div>
                )
            })}
        </>
    )
}