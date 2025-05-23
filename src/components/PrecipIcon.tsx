// import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { TbUmbrella, TbCloudRain, TbSnowflake, TbSunHigh, TbMoon } from "react-icons/tb";

export function PrecipIcon({ 
    precipTypes: precipTypes 
}:{ 
    precipTypes : number[] 
}){
    // Check docs. Provide pixels that equate to a multiplier, 14 interval, 70 max
    const iconSize : number = 56;

    // Determine predominant type
    // Rain
    if(precipTypes[0] > 0.0 && precipTypes[0] >= precipTypes[1] && precipTypes[0] >= precipTypes[2]){
        return <TbUmbrella size={iconSize}/>
    }
    // Showers
    else if(precipTypes[1] > 0.0 && precipTypes[1] >= precipTypes[0] && precipTypes[1] >= precipTypes[2]){ 
        return <TbCloudRain size={iconSize}/>
    }
    // Snow
    else if(precipTypes[2] > 0.0 && precipTypes[2] >= precipTypes[0] && precipTypes[2] >= precipTypes[1]){ 
        return <TbSnowflake size={iconSize}/>
    }
    // If there is no precipitation, return clear day or night sky
    else{
        return precipTypes[3] > 0.0 ? <TbSunHigh size={iconSize}/> : <TbMoon size={iconSize}/>
    }
}