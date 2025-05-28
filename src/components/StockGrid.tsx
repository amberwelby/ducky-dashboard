import '../styles/StockGrid.css'
import { StockCard } from "./StockCard"

export function StockGrid(){
    return(
        <div className='grid'>
            <h2>Watchlist</h2>
            <StockCard ticker={"TOI"} shares={1}/>
            <StockCard ticker={"NVDA"} shares={1}/>
            <StockCard ticker={"CSU"} shares={1}/>
            <StockCard ticker={"TESTING"} shares={1}/>
        </div>
    )
}