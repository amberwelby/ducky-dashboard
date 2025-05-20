import './App.css'
import { TodaysDate } from './components/TodaysDate'
import { StockGrid } from './components/StockGrid'
import { Weather } from './components/Weather'

function App() {

  return (
    <>
      <div className='cols'>
        <div>
          <TodaysDate/>
          <Weather city='Ottawa' lat='45.4201' long='-75.7003'/>
        </div>
        <div>
          <StockGrid/>
        </div>
      </div>
    </>
  )
}

export default App
