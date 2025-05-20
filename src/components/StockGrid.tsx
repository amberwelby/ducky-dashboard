import '../styles/StockGrid.css'
import { Stock } from "./Stock"

export function StockGrid(){
    return(
        <div className='grid'>
            <Stock ticker={"TOI"} shares={1}/>
            <Stock ticker={"TOI"} shares={1}/>
            <Stock ticker={"TOI"} shares={1}/>
            <Stock ticker={"TOI"} shares={1}/>
            <Stock ticker={"TOI"} shares={1}/>

        </div>
    )
}