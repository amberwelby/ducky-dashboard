import { useEffect } from 'react';
import '../styles/StockGrid.css'
import { StockCard } from "./StockCard"

export type Stock = {
    ticker: string,
    quoteTimestamp: string,
    bidPrice: number,
    bidSize: number,
    askPrice: number, 
    askSize: number, 
    midPrice: number
}


export function StockGrid({
    apiKey, 
    tickers
}:{
    apiKey: string, 
    tickers: string[]
}){
    
    useEffect(() => {
        async function getStocks() {
            // const url = `https://api.tiingo.com/fx/top?tickers=${tickers}&token=${apiKey}`;
            const url = `https://api.tiingo.com/api/test?token=${apiKey}`
            try {
                const response = await fetch(url, {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(!response.ok){
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                console.log(json);
            } catch (error) {
                console.error(error.message);
            }
        }
        getStocks();
    }, [apiKey, tickers]);
    
    

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