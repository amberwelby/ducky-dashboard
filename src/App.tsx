import './App.css'
import { TodaysDate } from './components/TodaysDate'
import { StockGrid } from './components/StockGrid'
import { WeatherCarousel, type City } from './components/WeatherCarousel'
import userConfig from '../duckyconfig-sample.json' with { type: 'json' };

function App() {

  const userCities : City[] = userConfig.weather;

//   const testCities : City[] = [
//     {name: "Ottawa, ON", lat: "45.4201", long: "-75.7003"},
//     {name: "Peterborough, ON", lat: "44.301111", long: "-78.333333"}
// ]

  return (
    <>
      <div className='cols'>
        <div className='rightCol'>
          <TodaysDate/>
          <WeatherCarousel cities={userCities} />
        </div>
          <StockGrid/>
      </div>
    </>
  )
}

export default App
