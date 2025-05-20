import '../styles/Stock.css'

export function Stock({
    ticker, 
    shares,
}:{ticker: string,
    shares: number,
}){
    //temp
    const name: string = "Topicus.com"
    const pps: number = 999;
    const totalValue: number = pps * shares;
    const totalSpent: number = 888;
    const gainLoss: number = totalValue - totalSpent;

    return(
        <div className="stock">
            <h3>{name}: {ticker}</h3>
            <p>Shares: {shares}</p>
            <p>Price/Share: {pps}</p>
            <p className={gainLoss > 0 ? 'gain' : 'loss'}>Gain/Loss: {gainLoss}</p>
        </div>
    )
}

/* What I want to know 
    Ticker (display, store)
    Name (display)
    No. Shares (display, store)
    Price per Share (display)
    Total value (display)
    Total amount spent to purchase (store)
    Total gain/loss (display)
*/