import '../styles/StockGrid.css'
import { Stock } from "./Stock"

export function StockGrid(){
    return(
        <div className='grid'>
            <h2>Watchlist</h2>
            <Stock ticker={"TOI"} shares={1}/>
            <Stock ticker={"NVDA"} shares={1}/>
            <Stock ticker={"CSU"} shares={1}/>
            <Stock ticker={"TESTING"} shares={1}/>
        </div>
    )
}