import './App.css'
import { TodaysDate } from './components/TodaysDate'
import { StockGrid } from './components/StockGrid'

function App() {

  return (
    <>
      <div className='cols'>
        <TodaysDate/>
        <StockGrid/>
      </div>
    </>
  )
}

export default App
